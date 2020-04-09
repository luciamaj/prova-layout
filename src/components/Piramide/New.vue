<template>
    <div class="new">
        <div class="main-wrapper">
            <div class="content">
                <div class="over"> <img src="../../assets/cammello.jpg" alt=""></div>
                <div class="row topPart">
                    <div class="col-lg-md-2 col-sm-1"> <button class="btn-control cancella"></button><div  class="btn-label">rimuovi</div></div>
                    <div class="col-lg-md-8 col-sm-10" ref="areaVass"> 
                        <img src="/static/piramide/piramidi.png" alt="vassoio" height="90%">
                        <div class="over-vassoio"> 
                            <div class="dish-1" id="dish-1" ref="dish1"></div>
                            <div class="dish-2" id="dish-2" ref="dish2"></div>
                            <div class="dish-3" id="dish-3" ref="dish3"></div>
                            <div class="dish-4" id="dish-4" ref="dish4"></div>
                        </div>
                    </div>
                    <div class="col-lg-md-2 col-sm-1" > <button class="btn-control fine"> </button><div class="btn-label">fine</div></div>
                </div>
                <div class="foodList">
                    <slick ref="slick" :options="slickOptions" :arrows="true" >
                        <template v-for="(piatto,index) in food" >
                            <div class="food-item" :ref="piatto.id" :id="piatto.id" v-bind:key="(piatto,index)"  v-on:click="selected(piatto)"> 
                                <div class="mainName">{{piatto.name}}</div>
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
import { data } from './../../data/piramide.js'
import Slick from 'vue-slick';
import jquery from 'jquery';
let $ = jquery;

export default {
    components: { Slick },
    data() {
        return {
            slickOptions: {
                slidesToShow: 7,
                slidesToScroll: 1,
                accessibility: true,
                adaptiveHeight: false,
                arrows: true,
                draggable: false,
                edgeFriction: 0.30,
                swipe: false,
                responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 2,
                    }
                }
                ],
            },
            food:data.food,
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
                  //selected.style.animationName="example";
                this.moveFood(piatto);
                }
            }
            console.log("lunghezza "+this.foodSelected.length);
            console.log(this.foodSelected);
            
        },

        moveFood(element) {

            console.log("THE ELEMENT CLICKED", element.id);
            let dishDiv= document.getElementById(element.id);
            let item=element.id;
            let item_ref=this.$refs[item];

                const timeline = new TimelineLite();

                let dimsDish;
                let dimOrizz= this.$refs.areaVass.getBoundingClientRect();
                let dimItem= dishDiv.getBoundingClientRect();

                let deltax;
                let deltay;
               
                /*console.log("DIMSSS orizz", dimOrizz);*/
                 //console.log("DIMSSS dish", dimsDish2); 
                 console.log("DIMSSS divtomove", dimItem);
                
                console.log("deltay", deltay); 

                dishDiv.style.backgroundColor="red";
                switch (this.foodSelected.length) {
                    case 1:
                        dimsDish = this.$refs.dish1.getBoundingClientRect();
                        deltax= dimsDish.x-dimItem.x;
                        deltay=dimsDish.y-dimItem.y;
                        break;
                
                    case 2:
                        dimsDish = this.$refs.dish2.getBoundingClientRect();
                        deltax= dimsDish.x-dimItem.x;
                        deltay=dimsDish.y-dimItem.y;
                           
                        break;
                    case 3:
                        dimsDish = this.$refs.dish3.getBoundingClientRect();
                        deltax= dimsDish.x-dimItem.x;
                        deltay=dimsDish.y-dimItem.y;
                        break;

                    case 4:
                        dimsDish = this.$refs.dish4.getBoundingClientRect();
                        deltax= dimsDish.x-dimItem.x;
                        deltay=dimsDish.y-dimItem.y;
                        break;
                
                    default:
                        break;
                }
                
                timeline.to(item_ref, 1, { y: deltay, x: deltax,  scale: 0.95});
                setTimeout(function(){

                    console.log('#'+element.id);
                    
                    let myDiv2Para = $('#'+element.id).detach();
                    myDiv2Para.appendTo('#dish-1');
                    //dishDiv.style.transform="translate(50%, 0)";

                }, 1000);
                
                    
                 //dishDiv.appendChild(this.$refs.dish1);

                  /*var photo = document.getElementById("cookie1");
                  photo.id  = "cookie1moved";
                  document.getElementById("piramide-container").appendChild(photo);

                  timeline.to(cookie2, 1, { y: -250, x: 50, scale: 0.5 });*/
           
        },

        completed(element) {
            console.log("HO COMPLETATO!", element);

            let myDiv2Para = $('#'+element.id).detach();
                    myDiv2Para.appendTo('#dish-1');
                    //myDiv2Para.style.top = '-200px';
                    //myDiv2Para.style.left = '-200px';
                    //dishDiv.style.transform="translateY(900px)";
        }
      
    }
}

</script>