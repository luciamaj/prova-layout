<template>
  <div class="piramide-homepage">
    <div class="main-wrapper">
                    <button v-on:click="move">MOVE</button>
        <div class="content">
            <component ref="cane" v-bind:is="homepage"></component>
            <component ref="gatto" v-bind:is="app"></component>
        </div>
    </div>            
  </div>
</template>

<script>
import homepage from './PiramideHomepage';
import app from './PiramideApp';
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { TimelineLite } from 'gsap';
import { TweenMax } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
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
        }
    },
    computed: {
      //
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