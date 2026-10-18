<template>
</template>

<script lang="ts">

// TODO: fetch server gamemodes as soon as API exposes an GET endpoint
// this data already exists as YML config for the MC server {icon.toUpperCase() -> material}
const modes = [
  { type: 'Jump', icon: "feather", description: "Contournez les obstacles et terminez le parcours le plus rapidement possible !" },
  { type: "FastBow", icon: "bow", description: "Une flêche , une épée. Enchaînez les kills et récupérer les bonus qui apparaissent sur la carte." },
  { type: "Arena", icon: "iron_sword", description: "Choisissez divers bonus et achetez des objets entre les manches de combat afin d'être le dernier survivant !" },
  { type: "TigrouBrain", icon: "sandstone", description: "Deux équipes, deux voies. Marquez des points dans la base adverse pour gagner !" },
  { type: "Bingo", icon: "decorated_pot", description: "Trouvez tous les objets présents sur votre grille !" },
  { type: "RFTD", icon: "dragon_egg", description: "Ce mode de jeu est focalisé sur le combat contre le dragon de l'End. Vous devrez fabriquer un certain nombre d'yeux durant la phase de préparation. Les équipes seront ensuite téléportées dans l'End, et celle qui inflige le plus de dégâts au dragon remportera la partie !" },
  { type: "Switch", icon: "chest_minecart", description: "Un UHC classique... mais rythmé par des changements d'équipe réguliers ! Au moins un joueur de chaque équipe échangera d'équipe et de position sur la carte avec quelqu'un d'autre !" },
  { type: "TaupeGun", icon: "tnt", description: "Dans ce mode de jeu, une équipe 'supplémentaire se cache : celle' des taupes. Elles devront rouler leur équipe et gagner entre elles. Elles peuvent communiquer dans un chat privé, et disposent d'un kit." },
  { type: "UHC", icon: "golden_apple", description: "Le mode de jeu Ultra Hardcore standard, souvent accompagné de scénarios pour pimenter la partie de diverses manières !" },
]
</script>
