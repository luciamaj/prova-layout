<template>
    <main class="clone-piramide">
        <div class="piramide-cont">
            <div class="section-container">
                <center><img id="cane" src="/static/piramide/piramidi.png" alt="Responsive image"></center>
                <div ref="right6" id="right6" class="right6 blocks rightblock"></div>
                <div ref="right5" id="right5" class="right5 blocks rightblock"></div>
                <div ref="right4" id="right4" class="right4 blocks rightblock"></div>

                <div ref="left6" id="left1" class="left1 blocks leftblock"></div>
            </div>
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
                            <template v-for="(cibo, index) in food">
                                <div v-bind:key="(cibo, index)" class="tile-wrapper">
                                    <div :id="cibo.name" class="tile">
                                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" :ref="cibo.name" :id="cibo.name" :class="cibo.name">
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>
<script>

import { TimelineLite } from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { TweenLite } from 'gsap'
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { ScrollTo } from "gsap";
import { data } from './../../data/piramide.js';
import JQuery from 'jquery';
let $ = JQuery;

console.log(data);

console.log("SCROLLTO", ScrollToPlugin);

function getPosition(wrapper, offset, container) {
  var position1 = wrapper.offset();
  var position2 = container.offset();

  return {
    x: position1.left - position2.left + offset.left,
    y: position1.top  - position2.top  + offset.top
  };
}

export default {
    components: { },
    data () {
        return {
            questionIndex: 0,
            selectedrole: '',
            food: data.food,
            carouselOptions: {
                slidesToShow: 7,
                slidesToScroll: 2,
            },
            ratio: 0
        }
    },
    mounted() {
        gsap.registerPlugin(ScrollToPlugin);
        this.scrollArrows();
        this.clone();
        this.getDimensions();
        this.setCarousel();
    },
    created() {
    },
    methods: {
         setCarousel(){
            let content = $("#tile-container");
            let box = $("#scroll-box");
            let wrapper = $(".tile-wrapper");
            let page = $(".piatto-clone");
            console.log("W", page.width());
            let boxW=box.width()
            let ratio=(boxW)/(this.carouselOptions.slidesToShow);
            console.log("R ", ratio);
            this.ratio = ratio;
            wrapper.css("width", ratio + "px");
        },
        scrollArrows() {
            let content = $("#tile-container");
            let box = $("#scroll-box");
            let tileWrapper = $(".tile-wrapper");
            let widthComponent = tileWrapper[0].getBoundingClientRect().x;
            let offset = content.width() / $('.tile-wrapper').length;
            const {top, left} = content.offset();
            const adjustment = 10;
            var isMoving = false;
            let el = $("#scroll-box");
            let that = this;

            $('#left').click(function(e) {
                console.log("click left");
                    if(isMoving == false) {
                        isMoving = true;
                        let xMove = '-= ' + (that.ratio * that.carouselOptions.slidesToScroll) + '' 
                        gsap.to(el, 0.8, {scrollTo: {x: xMove}, onComplete: function() {
                            console.log("complete");
                            isMoving = false;
                        }})
                    }
            });

            $('#right').click(function(e) {
                console.log("clickright");
                if (isMoving == false) {
                    isMoving = true;
                    let xMove = '+= ' + (that.ratio * that.carouselOptions.slidesToScroll) + '' 
                    gsap.to(el, 0.8, {scrollTo: {x: xMove}, onComplete: function() {
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

            let that = this;

            tiles.each(function() {
                var element = $(this);
                var wrapper = element.parent();
                var offset  = element.position();

                console.log("the offset", offset);

                var scope = {
                    clone1  : element.clone().addClass("clone").addClass("clone1").prependTo(container),
                    clone2  : element.clone().addClass("clone").addClass("clone2").prependTo(container),
                    element : element,
                    wrapper : wrapper,
                    width   : wrapper.outerWidth(),
                    get x() { return getPosition(wrapper, offset, container).x; },
                    get y() { return getPosition(wrapper, offset, container).y; }
                };

                console.log("THE ELEMENT", element.attr('id'));

                const timeline = new TimelineLite();

                element.click(function() {
                    let foodElement = that.food.find(cibo => cibo.name == element.attr('id'));
                    let firstDestName = foodElement.destinations[0].dest;
                    let secondDestName = foodElement.destinations[1].dest;

                    let dimRect1 = document.getElementById(firstDestName).getBoundingClientRect();
                    console.log(dimRect1);
                    let dimRect2 = document.getElementById(secondDestName).getBoundingClientRect();
                    console.log(dimRect2);

                    let dimElement = this.getBoundingClientRect();

                    console.log(dimRect1);

                    var centerX = dimRect1.left + dimRect1.width / 2;

                    console.log(dimRect1);
                    console.log("CENTERX", centerX);

                    var centerY = dimRect1.top + (dimRect1.height / 2);


                    let yDish1 = (dimRect1.y - dimRect1.height /2) - dimElement.y;
                    let yDish2 = (dimRect2.y - dimRect2.height /2)- dimElement.y;

                    console.log("el", scope.element.position().left);
                    console.log("offs", offset.left);
                    console.log("x", scope.x);

                    TweenLite.set(scope.element, { border: "solid 2px white" });
                    TweenLite.set(scope.clone1, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
                    TweenLite.set(scope.clone2, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});

                    console.log("cl", scope.clone1.position().left);
                    setTimeout(() => {
                        timeline.to(scope.clone1, 1, {x: dimRect1.x, top: yDish1, scale: 0.3});
                        timeline.to(scope.clone2, 1, {x: dimRect2.x, top: yDish2, scale: 0.3});
                    }, 200);
                });

                scope.clone1.click(function() {
                    console.log("ho cliccato sui cloni");
                })
            });
        },
        setCarousel(){
            let content = $("#tile-container");
            let box = $("#scroll-box");
            let wrapper = $(".tile-wrapper");
            let page = $(".piatto-clone");
            console.log("W", page.width());
            let boxW=box.width()

            var width = $(window).width();
            console.log(width);
            if (width <= 1200) {
                this.carouselOptions.slidesToShow = 3;

                console.log("STO RISETTANDO", this.carouselOptions.slidesToShow);

            }
            
            let ratio=(boxW)/(this.carouselOptions.slidesToShow);
            this.ratio = ratio;
            console.log("THE RATIOOO VOEGBIUWrbiurwBUiu", this.ratio);
            console.log("R ", ratio);
            wrapper.css("width", ratio + "px");
        },
        getDimensions() {
            let positions = [];
            let blocks = $(".blocks");

            for(let block of blocks) {
                console.log("THE IDS", block.id);
                let toPush = {name: block.id, rect: document.getElementById(block.id).getBoundingClientRect()}
                console.log("CHECK",  document.getElementById(block.id).getBoundingClientRect());
                positions.push(toPush);
            }

            this.positions = positions;            
        },
    }
  }
</script>