import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Piramide from './../components/Piramide/Piramide.vue'
import PiramideHomepage from './../components/Piramide/PiramideHomepage.vue'
import Cultura from './../components/Cultura.vue'
import CiboCitta from './../components/CiboCitta/CiboCitta.vue'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/piramide',
      name: 'piramide',
      component: Piramide
    },
    {
      path: '/piramide-homepage',
      name: 'piramide-homepage',
      component: PiramideHomepage
    },
    {
      path: '/cultura',
      name: 'cultura',
      component: Cultura
    },
    {
      path: '/cibo-città',
      name: 'cibo e città',
      component: CiboCitta
    }
  ]
})

export default router;