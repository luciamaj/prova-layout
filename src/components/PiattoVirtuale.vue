<template>
    <div class="piatto-virtuale">

            <div id="over">
                <div id="name-game"></div>
                <div v-on:click="hideStart()" id="start-game">START GAME</div>
                <img src="../assets/cammello.jpg" alt="">
            </div>
           
            <div class="content">
                <div class="over"> 
                    <div class="vassoio">
                        <img  src="/static/piatto_virtuale/vassoio_inizio.png" alt="vassoioIntro">
                        <div class="istruzioni"> 
                            <div class="title-instr">Benvenuti al Sustainable Restaurant!</div>
                            <div class="text-instr">Metti sul vassoio <br> quello che vorresti mangiare per un pasto.<br>
                                Alla fine scoprirai <br>se la tua dieta <br> è equilibrata per te e per il pianeta.</div>
                            
                        </div>
                    </div>
                    <div class="imgMondo-intro">

                    </div>
                </div>
                <div class="topPart">
                    
                    <div class=" mid-section" ref="areaVass"> 
                        <div class="area-vass">
                            <div class="dish" id="dish-1" ref="dish1"></div>
                            <div class="dish" id="dish-2" ref="dish2"></div>
                            <div class="dish" id="dish-3" ref="dish3"></div>
                            <div class="dish" id="dish-4" ref="dish4"></div>
                            <img src="/static/piatto_virtuale/vassoio.png" alt="vassoio">
                        </div>
                        
                        
                        <h3>Scegli fra le 25 pietanze proposte</h3>
                    </div>
                    <div class="topleft" style="z-index:5;"> <button class="btn-control cancella" v-on:click="cancella()"></button><div  class="btn-label">rimuovi</div></div>
                    <div class="topright"  style="z-index:5;"> <button class="btn-control fine" v-on:click="showEnding()"> </button><div class="btn-label">fine</div></div>
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
                                                     <img :src="'/static/piatto_virtuale/cibo/'+piatto.id+'.png'" alt="vassoio">
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
             <div id="over-ending"  >
                <div class="heading"> 
                    <h3>Hai fatto la tua scelta. Ora controlla il “conto”. <br> È troppo sbilanciato? Oppure il tuo modo di nutrirti è sano e sostenibile?</h3>
                    <h3>Ogni nostra decisione ha un impatto sulla nostra salute e su quella dell’ambiente,  <br> per questo è importante scegliere consapevolmente</h3>
                </div>
                
                <div class="row sum ">
                    <div class="col-lg-5 check" v-bind="total" >
                        <div class="title">Le tue pietanze “costano”<br> in termini di CO2 prodotta: {{Math.round(total.co2 * 100) / 100}} kg</div>
                        <template v-for="cibo in food" >
                            <template v-bind="foodSelected">
                            <div class="row" v-if="foodSelected.find(el=> el==cibo.id)"  :key="cibo" >
                                <div class="col-7 item">{{cibo.name}} <template  v-if="cibo.name2!=null">{{cibo.name2}}</template></div>
                                <div class="col-5 amount" >{{ Math.round(cibo.CO2* 100) / 100}} kg di CO2</div>
                            </div>
                            </template>
                        </template>
                        <div class="row totale">
                            <div class="col-7" >Totale</div>
                            <div class="col-5 amount" ><div>{{Math.round(total.co2 * 100) / 100}} kg di CO2</div></div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mondoImg" alt="mondo"></div>
                        <div> Il tuo risultato genera CO2 equivalente a quella <br> prodotta da un viaggio in automobile da Parma a XXXX</div>
                    </div>
                    <div><button v-on:click="finalEnding" >Altro</button></div>
                </div>
                
            </div>
            <div id="final-ending">
                <div class="top">
                    <div class="img"></div>
                    <div class="side">
                        <h3>Il pasto che hai composto ha totalizzato</h3>
                        <div class="row" v-bind="total">
                            <div class="col-6">
                                <div>{{Math.round(total.carb * 100) / 100}} carboidrati (g)</div>
                                <div>{{Math.round(total.fat * 100) / 100}} grassi (g)</div>
                                <div>{{Math.round(total.fibr * 100) / 100}} fibra (g)</div>
                            </div>
                            <div class="col-6">
                                <div>{{Math.round(total.prot * 100) / 100}} proteine (g)</div>
                                <div>{{Math.round(total.sat * 100) / 100}} di cui saturi (g)</div>
                                <div>{{Math.round(total.kcal * 100) / 100}} calorie (Kcal)</div>
                            </div>
                        </div>
                        <div class="text">
                        <div class="">I grassi saturi non dovrebbero superare il 10% delle calorie giornaliere. Questi si trovano principalmente nei formaggi,
                        burro, olio di palma e di cocco, latticini, salumi, insaccati.</div>
                        <div class="">La fibra svolge un ruolo benefico per la salute. Cerca di assumerne 15 g per ogni 1000 Kcal.</div>
                        </div>
                    </div>
                </div>
                <div class="bottom">Per aumentare la fibra nella tua alimentazione, scegli cereali integrali e i derivati a base di farina integrale, e
                    aumenta il consumo di legumi, frutta e verdura.</div>
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

