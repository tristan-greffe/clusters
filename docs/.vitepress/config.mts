import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/clusters',
  title: 'Clusters',
  ignoreDeadLinks: true,
  head: [
    ['link', { href: 'https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css', rel: 'stylesheet' }],
    ['link', { rel: 'icon', href: './public/clusters.png' }]
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
        nav: [
          { text: 'A propos', link: '/fr/about/introduction' },
          { text: 'Guide', link: '/fr/guide/getting-started' },
          { text: 'Apprentissage', link: '/fr/learning/introduction' }
        ],
        sidebar: {
          '/fr/about/': getAboutSidebar('fr'),
          '/fr/guide/': getGuideSidebar('fr'),
          '/fr/learning/': getLearningSidebar('fr')
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
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Learning', link: '/learning/introduction' }
    ],
    sidebar: {
      '/about/': getAboutSidebar(),
      '/guide/': getGuideSidebar(),
      '/learning/': getLearningSidebar()
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

function getGuideSidebar (lang = 'en') {
  if (lang === 'en') {
    return [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Scripts',
        collapsed: true,
        items: [
          { text: 'Encrypt / Decrypt', link: '/guide/scripts/encrypt-decrypt' }
        ]
      }
    ]
  }
  return [
    { text: 'Démarrer', link: '/fr/guide/getting-started' },
    { text: 'Scripts',
      collapsed: true,
      items: [
        { text: 'Chiffrer / Déchiffrer', link: '/fr/guide/scripts/encrypt-decrypt' }
      ]
    }
  ]
}

function getLearningSidebar (lang = 'en') {
  if (lang === 'en') {
    return [
      { text: 'Introduction', link: '/learning/introduction' },
      { text: 'Network protocols',
        collapsed: true,
        items: [
          { text: 'Internet network', link: '/fr/learning/network-protocols/introduction' }
        ]
      },
      { text: 'Kubernetes',
        collapsed: true,
        items: [
          { text: '??', link: '/fr/learning/kubernetes/introduction' }
        ]
      },
      { text: 'Prometheus',
        collapsed: true,
        items: [
          { text: '??', link: '/fr/learning/prometheus/introduction' }
        ]
      },
      { text: 'Grafana',
        collapsed: true,
        items: [
          { text: '??', link: '/fr/learning/grafana/introduction' }
        ]
      },
      { text: 'Jenkins',
        collapsed: true,
        items: [
          { text: '??', link: '/fr/learning/jenkins/introduction' }
        ]
      },
      { text: 'Ansible',
        collapsed: true,
        items: [
          { text: '??', link: '/fr/learning/ansible/introduction' }
        ]
      }
    ]
  }
  return [
    { text: 'Introduction', link: '/fr/learning/introduction' },
    { text: 'Protocoles réseaux',
      collapsed: true,
      items: [
        { text: 'Réseau internet', link: '/fr/learning/network-protocols/introduction' }
      ]
    },
    { text: 'Kubernetes',
      collapsed: true,
      items: [
        { text: '??', link: '/fr/learning/kubernetes/introduction' }
      ]
    },
    { text: 'Prometheus',
      collapsed: true,
      items: [
        { text: '??', link: '/fr/learning/prometheus/introduction' }
      ]
    },
    { text: 'Grafana',
      collapsed: true,
      items: [
        { text: '??', link: '/fr/learning/grafana/introduction' }
      ]
    },
    { text: 'Jenkins',
      collapsed: true,
      items: [
        { text: '??', link: '/fr/learning/jenkins/introduction' }
      ]
    },
    { text: 'Ansible',
      collapsed: true,
      items: [
        { text: '??', link: '/fr/learning/ansible/introduction' }
      ]
    }
  ]
}