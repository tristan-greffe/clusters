# Le `protocole TLS`

Le `protocole TLS` (Transport Layer Security) est un protocole de cryptographie qui assure la sécurité des communications sur un réseau informatique. Il est largement utilisé pour sécuriser les connexions sur Internet, notamment pour les transactions bancaires, les transferts de fichiers (`protocole FTPS`), les échanges de courriels (`protocole SMTP`) et la navigation web (`protocole HTTPS`).

## Méthodes cryptographiques utilisées

`TLS` combine plusieurs techniques cryptographiques pour assurer la sécurité des communications :

1. **Cryptographie Asymétrique**: Employée durant le handshake pour l'échange sécurisé des clés. Les algorithmes courants sont RSA, Diffie-Hellman, et ECDHE (Elliptic Curve Diffie-Hellman Ephemeral).
2. **Cryptographie Symétrique**: Utilisée pour le chiffrement des données après l'établissement de la connexion. Les algorithmes courants incluent AES (Advanced Encryption Standard) et ChaCha20.
3. **Fonctions de Hachage**: Assurent l'intégrité des messages. Les fonctions courantes sont SHA-256 et SHA-3.

## Fonctionnement

`TLS` sécurise les échanges entre deux parties (client et serveur) en chiffrant les données, assurant ainsi leur confidentialité et leur intégrité. Il utilise la **cryptographie asymétrique pour établir la connexion**, puis la **cryptographie symétrique pour le chiffrement des données** échangées.

### Objectifs du `Handshake TLS`

Le `handshake TLS` est une série d'étapes permettant de :

1. Déterminer la version du protocole utilisée.
2. Sélectionner la suite cryptographique (Cipher).
3. Authentifier les parties impliquées à l'aide de certificats.
4. Générer un secret partagé sécurisé pour le chiffrement symétrique.

:::details Cipher (suite cryptographique)
![cipher](/learning/network-protocols/cipher.png)

Un cipher est une chaîne de caractères décrivant le protocole utilisé et tous les algorithmes nécessaires pour :
1. Générer un secret commun entre le serveur et le client pour le chiffrement symétrique.
2. Créer une clé pour signer les messages.

| Composant | Description |
|-----------|-------------|
| **TLS** | Le protocole utilisé. |
| **ECDHE** | Permet de créer un secret partagé entre le client et le serveur. |
| **RSA** | Règles pour l'échange de clé et l'authentification des messages pendant l'échange de clés. |
| **AES 128 GCM** | Algorithme pour le chiffrement des messages. |
| **SHA256** | Fonction de hachage pour générer le secret à partir d'une pre-master key. |
:::

### handshake `TLS 1.2`

![handshake-tls-1.2](/learning/network-protocols/handshake-tls-1.2.png)

1. **Établissement de la connexion `TCP`** : Le client et le serveur établissent une connexion `TCP`.
2. **ClientHello**: Le client envoie un message "ClientHello" au serveur, qui contient les versions TLS supportées, les suites de chiffrement disponibles, et des données aléatoires pour la session (version du protocole, suite cryptographique, méthode de compression, nombre aléatoire).
3. **ServerHello**: Le serveur répond avec un message "ServerHello", indiquant la version TLS et la suite de chiffrement sélectionnées, ainsi que des données aléatoires pour la session (version du protocole, suite cryptographique, méthode de compression, nombre aléatoire et ID de session).
4. **Certificat**: Le serveur envoie son certificat numérique au client pour authentification. Ce certificat est délivré par une Autorité de Certification (CA) et contient la clé publique du serveur.
5. **ServerKeyEchange**: Le serveur envoie un message qui peut contenir des paramètres supplémentaires pour l'échange de clés, notamment si ECDHE est utilisé. Ce message est essentiel lorsque le serveur utilise des suites de chiffrement basées sur ECDHE ou DHE.
6. **serverHelloDone**: Le serveur indique qu'il a terminé la première phase du handshake en envoyant ce message, invitant le client à répondre.
7. **clientKeyExchange**: Le client envoie un message contenant la clé publique qu'il a générée (si ECDHE est utilisé) ou une "pre-master secret" chiffrée avec la clé publique du serveur (dans le cas d'une suite basée sur RSA).
8. **ChangeCipherSpec (client)**: Le client informe le serveur qu'il passe en mode de chiffrement symétrique pour toutes les communications futures.
9. **ChangeCipherSpec (serveur)**: Le serveur passe également en mode de chiffrement symétrique, signalant que toutes les communications ultérieures seront chiffrées.

### handshake `TLS 1.3`

Le handshake `TLS 1.3` est simplifié et plus rapide que celui de `TLS 1.2`, avec moins d'étapes et des opérations effectuées simultanément.

![handshake-tls-1.3](/learning/network-protocols/handshake-tls-1.3.png)

1. **Établissement de la connexion `TCP`** : Le client et le serveur établissent une connexion `TCP`.
2. **ClientHello**: Le client envoie un message "ClientHello" au serveur, contenant les versions TLS supportées, les suites de chiffrement disponibles, et des données aléatoires pour la session. Il génère aussi une clé publique et une clé intermédiaire, qu'il envoie au serveur.
3. **ServerHello**: Le serveur réceptionne la demande ainsi que la clé publique et intermédiaire du client. Il génère à son tour une clé intermédiaire et une clé privée, puis envoie un message "ServerHello" au client. Ce message inclut la version TLS, la suite de chiffrement sélectionnée, des données aléatoires pour la session, son certificat numérique pour authentification, et sa clé intermédiaire. Le serveur est alors prêt à passer en chiffrement symétrique (ChangeCipherSpec).
4. **ChangeCipherSpec (client)** : Le client génère sa clé pre-master, toutes les clés nécessaires, et informe le serveur qu'il est prêt à passer en chiffrement symétrique.
