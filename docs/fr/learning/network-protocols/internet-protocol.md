# Le `protocole Internet`

Internet est un **réseau mondial** qui permet aux utilisateurs de communiquer avec des serveurs ou entre serveurs, établissant ainsi des **communications entre différentes machines**.

Internet repose sur des **infrastructures physiques composées de gros câbles** répartis sur l'ensemble de la planète. Ces infrastructures, appelées Network Service Providers (NSP), sont majoritairement financées par les grandes entreprises technologiques (GAFAM) et les gouvernements.

![internet-nsp](/learning/network-protocols/internet-nsp.png)

L'objectif principal de ces infrastructures est de **transférer des informations d'un point A à un point B et inversement** à l'aide de signaux électriques, optiques ou radioélectriques. Pour pouvoir faire transiter ces données dans les deux sens, il faut suivre un **ensemble de règles (protocol stack) pour établir une communication entre deux machines**.


## Architecture 

![internet-architecture](/learning/network-protocols/internet-architecture.png)

| Composant | Description |
|-----------|-------------|
| **Network Service Providers (NSP)** | Grandes infrastructures composées majoritairement de gros câbles répartis sur l'ensemble de la planète, permettant la transmission des données sur de longues distances. Appartiennent aux GAFAM et aux États. |
| **Network Access Points (NAP)** | Points d'accès aux infrastructures des NSP. Les NAP agissent comme des portes d'entrée au réseau des NSP. |
| **Internet Service Providers (ISP)** | Sous-réseaux développés par les Fournisseurs d'Accès à Internet (FAI) (comme Orange, Free, etc.) pour fournir l'accès Internet aux particuliers et aux entreprises. |

## Protocol stack

### Le Modèle OSI

Ce modèle créé par l'[ISO](https://www.iso.org/fr/home.html) (Organisation internationale de normalisation) décrit toutes les règles pour établir une connexion entre deux systèmes informatiques.

<img src="/clusters/learning/network-protocols/osi-model.png" alt="osi-model" style="width: 60%; display: block; margin: 0 auto;">

Le **modèle OSI se compose de couches** qui prennent en compte tous les aspects de la transmission d'une information.

| Couche | Description |
|--------|-------------|
| **Application** | Met en place l'interface pour qu'une application accède au réseau. |
| **Présentation** | 	Prépare les données pour la couche application, en assurant le formatage, le chiffrement et la compression. |
| **Session** | Gère les sessions de communication, établissant, maintenant et terminant les connexions entre les applications. |
| **Transport** | Assure le transport fiable des données, segmentant les messages et garantissant la livraison sans erreur. |
| **Réseau** | Détermine le chemin des données entre les dispositifs, en utilisant des adresses logiques telles que les adresses IP. |
| **Liaison** | Spécifie le moyen utilisé pour acheminer les données sur la couche physique (câble internet, Wi-Fi, etc.), en gérant la détection et la correction d'erreurs. |
| **Physique** | Décrit les caractéristiques physiques de la connexion (câbles, ondes, etc.). |

### Le Modèle TCP/IP

**Sur le réseau Internet, on utilise principalement le modèle TCP/IP** (*fun fact : il a été créé par l'armée américaine*).

<img src="/clusters/learning/network-protocols/tcp-ip-model.png" alt="tcp-ip-model" style="width: 60%; display: block; margin: 0 auto;">

| Couche | Description |
|--------|-------------|
| **Application** | Inclut des protocoles comme `HTTP`, `HTTPS` (qui utilise le `protocole TLS`), `SSH`, `HLS`, `WebRTC`, `SMTP` (e-mail). |
| **Transport** | Utilise des protocoles comme `TCP`, `UDP` et `QUIC` pour assurer le transport des données. |
| **Internet** | Gère les adresses IP et le routage des paquets de données à travers le réseau. |
| **Accès Réseau** | Spécifie le moyen utilisé pour acheminer les données sur la couche physique (câbles, Wi-Fi, etc.) et décrit les caractéristiques physiques de la connexion. |

:::info
En tant que développeur, on se concentre principalement sur les **couches transport et application**, plutôt que sur les parties accès réseau et internet.
:::

### Fonctionement 

![tcp-ip-operation](/learning/network-protocols/tcp-ip-operation.png)

1. **Couche Applicative** : Transforme l'image en données et chiffre les informations, ajoutant un en-tête pour formater l'image selon le protocole.
2. **Couche Transport** : Découpe les données en segments numérotés pour permettre de récupérer les informations dans le bon ordre.
3. **Couche Internet** : Ajoute les adresses IP de départ et de destination ainsi que les informations nécessaires à l'utilisation du `protocole IP`, transformant les données en paquets.
4. **Couche Accès Réseau** : Ajoute des adresses MAC (adresses uniques présentes sur chaque machine) et transforme les données en trames.
5. **Couche Physique** : Convertit les données en bits pour les envoyer via les câbles Internet.

## Fonctionnement

<img src="/clusters/learning/network-protocols/internet-operation.svg" alt="internet-operation" style="width: 80%; display: block; margin: 0 auto;">

 
1. Un utilisateur **envoie une requête** à tiktok.com. **La donnée suit le protocole TCP/IP pour être transformée en bits**.
2. La **requête est envoyée à un serveur DNS**. Si ce serveur DNS ne trouve pas l'adresse, il renvoie la requête à un serveur DNS parent jusqu'à trouver une correspondance. Ensuite, il envoie l'adresse IP de tiktok.com et la requête au routeur.
3. La requête est **envoyée de routeur en routeur** jusqu'à trouver l'adresse IP de tiktok.com et transmettre la requête à la machine de destination, qui **suivra le protocole TCP/IP en sens inverse**.

:::info routeur
Un routeur est un dispositif qui **maintient une liste des adresses IP** et **assure le routage des données** sur le réseau. Chaque routeur connaît les adresses IP appartenant à son réseau.
:::

:::info serveur dns
Un serveur DNS contient la **liste des associations entre noms de domaine et adresses IP**. Il existe des serveurs DNS racine qui connaissent la totalité des associations. (Fun fact : la NASA possède un serveur DNS racine).
:::