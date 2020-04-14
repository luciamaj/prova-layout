<template>
  <div class="piramide-homepage">
    <div class="main-wrapper">
        <div class="content">
            <button @click="replyDaddy">Reply Daddy</button>
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

let intro = { template: "#intro-template" };
console.log("THE INTRO", TweenMax);

export default {
    name: 'homepage',
    components: { },
    data () {
        return {
            visible: false
        }
    },
    computed: {
      //
    },
    created() {
        //
    },
    watch: {
        //
    },
    methods: {
        replyDaddy() {
            this.$emit("listenerChild", "I'm here my Daddy!");
        },
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