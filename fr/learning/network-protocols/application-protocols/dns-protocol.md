# Le `protocole DNS`

Le `protocole DNS` (Domain Name System) est essentiel pour la **traduction des noms de domaine en adresses IP**.  Il utilise le protocole de `transport UDP`, puis passe par le `protocole IP` et envoie le paquet IP au serveur DNS.

![dns-protocol](/learning/network-protocols/dns-protocol.png)

:::info Système hiérarchique
Le DNS est un système hiérarchique, ce qui signifie qu'il y a plusieurs niveaux de serveurs DNS, des serveurs ROOT jusqu'aux serveurs de noms autoritaires pour chaque domaine.
:::

## Fonctionnement

`DNS` fonctionne sur un **modèle client-serveur**. Un client (comme un navigateur web ou un autre dispositif réseau) envoie une requête à un serveur DNS pour résoudre un nom de domaine en adresse IP, et le serveur DNS renvoie une réponse.

Le processus de résolution DNS peut impliquer plusieurs étapes, incluant des requêtes à différents serveurs DNS jusqu'à ce que l'adresse IP souhaitée soit trouvée.

![dns-resolution-process](/learning/network-protocols/dns-resolution-process.png)

1. **Cache du navigateur**: Le navigateur possède un système de cache où il enregistre tous les noms de domaine et leurs IP associés régulièrement utilisés.
2. **Requête du client**: Un client envoie une requête DNS à un résolveur DNS, qui cherche dans son propre système de cache.
3. **Résolveur récursif**: Si l'adresse IP n'est pas trouvée dans le cache, le résolveur DNS interroge les serveurs DNS ROOT.
4. **Serveurs DNS ROOT**: Les serveurs DNS ROOT répondent avec les adresses des serveurs TLD (Top-Level Domain) appropriés.
5. **Serveurs TLD**: Les serveurs TLD répondent avec les adresses IP des serveurs de noms autoritaires pour le domaine demandé.
6. **Serveur de noms autoritaire (Authority Name Server)**: Authority Name Server renvoie l'adresse IP associée au nom de domaine.

:::info Serveur DNS ROOT
Il en existe 13 dans le monde, stratégiquement positionnés et détenus par des organisations telles que la NASA ou l'armée américaine.
:::

## Enregistrements DNS

| Type d'enregistrement | Description |
|-----------------------|-------------|
| **A** | Associe un nom de domaine à une adresse IPv4. |
| **AAAA** | Associe un nom de domaine à une adresse IPv6. |
| **CNAME** | Alias d'un autre nom de domaine, utilisé pour la redirection. |
| **MX** | Indique les serveurs de messagerie pour un domaine. |
| **NS** | Indique les serveurs de noms autoritaires pour un domaine. |
| **TXT** | Contient des informations textuelles arbitraires, souvent utilisées pour des vérifications SPF, DKIM, etc. |
| **SRV** | Indique les services disponibles pour un domaine. |
| **PTR** | Utilisé pour la résolution inverse (adresse IP en nom de domaine). |

| Enregistrement/valeur | Description | Exemple |
|----------------|-------------|---------|
| **@** | Nom de domaine racine | tristan-greffe.xyz |
| **ftp** | 	Indique un sous-domaine | ftp.tristan-greffe.xyz |

## Composants d'une requête DNS

| Composant | Description |
|-----------|-------------|
| **Nom de domaine** | Le nom de domaine pour lequel une résolution est demandée. |
| **Type de requête** | Le type de l'enregistrement DNS demandé (A, AAAA, CNAME, etc.). |
| **Classe** | Généralement IN pour Internet. |
| **Flags** | Indicateurs qui spécifient des options pour la requête. |
| **Question** | La partie de la requête qui contient le nom de domaine, le type et la classe. |
| **Réponse** | La partie de la réponse qui contient les enregistrements DNS correspondant à la question. |