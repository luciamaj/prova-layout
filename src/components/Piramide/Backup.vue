<template>
    <div class="piramide">
      <div class="main-wrapper">
         <div class="content viewport" :style="{overflow: overflow ? 'visible': 'hidden'}">
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
           <div class="caro">
            <div ref="viewport" >
            <button v-on:click="moveLeft()">LEFT</button>
            <button v-on:click="moveRight()">RIGHT</button>
              <div class="list-container" ref="listContainer">
                <ul class="list" ref="list">
                  <div class="list-item" v-for="(cibo, index) in food">
                      <div v-on:click="moveFood(cibo)" v-bind:key="cibo.name" class="fooditem" :ref="cibo.name" :id="cibo.name">
                          <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '1'">
                          <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" class="food-image" :ref="cibo.name + '2'">
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

const timeline = new TimelineLite();
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
      const items = this.$refs.list.querySelectorAll('.list-item')
      const itemWidth = this.$refs.viewport.clientWidth / 7
      const wrapWidth = this.count * itemWidth;
      console.log("LEFT", this.currentPos);
      console.log("the current item", this.currentItem);
     
      
      if (this.currentItem > 1) {
          this.currentItem -= 1;
        TweenMax.to(items, 1, {left: this.currentPos += itemWidth}) 
      }
    },
    moveRight() {
      const items = this.$refs.list.querySelectorAll('.list-item')
      const itemWidth = this.$refs.viewport.clientWidth / 7;
      const wrapWidth = 2 * itemWidth;
      
      if (this.currentItem <= items.length - 7) {
          this.currentItem += 1;
            TweenMax.to(items, 1, {left: this.currentPos -= itemWidth}); 
      }
    },
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