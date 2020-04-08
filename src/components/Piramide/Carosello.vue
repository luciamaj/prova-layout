<template>
    <div>
<label>
    <input type="checkbox" name="overflow" id="overflow" v-model="overflow" /> Show overflow
  </label>
  <button v-on:click="moveLeft()">LEFT</button>
  <button v-on:click="moveRight()">RIGHT</button>
  <div class="viewport" ref="viewport" :style="{overflow: overflow ? 'visible': 'hidden'}">
    <div class="list-container" ref="listContainer">
      <ul class="list" ref="list">
        <li class="list-item" v-for="item in list">
          {{item}}
        </li>
      </ul>
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
import { TweenLite } from 'gsap';
import Slick from 'vue-slick';

const timeline = new TimelineLite();
let dimensions = {section1: {}, section2: {}, section3: {}, section4: {}, section5: {}, section6: {}}

export default {
    data() {
        return {
		list: ["10", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        overflow: false,
        currentPos: 0
        }
	},
	computed: {
		count() {
			return this.list.length
		}
	},
	methods: {
    moveLeft() {
      console.log("MOVE LEFT");
      const items = this.$refs.list.querySelectorAll('li')
      const itemWidth = this.$refs.viewport.clientWidth / 4
      const wrapWidth = this.count * itemWidth
      
      TweenMax.to(items, 1, {left: this.currentPos += itemWidth}) 
    },
    moveRight() {
      console.log("MOVE LEFT");
      const items = this.$refs.list.querySelectorAll('li')
      const itemWidth = this.$refs.viewport.clientWidth / 4
      const wrapWidth = this.count * itemWidth
      
      TweenMax.to(items, 1, {left: this.currentPos -= itemWidth}) 
    },
    updateProgress() {
       const proxy = document.createElement("div")
    const items = this.$refs.list.querySelectorAll('li')
    const itemWidth = this.$refs.viewport.clientWidth / 4
    const wrapWidth = this.count * itemWidth

    const animation = TweenMax.to(items, 1, {
      x: "+=" + wrapWidth,
      ease: Linear.easeNone,
      paused: true,
      repeat: -1,
      modifiers: {
        x: function(x) {
          x %= wrapWidth
          return x
        }
      }
    });
      
      animation.progress(this.x / wrapWidth);
    }
	},
  mounted () {
    const proxy = document.createElement("div")
    const items = this.$refs.list.querySelectorAll('li')
    const itemWidth = this.$refs.viewport.clientWidth / 4
    const wrapWidth = this.count * itemWidth

    TweenLite.set(this.$refs.list, {
      left: -itemWidth 
    })

    items.forEach((item, i) => {
      TweenLite.set(item, {
        x: i * itemWidth,
        width: itemWidth
      })
    })

    const animation = TweenMax.to(items, 1, {
      x: "+=" + wrapWidth,
      ease: Linear.easeNone,
      paused: true,
      repeat: -1,
      modifiers: {
        x: function(x) {
          x %= wrapWidth
          return x
        }
      }
    });

    Draggable.create(proxy, {
      type: 'x',
      trigger: this.$refs.listContainer,
      throwProps: true,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: (x) => Math.round(x / itemWidth) * itemWidth
      }
    })

    function updateProgress() {
      animation.progress(this.x / wrapWidth);
    }
  }
}

</script>