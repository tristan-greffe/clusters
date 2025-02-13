# Les protocoles d'applications

![application-protocols](/learning/network-protocols/application-protocols.png)

Les protocoles d'application se situent aux niveaux 5 (Session), 6 (Présentation) et 7 (Application) du modèle OSI et correspondent au bloc Application du modèle TCP/IP. Ces protocoles **facilitent la communication des applications sur un réseau** en définissant des règles et des conventions pour l'échange de données.

:::info
Les serveurs utilisent des ports pour déterminer quelle application (HTTP, FTP, SMTP, etc.) doit gérer une connexion entrante. Chaque protocole de communication réseau est associé à un ou plusieurs ports spécifiques par défaut, ce qui permet aux serveurs de diriger correctement le trafic vers l'application appropriée. Par exemple, HTTP utilise généralement le port 80, HTTPS le port 443, FTP le port 21, et SMTP le port 25.
:::

## Rôles des protocoles d'application

| Protocole | Description |
|-----------|-------------|
| `HTTP` | 	Protocole de transfert hypertexte utilisé pour la communication sur le World Wide Web. Il permet la **transmission de documents hypertextes, tels que des pages web**. |
| `HTTPS` | Version sécurisée de HTTP, qui **utilise le chiffrement SSL/TLS pour sécuriser les communications** entre le client et le serveur. |
| `SMTP` | Simple Mail Transfer Protocol, utilisé pour l'**envoi de courriels** d'un serveur à un autre. |
| `FTP` | File Transfer Protocol, utilisé pour le **transfert de fichiers** entre un client et un serveur sur un réseau. |
| `DNS` | Domain Name System, utilisé pour la **résolution des noms de domaine en adresses IP**. |