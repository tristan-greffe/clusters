kubectl --kubeconfig="./config/kubeconfig.yml"  get all

#Quand une nouvelle version d'un Chart est disponible ou que vous souhaitez modifier la configuration de votre version, vous pouvez utiliser la commande helm upgrade.

helm upgrade -f mongo-values.yaml mongodb bitnami/mongodb

#Si quelque chose ne se passe pas comme prévu lors d'une release, il est facile de revenir à une version précédente avec helm rollback [RELEASE] [REVISION].
helm rollback mongodb 1

#Options utiles pour install / upgrade / rollback
#--timeout : durée d'attente pour que les commandes Kubernetes se terminent (par défaut 5 minutes).
#--wait : attente que tous les Pods soient prêts, que les PVC soient liés, et que d'autres conditions soient remplies avant de marquer la version comme réussie. Si le délai est dépassé, la version est marquée comme FAILED.


#La commande helm list --all affiche tous les enregistrements de releases conservés par Helm, y compris ceux des éléments supprimés ou échoués (si --keep-history a été spécifié) :
helm list --all

#La commande helm uninstall permet de désinstaller une release d'un cluster.
helm uninstall mongodb