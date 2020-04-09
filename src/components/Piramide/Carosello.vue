<template>
    <div class="piramide">
      <div class="main-wrapper">
         <div class="content viewport" :style="{overflow: overflow ? 'visible': 'hidden'}">
            <div id="piramide-container" class="piramide-container">
                <div class="piramide-sections-container" ref="sectionList">
                    <div ref="section1" class="piramide-section"></div>
                    <div ref="section2" class="piramide-section"></div>
                    <div ref="section3" class="piramide-section"></div>
                    <div ref="section4" class="piramide-section"></div>
                    <div ref="section5" class="piramide-section"></div>
                    <div id="section6" ref="section6" class="piramide-section"></div>
                </div>
            </div>
           <div class="caro" ref="ciboContainer">
            <div ref="viewport" >
            <button v-on:click="moveLeft()">LEFT</button>
            <button v-on:click="moveRight()">RIGHT</button>
              <div class="list-container" ref="listContainer">
                <ul class="list" ref="list">
                  <div class="list-item" v-for="(cibo, index) in food">
                      <div v-on:click="moveFood(cibo)" v-bind:key="cibo.name" :class="'fooditem ' + cibo.name + '-container'" :ref="cibo.name" :id="cibo.name">
                          <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" :ref="cibo.name + '1'" :id="cibo.name + '1'" :class="cibo.name">
                          <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" :ref="cibo.name + '2'" :id="cibo.name + '2'" :class="cibo.name">
                      </div>
                  </div>
                </ul>
              </div>
              
            </div>
          </div>
        </div>

  </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { data } from './../../data/piramide.js'
import { TweenMax } from 'gsap';
import { TweenLite } from 'gsap';
import { Linear } from 'gsap';
import Slick from 'vue-slick';
import jquery from 'jquery';

let dimensions = {section1: {}, section2: {}, section3: {}, section4: {}, section5: {}, section6: {}};

export default {
    data() {
        return {
		list: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
        overflow: false,
        currentPos: 0,
        currentItem: 1,
        food: data.food,
        }
	},
	computed: {
		count() {
            console.log("DOCUMENT", document);
			return this.food.length
		}
	},
	methods: {
    moveLeft() {
      const items = this.$refs.list.querySelectorAll('.list-item');
      const cookies = this.$refs.list.querySelectorAll('.done')

      const itemWidth = this.$refs.viewport.clientWidth / 7
      const wrapWidth = this.count * itemWidth;
      console.log("LEFT", this.currentPos);
      console.log("the current item", this.currentItem);

      const tl = new TimelineLite();
     
      
      if (this.currentItem > 1) {
        let oldPos = this.currentPos;
        let calc = oldPos += itemWidth

          this.currentItem -= 1;
                  tl.to(items, 1, {left: this.currentPos += itemWidth}, 0); 

          tl.to(cookies, 1, {left: -calc}, 0);
      }
    },
    moveRight() {
      const items = this.$refs.list.querySelectorAll('.list-item')
      const itemWidth = this.$refs.viewport.clientWidth / 7;
      const wrapWidth = 2 * itemWidth;
      const cookies = this.$refs.list.querySelectorAll('.done')

      console.log(cookies);
      const tl = new TimelineLite();



      console.log(this.currentItem);
      
      if (this.currentItem <= items.length - 7) {
          this.currentItem += 1;
          let oldPos = this.currentPos;
          let calc = oldPos -= itemWidth

          //tl.to(items, 1, {left: calc}, 0);
          tl.to(items, 1, {left: this.currentPos -= itemWidth}, 0); 
          tl.to(cookies, 1, {left: -calc}, 0);
      }
    },
    moveFood(element) {
            const timeline = new TimelineLite();
            console.log("THE ELEMENT CLICKED", element.secondDestination);

            let found = this.food.find(x => x.name == "cookie");

            if(element.name == "cookie") {
                jquery(".cookie-container").addClass("done");
                const { cookie, cookie1, cookie2, ciboContainer } = this.$refs;
                let dims = ciboContainer.getBoundingClientRect();
                let firstDest = dimensions[element.firstDestination];
                let secondDest = dimensions[element.secondDestination];

                console.log(firstDest, secondDest);
                  timeline.to(cookie1, 1, { y: -450, x: 200,  scale: 0.5});
                  timeline.to(cookie2, 1, { y: -250, x: 50, scale: 0.5 });
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
  mounted () {
    //gsap.registerPlugin(Draggable);
    const proxy = document.createElement("div")
    const items = this.$refs.list.querySelectorAll('.list-item')
    const itemWidth = this.$refs.viewport.clientWidth / 7
    const wrapWidth = this.count * itemWidth

    items.forEach((item, i) => {
      TweenLite.set(item, {
        x: i * itemWidth,
        width: itemWidth
      })
    });
  }
}

</script>