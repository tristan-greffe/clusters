# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/user.svg' label='RBAC' :width='45' :height='45' />

Le **contrôle d'accès basé sur les rôles (RBAC)** est une première étape de sécurité dans lequel chaque **autorisation d'accès est basée sur des rôles** qui sont attribués à un utilisateur. Avec ce système, il est donc possible de **restreindre l'accès aux ressources d'un cluster Kubernetes** (`namespaces`, `pods`, `jobs`, etc.) à des applications ou des utilisateurs.

::: info
Kubernetes utilise des certificats pour **sécuriser les communications entre les différents composants** du cluster (par exemple, entre le `kube-apiserver` et les `kubelets` sur les nodes) ainsi que pour l'**authentification des utilisateurs et des services**.
:::

## Concepts

Dans Kubernetes, les stratégies RBAC peuvent être utilisées pour gérer aussi bien les droits d'accès d'un utilisateur système (User ou Group) que ceux des [comptes de service](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/) (Service Account).

Un **rôle permet de définir des autorisations d'accès via des verbes** sur certaines `ressources`, tels que des `pods`, des `nodes`, des `deployments`, des `ConfigMaps`, etc.

## Composants

Kubernetes possède **quatre objets liés aux RBAC** qui peuvent être combinés pour définir les autorisations d'accès aux ressources du cluster. 

| Objet | Description |
|-------|-------------|
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/role.svg' label='Role' :width='45' :height='45' /> | gérer les autorisations pour accéder aux ressources d'un namespace uniquement |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/c-role.svg' label='ClusterRole' :width='45' :height='45' /> | gérer les autorisations pour accéder aux ressources à l'échelle du cluster |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/rb.svg' label='RoleBinding' :width='45' :height='45' /> | lie un rôle à des utilisateurs ou des comptes de service dans un namespace |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/crb.svg' label='ClusterRoleBinding' :width='45' :height='45' /> | lie un ClusterRole à des utilisateurs ou des comptes de service sur l'ensemble du cluster |

:::tip
Comme pour tout système RBAC, Kubernetes RBAC est **plus efficace** lorsque les administrateurs suivent le **principe du moindre privilège**, en accordant à chaque utilisateur ou compte seulement les privilèges minimaux nécessaires pour effectuer son travail. Cela signifie **utiliser des Roles au lieu de ClusterRoles** dans la mesure du possible.
:::

## Création des ressources RBAC

### Définir les utilisateurs et les comptes de service

1. Créer une clé privée

```sh
openssl genrsa -out <username>.key 2048
```

2. Créer une Demande de signature de certificat

```sh
openssl req -new -key <username>.key -out <username>.csr -subj "/CN=<username>/O=group1/"
```

:::tip
Kubernetes utilise le champ Organisation (O=group1) pour déterminer l'appartenance à un groupe d'utilisateurs pour RBAC. CN est le nom de l'utilisateur et O est le groupe auquel cet utilisateur appartiendra.
:::

3. Signer la CSR avec l'autorité de certification k8s

```sh
sudo openssl x509 -req -in <username>.csr -CA /etc/kubernetes/pki/server-ca.crt -CAkey /etc/kubernetes/pki/server-ca.key -CAcreateserial -out <username>.crt -days 365
```

:::tip
L'autorité de certification k8s se trouve par défaut dans le répertoire `/etc/kubernetes/pki`
:::

4. Inspecter le certificat

```sh
openssl x509 -in <username>.crt -text
```

5. Récupérer le certificat en `base64`

```sh
cat <username>.csr | base64 | tr -d "\n"
```

6. Créer un Objet `CertificateSigningRequest` 

:::info
Cet objet fait une demande de signature de certificat
:::

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: <username>
spec:
  groups:
  - system:authenticated
  request: # certificat en Base64 = cat <username>.csr | base64 | tr -d "\n"
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
```

7. Appliquer la configuration

```sh
kubectl apply -f CertificateSigningRequest.yml
```

8. Vérifier la Liste des CSR (`CertificateSigningRequest`) 

```sh
kubectl get csr
```

9. Approuver la signature du certificat

```sh
kubectl certificate approve <username>
```

### Créer un `role` ou un `clusterRole`

Un `Role` ou un `ClusterRole` définit les actions qui peuvent être effectuées sur une ressource. Voici un exemple pour accorder des autorisations de `get` et `list` sur les `pods` :

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: <username>-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - list
```

### Créer un `RoleBinding` ou un `ClusterRoleBinding`

Un `RoleBinding` ou un `ClusterRoleBinding` **lie un `Role` ou un `ClusterRole` à un utilisateur ou à un compte de service**, permettant ainsi d'exécuter les actions définies dans le rôle. 

1. Créer un RoleBinding

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: <username>-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: <username>-role
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: <username>
```

2. Appliquer la configuration

```sh
kubectl apply -f rolebinding.yml
```

3. Générer le certificat pour l'authentification 

:::info
Permet de s'authentifier sur le composant `kube-api server` depuis l'objet `CertificateSigningRequest` appelé username
:::

```sh
kubectl get csr <username> -o jsonpath='{.status.certificate}'  | base64 -d > <username>-cert.crt
```

4. Ajouter l'utilisateur dans le fichier `Kubeconfig`

```sh
sudo kubectl config set-credentials <username> --client-key=<username>.key --client-certificate=<username>-cert.crt --embed-certs=true
```

5. Créer un nouveau contexte pour l'utilisateur

```sh
sudo kubectl config set-context <username> --cluster=default --user=<username>
```

6. Vérifier la création du contexte

```sh
sudo kubectl config get-contexts
```

7.  Utiliser le nouveau contexte
```sh
sudo kubectl config use-context <username>
```