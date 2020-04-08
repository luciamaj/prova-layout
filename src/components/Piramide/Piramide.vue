<template>
  <div class="piramide">
    <div class="main-wrapper">
         <div class="content">
            <div class="piramide-container">
                <div class="piramide-sections-container" ref="sectionList">
                    <div ref="section1" class="piramide-section"></div>
                    <div ref="section2" class="piramide-section"></div>
                    <div ref="section3" class="piramide-section"></div>
                    <div ref="section4" class="piramide-section"></div>
                    <div ref="section5" class="piramide-section"></div>
                    <div ref="section6" class="piramide-section"></div>
                </div>
            </div>
            <!-- <div class="cibo-container d-flex flex-wrap justify-content-center" ref="ciboContainer">
                <template v-for="(cibo) in food">
                    <div v-on:click="moveFood(cibo)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name" :id="cibo.name">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '1'">
                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '2'">
                    </div>
                </template>
                
            </div> -->
            <div ref="ciboContainer">
                <slick ref="slick" :options="slickOptions" :arrows="true" >
                    <template v-for="(cibo, index) in food">
                        <div class="food-item"  v-bind:key="(cibo,index)"> 
                            <div class="mainName">{{cibo.name}}</div>
                            <div v-on:click="moveFood(cibo)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name" :id="cibo.name">
                                <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '1'">
                                <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '2'">
                            </div>
                        </div>
                    </template>
                </slick>
            </div>
            <div class="resetbtn-container">
                <div id="button-reset" v-on:click="resetPositions()">
                    RESET
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import gsap from 'gsap';
import { Draggable } from 'gsap';
import { data } from './../../data/piramide.js'
import { TweenMax } from 'gsap';
import Slick from 'vue-slick';

const timeline = new TimelineLite();
let dimensions = {section1: {}, section2: {}, section3: {}, section4: {}, section5: {}, section6: {}}

export default {
    components: { Slick },
    data() {
        return {
            food: data.food,
            slickOptions: {
                slidesToShow: 5,
                slidesToScroll: 1,                 
                accessibility: true,
                adaptiveHeight: false,
                arrows: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            },
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

                timeline.to(cookie1, 1, { y: 1200, x: -30,  scale: 0.5});
                timeline.to(cookie2, 1, { y: 1200, x: 50, scale: 0.5 });
            }
        },
        getPagePositions() {
            const { section1, section2, section3, section4, section5, section6 } = this.$refs;
            const section1Dimensions = section1.getBoundingClientRect();
            const section2Dimensions = section2.getBoundingClientRect();


            dimensions.section1 = section1Dimensions;
            dimensions.section2 = section2Dimensions;

            console.log("SECTION1 DIMENSIONS", dimensions);
        },
        resetPositions() {
            let eventItems = this.$refs.ciboContainer.children;
            let imgs = [];

            for (const el of eventItems) {
                for (const child of el.children) {
                    imgs.push(child);
                }
            }

            const { cookie, cookie1, cookie2, ciboContainer } = this.$refs;

            timeline.to(eventItems, 1, { opacity: 0 });
            timeline.to(imgs, 1, { y: 0, x: 0, scale: 1 });
            timeline.to(eventItems, 1, { opacity: 1 });

            
            console.log("SectionList", eventItems.banana);
        }
    }, 
}

</script>