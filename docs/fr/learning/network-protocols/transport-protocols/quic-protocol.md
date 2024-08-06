# Le `protocole QUIC`

Le `protocole QUIC` (Quick UDP Internet Connections) a été créé par Google puis adopté par l'[IETF (Standartisation des protocoles internet)](https://www.ietf.org/) pour standardisation. Il a pour vocation de remplacer le `protocole TCP` car il offre une **vitesse de transmission supérieure**. QUIC utilise directement le `protocole UDP` pour ses communications.

QUIC permet d'**établir une communication bidirectionnelle fiable et chiffrée entre deux machines**.

::: info Paquet QUIC
Un paquet QUIC comprend l'en-tête du `protocole d'application` avec des informations supplémentaires (identification, numéro ACK, etc.) et les données.
:::

::: warning
Les paquets QUIC **ne sont pas envoyés directement au `protocole IP`**. Ils sont encapsulés dans des datagrammes UDP qui sont ensuite envoyés au `protocole IP`.
:::

## Fonctionnement

Le `protocole d'application` envoie des données accompagnées d'une en-tête au `protocole QUIC`. QUIC gère et **transforme ces données en `paquets QUIC`**, qui sont ensuite encapsulés dans des datagrammes UDP. Ces datagrammes UDP sont envoyés au `protocole IP` pour transmission.

En résumé, **QUIC utilise UDP uniquement pour le transfert des paquets**, exploitant ainsi la rapidité de UDP tout en ajoutant des fonctionnalités avancées comme la fiabilité et le chiffrement.

## Avantages de QUIC

1. **Vitesse améliorée** : QUIC r**éduit la latence par rapport à TCP** en évitant la lenteur des phases d'établissement de connexion et de gestion des retransmissions.
2. **Sécurité** : QUIC intègre le chiffrement dès le début, offrant ainsi une **sécurité renforcée pour les communications**.
3. **Fiabilité** : Malgré l'utilisation de UDP, QUIC **assure une transmission fiable** grâce à des mécanismes internes de gestion des erreurs et des retransmissions.
4. **Multiplexage** : QUIC permet la **transmission simultanée de plusieurs flux dans une seule connexion**, évitant ainsi les blocages de tête de ligne (head-of-line blocking) typiques de TCP.