//$(window).onresize = this.reportWindowSize();
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
            },
            positions:[],
            scopes: [],
            total:{
                co2:0,
                carb:0,
                fat:0,
                sat:0,
                fibr:0,
                prot:0,
                kcal:0
            }
        

        }
    },
    mounted() {
        gsap.registerPlugin(ScrollToPlugin);
        this.scrollArrows();
        this.clone();
        this.setCarousel();
        this.getPosition();
         
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
             var width = $(window).width();
            console.log(width);
            if (width <= 1200) {
                this.carouselOptions.slidesToShow = 3;
                 this.carouselOptions.slidesToScroll = 3;
                console.log("STO RISETTANDO", this.carouselOptions.slidesToShow);

            }
            let ratio=(boxW)/(this.carouselOptions.slidesToShow);
             console.log("R ", ratio);
             wrapper.css("width", ratio + "px")
           
            
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
                        gsap.to(el, 1, {scrollTo: {x: '-='+(wrapper.width())*2}, onComplete: function() {
                            console.log("complete");
                            isMoving = false;
                        }})
                    }
            });

            $('#right').click(function(e) {
                console.log("clickright");
                if (isMoving == false) {
                    isMoving = true;
                    gsap.to(el, 1, {scrollTo: {x: '+='+(wrapper.width())*2}, onComplete: function() {
                        console.log("complete");
                        isMoving = false;
                    }})
                }
            })
        },
        reportWindowSize(){
            console.log("resize!")
        },

        clone() {
            var container = $("#clone-container");
            var scrollBox = $("#scroll-box");
            var dropPanel = $("#drop-panel");
            var tiles     = $(".tile");
            var threshold = "50%";

           var that=this;
             

            tiles.each(function() {
                var element = $(this);
                var wrapper = element.parent();
                var offset  = element.position();

                var scope = {
                    name    : element.attr('id'),
                    clone1   : element.clone().addClass("clone").addClass("clone1").prependTo(container),
                    element : element,
                    wrapper : wrapper,
                    width   : wrapper.outerWidth(),
                    dropped : false,
                    moved   : false,
                    get x() { return getPosition(wrapper, offset, container).x; },
                    get y() { return getPosition(wrapper, offset, container).y; }
                };

                 that.scopes.push(scope);
                console.log("THE ELEMENT", scope.name);

                element.click(function() {
                    let dimelement=this.getBoundingClientRect();
                    that.enlight(scope.element, scope, dimelement);
 
                });

                scope.clone1.click(function() {
                    console.log("ho cliccato sui cloni");
                })
            });
        },
        enlight(element,scope, dimelement){

            console.log("el "+element.position().left+" sc "+scope.x);
            let dish=document.getElementById("dish-2");
            let dimsDish;
            var offset  = element.position();
            var elementId=element.prop('id');
          
            let found= this.foodSelected.find(food=>food==elementId);
         

            if(this.foodSelected.length<4){
                dimsDish=this.positions[this.foodSelected.length].pos;
                let xDish=dimsDish.x-scope.x;
                let yDish=dimsDish.y-dimelement.y;
                if( !found){
                   
                    TweenLite.set(scope.element, { autoAlpha: 1, border: "solid 2px white" });
                    TweenLite.set(scope.clone1, { x:dimelement.x, y: scope.y, autoAlpha: 0.9, scale: 0.92 });
                    console.log("scope "+scope.x+" offss ", offset.left);
                    console.log("POS", scope.element.position().left);
                   // console.log("element", scope.x+(scope.element.position().left)+offset.left);
                     this.foodSelected.push(elementId);
                    timeline.to(scope.clone1, 1, {x:dimsDish.x-1, top: yDish-1.2});
                    timeline.set(scope.clone1, {x:dimsDish.x-1, top: yDish-1.2});

                }
            }
           
             

        },

        
        selected(element){
         // let  dishIn=document.getElementById(element.id);
            console.log("SONO CLiccato");
            //dishIn.style.border="solid 3px white";

        },

        cancella(){
            let ultimoPiatto;
            let ultimoDiv;
            ultimoPiatto=this.foodSelected[this.foodSelected.length-1];
           console.log("ultimo "+ ultimoPiatto);
           
            ultimoDiv=document.getElementById(ultimoPiatto);
           // ultimoDiv.style.border="3px solid green";
            
            let scope=this.scopes.find(el=> el.name==ultimoPiatto);
            console.log("ultimo "+ scope.name);
            TweenLite.to(scope.element, 0.8, { border: "solid 0px black" }, "alpha")
            TweenLite.set(scope.clone1, { top: 0, left: 0, scale: 1, autoAlpha:0})
            
            this.foodSelected.pop();

        },
        getPosition() {
            let positions = [];
            let dishes = $(".dish");
            let dishDiv;
            
            for(let dish of dishes) {
                dishDiv= document.getElementById( dish.id).getBoundingClientRect();
                let toPush = {dish:dish.id, pos:dishDiv}
                positions.push(toPush);
            }

            this.positions = positions;          
        },
        hideStart() {
            console.log("HIDE START");
            let startPage = $('#over');

            TweenLite.to(startPage, 1, { autoAlpha: 0 , onComplete:this.middlePage()});  
        },

        middlePage(){
            let middlePage = $('.over');
            TweenLite.to(middlePage, 2, { top: -500, autoAlpha: 0 }).delay(1);
        },
        
         showEnding() {
            console.log("SHOW ENDING");
            let endingPage = $('#over-ending');

            TweenLite.set(endingPage, { zIndex: 35 });
            TweenLite.to(endingPage, 1, { autoAlpha: 1 });
            this.check();

        },
        finalEnding(){
            let endingPage = $('#over-ending');
            let finalEnding= $('#final-ending');
            TweenLite.set(finalEnding, {autoAlpha: 1 , zIndex: 33 });

            TweenLite.to(endingPage, 1, { y:-500, autoAlpha: 0 });
            
           ;
        },
        check(){

            for(let food of this.food){
                //console.log("food " + food.id+" " + food.name);
                if(this.foodSelected.find(el=> el==food.id)){
                    
                    this.total.co2+=Number(food.CO2);
                    this.total.carb+=Number(food.Carboidrati);
                    this.total.fat+=Number(food.Lipidi);
                    this.total.sat+=Number(food.Saturi);
                    this.total.fibr+=Number(food.Fibra);
                    this.total.prot+=Number(food.Proteine);
                    this.total.kcal+=Number(food.KCal);
                    
                    

                }
            }
            console.log("total" +  this.total.co2);
        }
      
    }
}

</script>