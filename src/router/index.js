import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Piramide from './../components/Piramide/Piramide.vue'
import Cultura from './../components/Cultura.vue'
import Piatto from './../components/PiattoVirtuale.vue'
import PiattoClone from './../components/Piattoclone.vue'
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
      path: '/cultura',
      name: 'cultura',
      component: Cultura
    },
    {
      path: '/piatto_virtuale',
      name: 'piattoVirtuale',
      component: Piatto
    },
    {
      path: '/piattoclone',
      name: 'piattoclone',
      component: PiattoClone
    },
    {
      path: '/cibocitta',
      name: 'cibocitta',
      component: CiboCitta
    },
    {
      path: '/piramide',
      name: 'piramide',
      component: Piramide
    }
  ]
})

export default router;