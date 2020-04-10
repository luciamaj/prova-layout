<template>
    <div class="piatto-clone">
        <div class="main-wrapper">
            <div class="content">
                <div class="over"> <img src="../assets/cammello.jpg" alt=""></div>
                <div class="row topPart">
                    <div class="col-lg-md-2 col-sm-1" style="z-index:5;"> <button class="btn-control cancella" v-on:click="cancella()"></button><div  class="btn-label">rimuovi</div></div>
                    <div class="col-lg-md-8 col-sm-10" ref="areaVass"> 
                        <img src="/static/piatto_virtuale/vassoio.png" alt="vassoio">
                        <div class="over-vassoio">
                            <div class="dish-1" id="dish-1" ref="dish1"></div>
                            <div class="dish-2" id="dish-2" ref="dish2"></div>
                            <div class="dish-3" id="dish-3" ref="dish3"></div>
                            <div class="dish-4" id="dish-4" ref="dish4"></div>
                        </div>
                        <h3>Scegli fra le 25 pietanze proposte</h3>
                    </div>
                    <div class="col-lg-md-2 col-sm-1"  style="z-index:5;"> <button class="btn-control fine"> </button><div class="btn-label">fine</div></div>
                </div>
                <div class="">
                    <div class="carousel"> 
                        <div class="left arrow">
                            <button id="left">
                                    
                            </button>
                        </div>
                        <div class="right arrow">
                            <button id="right">
                               
                            </button>
                        </div>
                        <section id="top-bar">
                            <div id="clone-container">
                                <div id="scroll-box">
                                    <div id="tile-container">
                                        <template v-for="(piatto,index) in food" >
                                            <div v-bind:key="(piatto,index)" :id="piatto.id+'F'">
                                                
                                                <div class="food-item item-to-move" :ref="piatto.id" :id="piatto.id" > 
                                                    <div class="mainName">{{piatto.name}}</div>
                                                    <div class="secondName" v-if="piatto.name2!=null">{{piatto.name2}}</div>
                                                </div>
                                                <div class="food-item"  :id="piatto.id+'1'"   v-on:click="enlight(piatto)"> 
                                                    <div class="mainName">{{piatto.name}}</div>
                                                    <div class="secondName" v-if="piatto.name2!=null">{{piatto.name2}}</div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <!--slick ref="slick" :options="slickOptions" :arrows="true" >
                        <template v-for="(piatto,index) in food" >
                            <div v-bind:key="(piatto,index)" :id="piatto.id+'F'">
                                
                                <div class="food-item item-to-move" :ref="piatto.id" :id="piatto.id" > 
                                    <div class="mainName">{{piatto.name}}</div>
                                    <div class="secondName" v-if="piatto.name2!=null">{{piatto.name2}}</div>
                                </div>
                                <div class="food-item"  :id="piatto.id+'1'"   v-on:click="enlight(piatto)"> 
                                    <div class="mainName">{{piatto.name}}</div>
                                    <div class="secondName" v-if="piatto.name2!=null">{{piatto.name2}}</div>
                                </div>
                            </div>
                        </template>
                    </slick-->
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
import jquery from 'jquery';
let $ = jquery;

const timeline = new TimelineLite();


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
    mounted() {
        this.scrollArrows();
     
    },
    methods: {
        
        scrollArrows() {
            let content = $("#tile-container");
            let box = $("#scroll-box");

            console.log("W", content.width());
            console.log("H", content.height());

            let offset = content.width() / $('.tile-wrapper').length;
            const {top, left} = content.offset();
            const adjustment = 10;
            var isMoving = false;

            $('#left').click(function(e) {
                console.log("click left");

                if (isMoving == false) {
                    isMoving = true;
                    $("#scroll-box").animate({
                        scrollLeft: '-=120'
                    }, 500, 'swing', function () {
                        console.log("done");
                        isMoving = false;
                    });
                }
            });

            $('#right').click(function(e) {
                console.log("clickright");
                
                if (isMoving == false) {
                    isMoving = true;

                    $("#scroll-box").animate({
                        scrollLeft: '+=120'
                    }, 500, 'swing', function () {
                        console.log("done");
                        isMoving = false;
                    });
                }
            })
        },
        enlight(piatto){
            let divCaro=document.getElementById(piatto.id+'1');
            let selected= document.getElementById(piatto.id);
            let dish= document.getElementById("dish-1");
            console.log("selected "+selected);
            let found= this.foodSelected.find(food=>food== piatto.id);
            console.log("found "+found);
            if(this.foodSelected.length<4){
                if( !found){
                this.foodSelected.push(piatto.id);
                divCaro.style.border="solid 3px white";
                selected.style.border="solid 2px white";
                 selected.style.opacity="0.9"
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
            let myDiv2Para;
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
                     timeline.to(item_ref, 1, { y: deltay, x: deltax,  scale: 0.95});
                    setTimeout(function(){
                        
                        myDiv2Para = $('#'+element.id).detach();
                        myDiv2Para.appendTo('#dish-1');
                    
                    }, 1000);
                    break;
            
                case 2:
                    dimsDish = this.$refs.dish2.getBoundingClientRect();
                    deltax= dimsDish.x-dimItem.x;
                    deltay=dimsDish.y-dimItem.y;
                     timeline.to(item_ref, 1, { y: deltay, x: deltax,  scale: 0.95});
                    setTimeout(function(){
                        
                        myDiv2Para = $('#'+element.id).detach();
                        myDiv2Para.appendTo('#dish-2');
                       
            }, 1000);
                        
                    break;
                case 3:
                    dimsDish = this.$refs.dish3.getBoundingClientRect();
                    deltax= dimsDish.x-dimItem.x;
                    deltay=dimsDish.y-dimItem.y;
                     timeline.to(item_ref, 1, { y: deltay, x: deltax,  scale: 0.95});
                    setTimeout(function(){
                        
                        myDiv2Para = $('#'+element.id).detach();
                        myDiv2Para.appendTo('#dish-3');
                       

                    }, 1000);
                    break;

                case 4:
                    dimsDish = this.$refs.dish4.getBoundingClientRect();
                    deltax= dimsDish.x-dimItem.x;
                    deltay=dimsDish.y-dimItem.y;
                    timeline.to(item_ref, 1, { y: deltay, x: deltax,  scale: 0.95});
                    setTimeout(function(){
                        
                        myDiv2Para = $('#'+element.id).detach();
                        myDiv2Para.appendTo('#dish-4');
                        
                        
                    }, 1000);
                    break;
            }
            
            
           // dishDiv.setAttribute("onclick","alert('blah');");
            timeline.set(item_ref, { y: -1, x: -1, scale: 0.95 } );
           
                    
                           
        },
        selected(element){
         // let  dishIn=document.getElementById(element.id);
            console.log("SONO CLiccato");
            //dishIn.style.border="solid 3px white";

        },

        cancella(){
            let ultimoPiatto;
            let ultimoDiv;
            let ultimoDiv1;
            ultimoPiatto=this.foodSelected[this.foodSelected.length-1];
           console.log("ultimo "+ ultimoPiatto);
           
            ultimoDiv=document.getElementById(ultimoPiatto);
            ultimoDiv.style="";
                 
            ultimoDiv1=document.getElementById(ultimoPiatto+"1");
            ultimoDiv1.style="";
            let piattojq = $('#'+ultimoPiatto).detach(); 
           
            piattojq.insertBefore($('#'+ultimoPiatto+'F'));

           // piattojq.before(other);
            this.foodSelected.pop();

        }
      
    }
}

</script>