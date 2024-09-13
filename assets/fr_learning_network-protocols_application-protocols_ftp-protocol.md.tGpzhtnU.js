import{_ as e,c as o,o as t,a1 as r,aL as i}from"./chunks/framework.CgL1aY5S.js";const P=JSON.parse('{"title":"Le protocole FTP","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/network-protocols/application-protocols/ftp-protocol.md","filePath":"fr/learning/network-protocols/application-protocols/ftp-protocol.md"}'),n={name:"fr/learning/network-protocols/application-protocols/ftp-protocol.md"},s=r('<h1 id="le-protocole-ftp" tabindex="-1">Le <code>protocole FTP</code> <a class="header-anchor" href="#le-protocole-ftp" aria-label="Permalink to &quot;Le `protocole FTP`&quot;">​</a></h1><p>Le <code>protocole FTP</code> (File Transfer Protocol) est utilisé pour le <strong>transfert de fichiers</strong> entre un client et un serveur sur un réseau. <code>FTP</code> est basé sur sur le <code>protocole de transport TCP</code> et le <code>protocole IP</code>.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Il est l&#39;un des protocoles les plus anciens et les plus utilisés pour la gestion et le transfert de fichiers.</p></div><h2 id="fonctionnement" tabindex="-1">Fonctionnement <a class="header-anchor" href="#fonctionnement" aria-label="Permalink to &quot;Fonctionnement&quot;">​</a></h2><p>FTP fonctionne selon un modèle client-serveur, où le <strong>client <code>FTP</code> se connecte à un serveur <code>FTP</code> pour télécharger ou téléverser des fichiers</strong>. <code>FTP</code> utilise deux canaux de communication distincts : un canal de commande et un canal de données.</p><img src="'+i+'" alt="ftp-protocol" style="width:80%;display:block;margin:0 auto;"><ol><li><strong>Canal de Commande</strong> : Utilisé pour envoyer des commandes et recevoir des réponses entre le client et le serveur (Par défaut, il utilise le port TCP 21)</li><li><strong>Canal de Données</strong> : Utilisé pour le transfert réel des fichiers (Le port utilisé pour le canal de données peut varier selon le mode de fonctionnement de <code>FTP</code> (actif ou passif))</li></ol><h3 id="modes-de-fonctionnement" tabindex="-1">Modes de Fonctionnement <a class="header-anchor" href="#modes-de-fonctionnement" aria-label="Permalink to &quot;Modes de Fonctionnement&quot;">​</a></h3><ol><li><p><strong>Mode Actif</strong> :</p><ul><li>Le client ouvre un port et attend que le serveur se connecte à ce port pour établir le canal de données.</li><li>Le client envoie une commande <code>PORT</code> au serveur, indiquant l&#39;adresse IP et le numéro de port sur lesquels il écoute.</li><li>Le serveur initie la connexion au client depuis son port de données (par défaut, port TCP 20).</li></ul></li><li><p><strong>Mode Passif</strong> :</p><ul><li>Le serveur ouvre un port et attend que le client se connecte à ce port pour établir le canal de données.</li><li>Le client envoie une commande <code>PASV</code> au serveur, et le serveur répond avec l&#39;adresse IP et le numéro de port sur lesquels il écoute.</li><li>Le client initie la connexion au serveur pour le canal de données.</li></ul></li></ol><h3 id="commandes-ftp-courantes" tabindex="-1">Commandes <code>FTP</code> Courantes <a class="header-anchor" href="#commandes-ftp-courantes" aria-label="Permalink to &quot;Commandes `FTP` Courantes&quot;">​</a></h3><ul><li><strong>USER</strong> : Envoie le nom d&#39;utilisateur au serveur.</li><li><strong>PASS</strong> : Envoie le mot de passe associé au nom d&#39;utilisateur.</li><li><strong>LIST</strong> : Liste les fichiers et répertoires du répertoire courant.</li><li><strong>RETR</strong> : Télécharge un fichier depuis le serveur vers le client.</li><li><strong>STOR</strong> : Téléverse un fichier depuis le client vers le serveur.</li><li><strong>CWD</strong> : Change le répertoire de travail sur le serveur.</li><li><strong>QUIT</strong> : Termine la session <code>FTP</code>.</li></ul><h2 id="securite-avec-ftps-et-sftp" tabindex="-1">Sécurité avec <code>FTPS</code> et <code>SFTP</code> <a class="header-anchor" href="#securite-avec-ftps-et-sftp" aria-label="Permalink to &quot;Sécurité avec `FTPS` et `SFTP`&quot;">​</a></h2><p>FTP en lui-même n&#39;est pas sécurisé, car les informations sont envoyées en clair. Pour améliorer la sécurité, deux principaux protocoles sont utilisés : <code>FTPS</code> et <code>SFTP</code>.</p><ol><li><p><strong><code>FTPS</code> (FTP Secure)</strong> :</p><ul><li>Ajoute une couche de sécurité SSL/TLS au FTP classique.</li><li>Utilise les ports 21 pour les commandes et peut utiliser des ports dynamiques pour les données en mode passif.</li><li>Offre une sécurité en chiffrant les commandes et les données.</li></ul></li><li><p><strong><code>SFTP</code> (SSH File Transfer Protocol)</strong> :</p><ul><li>Utilise le protocole SSH pour offrir un transfert de fichiers sécurisé.</li><li>Utilise le port 22 par défaut.</li><li>Contrairement à <code>FTPS</code>, <code>SFTP</code> n&#39;est pas une extension de <code>FTP</code> mais un sous-système du protocole SSH.</li><li>Offre des fonctionnalités supplémentaires telles que la manipulation de fichiers et la gestion des permissions.</li></ul></li></ol><h2 id="transfert-de-fichier-avec-ftp" tabindex="-1">Transfert de Fichier avec <code>FTP</code> <a class="header-anchor" href="#transfert-de-fichier-avec-ftp" aria-label="Permalink to &quot;Transfert de Fichier avec `FTP`&quot;">​</a></h2><p>Imaginons que nous souhaitions télécharger un fichier depuis un serveur <code>FTP</code> distant. Voici les étapes typiques :</p><ol><li><p><strong>Connexion au Serveur <code>FTP</code></strong> :</p><ul><li>Le client <code>FTP</code> se connecte au serveur en utilisant l&#39;adresse IP ou le nom de domaine, et le port 21.</li><li>Le client envoie la commande <code>USER</code> suivie du nom d&#39;utilisateur, puis <code>PASS</code> suivi du mot de passe.</li></ul></li><li><p><strong>Naviguer dans le Système de Fichiers</strong> :</p><ul><li>Le client peut utiliser des commandes telles que <code>LIST</code> pour lister les fichiers et <code>CWD</code> pour changer de répertoire.</li></ul></li><li><p><strong>Téléchargement du Fichier</strong> :</p><ul><li>Le client envoie la commande <code>RETR</code> suivie du nom du fichier à télécharger.</li><li>Le canal de données est établi (en mode actif ou passif), et le fichier est transféré du serveur au client.</li></ul></li><li><p><strong>Déconnexion du Serveur</strong> :</p><ul><li>Le client envoie la commande <code>QUIT</code> pour terminer la session <code>FTP</code>.</li></ul></li></ol>',17),l=[s];function c(a,d,u,p,m,f){return t(),o("div",null,l)}const T=e(n,[["render",c]]);export{P as __pageData,T as default};