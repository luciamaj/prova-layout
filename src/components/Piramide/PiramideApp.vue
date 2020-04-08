<template>
  <div class="piramide-app">
    <div class="main-wrapper">
        <div class="content">
             <div style="background-color: blue;  height: 100%;">
                <a href="#/piramide">pira</a>
             </div>
             <div style="background-color: blue; height: 100%; display: none">CONTENT 2</div>
        </div>
    </div>            
  </div>
</template>

<script>
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { TimelineLite } from 'gsap';
import { TweenMax } from 'gsap';
import JQuery from 'jquery';
let $ = JQuery;

let intro = { template: "#intro-template" };
console.log("THE INTRO", TweenMax);

export default {
    name: 'app',
    components: { },
    data () {
        return {
            visible: false
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
        appear(el, done) {
            this.tweenIn( el, done );
        },
        enter (el, done) {
            this.tweenIn( el, done );
        },
        leave(el, done) {
             this.tweenOut( el, done );
        },
        tweenIn( el, done ) {       
            TweenMax.from( el, 1, { autoAlpha: 0, onComplete: done } );     
        },
        tweenOut( el, done ) {   
            TweenMax.to( el, 1, { autoAlpha: 0, onComplete: done } );
        },
    }
  }
</script>