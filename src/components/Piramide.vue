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
            <div class="cibo-container d-flex flex-wrap justify-content-center" ref="ciboContainer">
                <template v-for="(cibo) in food">
                    <div v-on:click="moveFood(cibo)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name">
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
let dimensions = {section1: {}, section2: {}, section3: {}, section4: {}, section5: {}, section6: {}}

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
            console.log("THE ELEMENT CLICKED", element.secondDestination);
            if(element.name == "cookie") {
                const { cookie, cookie1, cookie2, ciboContainer } = this.$refs;
                let dims = ciboContainer.getBoundingClientRect();
                console.log("DIMSSS", dims);
                let firstDest = dimensions[element.firstDestination];
                let secondDest = dimensions[element.secondDestination];

                console.log(firstDest, secondDest);

                timeline.to(cookie1, 1, { y: -(dims.y - firstDest.y), scale: 0.5});
                timeline.to(cookie2, 1, { y: -(dims.y - secondDest.y), scale: 0.5 });
            }
        },
        getPagePositions() {
            const { section1, section2, section3, section4, section5, section6 } = this.$refs;
            const section1Dimensions = section1.getBoundingClientRect();
            const section2Dimensions = section2.getBoundingClientRect();


            dimensions.section1 = section1Dimensions;
            dimensions.section2 = section2Dimensions;

            console.log("SECTION1 DIMENSIONS", dimensions);
        }
    }, 
}

</script>