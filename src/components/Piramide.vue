<template>
  <div class="piramide">
    <div class="main-wrapper">
        <div class="content">
            <div class="piramide-container">
                <div class="piramide-sections-container">
                    <div class="piramide-section"></div>
                    <div class="piramide-section"></div>
                    <div class="piramide-section"></div>
                    <div class="piramide-section"></div>
                    <div class="piramide-section"></div>
                    <div class="piramide-section"></div>
                </div>
            </div>
            <div class="cibo-container d-flex flex-wrap justify-content-center">
                <template v-for="(cibo) in food">
                    <div v-on:click="moveFood(cibo.name)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image">
                    </div>
                </template>
            </div>
            <div class="resetbtn-container">RESET</div>
        </div>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import gsap from 'gsap';
import { Draggable } from 'gsap';
import { data } from './../data/piramide.js'

const timeline = new TimelineLite();
var overlapThreshold = "50%";
 
export default {
    data() {
        return {
            food: data.food,
        }
    },
    mounted() {
        //const { cookie } = this.$refs;
        //timeline.to(cookie, 1, { x: 200, rotation: 90 });
    },
    methods: {
        moveFood(element) {
            console.log("THE ELEMENT CLICKED", element);
            if(element == "cookie") {
                const { cookie } = this.$refs;
                timeline.to(cookie, 1, { y: -250 });
            }
        }
    }
}

</script>