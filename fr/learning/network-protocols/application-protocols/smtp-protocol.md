# Le `protocole SMTP`

Le `protocole SMTP` (Simple Mail Transfer Protocol) est utilisé pour la **transmission de courriels (e-mails) sur le réseau Internet**. Il définit comment les messages électroniques sont envoyés d'un serveur de messagerie à un autre, ainsi que du client de messagerie à un serveur.

## Fonctionnement

Pour illustrer le fonctionnement du `protocole SMTP`, prenons l'exemple de l'envoi d'un e-mail depuis l'application Mail d'un Mac vers une adresse Gmail.

![smtp-protocol](/learning/network-protocols/smtp-protocol.png)

1. **Émission de la Requête SMTP par le client de messagerie** : L'application Mail sur le Mac utilise le `protocole SMTP` pour préparer l'e-mail à envoyer. Elle se connecte au serveur SMTP d'Apple via une connexion TCP, généralement sur le port 587.
2. **Transmission via TCP/IP** : Le message est encapsulé dans des segments TCP/IP pour être **transmis au serveur `SMTP` d'Apple**.
3. **Réception par le Serveur `SMTP` d'Apple (MTA)** : Le serveur de transfert de courrier (MTA - Mail Transfer Agent) d'**Apple reçoit la requête `SMTP`**. Il vérifie les en-têtes et le contenu du message, s'assurant de l'authenticité et de l'intégrité des données.
4. **Résolution DNS** : Le serveur MTA d'Apple interroge le serveur DNS pour obtenir l'adresse IP du serveur `SMTP` de Google, correspondant au domaine de l'adresse e-mail de destination (ex: gmail.com).
5. **Relais `SMTP` vers le Serveur `SMTP` de Google** : Utilisant les informations DNS, le serveur MTA d'Apple établit une connexion `SMTP` avec le serveur `SMTP` de Google. Le message est transmis via une nouvelle session `SMTP/TCP`.
6. **Réception par le Serveur `SMTP` de Google (MTA)** : Le serveur MTA de Google, également en écoute sur le port 587 ou 465, reçoit la requête `SMTP`. Il vérifie les en-têtes pour s'assurer que le message peut être relayé vers le destinataire final.
7. **Relais Interne chez Google** : Le serveur MTA de Google peut passer le message à d'autres serveurs internes pour le rapprocher du serveur de livraison approprié, en utilisant des mécanismes internes de routage et de gestion des e-mails.
8. **Livraison au Serveur MDA de Google** :
   - Le message atteint finalement un serveur MDA (Mail Delivery Agent) de Google, chargé de la livraison finale du message dans la boîte de réception du destinataire. Le MDA stocke le message dans la boîte aux lettres du destinataire sur le serveur.
   - Lorsque le destinataire accède à son compte Gmail, le serveur MDA utilise les `protocoles IMAP` (Internet Message Access Protocol) ou POP3 (Post Office Protocol) pour synchroniser et délivrer le message au client de messagerie du destinataire.
:::info IMAP
permet une synchronisation complète des messages entre le serveur et le client, permettant l'accès aux messages depuis plusieurs appareils tout en conservant les e-mails sur le serveur.
:::
:::info POP3
télécharge les messages sur le client et les supprime généralement du serveur après le téléchargement, ce qui est plus adapté pour un usage unique d'un seul appareil.
:::
9. **Réception de l'E-mail** : Le destinataire peut maintenant lire l'e-mail sur son client de messagerie, qu'il s'agisse de l'application Gmail sur un navigateur, un client de messagerie comme Outlook, ou une application mobile.


## Protocole SMTP sur le Web
Si un e-mail est envoyé depuis une interface webmail, comme Gmail via un navigateur web tel que Chrome, le processus suit un chemin légèrement différent :
1. **Envoi via le Navigateur** :
   - L'utilisateur rédige un e-mail sur l'interface webmail de Gmail dans Chrome.
   - Une requête `HTTPS` est envoyée au serveur web de Gmail, où elle est traitée et préparée pour l'envoi via `SMTP`.

2. **Transmission au Serveur de Gmail** :
   - Le serveur web de Gmail agit comme un proxy et envoie l'e-mail au serveur MTA de Google via le protocole `SMTP`.

Ce processus utilise le protocole `HTTP/HTTPS` pour la transmission initiale entre le client (navigateur) et le serveur web de Google, avant de basculer vers `SMTP` pour la transmission entre serveurs de messagerie.
:::