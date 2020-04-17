import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Piramide from './../components/Piramide/Piramide.vue'
import Cultura from './../components/Cultura.vue'
import Piatto from './../components/PiattoVirtuale.vue'
import CiboCitta from './../components/CiboCitta/CiboCitta.vue'
import CiboSDG from './../components/CiboSDG/CiboSDG.vue'

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
      path: '/cibocitta',
      name: 'cibocitta',
      component: CiboCitta
    },
    {
      path: '/piramide',
      name: 'piramide',
      component: Piramide
    },
    {
      path: '/cibosdg',
      name: 'cibosdg',
      component: CiboSDG
    }
  ]
})

export default router;