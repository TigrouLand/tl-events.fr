---
title: Migration 1.21+
date: 2026-06-30
tags: ["Saison 5", "Màj", "Patch"]
description: Le nouveau serveur en version 26.1.2 est prêt pour vous accueillir !
---

## Nous y sommes !

Un travail titanesque a été réalisé depuis __août 2025__, avec **+15,000** lignes de code modifiées pendant une année où le temps libre nous a rarement été accordé. L'ancien serveur restera ouvert pendant encore un peu de temps, pendant que nous réglons les derniers détails et corrigeons encore quelques bugs. Vos données ont été sauvegardées, et seront restaurées sur le nouveau serveur, sauf les stats des UHC. Vous retrouverez ci-dessous toutes les modifications et corrections des prochains jours, à mesure que nous testons les nouveaux systèmes. 

Voici déjà un résumé de ce qui a été fait en plus de la modernisation du code.

### Premières corrections et divers ajustements

- Affichage de l'objet actuellement sélectionné dans le menu des cosmétiques
- Correction des multiplicateurs de dégâts pour l'Arena, et tous les UHC (notamment le RFTD)
- Exclusion du LG-UHC et du SkyDefender pour le moment, et retrait du mode meetup
- Implémentation (minimaliste) des mécaniques de combat 1.8 pour le FastBow et le TigrouBrain
- Implémentation du RFTD avec les fonctionnalités essentielles
- Modification de l'icône du serveur Minecraft, c'est désormais celle du serveur Discord
- Nouveau paramètre pour restaurer l'ancienne animation de dégâts de la caméra (avant la 1.19)
- Nouveau système pour la tablist, le scoreboard, les menus, les nametags, les phases de jeu en UHC...
- Retour des déguisements dans les mini-jeux
- Retrait des mini-events concernant les flèches fantômes pour le moment

### Modifications spécifiques à certains jeux

- Arena > La bordure se met maintenant correctement à jour pour les joueurs qui rejoignent/quittent une partie en cours
- Arena > Retrait des bonus jugés peu équilibrés (sur la modification de perte de points notamment)
- FastBow > Les distances de tir ignorent désormais la hauteur
- Jump > Hauteur de retour abaissée pour le checkpoint M pour éviter les téléportations non voulues
- Jump > Le checkpoint ne se mettait pas à jour sur le scoreboard lors de la reprise d'une progression
- TigrouBrain > Les nametags sont désormais de la couleur de l'équipe
- UHC > Retrait de tous les scénarios obsolètes, retour du scénario CutClean

## Patch du 1er juillet 2026

## Bugs corrigés

- Les portails de l'End étaient accessibles
- Rejoindre un mini-jeu en cours ne vous y téléportait pas

## Arena

Une erreur survenait lorsqu'un joueur mourait et n'avait pas sélectionné de Derniers mots

## Cosmétiques

- Les effets de victoire Pluie de cochons, Pluie de toutous et Clones dansants faisaient apparaître les entités aux mauvais endroits
- Les objets déjà possédés dans les coffres au trésor ne donnaient plus de poussière

## TigrouBrain

L'historique des points marqués s'envoyait deux fois lorsque la partie se terminait par épuisement du chronomètre
