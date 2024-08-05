# Les protocoles de transports

![transport-protocols](/learning/network-protocols/transport-protocols.png)

Les protocoles de transport se situent au 4ème niveau (couche transport) du modèle OSI et correspondent au bloc Transport du modèle TCP/IP.

Après l'application des protocoles de transport, les données sont envoyées au `protocole IP` sous différentes formes :

* **Segments** pour le `protocole TCP` (Transmission Control Protocol)
* **Datagrammes** pour le `protocole UDP` (User Datagram Protocol)
* **Paquets** QUIC pour le `protocole QUIC` (Quick UDP Internet Connections)

:::info
C'est le **protocole d'application qui définit quel protocole de transport** (`TCP`, `UDP` ou `QUIC`) sera utilisé en fonction des besoins de l'application (fiabilité, latence, etc.).
Par exemple, pour le protocole d'application **`HTTP`(S), on utilise principalement `TCP`**, tandis que le protocole **`DNS` utilise souvent `UDP`** pour des requêtes rapides. Les transferts de fichiers via **`FTP` utilisent `TCP`** pour garantir l'intégrité des données.
:::

## Rôles des protocoles de transport

| Protocole | Description |
|-----------|-------------|
| `TCP` | Assure une communication fiable, orientée connexion, avec contrôle de flux et correction d'erreurs |
| `UDP` | Fournit une communication non fiable, sans connexion, adaptée pour les applications nécessitant une latence faible comme le streaming ou les jeux en ligne |
| `QUIC` | Conçu pour réduire la latence de connexion et améliorer les performances sur les réseaux modernes. Utilisé principalement avec HTTP/3 |

:::info
**`TCP` est utilisé dans 95% des cas** pour des applications courantes comme le web, le courrier électronique et le transfert de fichiers.
:::