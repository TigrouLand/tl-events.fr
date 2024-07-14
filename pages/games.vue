<template>
  <main class="flex h-full flex-col overflow-y-hidden md:flex-row">
    <aside
      class="flex w-full flex-nowrap items-center gap-4 overflow-x-auto overflow-y-hidden bg-gray-900 px-4 py-10 md:h-full md:max-w-[260px] md:flex-wrap md:overflow-y-auto md:overflow-x-hidden md:py-6">
      <GameCard
        v-for="game in [...games, ...archivedGames]"
        :key="game.id"
        :game="gameWithUsernames(game)"
        :selected="selected(game)"
        @click="selectGame(game)" />
    </aside>

    <section
      v-if="selectedGame"
      class="relative grid h-full w-full grid-cols-1 gap-4 overflow-y-auto bg-gray-800 p-4 sm:grid-cols-2 sm:grid-rows-[auto_1fr]">
      <article class="custom-box">
        <h1 class="text-center text-lg font-bold">{{ selectedGame.name }}</h1>
        <div class="mb-4 text-center text-lg font-bold text-gray-400">
          <Icon :name="gameInfo.icon" class="mb-1 mr-1" />
          Partie {{ gameInfo.type }}
        </div>

        <ul class="space-y-1 font-medium text-white">
          <li class="flex gap-x-1">
            <Icon name="ion:game-controller" class="mb-0.5 mr-1 h-5 w-5" />
            Type de jeu : {{ formatEventType(selectedGame.type) }}
          </li>
          <li class="flex gap-x-1">
            <Icon name="fa6-solid:users" class="mb-0.5 mr-1 h-5 w-5" />
            Participants : {{ selectedGame.players.length }}
          </li>
          <li v-if="isArchived(selectedGame)" class="flex gap-x-1">
            <Icon name="fa6-solid:clock" class="mb-0.5 mr-1 h-5 w-5 p-0.5" />
            Temps de jeu : {{ formatTime() }}
          </li>
          <li class="flex gap-x-1">
            <Icon name="fa6-solid:calendar" class="mb-0.5 mr-1 h-5 w-5 p-0.5" />
            Date de début : {{ formatDate(selectedGame.startDate) }}
          </li>
          <li v-if="selectedGame.modifiers && selectedGame.modifiers.length > 0" class="flex gap-x-1">
            <Icon name="ion:erlenmeyer-flask" class="mb-0.5 mr-1 h-5 w-5" />
            Scénarios : {{ selectedGame.modifiers.join(', ') }}
          </li>
          <li v-if="selectedGame.events && selectedGame.events.length > 0" class="flex gap-x-1">
            <Icon name="fa6-solid:bolt" class="mb-0.5 mr-1 h-5 w-5 p-[1px]" />
            Événements aléatoires : {{ selectedGame.events.join(', ') }}
          </li>
          <li v-if="selectedGame.hiddenRoles" class="flex gap-x-1">
            <Icon name="fa6-solid:eye-slash" class="mb-0.5 mr-1 h-5 w-5 p-[1px]" />
            Composition cachée
          </li>
        </ul>
      </article>

      <article class="custom-box h-fit sm:col-start-1">
        <h1 class="text-center text-lg font-bold">Joueurs</h1>

        <ul v-if="selectedGame?.playerTeams && selectedGame.finalTeams" class="mt-4 grid">
          <li v-for="player in selectedGame.players" :key="player" class="my-2 grid grid-cols-[auto_1fr] grid-rows-2">
            <Avatar :player="getUsernameByUuid(player)" type="rounded" class="row-span-2 my-auto mr-4" />

            <div :class="'col-span-2 ' + (isAlive(player) ? 'font-bold text-white' : 'text-gray-400')">
              <Icon :name="isAlive(player) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
              {{ getUsernameByUuid(player) }}
            </div>

            <div class="col-span-2 col-start-2 row-start-2 flex items-center space-x-2">
              <span :style="getStyleForTeam(getTeamOfPlayer(player))">{{ getTeamOfPlayer(player).name }}</span>
              <Icon name="fa6-solid:caret-right" class="text-gray-300" />
              <span :style="getStyleForTeam(getFinalTeamOfPlayer(player))">{{ getFinalTeamOfPlayer(player).name }}</span>
            </div>
          </li>
        </ul>

        <ul v-else-if="selectedGame.teams" class="mt-4 grid">
          <li v-for="team in selectedGame.teams.filter((t): boolean => t.name !== '')" :key="team.name">
            <h2 class="text-lg font-semibold" :style="getStyleForTeam(team)">
              {{ selectedGame.type === 'SkyDefender' ? (team.name === 'Bleue' ? 'Attaquants' : 'Défenseurs') : `Équipe ${team.name}` }}
            </h2>

            <div
              v-for="{ username: player, uuid } in getPlayersInTeam(team.name)"
              :key="uuid"
              class="my-4 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
              <Avatar :player="player" type="rounded" class="row-span-2 my-auto mr-4" />

              <div :class="'my-auto ' + (isAlive(uuid) ? 'font-bold text-white' : 'text-gray-400')">
                <Icon :name="isAlive(uuid) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
                {{ player }}
              </div>

              <div
                v-if="selectedGame.type === 'TaupeGun' && selectedGame.moles?.includes(uuid)"
                class="col-span-2 col-start-2 row-start-2 inline-block space-x-1 text-red-300">
                <Icon name="fa6-solid:handshake-simple-slash" /> Taupe
              </div>
            </div>
          </li>
        </ul>

        <ul v-else-if="selectedGame" class="mt-4 grid">
          <li
            v-for="player in selectedGame.players"
            :key="player"
            :class="'my-4 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] ' + (isAlive(player) ? 'text-white' : 'text-gray-400')">
            <Avatar :player="getUsernameByUuid(player)" type="rounded" class="row-span-2 my-auto mr-4" />

            <div :class="'col-span-1 my-auto ' + (isAlive(player) ? 'font-bold' : '')">
              <Icon :name="isAlive(player) ? 'fa-solid:trophy' : 'fa-solid:skull'" class="mb-1.5" />
              {{ getUsernameByUuid(player) }}
            </div>

            <span v-if="selectedGame.type === 'LGUHC'" class="col-span-2 col-start-2 row-start-2 flex items-center space-x-2">
              {{ getRoleForPlayer(player) }}
            </span>
          </li>
        </ul>
      </article>

      <article class="custom-box h-fit sm:col-start-2 sm:row-span-full sm:row-start-1">
        <h1 class="text-center text-lg font-bold">Événements de la partie</h1>

        <ol
          class="relative mt-4 space-y-6 before:absolute before:top-1/2 before:h-[calc(100%_-_25px)] before:w-0.5 before:-translate-y-1/2 before:bg-gray-700">
          <li
            v-for="log in selectedGame.logs"
            :key="log"
            class="relative ml-4 text-gray-300 before:absolute before:-left-[21px] before:top-1 before:h-3 before:w-3 before:rounded-full before:border before:border-gray-900 before:bg-gray-700"
            v-text="log" />
        </ol>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { API } from '~/tools/types';

