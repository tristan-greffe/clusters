# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/cert-manager.png' label='cert-manager' :width='45' :height='45' />

[cert-manager](https://cert-manager.io/) est un outil Kubernetes qui facilite la **gestion des certificats en automatisant leur création, leur renouvellement et leur délivrance aux clients pour sécuriser les connexions HTTPS**.

![cert-manager](/learning/kubernetes/cert-manager.png)

:::tip Issuers
Les Issuers sont les **entités responsables de l'émission et de la gestion des certificats**. Ils peuvent être configurés pour travailler avec différentes autorités de certification (CA) comme Let's Encrypt ou d'autres CA internes.
:::

## Processus d'intégration

![cert-manager-process](/learning/kubernetes/cert-manager-process.png)

1. **Lier `cert-manager` à `Ingress`** : Configurer `Ingress` pour utiliser `cert-manager` pour gérer les certificats SSL/TLS.
2. **Création du `ClusterIssuer`** : Définir un `ClusterIssuer` qui interagit avec Let's Encrypt via le protocole ACME pour automatiser l'émission et le renouvellement des certificats.
3. **Demande de certificat** : Envoyer une demande de création, de renouvellement ou de suppression de certificat à Let's Encrypt via l'endpoint ACME.
4. **Validation du défi (challenge)** : `cert-manager` utilise l'objet `ClusterIssuer` pour configurer un défi DNS ou HTTP. Let's Encrypt vérifiera la propriété du domaine via ce défi.
5. **Obtention du certificat** : Une fois le défi réussi, Let's Encrypt délivre le certificat au serveur.
6. **Création de l'objet `Certificate`** : `cert-manager` crée un objet `Certificate` dans Kubernetes, contenant les caractéristiques du certificat, y compris les informations de renouvellement et la durée de validité.
7. **Stockage dans un `Secret`** : La paire de clés privée et publique, ainsi que le certificat, sont stockés dans un `Secret` Kubernetes.
8. **Utilisation du certificat par `Ingress`** : Le certificat et la clé privée sont référencés par l'`Ingress` pour sécuriser les connexions via HTTPS.