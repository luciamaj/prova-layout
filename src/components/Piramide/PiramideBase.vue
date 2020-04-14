<template>
  <div class="piramide-homepage">
      <div class="content">
          <h1 style="color: white;">{{ message }}</h1>
          <child v-on:listenerChild="listenerChild"/>
          <component @inputPage="changePage()" ref="page" v-bind:is="this.currentPage"></component>
      </div>
  </div>
</template>

<script>
import homepage from './PiramideHomepage';
import app from './Clone';
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { TimelineLite } from 'gsap';
import { TweenMax } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import JQuery from 'jquery';
let $ = JQuery;

let intro = { template: "#intro-template" };
console.log("THE INTRO", TweenMax);
gsap.registerPlugin(CSSPlugin)

export default {
    components: { },
    data () {
        return {
            homepage: homepage,
            app: app,
            currentPage: homepage,
            message: "Where are you, my Child?"
        }
    },
    components: {
      app,
      homepage
    },
    computed: {
      //
    },
    methods: {
      listenerChild(reply) {
        this.message = reply;
      }
    },
    mounted() {
        
    },
    created() {
        //
    },
    watch: {
        //
    },
    methods: {
        move() {
            const { cane } = this.$refs;
            console.log(cane);
            const timeline = new TimelineLite();
            timeline.to(cane, 1, { y: 1000, x: 2000,  scale: 0.5});
        }
    }
  }
</script>