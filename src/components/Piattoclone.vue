<template>
    <div class="piatto-clone">
        
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
                                             <div class="tile-wrapper" v-bind:key="(piatto,index)" :id="piatto.id+'F'">
                                                <div class=" tile" :ref="piatto.id" :id="piatto.id" > 
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
                               
            </div>
        
    </div>
</template>


<script>


import { TimelineLite } from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { TweenLite } from 'gsap'
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { ScrollTo } from "gsap";
import { data } from './../data/piatto.js';
import JQuery from 'jquery';
let $ = JQuery;

const timeline = new TimelineLite();
function getPosition(wrapper, offset, container) {
  var position1 = wrapper.offset();
  var position2 = container.offset();

  return {
    x: position1.left - position2.left + offset.left,
    y: position1.top  - position2.top  + offset.top
  };
}


export default {
    //components: { Slick },
    data() {
        return {
            /*slickOptions: {
                slidesToShow: 5,
                slidesToScroll: 5,
                 
                accessibility: true,
                adaptiveHeight: false,
                arrows: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            },*/
            food:data.piatto,
            foodSelected:[],
            carouselOptions: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }

        }
    },
    mounted() {
        gsap.registerPlugin(ScrollToPlugin);
        this.scrollArrows();
        this.clone();
        this.setCarousel();
    },
    methods: {
        setCarousel(){
            let content = $("#tile-container");
            let box = $("#scroll-box");
            let wrapper = $(".tile-wrapper");
            let page = $(".piatto-clone");
           // let wrapper = document.getElementsByClassName("tile-wrapper");
            console.log("W", page.width());
            let boxW=box.width()
            let ratio=(boxW)/(this.carouselOptions.slidesToShow);
             console.log("R ", ratio);
             wrapper.css("width", ratio + "px")
            //wrapper.style.width= ratio + "px";
            
        },
        scrollArrows() {
            let content = $("#tile-container");
            let box = $("#scroll-box");
            let wrapper=$('.tile-wrapper');

            console.log("W", content.width());
            console.log("H", content.height());

            let offset = content.width() / $('.tile-wrapper').length;
            const {top, left} = content.offset();
            const adjustment = 10;
            var isMoving = false;
            let el = $("#scroll-box");

            $('#left').click(function(e) {
                console.log("click left");
                    if(isMoving == false) {
                        isMoving = true;
                        gsap.to(el, 1, {scrollTo: {x: '-='+(wrapper.width())}, onComplete: function() {
                            console.log("complete");
                            isMoving = false;
                        }})
                    }
            });

            $('#right').click(function(e) {
                console.log("clickright");
                if (isMoving == false) {
                    isMoving = true;
                    gsap.to(el, 1, {scrollTo: {x: '+='+(wrapper.width())}, onComplete: function() {
                        console.log("complete");
                        isMoving = false;
                    }})
                }
            })
        },

        clone() {
            var container = $("#clone-container");
            var scrollBox = $("#scroll-box");
            var dropPanel = $("#drop-panel");
            var tiles     = $(".tile");
            var threshold = "50%";

           
            tiles.each(function() {
                var element = $(this);
                var wrapper = element.parent();
                var offset  = element.position();

                var scope = {
                    clone1   : element.clone().addClass("clone").addClass("clone1").prependTo(container),
                    element : element,
                    wrapper : wrapper,
                    width   : wrapper.outerWidth(),
                    dropped : false,
                    moved   : false,
                    get x() { return getPosition(wrapper, offset, container).x; },
                    get y() { return getPosition(wrapper, offset, container).y; }
                };

                console.log("THE ELEMENT", element);

                


                //scope.draggable = createDraggable(scope);

                element.click(function() {
                    let dish=document.getElementById("dish-2");
                    let dimsDish;
                    let dimelement;
                    dimsDish=dish.getBoundingClientRect();
                    dimelement=this.getBoundingClientRect();
                    console.log("dimss "+dimsDish.x+" "+ dimsDish.y  );
                    console.log("dimss me "+dimelement.x+" "+ dimelement.y  );
                    let xDish=dimsDish.x-scope.x;
                    let yDish=dimsDish.y-dimelement.y;
                    console.log("diff "+xDish+" "+yDish);
                    console.log("ho cliccato sugli elementi");
                    TweenLite.set(scope.element, { autoAlpha: 0.9, border: "solid 2px white" });
                    TweenLite.set(scope.clone1, { x: scope.x, y: scope.y, autoAlpha: 0.9, scale: 0.92 });

                    console.log("POS", scope.x, scope.y);
                   // this.foodSelected.push(element);
                    // console.log("sel", this.foodSelected);
                    timeline.to(scope.clone1, 1, {x:dimsDish.x, top: yDish});
                   
                });

                scope.clone1.click(function() {
                    console.log("ho cliccato sui cloni");
                })
            });
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