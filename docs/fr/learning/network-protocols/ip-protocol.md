# Le `protocole IP`

![ip-protocol](/learning/network-protocols/ip-protocol.png)

Le `protocole IP` (Internet Protocol) se situe au 3ème niveau (couche réseau) du modèle OSI et correspond au bloc Internet du modèle TCP/IP.

L'**[IANA](https://www.iana.org/) (Internet Assigned Numbers Authority)**, qui dépend de l'[ICANN](https://www.icann.org/fr) (Internet Corporation for Assigned Names and Numbers), **est responsable de l'allocation des adresses IP** au niveau mondial. Les adresses IP sont ensuite distribuées par les registres Internet régionaux (RIR) et fournies par les fournisseurs d'accès à Internet (FAI).

## Utilisation

Le `protocole IP` permet de :
* **Identifier toutes les machines connectées** sur le réseau.
* **Ajouter des informations dans l'en-tête des segments** reçus du protocole de transport (`TCP`, `UDP`, etc.), notamment l'adresse IP du destinataire et de l'expéditeur.

:::info
Le segment, une fois l'en-tête IP ajouté, devient un paquet. On parle alors de paquet IP.
:::

## En-tête IP

![ip-protocol-header](/learning/network-protocols/ip-protocol-header.png)

1. **Version** : IPv4 ou IPv6. IPv4 est la version historique (32 bits) et, face à la demande croissante, IPv6 (128 bits) a été introduit.
2. **TTL (Time to Live)** : Champ de 8 bits qui détermine la durée de vie du paquet. Cela permet de détruire un paquet s'il est perdu ou devenu inutile.
3. **Checksum** : Permet de vérifier l'intégrité de l'en-tête. C'est un hash de toutes les propriétés de l'en-tête, et si une propriété est modifiée, le paquet est détruit.
4. **Adresse IP source** : Adresse IP de l'expéditeur.
5. **Adresse IP de destination** : Adresse IP du destinataire.
6. **Protocole** : Indique le protocole de la couche supérieure utilisé dans les données (par exemple, TCP, UDP).
7. **Options** : Utilisé pour les options de contrôle de réseau et de débogage (ce champ est rarement utilisé).

Si le paquet est trop gros, il est fragmenté. Chaque fragment a également un en-tête IP comme celui-ci.

8. **Identifiant** : Champ de 16 bits permettant d'identifier les fragments d'un même paquet.
9. **Flags** : Indiquent si le paquet peut être fragmenté et si d'autres fragments suivent.
10. **Offset** : Indique la position du fragment dans le paquet original.

