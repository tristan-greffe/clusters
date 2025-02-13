import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/clusters',
  title: 'Clusters',
  ignoreDeadLinks: true,
  appearance: false,
  head: [
    ['link', { href: 'https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css', rel: 'stylesheet' }],
    ['link', { rel: 'icon', href: '/clusters/favicon.ico' }]
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    fr: {
      label: 'French',
      lang: 'fr',
      themeConfig: {
        outline: { label: 'Sur cette page' },
        nav: [
          { text: 'A propos', link: '/fr/about/introduction' },
          { text: 'Apprentissage', link: '/fr/learning/introduction' }
        ],
        sidebar: {
          '/fr/about/': getAboutSidebar('fr'),
          '/fr/learning/': getLearningSidebar()
        },
        docFooter: {
          prev: 'Page précédente',
          next: 'Page suivante'
        }
      }
    }
  },
  themeConfig: {
    logo: '/clusters.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tristan-greffe' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/tristan-greffe' }
    ],
    nav: [
      { text: 'About', link: '/about/introduction' },
      { text: 'Learning', link: '/learning/introduction' }
    ],
    sidebar: {
      '/about/': getAboutSidebar()
    },
    footer: {
      copyright: 'MIT Licensed | Copyright © 2024 Tristan Greffe'
    }
  }
})

function getAboutSidebar (lang = 'en') {
  if (lang === 'en') {
    return [
      { text: 'About', link: '/about/introduction' },
      { text: 'Contributing', link: '/about/contributing' },
      { text: 'License', link: '/about/license' }
    ]
  }
  return [
    { text: 'A propos', link: '/fr/about/introduction' },
    { text: 'Contribuer', link: '/fr/about/contributing' },
    { text: 'Licence', link: '/fr/about/license' }
  ]
}

function getLearningSidebar () {
  return [
    { text: 'Stack DevOps', link: '/fr/learning/introduction' },
    { text: 'Protocoles réseaux',
      collapsed: true,
      items: [
        { text: 'Protocole Internet', link: '/fr/learning/network-protocols/internet-protocol' },
        { text: 'Protocole IP', link: '/fr/learning/network-protocols/ip-protocol' },
        { text: 'Protocoles de transport',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/fr/learning/network-protocols/transport-protocols/introduction' },
            { text: 'Protocole TCP', link: '/fr/learning/network-protocols/transport-protocols/tcp-protocol' },
            { text: 'Protocole UDP', link: '/fr/learning/network-protocols/transport-protocols/udp-protocol' },
            { text: 'Protocole QUIC', link: '/fr/learning/network-protocols/transport-protocols/quic-protocol' }
          ]
        },
        { text: 'Protocoles d\'application',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/fr/learning/network-protocols/application-protocols/introduction' },
            { text: 'Protocole HTTP(s)', link: '/fr/learning/network-protocols/application-protocols/http-protocol' },
            { text: 'Protocole SMTP', link: '/fr/learning/network-protocols/application-protocols/smtp-protocol' },
            { text: 'Protocole FTP', link: '/fr/learning/network-protocols/application-protocols/ftp-protocol' },
            { text: 'Protocole DNS', link: '/fr/learning/network-protocols/application-protocols/dns-protocol' }
          ]
        },
        { text: 'Protocoles de cryptographie',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/fr/learning/network-protocols/cryptographic-protocols/introduction' },
            { text: 'Protocole TLS', link: '/fr/learning/network-protocols/cryptographic-protocols/tls-protocol' }
          ]
        }
      ]
    },
    { text: 'Docker',
      collapsed: true,
      items: [
        { text: 'Introduction', link: '/fr/learning/docker/introduction' },
        { text: 'Gestion', link: '/fr/learning/docker/management' },
        { text: 'Dockerfile', link: '/fr/learning/docker/dockerfile' },
        { text: 'Docker Compose', link: '/fr/learning/docker/docker-compose' }
      ]
    },
    { text: 'Kubernetes',
      collapsed: true,
      items: [
        { text: 'Introduction', link: '/fr/learning/kubernetes/introduction' },
        { text: 'Architecture', link: '/fr/learning/kubernetes/architecture' },
        { text: 'Gestion', link: '/fr/learning/kubernetes/management' },
        { text: 'Minikube', link: '/fr/learning/kubernetes/minikube' },
        { text: 'Helm', link: '/fr/learning/kubernetes/helm' },
        { text: 'Velero', link: '/fr/learning/kubernetes/velero' },
        { text: 'Les objets',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/fr/learning/kubernetes/objects/introduction' },
            { text: 'Pod', link: '/fr/learning/kubernetes/objects/pod' },
            { text: 'Labels & Sélecteurs', link: '/fr/learning/kubernetes/objects/labels' },
            { text: 'ReplicaSet', link: '/fr/learning/kubernetes/objects/replicaset' },
            { text: 'Déploiement', link: '/fr/learning/kubernetes/objects/deployment' },
            { text: 'Service', link: '/fr/learning/kubernetes/objects/service' },
            { text: 'Namespace', link: '/fr/learning/kubernetes/objects/namespace' },
            { text: 'Ingress', link: '/fr/learning/kubernetes/objects/ingress' },
            { text: 'cert-manager', link: '/fr/learning/kubernetes/objects/cert-manager' },
            { text: 'Volume',
              collapsed: true,
              items: [
                { text: 'Introduction', link: '/fr/learning/kubernetes/objects/volume/introduction' },
                { text: 'Volumes Persistants', link: '/fr/learning/kubernetes/objects/volume/persistent-volumes' },
                { text: 'Secrets & ConfigMaps', link: '/fr/learning/kubernetes/objects/volume/secrets-configmaps' }
              ]
            },
            { text: 'Autoscaler',
              collapsed: true,
              items: [
                { text: 'Introduction', link: '/fr/learning/kubernetes/objects/autoscaler/introduction' },
                { text: 'Vertical Pod Autoscaler', link: '/fr/learning/kubernetes/objects/autoscaler/vertical-pod-autoscaler' },
                { text: 'Horizontal Pod Autoscaler', link: '/fr/learning/kubernetes/objects/autoscaler/horizontal-pod-autoscaler' }
              ]
            },
            { text: 'RBAC', link: '/fr/learning/kubernetes/objects/rbac' }
          ]
        }
      ]
    }
  ]
}