useHead({
  title: '[TL] Events - Parties',
});

const [gamesResponse, membersResponse] = await Promise.all([
  useFetch('https://api.tl-events.fr/v1/games'),
  useFetch('https://api.tl-events.fr/v1/members'),
]);

const getUsernameByUuid = (uuid: string): string => {
  const memberName = members.value.find((p): boolean => p.uuid === uuid)!.name;
  return memberName.startsWith('~') ? memberName.slice(1) : memberName;
};

const replaceUuids = (value: string): string => {
  // Each log can contain a uuid, we need to replace it by the username
  // The uuid is stored like this: <@uuid>

  const uuidRegex = /<@([a-zA-Z0-9-]+)>/g;
  const matches = value.match(uuidRegex);

  if (!matches) {
    return value;
  }

  matches.forEach((match): void => {
    const uuid = match.replace('<@', '').replace('>', '');
    const username = getUsernameByUuid(uuid);

    if (username) {
      value = value.replace(match, username);
    }
  });

  return value;
};

const fixGameUuids = (game: API.Game): API.Game => {
  game.logs = game.logs.map(replaceUuids);

  const fixKeys = ['playerRoles', 'playerTeams', 'finalTeams'] as Array<keyof typeof game>;

  fixKeys.forEach((key): void => {
    if (game[key]) {
      const nodes = {} as Record<string, unknown>;

      Object.entries(game[key] as object).forEach(([uuid, value]): void => {
        const username = replaceUuids(uuid);
        nodes[username] = value;
      });

      game[key] = nodes as never;
    }
  });

  return game;
};

