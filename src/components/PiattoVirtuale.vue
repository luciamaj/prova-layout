<template>
    <div class="piatto">
        <div class="main-wrapper">
            <div class="content">
                <div class="over"> <img src="../assets/cammello.jpg" alt=""></div>
                <div class="row topPart">
                    <div class="col-lg-2"> <button class="btn-control cancella"></button><div  class="btn-label">rimuovi</div></div>
                    <div class="col-lg-8"> 
                        <img src="/static/piatto_virtuale/vassoio.png" alt="vassoio">
                        <h3>Scegli fra le 25 pietanze proposte</h3>
                    </div>
                    <div class="col-lg-2"> <button class="btn-control fine"> </button><div class="btn-label">fine</div></div>
                </div>
                <div class="foodList">
                    <slick ref="slick" :options="slickOptions" :arrows="true" >
                        <template v-for="(piatto,index) in food" >
                            <div class="food-item"  v-bind:key="(piatto,index)"  v-on:click="selected(piatto)"> 
                                <div class="mainName">{{piatto.name}}</div>
                                <div class="secondName" v-if="piatto.name2!=null">{{piatto.name2}}</div>
                            </div>
                        </template>
                    </slick>
                </div>
            </div>
        </div>
    </div>
</template>


<script>


import { TimelineLite } from 'gsap'
import gsap from 'gsap';
import { Draggable } from 'gsap';
import { data } from './../data/piatto.js'
import Slick from 'vue-slick';


const timeline = new TimelineLite();
let dimensions = {section1: {}, section2: {}, section3: {}, section4: {}, section5: {}, section6: {}}

export default {
    components: { Slick },
    data() {
        return {
            slickOptions: {
                slidesToShow: 5,
                slidesToScroll: 5,
                 
                accessibility: true,
                adaptiveHeight: false,
                arrows: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            },
            food:data.piatto,
            foodSelected:[]
        }
    },
    methods: {
        
        selected(piatto){
            let found= this.foodSelected.find(food=>food== piatto.name+ " "+piatto.name2);
            console.log("found "+found);
            if( !found){
                this.foodSelected.push(piatto.name+ " "+piatto.name2);
            }
            console.log(this.foodSelected);
        }
    }
}

</script>