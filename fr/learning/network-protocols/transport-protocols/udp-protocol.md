# Le `protocole UDP`

Le `protocole UDP` (User Datagram Protocol), contrairement au `protocole TCP`, ne crée pas de canal de communication. Son objectif principal est la **rapidité de transmission**. UDP ajoute une en-tête (comprenant un checksum, la taille et les ports) aux données reçues du `protocole d'application`, puis envoie le tout au `protocole IP`. UDP est donc un **protocole non fiable, ne garantissant pas la livraison des paquets**.

::: info Datagramme UDP
Un datagramme UDP comprend comprend l'en-tête du `protocole d'application` avec des informations supplémentaires (ports, etc.) et les données. C'est ce qui est envoyé au `protocole IP`.
:::

## En-tête UDP

![udp-protocol-header](/learning/network-protocols/udp-protocol-header.png)

1. **Source Port** : Port source de la connexion, attribué par le `protocole d'application`.
2. **Destination Port** : Port de destination de la connexion.
3. **Length** : Longueur totale du datagramme UDP, incluant l'en-tête et les données.
4. **Checksum** : Permet de vérifier l'intégrité de l'en-tête. C'est un hash de toutes les propriétés de l'en-tête, et si une propriété est modifiée, le paquet est rejeté.

::: tip Utilisation
UDP est couramment utilisé dans des applications où la vitesse est plus importante que la fiabilité, comme les **jeux en ligne, la diffusion de vidéos en direct et les communications VoIP**. En n'ayant pas de mécanisme de confirmation de réception, UDP réduit la latence et les délais liés à la retransmission des paquets perdus.
:::