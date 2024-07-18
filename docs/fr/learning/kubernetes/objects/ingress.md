# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/ing.svg' label='Ingress' :width='45' :height='45' />

Un [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) permet de **gérer les configurations de routage DNS** et d'**exposer des services HTTP ou HTTPS à l'extérieur du cluster**. Il utilise un [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) pour lire et appliquer les règles de routage définies dans les objets `Ingress` stockés dans `etcd`.

:::info `Ingress Controller`
Un Ingress Controller (comme Traefik, Nginx, HAProxy, etc.) est un composant qui **applique les règles de routage DNS** spécifiées via les ressources Ingress. Il agit comme un proxy inverse et un équilibreur de charge.
:::

:::info `Ingress Class`
L'Ingress Class permet de spécifier quel Ingress Controller doit implémenter un Ingress particulier. Cela permet de définir plusieurs Ingress Controllers dans le même cluster et de **spécifier quel controller doit gérer quel Ingress**.
:::

## Fonctionnalités

- **Exposer une IP pour accéder au cluster** : Rendre une application web accessible depuis Internet via une ou plusieurs URL.
- **Gérer différents paths en fonction des hosts** :  Acheminer le trafic vers les services appropriés selon les règles de routage définies
- **Gérer différents hosts (virtuels)** : Héberger plusieurs sites ou applications sur une même adresse IP
- **Gérer les terminaisons TLS** : Assurer le chiffrement des communications HTTPS pour sécuriser les échanges

## Fonctionnement

![ingress](/learning/kubernetes/ingress.svg)

1. **Définition**: Un fichier YAML spécifie l'ingress
2. **Création**: **kubectl**  traduit le fichier YAML en requêtes HTTP REST et les envoie au `kube-apiserver`
3. **Traitement par le `kube-apiserver`**: Le `kube-apiserver` valide et stocke la configuration de l'ingress dans `etcd`
4. **Reception de la Requête**: Une requête HTTP(s) est envoyée à l'Ingress depuis un client externe (navigateur web, application)
5. **Récupération des Configurations**: L'Ingress Controller surveille continuellement les ressources Ingress stockées dans etcd. Il extrait les configurations pertinentes, y compris les règles de routage définies dans les fichiers YAML
6. **Conversion en Règles de Routage**: Ces configurations sont ensuite converties en règles de routage compréhensibles par le proxy inverse (comme NGINX ou Traefik). Cela inclut les mappages d'URL, les conditions de routage basées sur les chemins et les hôtes, ainsi que les configurations TLS.
7. **Comparaison des Règles**: L'Ingress Controller' reçoit la requête et compare l'URL (domaine) avec les règles spécifiées dans la ressource Ingress
8. **Sélection du Backend**: Si une correspondance est trouvée, le controller détermine quel service backend doit traiter la requête en fonction des règles. Si aucune correspondance n'est trouvée, la requête peut être redirigée vers un backend par défaut ou rejetée.
9. **Routage**: Si la requête correspond à une règle, le controller la transmet au service approprié
10. **Transmission au Pod**: Le service reçoit la requête et la transmet au Pod approprié en fonction de sa configuration
11. **Traitement de la Requête**: Le Pod gère la requête, traite les données, et renvoie une réponse qui suit le même chemin inversé jusqu'au client externe

## Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  defaultBackend:
    resource:
      apiGroup: k8s.example.com
      kind: StorageBucket
      name: static-assets
  ingressClassName: nginx-example
  rules:
  - host: example.com
    http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```

### Explication des champs

| Champ            | Description                                                                                                            |
|------------------|------------------------------------------------------------------------------------------------------------------------|
| **annotations**  | Chaque annotation est spécifique au controller utilisé. Dans cet exemple, elle indique à NGINX de réécrire l'URL de toutes les demandes entrantes à `/` avant de les acheminer vers le service, établissant une règle de réécriture d'URL. |
| **defaultBackend** | Un backend par défaut est un service qui gère toutes les demandes qui ne correspondent à aucune règle dans la ressource Ingress.                          |
| **rules**        | Les règles de routage.                                                                                                 |
| **host**         | Le routage basé sur l'hôte. Si l'URL ne correspond pas, la demande ne sera pas acheminée vers les services.                                                 |

### Types de chemin (Path type)

| Type    | Path      | Request path   | Correspondance      |
|---------|-----------|----------------|---------------------|
| Prefix  | /         | (tous chemins) | Oui                 |
| Exact   | /foo      | /foo           | Oui                 |
| Exact   | /foo      | /bar           | Non                 |
| Exact   | /foo      | /foo/          | Non                 |
| Exact   | /foo/     | /foo           | Non                 |
| Prefix  | /foo      | /foo, /foo/    | Oui                 |
| Prefix  | /foo/     | /foo, /foo/    | Oui                 |
| Prefix  | /aaa/bb   | /aaa/bbb       | Non                 |
| Prefix  | /aaa/bbb  | /aaa/bbb       | Oui                 |
| Prefix  | /aaa/bbb/ | /aaa/bbb       | Oui, ignore la barre oblique finale |
| Prefix  | /aaa/bbb  | /aaa/bbb/      | Oui, correspond à la barre oblique finale |
| Prefix  | /aaa/bbb  | /aaa/bbb/ccc   | Oui, correspond au sous-chemin     |
| Prefix  | /aaa/bbb  | /aaa/bbbxyz    | Non, ne correspond pas au préfixe de chaîne |
| Prefix  | /, /aaa   | /aaa/ccc       | Oui, correspond au préfixe /aaa    |
| Prefix  | /, /aaa, /aaa/bbb | /aaa/bbb | Oui, correspond au préfixe /aaa/bbb |
| Prefix  | /, /aaa, /aaa/bbb | /ccc   | Oui, correspond au préfixe /        |
| Prefix  | /aaa      | /ccc           | Non, utilise le backend par défaut  |
| Mixed   | /foo (Prefix), /foo (Exact) | /foo | Oui, préfère Exact           |

:::tip
- **Exact** : correspond au chemin URL exact.
- **Prefix** : correspond à la base d'un préfixe de chemin URL.
:::