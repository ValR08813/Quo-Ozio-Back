# Description du projet

Développer une solution technique permettant à un utilisateur d'envoyer un message sur différents réseaux sociaux.

La solution doit historiser les envois et permettre la consultation des envois réalisés.

# Fonctionnalités demandées

- Gestion des utilisateurs via page de login/inscription
- Possibilité d'envoyer un message de façon instantanée sans avoir à le planifier
- Visualisation de l'historique des envois et leur état (envoi réussi, échec de l'envoi) 
- Rédiger la documentation technique (installation du projet, configuration, justification rapide des choix technique)


# Prérequis techniques

- Utilisation du Framework Laravel >= 8, Symfony >= 5, Django ou Express
- Si besoin d'utiliser une base de données relationnelle, PostgreSQL ou MariaDB
- Pour faciliter le test, nous souhaitons pouvoir publier les messages sur un channel Slack et un channel Discord. Il est possible d'utiliser les API de ces deux réseaux ou utiliser les webhooks (solution que l'on conseille car la plus rapide a mettre en place). A vous de vous renseigner autour de ces deux services.
- Utiliser Git, et ne pas hésiter à faire des commits lorsque jugé nécéssaire.


# Optionnel

- Rédiger les tests unitaires et/ou fonctionnels des fonctionalités qui vous semblent importantes à l'aide de PHPUnit et les outils offerts par le Framework retenu.
- Expliquer comment vous feriez évoluer l'application pour la rendre parfaitement utilisable en production
- Gestion de la planification des messages: Texte, Date, Heure, réseau(x) social(aux). L'utilisateur peut programmer autant d'envois qu'il souhaite en choisissant un ou plusieurs réseaux sociaux destinataires. L'application envoie les messages automatiquement à l'heure programmée sur les réseaux spécifiés.
- Pouvoir modifier la planification d'un message qui n'a pas encore été publié
- Pouvoir visualiser/filtrer les messages en attente


# Informations annexes

Vous êtes libre d'utiliser toutes les technologies que vous souhaitez dès l'instant que vous répondez aux prérequis techniques.

Nous vous demandons de réaliser une application fonctionnelle, qui inclut le code backend mais aussi frontend. Ne négligez donc pas l'ergonomie / design.

Vous nous présenterez le résultat de votre travail par un déploiement en ligne et via un accès au projet Git (Gitlab).

Nous restons disponibles pour répondre à vos questions éventuelles.
