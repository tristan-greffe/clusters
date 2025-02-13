import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import KubernetesIcon from '../components/KubernetesIcon.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('KubernetesIcon', KubernetesIcon)
  }
} satisfies Theme