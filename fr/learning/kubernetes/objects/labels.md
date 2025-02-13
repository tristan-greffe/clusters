# Labels & Sélecteurs

## Labels

Les [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) sont des **paires clé/valeur** définies sur les objets Kubernetes. Ils permettent de **sélectionner et de grouper des objets** pour des opérations spécifiques, comme le déploiement ou la gestion des services.

#### Bonnes pratiques pour les labels

| Clé | Description | Exemple | Type |
|-----|-------------|---------|------|
| `app.kubernetes.io/name` | Nom de l'application | `mysql` | `string` |
| `app.kubernetes.io/instance` | Nom unique identifiant l'instance d'une application | `mysql-abcxyz` | `string` |
| `app.kubernetes.io/version` | Version actuelle de l'application (e.g., SemVer 1.0, hash de révision) | `5.7.21` | `string` |
| `app.kubernetes.io/component` | Composant au sein de l'architecture | `database` | `string` |
| `app.kubernetes.io/part-of` | Nom de l'application de niveau supérieur dont fait partie cette application | `wordpress` | `string` |
| `app.kubernetes.io/managed-by` | Outil utilisé pour gérer l'application | `helm` | `string` |

**Exemple** : Un service qui sélectionne les pods avec le label `app: App1`.

![service-label](/learning/kubernetes/service-label.svg)

## Sélecteurs

Les sélecteurs permettent de **cibler un ensemble d'objets** Kubernetes en **fonction de leurs labels**. Il existe deux types de sélecteurs :

| Type | Description |
|------|-------------|
| `equality-based` | Permet de filtrer les objets en fonction d'une clé de label et de sa valeur (par exemple, `key = value`) |
| `set-based` | Permet de filtrer les objets en fonction d'un ensemble de valeurs (par exemple, `key in (value1, value2)`) |