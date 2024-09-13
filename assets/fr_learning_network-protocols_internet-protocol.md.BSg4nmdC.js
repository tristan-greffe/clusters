import{_ as e,c as t,o as s,a1 as r,a_ as o,a$ as n,b0 as a,b1 as i,b2 as l,b3 as c}from"./chunks/framework.CgL1aY5S.js";const _=JSON.parse('{"title":"Le protocole Internet","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/network-protocols/internet-protocol.md","filePath":"fr/learning/network-protocols/internet-protocol.md"}'),d={name:"fr/learning/network-protocols/internet-protocol.md"},u=r('<h1 id="le-protocole-internet" tabindex="-1">Le <code>protocole Internet</code> <a class="header-anchor" href="#le-protocole-internet" aria-label="Permalink to &quot;Le `protocole Internet`&quot;">​</a></h1><p>Internet est un <strong>réseau mondial</strong> qui permet aux utilisateurs de communiquer avec des serveurs ou entre serveurs, établissant ainsi des <strong>communications entre différentes machines</strong>.</p><p>Internet repose sur des <strong>infrastructures physiques composées de gros câbles</strong> répartis sur l&#39;ensemble de la planète. Ces infrastructures, appelées Network Service Providers (NSP), sont majoritairement financées par les grandes entreprises technologiques (GAFAM) et les gouvernements.</p><p><img src="'+o+'" alt="internet-nsp"></p><p>L&#39;objectif principal de ces infrastructures est de <strong>transférer des informations d&#39;un point A à un point B et inversement</strong> à l&#39;aide de signaux électriques, optiques ou radioélectriques. Pour pouvoir faire transiter ces données dans les deux sens, il faut suivre un <strong>ensemble de règles (protocol stack) pour établir une communication entre deux machines</strong>.</p><h2 id="architecture" tabindex="-1">Architecture <a class="header-anchor" href="#architecture" aria-label="Permalink to &quot;Architecture&quot;">​</a></h2><p><img src="'+n+'" alt="internet-architecture"></p><table><thead><tr><th>Composant</th><th>Description</th></tr></thead><tbody><tr><td><strong>Network Service Providers (NSP)</strong></td><td>Grandes infrastructures composées majoritairement de gros câbles répartis sur l&#39;ensemble de la planète, permettant la transmission des données sur de longues distances. Appartiennent aux GAFAM et aux États.</td></tr><tr><td><strong>Network Access Points (NAP)</strong></td><td>Points d&#39;accès aux infrastructures des NSP. Les NAP agissent comme des portes d&#39;entrée au réseau des NSP.</td></tr><tr><td><strong>Internet Service Providers (ISP)</strong></td><td>Sous-réseaux développés par les Fournisseurs d&#39;Accès à Internet (FAI) (comme Orange, Free, etc.) pour fournir l&#39;accès Internet aux particuliers et aux entreprises.</td></tr></tbody></table><h2 id="protocol-stack" tabindex="-1">Protocol stack <a class="header-anchor" href="#protocol-stack" aria-label="Permalink to &quot;Protocol stack&quot;">​</a></h2><h3 id="le-modele-osi" tabindex="-1">Le Modèle OSI <a class="header-anchor" href="#le-modele-osi" aria-label="Permalink to &quot;Le Modèle OSI&quot;">​</a></h3><p>Ce modèle créé par l&#39;<a href="https://www.iso.org/fr/home.html" target="_blank" rel="noreferrer">ISO</a> (Organisation internationale de normalisation) décrit toutes les règles pour établir une connexion entre deux systèmes informatiques.</p><img src="'+a+'" alt="osi-model" style="width:60%;display:block;margin:0 auto;"><p>Le <strong>modèle OSI se compose de couches</strong> qui prennent en compte tous les aspects de la transmission d&#39;une information.</p><table><thead><tr><th>Couche</th><th>Description</th></tr></thead><tbody><tr><td><strong>Application</strong></td><td>Met en place l&#39;interface pour qu&#39;une application accède au réseau.</td></tr><tr><td><strong>Présentation</strong></td><td>Prépare les données pour la couche application, en assurant le formatage, le chiffrement et la compression.</td></tr><tr><td><strong>Session</strong></td><td>Gère les sessions de communication, établissant, maintenant et terminant les connexions entre les applications.</td></tr><tr><td><strong>Transport</strong></td><td>Assure le transport fiable des données, segmentant les messages et garantissant la livraison sans erreur.</td></tr><tr><td><strong>Réseau</strong></td><td>Détermine le chemin des données entre les dispositifs, en utilisant des adresses logiques telles que les adresses IP.</td></tr><tr><td><strong>Liaison</strong></td><td>Spécifie le moyen utilisé pour acheminer les données sur la couche physique (câble internet, Wi-Fi, etc.), en gérant la détection et la correction d&#39;erreurs.</td></tr><tr><td><strong>Physique</strong></td><td>Décrit les caractéristiques physiques de la connexion (câbles, ondes, etc.).</td></tr></tbody></table><h3 id="le-modele-tcp-ip" tabindex="-1">Le Modèle TCP/IP <a class="header-anchor" href="#le-modele-tcp-ip" aria-label="Permalink to &quot;Le Modèle TCP/IP&quot;">​</a></h3><p><strong>Sur le réseau Internet, on utilise principalement le modèle TCP/IP</strong> (<em>fun fact : il a été créé par l&#39;armée américaine</em>).</p><img src="'+i+'" alt="tcp-ip-model" style="width:60%;display:block;margin:0 auto;"><table><thead><tr><th>Couche</th><th>Description</th></tr></thead><tbody><tr><td><strong>Application</strong></td><td>Inclut des protocoles comme <code>HTTP</code>, <code>HTTPS</code> (qui utilise le <code>protocole TLS</code>), <code>SSH</code>, <code>HLS</code>, <code>WebRTC</code>, <code>SMTP</code> (e-mail).</td></tr><tr><td><strong>Transport</strong></td><td>Utilise des protocoles comme <code>TCP</code>, <code>UDP</code> et <code>QUIC</code> pour assurer le transport des données.</td></tr><tr><td><strong>Internet</strong></td><td>Gère les adresses IP et le routage des paquets de données à travers le réseau.</td></tr><tr><td><strong>Accès Réseau</strong></td><td>Spécifie le moyen utilisé pour acheminer les données sur la couche physique (câbles, Wi-Fi, etc.) et décrit les caractéristiques physiques de la connexion.</td></tr></tbody></table><div class="info custom-block"><p class="custom-block-title">INFO</p><p>En tant que développeur, on se concentre principalement sur les <strong>couches transport et application</strong>, plutôt que sur les parties accès réseau et internet.</p></div><h3 id="fonctionement" tabindex="-1">Fonctionement <a class="header-anchor" href="#fonctionement" aria-label="Permalink to &quot;Fonctionement&quot;">​</a></h3><p><img src="'+l+'" alt="tcp-ip-operation"></p><ol><li><strong>Couche Applicative</strong> : Transforme l&#39;image en données et chiffre les informations, ajoutant un en-tête pour formater l&#39;image selon le protocole.</li><li><strong>Couche Transport</strong> : Découpe les données en segments numérotés pour permettre de récupérer les informations dans le bon ordre.</li><li><strong>Couche Internet</strong> : Ajoute les adresses IP de départ et de destination ainsi que les informations nécessaires à l&#39;utilisation du <code>protocole IP</code>, transformant les données en paquets.</li><li><strong>Couche Accès Réseau</strong> : Ajoute des adresses MAC (adresses uniques présentes sur chaque machine) et transforme les données en trames.</li><li><strong>Couche Physique</strong> : Convertit les données en bits pour les envoyer via les câbles Internet.</li></ol><h2 id="fonctionnement" tabindex="-1">Fonctionnement <a class="header-anchor" href="#fonctionnement" aria-label="Permalink to &quot;Fonctionnement&quot;">​</a></h2><img src="'+c+'" alt="internet-operation" style="width:80%;display:block;margin:0 auto;"><ol><li>Un utilisateur <strong>envoie une requête</strong> à tiktok.com. <strong>La donnée suit le protocole TCP/IP pour être transformée en bits</strong>.</li><li>La <strong>requête est envoyée à un serveur DNS</strong>. Si ce serveur DNS ne trouve pas l&#39;adresse, il renvoie la requête à un serveur DNS parent jusqu&#39;à trouver une correspondance. Ensuite, il envoie l&#39;adresse IP de tiktok.com et la requête au routeur.</li><li>La requête est <strong>envoyée de routeur en routeur</strong> jusqu&#39;à trouver l&#39;adresse IP de tiktok.com et transmettre la requête à la machine de destination, qui <strong>suivra le protocole TCP/IP en sens inverse</strong>.</li></ol><div class="info custom-block"><p class="custom-block-title">routeur</p><p>Un routeur est un dispositif qui <strong>maintient une liste des adresses IP</strong> et <strong>assure le routage des données</strong> sur le réseau. Chaque routeur connaît les adresses IP appartenant à son réseau.</p></div><div class="info custom-block"><p class="custom-block-title">serveur dns</p><p>Un serveur DNS contient la <strong>liste des associations entre noms de domaine et adresses IP</strong>. Il existe des serveurs DNS racine qui connaissent la totalité des associations. (Fun fact : la NASA possède un serveur DNS racine).</p></div>',27),p=[u];function m(g,h,f,b,P,q){return s(),t("div",null,p)}const I=e(d,[["render",m]]);export{_ as __pageData,I as default};