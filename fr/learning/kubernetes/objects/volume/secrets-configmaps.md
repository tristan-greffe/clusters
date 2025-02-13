# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/vol.svg' label='Secrets & ConfigMaps' :width='45' :height='45' />

K8s possède deux types d'objets capables d'**injecter des données de configuration dans un container au démarrage** : les `Secrets` et les `Configmaps`. Les [secrets](https://kubebyexample.com/concept/secrets) et [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) se comportent de manière similaire.

::: info
Les `secrets` et les `ConfigMaps` peuvent être exposés à l'intérieur d'un container en tant que **fichiers, volumes ou variables d'environnement**.
:::

## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/secret.svg' label='Secrets' :width='45' :height='45' /> 

Les `Secrets` sont des objets Kubernetes destinés à stocker une petite quantité de **données sensibles**. Ils sont stockés **encodés en `base64`**, ils ne sont donc pas extrêmement sécurisés.

::: warning
Les données extrêmement sensibles devraient être stockées à l'aide d'un outil comme [HashiCorp Vault](https://www.vaultproject.io/).
:::

::: tip Décoder un secret
```sh
kubectl get secret <secret-name> -o jsonpath='{.data.<key>}' | base64 --decode
```
:::

## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/cm.svg' label='ConfigMaps' :width='45' :height='45' />

Les `ConfigMaps` sont destinés aux **données non-sensibles** (données de configuration), telles que les fichiers de configuration et les variables d'environnement. Contrairement aux `Secrets`, les `ConfigMaps` ne sont **pas encodés en `base64`**.

## Utilisation

Les `Secrets` et `ConfigMaps` peuvent être utilisés de plusieurs façons dans un Pod :

| Méthode  | Description |
|----------|-------------|
|  `env` | Injecter des données sous forme de variables d'environnement |
| `envFrom` | Injecter toutes les paires clé-valeur comme variables d'environnement |
| `volumeMounts` | Monter des secrets ou des configmaps en tant que fichiers dans des volumes |
| `secretKeyRef` | Référence à une clé spécifique d'un secret |
| `secretRef` | Référence à un secret entier |
| `configMapKeyRef` | Référence à une clé spécifique d'un ConfigMap |
| `configMapRef` | Référence à un ConfigMap entier |

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: complete-example-pod
spec:
  containers:
    - name: myapp-container
      image: myapp:latest
      env:
        # Injecter une clé spécifique d'un ConfigMap en tant que variable d'environnement
        - name: CONFIG_KEY1
          valueFrom:
            configMapKeyRef:
              name: example-configmap
              key: key1
        # Injecter une clé spécifique d'un Secret en tant que variable d'environnement
        - name: SECRET_KEY1
          valueFrom:
            secretKeyRef:
              name: example-secret
              key: key1
      envFrom:
        # Injecter toutes les paires clé-valeur d'un ConfigMap comme variables d'environnement
        - configMapRef:
            name: example-configmap
        # Injecter toutes les paires clé-valeur d'un Secret comme variables d'environnement
        - secretRef:
            name: example-secret
      volumeMounts:
        # Monter un ConfigMap en tant que fichier
        - name: config-volume
          mountPath: /etc/config
          subPath: config-file  # Spécifier un sous-chemin pour monter un seul fichier du ConfigMap
        # Monter un Secret en tant que fichier
        - name: secret-volume
          mountPath: /etc/secret
          subPath: secret-file  # Spécifier un sous-chemin pour monter un seul fichier du Secret
        # Monter un volume vide pour le développement
        - name: emptydir-volume
          mountPath: /data
  volumes:
    # Définir un volume ConfigMap
    - name: config-volume
      configMap:
        name: example-configmap
        items:
          - key: key1
            path: config-file  # Spécifier un fichier particulier du ConfigMap
    # Définir un volume Secret
    - name: secret-volume
      secret:
        secretName: example-secret
        items:
          - key: key1
            path: secret-file  # Spécifier un fichier particulier du Secret
    # Définir un volume emptyDir (non persistant, utilisé principalement pour le développement)
    - name: emptydir-volume
      emptyDir: {}
```