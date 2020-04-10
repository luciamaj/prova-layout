// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'popper.js';
import 'jquery';
import 'vue-slick';
import 'bootstrap';
import { i18n } from './plugins/i18n.js';
import CountryFlag from 'vue-country-flag'

Vue.component('country-flag', CountryFlag)
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  CountryFlag,
  template: '<App/>',
  components: { App }
});