const defineGameInfo = (game: API.Game): { type: string; icon: string } => {
  const info = { type: 'en cours', icon: 'ion:game-controller' };

  if (isScheduled(game)) {
    info.type = 'programmée';
    info.icon = 'fa6-solid:clock';
  } else if (isArchived(game)) {
    info.type = 'archivée';
    info.icon = 'fa6-solid:box-archive';
  }

  return info;
};

const isArchived = (game: API.Game): boolean => {
  return game.archiveDate !== -1;
};

const isScheduled = (game: API.Game): boolean => {
  return game.startDate === -1 && game.scheduleDate !== -1;
};

const formatDate = (timestamp: number): string => {
  return dayjs(timestamp).format('DD/MM/YYYY à HH:mm');
};

const gamesData = gamesResponse.data as Ref<API.GameResponse>;
const members = membersResponse.data as Ref<API.Member[]>;

const archivedGames: Ref<API.Game[]> = ref(gamesData.value.archivedGames);
const games: Ref<API.Game[]> = ref(gamesData.value.games);
const selectedGame: Ref<API.Game> = ref(fixGameUuids([...archivedGames.value, ...games.value][0]));
const gameInfo = defineGameInfo(selectedGame.value);

const interval = ref<NodeJS.Timeout | null>(null);

onMounted((): void => {
  interval.value = setInterval(refreshGames, 10000);
});

onUnmounted((): void => {
  clearInterval(interval.value as NodeJS.Timeout);
});

const getStyleForTeam = (team: API.Team): string => {
  return `color: rgba(${team.colors.join(', ')});`;
};

const selectGame = (game: API.Game): void => {
  if (archivedGames.value.includes(game)) {
    selectedGame.value = fixGameUuids(game);
  }
};

const gameWithUsernames = (game: API.Game): API.Game => {
  return {
    ...game,
    players: game.players.map((player): string => {
      const member = members.value.find((m): boolean => m.uuid === player);
      return member ? member.name : player;
    }),
  };
};

const selected = (game: API.Game): boolean => {
  return selectedGame.value!.id === game.id;
};

const getRoleForPlayer = (uuid: string): string => {
  const username = getUsernameByUuid(uuid);
  return selectedGame.value!.playerRoles![username];
};

const getPlayersInTeam = (name: string) => {
  return Object.entries(selectedGame.value!.playerTeams!)
    .filter(([_, v]): boolean => v === name)
    .map(([k, _]) => {
      return {
        username: k,
        uuid: getUuidByUsername(k),
      };
    });
};

const getTeamOfPlayer = (uuid: string): API.Team => {
  const username = getUsernameByUuid(uuid);
  const teamName = selectedGame.value!.playerTeams![username];
  return getTeamByName(teamName);
};

const getFinalTeamOfPlayer = (uuid: string): API.Team => {
  const username = getUsernameByUuid(uuid);
  const teamName = selectedGame.value!.finalTeams![username];
  return getTeamByName(teamName);
};

const getTeamByName = (name: string): API.Team => {
  return selectedGame.value!.teams!.find((t): boolean => t.name === name)!;
};

const getUuidByUsername = (name: string): string => {
  return members.value.find((p): boolean => p.name === name)!.uuid;
};

const refreshGames = async (): Promise<void> => {
  const data = await $fetch<API.GameResponse>('https://api.tl-events.fr/v1/games');
  games.value = data.games;
  archivedGames.value = data.archivedGames;
};

const isAlive = (name: string): boolean => {
  return selectedGame.value.alive.includes(name);
};

const formatTime = (): string => {
  const { minutes, seconds, hours } = selectedGame.value!;
  const format = (value: number): string => value.toString().padStart(2, '0');

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

const formatEventType = (type: string): string => {
  switch (type) {
    case 'LGUHC':
      return 'LG-UHC';
    case 'UHCRun':
      return 'UHC-Run';
    default:
      return type || 'Inconnu';
  }
};
</script>

<style scoped>
.custom-box {
  @apply rounded border border-gray-500 bg-gray-900 p-8 text-white shadow;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
