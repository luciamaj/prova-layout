<template>
  <div id="app">  
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import 'css/flaticon.css';
@import '../node_modules/slick-carousel/slick/slick.css';
@import 'css/libs/bootstrap.min.css';
@import 'scss/style.scss';
</style>

<script>

import { store } from './store/store.js'
import JQuery from 'jquery';
let $ = JQuery;

console.log($);

export default {
  name: 'app',
  store,
  components: { },
  created () {
  },
  methods: {
  }
}
</script>