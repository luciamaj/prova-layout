<template>
    <main class="clone-piramide">
        <div class="piramide-cont">
            <div class="section-container">
                <center><img id="cane" src="/static/piramide/piramidi.png" alt="Responsive image"></center>
                <div v-on:click="resetPositions" class="topright"></div>
                <div ref="right6" id="right6" class="right6 blocks rightblock"></div>
                <div ref="right5" id="right5" class="right5 blocks rightblock"></div>
                <div ref="right4" id="right4" class="right4 blocks rightblock"></div>

                <div ref="left6" id="left1" class="left1 blocks leftblock"></div>
            </div>
        </div>
        <div class="carousel"> 
            <div class="left arrow">
                <button v-on:click="clickedArrow('left')" id="left">
                </button>
            </div>
            <div class="right arrow">
                <button v-on:click="clickedArrow('right')" id="right">
                </button>
            </div>
            <section id="top-bar">
                <div id="clone-container">
                    <div id="scroll-box">
                        <div id="tile-container">
                            <template v-for="(cibo, index) in food">
                                <div v-bind:key="(cibo, index)" class="tile-wrapper">
                                    <div :id="cibo.name" class="tile">
                                        <img :src="'/static/piramide/cibo/' +  cibo.name + '.png'" :ref="cibo.name" :class="cibo.name">
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
            ratio: 0,
            scopes: []
        }
    },
    mounted() {
        gsap.registerPlugin(ScrollToPlugin);
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
                    name    : element.attr('id'),
                    clone1  : element.clone().addClass("clone").addClass("clone1").prop("id", (element.prop('id') + "clone1")).prependTo(container),
                    clone2  : element.clone().addClass("clone").addClass("clone2").prop("id", (element.prop('id') + "clone2")).prependTo(container),
                    element : element,
                    wrapper : wrapper,
                    offset  : element.position(),
                    width   : wrapper.outerWidth(),
                    get x() { return getPosition(wrapper, offset, container).x; },
                    get y() { return getPosition(wrapper, offset, container).y; },
                    moved   : false,
                    initial : null,
                };

                that.scopes.push(scope);

                console.log("THE ELEMENT", scope.name);

                const timeline = new TimelineLite({onComplete: function() {
                    console.log("COMPLETED TIMELINE");
                }});

                element.click(function() {
                    if (!(element.hasClass('cloned'))) {
                        console.log("THAT", that);
                        let scopeToChange = that.scopes.find(scope => scope.name == element.attr('id'));
                        if (scopeToChange) {
                            console.log("CHANGING TO TRUEEEEEEEEEEEEEEEE")
                            scopeToChange.moved = true;
                        }


                        console.log("THE INITIAL POSITION", scope.clone1)
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

                        that.initial = scope.clone1.offset();

                        TweenLite.set(scope.element, { border: "solid 2px white" });
                        TweenLite.set(scope.clone1, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
                        TweenLite.set(scope.clone2, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});

                        element.addClass("cloned");



                        timeline.to(scope.clone1, 1, {x: dimRect1.x, top: yDish1, scale: 0.3});
                        timeline.to(scope.clone2, 1, {x: dimRect2.x, top: yDish2, scale: 0.3});
                        scope.clone1.addClass('moved');
                        scope.clone2.addClass('moved');
                    }                   
                });

                scope.clone1.click(function() {
                    console.log("ho cliccato sui cloni");
                })
            });
        },
        positionElement (scope) {
            TweenLite.set(scope.clone1, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
            TweenLite.set(scope.clone2, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
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
        clickedArrow(direction) {
            console.log("CLICKED THE DIRECTION", direction);
            let content = $("#tile-container");
            let tileWrapper = $(".tile-wrapper");
            let widthComponent = tileWrapper[0].getBoundingClientRect().x;
            let offset = content.width() / $('.tile-wrapper').length;
            const {top, left} = content.offset();
            var isMoving = false;
            let el = $("#scroll-box");

            if(isMoving == false) {
                isMoving = true;
                let xMove = '';
                if (direction == 'left') {
                    xMove = '-= ' + (this.ratio * this.carouselOptions.slidesToScroll) + '' 
                } else {
                    xMove = '+= ' + (this.ratio * this.carouselOptions.slidesToScroll) + '' 
                }
                gsap.to(el, 0.8, {scrollTo: {x: xMove}, onComplete: function() {
                    console.log("complete");
                    isMoving = false;
                }});
            }
        },
        resetPositions() {
            //console.log("I CLICKED ON RESET POSITIONS", this.scopes);
            let cloned = $('.moved');
            var container = $("#clone-container");

            if (cloned.length > 0) {
                console.log("THE CLONED", cloned);

                for(let scope of this.scopes) {
                    console.log("THE EL", scope);
                    if (scope.moved == true) {
                        let element = $('#' + scope.name);
                        element.removeClass('cloned')
                        var offset  = element.position();

                        console.log("SONO QUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", element);
                        if (this.initial) {
                            console.log("INITIALLLLLLLLL", this.initial);
                            TweenLite.set(scope.element, { border: "solid 0px black" });
                            TweenLite.set(scope.clone1, { top: 0, left: 0, autoAlpha: 0, scale: 1});
                            TweenLite.set(scope.clone2, { top: 0, left: 0, autoAlpha: 0, scale: 1});
                        }
                    }
                }
            } else {
                console.log("nothing to reset");
            }
        }
    }
  }
</script>