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
                <template v-for="(cibo, idx) in food">
                    <div v-bind:key="idx" class="fooditem">
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
 
export default {
    data() {
        return {
            food: data.food,
        }
    }
}

</script>