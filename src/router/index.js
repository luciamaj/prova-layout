import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Piramide from './../components/Piramide.vue'
import Cultura from './../components/Cultura.vue'
import Piatto from './../components/PiattoVirtuale.vue'

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
      path: '/cultura',
      name: 'cultura',
      component: Cultura
    },
    {
      path: '/piatto_virtuale',
      name: 'piattoVirtuale',
      component: Piatto
    },
  ]
})

export default router;