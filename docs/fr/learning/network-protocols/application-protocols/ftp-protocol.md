# Le `protocole FTP`

Le `protocole FTP` (File Transfer Protocol) est utilisé pour le **transfert de fichiers** entre un client et un serveur sur un réseau. `FTP` est basé sur sur le `protocole de transport TCP` et le `protocole IP`.

:::info
Il est l'un des protocoles les plus anciens et les plus utilisés pour la gestion et le transfert de fichiers.
:::

## Fonctionnement

FTP fonctionne selon un modèle client-serveur, où le **client `FTP` se connecte à un serveur `FTP` pour télécharger ou téléverser des fichiers**. `FTP` utilise deux canaux de communication distincts : un canal de commande et un canal de données.

<img src="/clusters/learning/network-protocols/ftp-protocol.png" alt="ftp-protocol" style="width: 80%; display: block; margin: 0 auto;">

1. **Canal de Commande** : Utilisé pour envoyer des commandes et recevoir des réponses entre le client et le serveur (Par défaut, il utilise le port TCP 21)
2. **Canal de Données** : Utilisé pour le transfert réel des fichiers (Le port utilisé pour le canal de données peut varier selon le mode de fonctionnement de `FTP` (actif ou passif))

### Modes de Fonctionnement

1. **Mode Actif** :
   - Le client ouvre un port et attend que le serveur se connecte à ce port pour établir le canal de données.
   - Le client envoie une commande `PORT` au serveur, indiquant l'adresse IP et le numéro de port sur lesquels il écoute.
   - Le serveur initie la connexion au client depuis son port de données (par défaut, port TCP 20).

2. **Mode Passif** :
   - Le serveur ouvre un port et attend que le client se connecte à ce port pour établir le canal de données.
   - Le client envoie une commande `PASV` au serveur, et le serveur répond avec l'adresse IP et le numéro de port sur lesquels il écoute.
   - Le client initie la connexion au serveur pour le canal de données.

### Commandes `FTP` Courantes

- **USER** : Envoie le nom d'utilisateur au serveur.
- **PASS** : Envoie le mot de passe associé au nom d'utilisateur.
- **LIST** : Liste les fichiers et répertoires du répertoire courant.
- **RETR** : Télécharge un fichier depuis le serveur vers le client.
- **STOR** : Téléverse un fichier depuis le client vers le serveur.
- **CWD** : Change le répertoire de travail sur le serveur.
- **QUIT** : Termine la session `FTP`.

## Sécurité avec `FTPS` et `SFTP`

FTP en lui-même n'est pas sécurisé, car les informations sont envoyées en clair. Pour améliorer la sécurité, deux principaux protocoles sont utilisés : `FTPS` et `SFTP`.

1. **`FTPS` (FTP Secure)** :
   - Ajoute une couche de sécurité SSL/TLS au FTP classique.
   - Utilise les ports 21 pour les commandes et peut utiliser des ports dynamiques pour les données en mode passif.
   - Offre une sécurité en chiffrant les commandes et les données.

2. **`SFTP` (SSH File Transfer Protocol)** :
   - Utilise le protocole SSH pour offrir un transfert de fichiers sécurisé.
   - Utilise le port 22 par défaut.
   - Contrairement à `FTPS`, `SFTP` n'est pas une extension de `FTP` mais un sous-système du protocole SSH.
   - Offre des fonctionnalités supplémentaires telles que la manipulation de fichiers et la gestion des permissions.

## Transfert de Fichier avec `FTP`

Imaginons que nous souhaitions télécharger un fichier depuis un serveur `FTP` distant. Voici les étapes typiques :

1. **Connexion au Serveur `FTP`** :
   - Le client `FTP` se connecte au serveur en utilisant l'adresse IP ou le nom de domaine, et le port 21.
   - Le client envoie la commande `USER` suivie du nom d'utilisateur, puis `PASS` suivi du mot de passe.

2. **Naviguer dans le Système de Fichiers** :
   - Le client peut utiliser des commandes telles que `LIST` pour lister les fichiers et `CWD` pour changer de répertoire.

3. **Téléchargement du Fichier** :
   - Le client envoie la commande `RETR` suivie du nom du fichier à télécharger.
   - Le canal de données est établi (en mode actif ou passif), et le fichier est transféré du serveur au client.

4. **Déconnexion du Serveur** :
   - Le client envoie la commande `QUIT` pour terminer la session `FTP`.