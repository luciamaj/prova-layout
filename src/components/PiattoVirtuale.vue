<template>
    <div class="piatto">
        <div class="main-wrapper">
            <div class="content">
                <div class="over"> <img src="../assets/cammello.jpg" alt=""></div>
                <div class="row topPart">
                    <div class="col-lg-md-2 col-sm-1"> <button class="btn-control cancella"></button><div  class="btn-label">rimuovi</div></div>
                    <div class="col-lg-md-8 col-sm-10"> 
                        <img src="/static/piatto_virtuale/vassoio.png" alt="vassoio">
                        <div class="over-vassoio"> 
                            <div class="dish-1" id="dish-1"><img src="../assets/cammello.jpg" alt=""></div>
                            <div class="dish-2"></div>
                            <div class="dish-3"></div>
                            <div class="dish-4"></div>
                        </div>
                        <h3>Scegli fra le 25 pietanze proposte</h3>
                    </div>
                    <div class="col-lg-md-2 col-sm-1" > <button class="btn-control fine"> </button><div class="btn-label">fine</div></div>
                </div>
                <div class="foodList">
                    <slick ref="slick" :options="slickOptions" :arrows="true" >
                        <template v-for="(piatto,index) in food" >
                            <div class="food-item" :id="piatto.id" v-bind:key="(piatto,index)"  v-on:click="selected(piatto)"> 
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
            
            let selected= document.getElementById(piatto.id);
            let dish= document.getElementById("dish-1");
            console.log("selected "+selected);
            let found= this.foodSelected.find(food=>food== piatto.id);
            console.log("found "+found);
            if(this.foodSelected.length<4){
                if( !found){
                this.foodSelected.push(piatto.id);
                selected.style.border="solid 1px white";
                  selected.style.animationName="example";
                  dish.style.animationName="dish-drop";
                }
            }

               if(element.name == "cookie") {
                const { cookie, cookie1, cookie2, ciboContainer } = this.$refs;
                let dims = ciboContainer.getBoundingClientRect();
                console.log("DIMSSS", dims);
                let firstDest = dimensions[element.firstDestination];
                let secondDest = dimensions[element.secondDestination];

                console.log(firstDest, secondDest);
                
                document.getElementById("cookie2").style.position = "absolute";
                document.getElementById("cookie2").style.zIndex = 999;

                
                timeline.to(cookie1, 1, { y: -200, x: -30,  scale: 0.5});
                timeline.to(cookie2, 1, { y: 200, x: 50, scale: 0.5 });
            }

            console.log("lunghezza "+this.foodSelected.length);
            console.log(this.foodSelected);
            
        },

         
      
    }
}

</script>