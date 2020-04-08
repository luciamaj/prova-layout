<template>
  <div class="piramide-homepage">
    <div class="main-wrapper">
        <div class="content">
            <component v-bind:is="homepage" style="display:none;"></component>
            <component v-bind:is="app"></component>
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
import JQuery from 'jquery';
let $ = JQuery;

let intro = { template: "#intro-template" };
console.log("THE INTRO", TweenMax);

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
        //
    },
    created() {
        //
    },
    watch: {
        //
    },
    methods: {
        //
    }
  }
</script>