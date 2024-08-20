# Introduction à la cryptographie

La cryptographie permet de **protéger les messages en les chiffrant** de telle manière que seuls les destinataires autorisés puissent les lire. Elle repose sur des techniques mathématiques pour garantir la `confidentialité`, l'`authenticité` et l'`intégrité` des communications.

## Objectifs

1. `Confidentialité`: **Assurer que seules les parties autorisées peuvent lire les messages**. La confidentialité est **obtenue par le chiffrement**, qui transforme un message en clair en un message chiffré (cryptogramme) en utilisant un algorithme de chiffrement et une clé secrète. Seules les parties disposant de la clé appropriée peuvent déchiffrer le message et le lire en clair.
2. `Authenticité`: **Garantir que les messages proviennent bien de l'expéditeur légitime**. L'authenticité est assurée par la **vérification de l'identité de l'expéditeur**, généralement via des signatures numériques. Ces signatures sont créées à l'aide d'une clé privée et peuvent être vérifiées par quiconque possède la clé publique correspondante.
3. `Intégrité`: **Assurer que le message n'a pas été modifié en cours de route**. L'intégrité d'un message est garantie en **générant un condensé (ou empreinte) à l'aide d'une fonction de hachage cryptographique**. Toute modification du message entraînerait une modification notable du condensé, révélant ainsi toute tentative d'altération.

## Types de Chiffrement (`confidentialité`)

Le chiffrement est divisé en deux grandes catégories : **cryptographie symétrique et cryptographie asymétrique**. Ces deux méthodes ont des caractéristiques distinctes qui les rendent utiles dans différents contextes.

### Cryptographie symétrique ➡️ secret unique

La cryptographie symétrique **utilise la même clé pour chiffrer et déchiffrer** les messages. Elle est **rapide et efficace, ce qui la rend adaptée au chiffrement de grandes quantités de données**. Toutefois, la gestion des clés est complexe, car la clé doit être partagée de manière sécurisée entre les parties.

#### Processus

![symmetric-cryptography-process](/learning/network-protocols/symmetric-cryptography-process.png)

1. Les deux parties génèrent ou partagent un secret commun.
2. Le message est chiffré en utilisant ce secret via un algorithme de chiffrement.
3. Le message chiffré est envoyé au destinataire.
4. Si un attaquant intercepte le message mais ne possède pas la clé, il ne pourra pas le déchiffrer.
5. Le destinataire utilise le même secret pour déchiffrer le message.

:::tip Algorithmes Symétriques
1. **DES (Data Encryption Standard)**: Un ancien standard de chiffrement symétrique, désormais considéré comme obsolète en raison de sa faible longueur de clé (56 bits).
2. **3DES (Triple DES)**: Une amélioration de DES qui applique l'algorithme trois fois pour renforcer la sécurité.
3. **AES (Advanced Encryption Standard)**: Le standard actuel, avec des longueurs de clé de 128, 192 ou 256 bits, offrant un haut niveau de sécurité.
:::

### Cryptographie Asymétrique ➡️ paire de clés privée / publique

La cryptographie asymétrique utilise une **paire de clés : une clé publique pour chiffrer et une clé privée pour déchiffrer**. Elle simplifie la gestion des clés et permet des échanges de clés sécurisés et des signatures numériques. Cependant, elle est **plus lente que la cryptographie symétrique**, surtout pour de grandes quantités de données.

#### Processus

![asymmetric-cryptography-process](/learning/network-protocols/asymmetric-cryptography-process.png)

1. Chaque partie génère une paire de clés (une publique et une privée).
2. Les utilisateurs échangent leurs clés publiques.
3. Le message est chiffré avec la clé publique du destinataire.
4. Le message chiffré est envoyé au destinataire.
5. Si un attaquant intercepte le message, il est illisible sans la clé privée correspondante.
6. Le destinataire utilise sa clé privée pour déchiffrer le message.

