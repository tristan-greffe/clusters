# Le `protocole TCP`

Le `protocole TCP` (Transmission Control Protocol) permet d'**établir une communication bidirectionnelle fiable entre deux machines**. Il garantit la livraison correcte de toutes les informations envoyées d'une machine à l'autre en utilisant des numéros de séquence initiaux (ISN) et des ports pour identifier les connexions.

::: info Segment TCP ou paquet TCP
Un segment TCP (ou paquet TCP) comprend l'en-tête du `protocole d'application` avec des informations supplémentaires (numéros de séquence, ports, etc.) et les données. C'est ce qui est envoyé au `protocole IP`.
:::

::: info Les ports
Les ports agissent comme des portes sur un serveur. Il existe 65 536 ports possibles, de 0 à 65 535. Les `protocoles d'application` attribuent souvent des ports par défaut, par exemple, HTTP = 80, HTTPS = 443, SSH = 22.
:::

## Établir une connexion (three-way handshake)

![tcp-protocol-connection](/learning/network-protocols/tcp-protocol-connection.png)

### Première étape : SYN (Synchronize Sequence Numbers)

La première étape est la synchronisation. Lorsqu'un client souhaite établir une connexion avec un serveur, il **envoie un paquet SYN (Synchronisation) avec son numéro de séquence initial (ISN)**.

1. Le client génère un numéro de séquence initial (ISN) = X.
2. Il envoie le numéro de séquence initial (ISN) X au serveur.
3. Le client passe à l'état `SYN_SENT`, indiquant qu'il a envoyé la requête initiale.

### Deuxième étape : SYN-ACKnowledgment

À la réception du paquet SYN, le serveur **accuse réception en renvoyant un paquet SYN-ACK (Synchronize-Acknowledge)**. Cela signifie que le serveur est prêt à communiquer et accuse réception du numéro de séquence du client. Le serveur génère également son propre numéro de séquence initial.

4. Le serveur génère un numéro de séquence initial (ISN) = Y.
5. Le serveur envoie son numéro de séquence initial (ISN) Y ainsi que le numéro de séquence initial (ISN) X + 1 du client.
6. Le serveur passe à l'état `SYN_RECEIVED`, indiquant qu'il a bien reçu la demande de connexion et a envoyé les informations nécessaires pour établir la connexion.

### Troisième étape : ACKnowledgment

Enfin, le client répond à l'accusé de réception du serveur en **envoyant un paquet ACK (Acknowledge)**. Ce paquet confirme la réception de l'accusé de réception du serveur et reconnaît le numéro de séquence du serveur. Une fois cet échange terminé, la **connexion est établie** et les deux appareils sont prêts à échanger des données de manière fiable.

7. Le client envoie au serveur le numéro de séquence initial (ISN) du serveur Y + 1 ainsi qu'un flag ACK.
8. Le client et le serveur passent à l'état `ESTABLISHED`.

## Transmission des données

Une fois la connexion établie, **le client et le serveur utilisent leurs numéros de séquence initiaux (ISN X et ISN Y) pour envoyer des données**. Ces numéros sont incrémentés au fur et à mesure de la transmission des données et servent également à vérifier que toutes les données ont bien été reçues.

::: tip Exemple
si le client envoie des données de 3 octets, il enverra alors son numéro de séquence initial (ISN) X + 3.
:::

## En-tête TCP

![tcp-protocol-header](/learning/network-protocols/tcp-protocol-header.png)

1. **Source Port** : Port source de la connexion, attribué par le `protocole d'application`.
2. **Destination Port** : Port de destination de la connexion.
3. **Sequence Number** : Numéro de séquence relatif à l'ISN.
4. **Acknowledgment Number** : Numéro d'accusé de réception relatif à l'ISN.
5. **Window** : Taille de la fenêtre, ajuste le volume d'information pouvant transiter.
6. **Checksum** : Permet de vérifier l'intégrité de l'en-tête. C'est un hash de toutes les propriétés de l'en-tête, et si une propriété est modifiée, le paquet est rejeté.

Si le paquet TCP est trop gros, il est fragmenté. 

7. **Data Offset** : Indique le début des données dans le segment.
8. **Reserved** : Champ réservé pour des usages futurs.
9. **Flags** : Indiquent le statut du paquet, par exemple, s'il peut être fragmenté et si d'autres fragments suivent.
