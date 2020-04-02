<template>
  <div class="piramide">
    <div class="main-wrapper">
        <div class="content">
            <div class="piramide-container">
                <div class="piramide-sections-container">
                    <div ref="section1" class="piramide-section"></div>
                    <div ref="section2" class="piramide-section"></div>
                    <div ref="section3" class="piramide-section"></div>
                    <div ref="section4" class="piramide-section"></div>
                    <div ref="section5" class="piramide-section"></div>
                    <div ref="section6" class="piramide-section"></div>
                </div>
            </div>
            <div class="cibo-container d-flex flex-wrap justify-content-center">
                <template v-for="(cibo) in food">
                    <div v-on:click="moveFood(cibo.name)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '1'">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '2'">
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
        this.getPagePositions();
    },
    methods: {
        moveFood(element) {
            console.log("THE ELEMENT CLICKED", element);
            if(element == "cookie") {
                const { cookie1, cookie2 } = this.$refs;

                timeline.to(cookie1, 1, { y: -250 });
                timeline.to(cookie2, 1, { y: -450 });
            }
        },
        getPagePositions() {
            const { section1, section2, section3, section4, section5, section6 } = this.$refs;
            const section1Dimensions = section1.getBoundingClientRect();
            console.log("SECTION1 DIMENSIONS", section1Dimensions);
        }
    }, 
}

</script>