:::tip Algorithmes Asymétriques
1. **RSA**: L'un des premiers systèmes de cryptographie asymétrique, basé sur la difficulté de factoriser de grands nombres.
2. **ECC (Elliptic Curve Cryptography)**: Un algorithme moderne qui offre une sécurité équivalente à RSA avec des clés beaucoup plus courtes, ce qui le rend plus rapide et plus efficace.
:::

## Signature numérique (`authenticité` & `intégrité`)

La cryptographie asymétrique est également utilisée pour signer les messages, **garantissant ainsi leur authenticité et leur intégrité**. La clé privée permet de signer, tandis que la clé publique permet de vérifier une signature.

#### Processus

![digital-signature-process](/learning/network-protocols/digital-signature-process.png)

1. Les deux parties génèrent une paire de clés.
2. Les utilisateurs échangent leurs clés publiques.
3. aLe message est chiffré avec la clé publique du destinataire.
4. Le message chiffré est ensuite signé avec la clé privée de l'expéditeur. La signature est unique et dépend du contenu du message (assurant l'intégrité)
5. Le message chiffré est envoyé au destinataire.
6. Le destinataire vérifie la signature en utilisant la clé publique de l'expéditeur.
7. Enfin, le destinataire déchiffre le message avec sa clé privée.

## Les Certificats

Les **certificats numériques** jouent un rôle crucial dans la prévention des attaques de type "Man-in-the-Middle" (MITM), en **authentifiant l'identité des parties communicantes grâce à une autorité de certification (CA)**.

![mitm](/learning/network-protocols/mitm.png)

#### Processus

![certificate-process](/learning/network-protocols/certificate-process.png)

1. **Création de la paire de clés** : Le serveur génère une paire de clés (une publique et une privée).
2. **Génération de la demande de certificat** : Une demande de certificat est créée, contenant la clé publique et le nom de domaine à certifier.
3. **Soumission à l'autorité de certification (CA)** : La demande de certificat est envoyée à une CA.
4. **Vérification de l'identité** : La CA vérifie l'identité du demandeur et la possession du nom de domaine. Cette vérification est souvent effectuée via un challenge.
5. **Soumission du challenge** : Par exemple, la CA peut demander de placer un fichier spécifique sur le domaine.
6. **Configuration du serveur** : Le demandeur configure le serveur pour répondre au challenge et informe la CA qu'il est prêt.
7. **Exécution du test par la CA** : La CA effectue le test (par exemple, une requête HTTP pour vérifier la présence du fichier).
8. **Réponse du serveur** : Le serveur renvoie le token attendu par la CA via une réponse HTTP.
9. **Validation de la possession du domaine** : La CA confirme que le demandeur détient bien le nom de domaine. Ensuite, elle signe le certificat contenant le nom de domaine et la clé publique avec sa clé privée.
10. **Réception du certificat** : Le demandeur reçoit le certificat signé.
11. **Vérification par le client** : Lorsqu'un client se connecte au site, son navigateur récupère le certificat et vérifie l'identité de la CA. Si la CA est de confiance, la connexion HTTPS est établie. Le navigateur vérifie ensuite l'authenticité du certificat et utilise la clé publique pour déchiffrer les informations échangées.

:::info Autorités de Certification (CA)
Les autorités de certification (comme [Let's Encrypt](https://letsencrypt.org/fr/)) sont des entités reconnues et enregistrées dans les navigateurs et systèmes d'exploitation. Elles disposent de clés publiques permettant de vérifier les signatures des certificats, assurant ainsi la confiance dans les communications sécurisées.
:::

:::tip Communication entre Clients et Serveurs
* **Client-Serveur** : Le client n'a pas besoin de certificat, mais une authentification (2FA, email, code) est souvent requise.
* **Serveur-Serveur** : Les deux serveurs doivent s'échanger et vérifier mutuellement leurs certificats pour établir une communication sécurisée.
:::

:::info 
[OpenSSL](https://www.openssl.org/) est l'outil standard pour générer et gérer ces certificats, facilitant la création de clés privées, la génération de demandes de signature de certificat (CSR), et la signature des certificats.
:::