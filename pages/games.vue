<template>
  <div class="h-full flex bg-gray-100 overflow-y-hidden">
    <div class="overflow-x-auto hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1">
          <div class="flex justify-center items-center h-20 bg-gray-900">
            <h2 class="text-white text-xl font-medium mt-3 p-3">
              Liste des parties
            </h2>
          </div>
          <div v-for="game in games" :key="game.id" class="px-4 py-3 bg-gray-900">
            <GameCard :game="gameWithUsernames(game)" :selected="selected(game)" />
          </div>
          <div v-for="game in archivedGames" :key="game.id" class="px-4 py-3 bg-gray-900" @click="selectGame(game)">
            <GameCard :game="gameWithUsernames(game)" :selected="selected(game)" />
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-900 space-y-1" />
          </div>
        </div>
      </div>
    </div>
    <main class="flex-1 relative overflow-y-auto focus:outline-none bg-gray-800">
      <div class="md:hidden items-center flex bg-gray-900 overflow-x-auto">
        <div v-for="game in games" :key="game.id" class="flex flex-shrink-0 px-4 py-3 bg-gray-900">
          <GameCard :game="gameWithUsernames(game)" :selected="selected(game)" />
        </div>
        <div v-for="game in archivedGames" :key="game.id" class="flex flex-shrink-0 px-4 py-3 bg-gray-900" @click="selectGame(game)">
          <GameCard :game="gameWithUsernames(game)" :selected="selected(game)" />
        </div>
      </div>
      <div v-if="selectedGame" class="flex flex-col sm:flex-row w-full px-4 sm:px-0">
        <div class="flex flex-col flex-shrink-0 flex-grow-0 sm:w-1/2 h-full sm:py-6 sm:mx-auto sm:px-6 md:px-8">
          <div class="bg-gray-900 border border-gray-500 rounded shadow text-white w-full my-4">
            <div class="w-full p-7">
              <div class="font-bold text-lg text-center">
                {{ selectedGame.name }}
              </div>
              <div v-if="isScheduled(selectedGame)" class="font-bold text-lg text-center mb-4 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-gray-400 mr-1" />
                Partie programmée
              </div>
              <div v-else-if="isArchived(selectedGame)" class="font-bold text-lg text-center mb-4 text-gray-400">
                <font-awesome-icon icon="fa-solid fa-archive" class="text-gray-400 mr-1" />
                Partie archivée
              </div>
              <div v-else class="font-bold text-lg text-center mb-4 text-green-500">
                <font-awesome-icon icon="fa-solid fa-gamepad" class="text-green-500 mr-1" />
                Partie en cours
              </div>
              <div class="mb-1">
                <font-awesome-icon icon="fa-solid fa-gamepad" class="text-white mr-1" />
                <span class="font-medium">Type de jeu :</span> {{ formatEventType(selectedGame.type) }}
              </div>
              <div class="mb-1">
                <font-awesome-icon icon="fa-solid fa-users" class="text-white mr-1" />
                <span class="font-medium">Participants :</span> {{ selectedGame.players ? selectedGame.players.length : 0 }}
              </div>
              <div v-if="isArchived(selectedGame)" class="mb-1">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-white mr-1" />
                <span class="font-medium">Temps de jeu :</span> {{ formatTime() }}
              </div>
              <div class="mb-1">
                <font-awesome-icon icon="fa-solid fa-calendar" class="text-white mr-1" />
                <span class="font-medium">Date de début :</span> {{ formatDate(selectedGame.startDate) }}
              </div>
              <div v-if="selectedGame.modifiers && selectedGame.modifiers.length > 0" class="mb-1">
                <font-awesome-icon icon="fa-solid fa-plug" class="text-white mr-1" />
                <span class="font-medium">Scénarios :</span> {{ selectedGame?.modifiers ? selectedGame?.modifiers.join(', '): '' }}
              </div>
              <div v-if="selectedGame?.events && selectedGame.events.length > 0" class="mb-1">
                <font-awesome-icon icon="fa-solid fa-bolt" class="text-white mr-1" />
                <span class="font-medium">Événements aléatoires :</span> {{ selectedGame?.events.join(', ') }}
              </div>
            </div>
          </div>
          <div class="bg-gray-900 border border-gray-500 rounded shadow text-white w-full my-4 p-7">
            <div class="flex font-bold text-lg justify-center mb-2">
              Joueurs
            </div>
            <div class="table-auto">
              <div v-if="selectedGame?.playerTeams && selectedGame.finalTeams">
                <tr v-for="player in selectedGame?.players" :key="player" class="flex items-center">
                  <td>
                    <img class="m-4 h-10 w-10 rounded-full" :src="'https://avatars.tl-events.fr/helms/' + getUsernameByUuid(player) + '.png'" alt="">
                  </td>
                  <td>
                    <div class="flex flex-col">
                      <div v-if="isAlive(player)" class="flex-row items-center font-bold">
                        {{ getUsernameByUuid(player) }}
                      </div>
                      <div v-else class="flex-row items-center text-gray-400">
                        {{ getUsernameByUuid(player) }}<font-awesome-icon class="ml-2" icon="fa-solid fa-skull" />
                      </div>
                      <div class="flex flex-row items-center space-x-2">
                        <div :style="getStyleForTeam(getTeamOfPlayer(player))">
                          {{ getTeamOfPlayer(player).name }}
                        </div>
                        <div class="text-gray-300">
                          <font-awesome-icon icon="fa-solid fa-caret-right" />
                        </div>
                        <div :style="getStyleForTeam(getFinalTeamOfPlayer(player))">
                          {{ getFinalTeamOfPlayer(player).name }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </div>
              <div v-else-if="selectedGame?.teams">
                <div v-for="team in selectedGame.teams.filter(t => t.name !== '')" :key="team.name">
                  <div :key="team.name" class="text-lg font-semibold mt-3" :style="getStyleForTeam(team)">
                    {{ selectedGame.type === 'SkyDefender' ? (team.name === 'Bleue' ? 'Attaquants' : 'Défenseurs'): `Équipe ${team.name}` }}
                  </div>
                  <tr v-for="{ username, uuid } in getPlayersInTeam(team.name)" :key="uuid" class="flex items-center">
                    <td>
                      <img class="m-4 h-10 w-10 rounded-full" :src="'https://avatars.tl-events.fr/helms/' + username + '.png'" alt="">
                    </td>
                    <td>
                      <div v-if="isAlive(uuid)" class="flex flex-col">
                        <div class="flex-row items-center font-bold">
                          {{ username }}
                        </div>
                        <div v-if="selectedGame.type === 'TaupeGun' && selectedGame.moles.includes(uuid)" class="flex items-center text-red-300">
                          Taupe <font-awesome-icon class="ml-2" icon="fa-solid fa-handshake-slash" />
                        </div>
                      </div>
                      <div v-else-if="selectedGame" class="flex flex-col">
                        <div class="flex-row items-center text-gray-400">
                          {{ username }}<font-awesome-icon class="ml-2" icon="fa-solid fa-skull" />
                        </div>
                        <div v-if="selectedGame.type === 'TaupeGun' && selectedGame.moles.includes(uuid)" class="flex items-center text-red-300">
                          Taupe <font-awesome-icon class="ml-2" icon="fa-solid fa-handshake-slash" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </div>
              </div>
              <tr v-for="player in selectedGame.players" v-else-if="selectedGame" :key="player" class="flex items-center">
                <td>
                  <img class="m-4 h-10 w-10 rounded-full" :src="'https://avatars.tl-events.fr/helms/' + getUsernameByUuid(player) + '.png'" alt="">
                </td>
                <td>
                  <div v-if="isAlive(player)" class="flex flex-col">
                    <div class="flex-row items-center font-bold">
                      {{ getUsernameByUuid(player) }}
                    </div>
                    <div v-if="selectedGame.type === 'LGUHC'" class="text-gray-200">
                      {{ getRoleForPlayer(player) }}
                    </div>
                  </div>
                  <div v-else class="flex flex-col">
                    <div class="flex-row items-center text-gray-400">
                      {{ getUsernameByUuid(player) }}<font-awesome-icon class="ml-2" icon="fa-solid fa-skull" />
                    </div>
                    <div v-if="selectedGame?.type === 'LGUHC'" class="text-gray-400">
                      {{ getRoleForPlayer(player) }}
                    </div>
                  </div>
                </td>
              </tr>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-shrink-0 flex-grow-0 sm:w-1/2 h-full sm:py-6 sm:mx-auto sm:px-6 md:px-8">
          <div class="bg-gray-900 border border-gray-500 rounded shadow text-white w-full my-4">
            <div class="w-full p-7">
              <div class="flex font-bold text-lg justify-center mb-2">
                Événements de la partie
              </div>
              <ol v-if="selectedGame" class="relative border-l border-gray-200 dark:border-gray-700 mt-4">
                <div v-for="(log, i) in selectedGame.logs" :key="log">
                  <li :class="`ml-4 ${i !== selectedGame.logs.length - 1 ? 'mb-8': ''}`">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                    <p class="mb-4 text-base font-normal text-gray-300" v-text="log" />
                  </li>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#app';
import dayjs from 'dayjs';
import { Ref } from 'vue';
import { Game, GameResponse, Member, Team } from '~/typings/api';

useHead({
  title: '[TL] Events - Parties'
});
const [gamesResponse, membersResponse] = await Promise.all([
  useFetch('https://api.tl-events.fr/v1/games'),
  useFetch('https://api.tl-events.fr/v1/members')
]);

const gamesData = gamesResponse.data as Ref<GameResponse>;
const members = membersResponse.data as Ref<Member[]>;

const archivedGames: Ref<Game[]> = ref<Game[]>([]);
const games: Ref<Game[]> = ref<Game[]>([]);
const selectedGame: Ref<Game | null> = ref<Game | null>(null);

const interval = ref<NodeJS.Timeout | null>(null);

onMounted?.(() => {
  games.value = gamesData.value.games;
  archivedGames.value = gamesData.value.archivedGames;
  interval.value = setInterval(refreshGames, 10000);
});

onUnmounted?.(() => {
  clearInterval(interval.value);
});

const getStyleForTeam = (team: Team) => {
  return `color: rgba(${team.colors.join(', ')});`;
};

const selectGame = (game) => {
  selectedGame.value = fixGameUuids(game);
};

const gameWithUsernames = (game: Game) => {
  if (!game.players) {
    return game;
  }
  return {
    ...game,
    players: game.players.map((player) => {
      const member = members.value.find(m => m.uuid === player);
      return member ? member.name : player;
    })
  };
};

const selected = (game: Game) => {
  if (!selectedGame.value) {
    return false;
  }
  return selectedGame.value?.id === game.id;
};

const getRoleForPlayer = (uuid: string) => {
  const username = getUsernameByUuid(uuid);
  return selectedGame.value?.playerRoles?.[username];
};

const getPlayersInTeam = (name: string) => {
  if (selectedGame.value && selectedGame.value?.playerTeams) {
    return Object.entries(selectedGame.value?.playerTeams)
      .filter(([_, v]) => v === name)
      .map(([k, _]) => {
        return {
          username: k,
          uuid: getUuidByUsername(k)
        };
      });
  }
};

const getTeamOfPlayer = (uuid: string) => {
  if (selectedGame.value && selectedGame.value?.playerTeams) {
    const username = getUsernameByUuid(uuid);
    const teamName = selectedGame.value?.playerTeams[username];
    if (!teamName) {
      return { name: 'Inconnue', colors: [255, 255, 255] };
    }
    return getTeamByName(teamName);
  }
};

const getFinalTeamOfPlayer = (uuid: string) => {
  if (selectedGame.value && selectedGame.value?.finalTeams) {
    const username = getUsernameByUuid(uuid);
    const teamName = selectedGame.value?.finalTeams[username];
    if (!teamName) {
      return { name: 'Inconnue', colors: [255, 255, 255] };
    }
    return getTeamByName(teamName);
  }
};

const getTeamByName = (name: string) => {
  if (selectedGame.value && selectedGame.value?.teams) {
    return selectedGame.value?.teams.find(t => t.name === name);
  }
};

const getUuidByUsername = (name: string) => {
  return members.value.find(p => p.name === name)?.uuid;
};

const getUsernameByUuid = (uuid: string) => {
  return members.value.find(p => p.uuid === uuid)?.name;
};
const refreshGames = async () => {
  const data = await $fetch('https://api.tl-events.fr/v1/games');
  games.value = data.games;
  archivedGames.value = data.archivedGames;
};

const isAlive = (name: string) => {
  if (selectedGame.value && selectedGame.value?.alive) {
    return selectedGame.value?.alive.includes(name);
  }
  return false;
};

const isArchived = (game: Game) => {
  return game.archiveDate !== -1;
};

const isScheduled = (game: Game) => {
  return game.startDate === -1 && game.scheduleDate !== -1;
};

const formatDate = (timestamp: number) => {
  return dayjs(timestamp).format('DD/MM/YYYY à HH:mm');
};

const formatTime = () => {
  let { minutes, seconds } = selectedGame.value;
  const hours = selectedGame.value?.hours;

  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  return `${hours}:${minutes}:${seconds}`;
};

const formatEventType = (type: string) => {
  switch (type) {
  case 'LGUHC':
    return 'LG-UHC';
  case 'UHCRun':
    return 'UHC-Run';
  default:
    return type || 'Inconnu';
  }
};

const fixGameUuids = (game: Game): Game => {
  game.logs = game.logs.map(replaceUuids);

  const fixKeys = ['playerRoles', 'playerTeams', 'finalTeams'];
  fixKeys.forEach((key) => {
    if (game[key]) {
      const newObject = {};
      Object.entries(game[key]).forEach(([uuid, value]) => {
        const username = replaceUuids(uuid);
        if (username) {
          newObject[username] = value;
        }
      });
      game[key] = newObject;
    }
  });
  return game;
};

const replaceUuids = (value: string): string => {
  // Each log can contain a uuid, we need to replace it by the username
  // The uuid is stored like this: <@uuid>

  const uuidRegex = /<@([a-zA-Z0-9-]+)>/g;
  const matches = value.match(uuidRegex);
  if (!matches) {
    return value;
  }

  matches.forEach((match) => {
    const uuid = match.replace('<@', '').replace('>', '');
    const username = getUsernameByUuid(uuid);
    if (username) {
      value = value.replace(match, username);
    }
  });

  return value;
};

</script>

<style scoped>

</style>
