# Le `protocole HTTP(s)`

Le `protocole HTTP` (HyperText Transfer Protocol) est le fondement de toute communication sur le Web. Il définit **comment les messages sont formatés et transmis**, La **version sécurisée de `HTTP` est appelée `HTTPS`** (HyperText Transfer Protocol Secure), qui ajoute une couche de **chiffrement via TLS** (Transport Layer Security).

:::info Agents Utilisateurs (User Agents)
Les agents utilisateurs sont **les applications qui envoient des requêtes HTTP**, les plus courantes étant les navigateurs web (Curl, Chrome, Firefox, Safari, etc.). Un agent utilisateur est identifié par l'en-tête User-Agent dans les requêtes HTTP, qui fournit des informations sur le logiciel, la version et souvent le système d'exploitation.
:::

:::tip
Pour passer de HTTP à HTTPS, un certificat SSL/TLS est nécessaire. Ce certificat peut être obtenu auprès d'une Autorité de Certification (CA) et installé sur le serveur.
:::

:::info stateless
HTTP est un protocole sans état (stateless), ce qui signifie que chaque requête est indépendante et n'a aucune connaissance des requêtes précédentes. Pour gérer les sessions utilisateur, des techniques comme les cookies, les sessions côté serveur et les jetons (tokens) sont utilisés.
:::

## Fonctionnement

`HTTP` fonctionne sur un **modèle client-serveur**. Un client (comme un navigateur web) envoie une demande à un serveur web qui héberge un site web, et le serveur renvoie une réponse. Les interactions `HTTP` sont **sans état (stateless)**, ce qui signifie que chaque demande est indépendante et que le serveur ne conserve aucune information d'état entre les demandes successives.

### HTTP/1.0

Première version majeure, introduite en 1996.**Chaque transaction nécessite une nouvelle connexion TCP**, ce qui le rend inefficace pour des pages contenant plusieurs éléments (images, scripts, etc.).

![http1.0-protocol](/learning/network-protocols/http1.0-protocol.png)

### HTTP/1.1

Publiée en 1997, c'est la version la plus largement utilisée pendant de nombreuses années.

![http1.1-protocol](/learning/network-protocols/http1.1-protocol.png)

| Caractéristique | Description |
|-----------------|-------------|
| **Connexions persistantes** | Permet à une seule connexion `TCP` d'être utilisée pour plusieurs requêtes/réponses. |
| **Pipelining** | Permet d'envoyer plusieurs requêtes sans attendre les réponses, bien que rarement utilisé en pratique en raison de problèmes de compatibilité. |
| **Gestion de cache améliorée** | En-têtes comme Cache-Control pour un meilleur contrôle du cache. |
| **Compression des en-têtes** | Utilisation d'algorithmes comme gzip pour réduire la taille des données échangées. |

### HTTP/2

Publiée en 2015, cette version **vise à améliorer les performances**.

![http2-protocol](/learning/network-protocols/http2-protocol.png)

| Caractéristique | Description |
|-----------------|-------------|
| **Multiplexage** |Permet de multiples requêtes et réponses simultanées sur une seule connexion `TCP`. |
| **Compression des en-têtes** | Utilisation de HPACK pour compresser les en-têtes `HTTP`, réduisant ainsi la latence. |
| **Push du serveur** | Permet au serveur d'envoyer des ressources au client de manière proactive. |
| **Frames binaires** | Les données sont encapsulées dans des cadres binaires, ce qui rend la communication plus efficace. |

### HTTP/3

Basée sur le protocole `QUIC` de Google, cette version est encore **plus performante et sécurisée**.

![http3-protocol](/learning/network-protocols/http3-protocol.png)

| Caractéristique | Description |
|-----------------|-------------|
| **Utilisation de QUIC** | HTTP/3 utilise `QUIC` au lieu de `TCP`, apportant des améliorations en termes de latence et de résilience aux pertes de paquets. |
| **Connexions indépendantes de la couche transport** | Réduire les temps de connexion et améliorer les performances. |
| **Amélioration de la sécurité** | `QUIC` intègre directement `TLS`, garantissant une meilleure sécurité et une négociation plus rapide. |

## Composants d'une requête `HTTP`

| Composant | Description |
|-----------|-------------|
| **Méthode** | La méthode HTTP indique l'action à effectuer (GET, POST, PUT, DELETE, etc.). |
| **URL** | L'adresse de la ressource sur le serveur. |
| **Version HTTP** | La version du protocole utilisée (1.0, 1.1, 2, 3). |
| **En-têtes** | Métadonnées supplémentaires pour la requête ou la réponse (ex : Content-Type, User-Agent). |
| **Corps** | Données envoyées avec la requête (généralement utilisé avec les méthodes POST et PUT). |

## Méthodes `HTTP`

| Méthode | Description |
|---------|-------------|
| **GET** | Récupère des données d'un serveur. |
| **POST** | Envoie des données au serveur. |
| **PUT** | Met à jour une ressource existante ou en crée une nouvelle. |
| **DELETE** | Supprime une ressource existante. |
| **HEAD** | Similaire à GET mais ne récupère que les en-têtes. |
| **OPTIONS** | Décrit les options de communication pour la ressource cible. |
| **PATCH** | Applique des modifications partielles à une ressource. |