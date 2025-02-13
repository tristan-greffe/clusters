# Kubernetes Autoscaler

| Type | Description |
|------|-------------|
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/hpa.svg' label='Horizontal Pod Autoscaler (HPA)' :width='45' :height='45' /> | **Ajuste le nombre de réplicas d'une application** en fonction de l'utilisation des ressources (CPU, mémoire) ou de métriques personnalisées |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/ca.png' label='Cluster Autoscaler (CA)' :width='45' :height='45' /> | **Ajuste le nombre de nodes dans un cluster** en ajoutant ou supprimant des nodes selon les besoins |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/vpa.svg' label='Vertical Pod Autoscaler (VPA)' :width='45' :height='45' /> | **Ajuste les demandes de ressources (requests) et les limites (limits) des containers** pour optimiser leur performance |

:::warning VPA vs HPA
La différence entre le VPA et le HPA réside dans leur approche de la mise à l'échelle. Le HPA augmente ou diminue le nombre de Pods pour mettre à l'échelle horizontalement. Le VPA ajuste les ressources des containers existants pour une mise à l'échelle verticale.
:::

## Metrics Server (`metrics server`)

Les autoscalers comme **HPA et VPA dépendent du Metrics Server** pour collecter les métriques d'utilisation des ressources (`cpu` & `memory`) et des métriques personnalisées provenant d'autres sources externes telles que le trafic des applications.

### Installation

1. Vérification de la présence du Metrics Server

```yaml
kubectl get apiservice | grep -i metrics
kubectl top pods -n kube-system
```

2. Installation du Metrics Server

```yaml
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```