<template>
    <div class="clone-piramide">
        <div id="over">
            <div id="name-game"><div class="inner"><div class="appName">doppia piramide</div> </div></div>
            <div v-on:click="hideStart()" id="start-game">START GAME</div>
            <img src="../../assets/cammello.jpg" alt="">
        </div>
        <div id="over-ending">
            <div div="text-ending">{{ endingText }}</div>
            <div>TOCCA LO SCHERMO PER TERMINARE</div>
        </div>
        <div class="piramide-cont">
            <div class="section-container" id="section-container">
                <div class="p">
                    <div ref="left6" id="left6" class="left6 blocks leftblock"></div>
                    <div ref="left5" id="left5" class="left5 blocks leftblock"></div>
                    <div ref="left4" id="left4" class="left4 blocks leftblock"></div>

                    <div ref="right6" id="right6" class="right6 blocks rightblock"></div>
                    <div ref="right5" id="right5" class="right5 blocks rightblock"></div>

                    <img id="cane" src="/static/piramide/piramidi.png" alt="Responsive image">
                </div>
                <div v-on:click="resetPositions" class="topright"></div>
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
    </div>
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
import howler from 'howler';
let $ = JQuery;

console.log("HOWLER", howler);

function getPosition(wrapper, offset, container) {
  var position1 = wrapper.offset();
  var position2 = container.offset();

  return {
    x: position1.left - position2.left + offset.left,
    y: position1.top  - position2.top  + offset.top
  };
}

export default {
    name: "Piramide",
    components: { },
    data () {
        return {
            questionIndex: 0,
            selectedrole: '',
            food: data.food,
            endingText: data.endingText,
            carouselOptions: {
                slidesToShow: 7,
                slidesToScroll: 1,
                scrollVelocity: 0.5,
            },
            ratio: 0,
            scopes: [],
            step: 0,
            foodMoved: 0,
            sound: { click:null, bip:null},
        }
    },
    mounted() {
        gsap.registerPlugin(ScrollToPlugin);
        this.clone();
        this.getDimensions();
        this.setCarousel();
        this.loadSound();
    },
    created() {
    },
    transition: {
        enter(el, done) {
            TweenLite.to(el, 1, {
                opacity: 1,
                onComplete: done
            });
        },
    },
    methods: {
        foodInitialMov() {
            let tl = new TimelineLite();
            var tiles = $(".tile:not(.clone)"); 
            TweenLite.set(tiles, {scale: 0})
            tl.to(tiles, 1,{  scale: 1, autoAlpha:1, stagger:{ each:0.05, ease:"circ"} });
        },
        clone() {
            var container = $("#clone-container");
            var sectionContainer = $("#section-container");
            var scrollBox = $("#scroll-box");
            var dropPanel = $("#drop-panel");
            var tiles     = $(".tile");

            let SContainer =  document.getElementById('section-container').getBoundingClientRect()
            let SContainerHeight = SContainer.height;
            let containerOffSet = window.innerHeight - SContainerHeight;

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

                const timeline = new TimelineLite({onComplete: function() {
                    console.log(that.food.length, that.foodMoved);
                    if (that.foodMoved == that.food.length) {

                        that.showEnding();
                    } else {
                        console.log("sono qui");
                    }
                }});

                element.click(function() {
                    if (!(element.hasClass('cloned'))) {
                        that.playSound();

                        let scopeToChange = that.scopes.find(scope => scope.name == element.attr('id'));
                        if (scopeToChange) {
                            scopeToChange.moved = true;
                        }
                        let foodElement = that.food.find(cibo => cibo.name == element.attr('id'));
                        let firstDestName = foodElement.destinations[0].dest;
                        let secondDestName = foodElement.destinations[1].dest;

                        let dimRect1 = document.getElementById(firstDestName).getBoundingClientRect();
                        let dimRect2 = document.getElementById(secondDestName).getBoundingClientRect();

                        let dimElement = this.getBoundingClientRect();

                        console.log("DIMRECT1", dimRect1);
                        console.log("DIMRECT2", dimRect2);

                        let yDish1 = - SContainerHeight + dimRect1.top - 50;
                        let yDish2 = - SContainerHeight + dimRect2.top - 50;

                        let xDish1 = dimRect1.x - 50;
                        let xDish2 = dimRect2.x - 50;

                        that.initial = scope.clone1.offset();

                        TweenLite.set(scope.clone1, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
                        TweenLite.set(scope.clone2, { x: scope.x+(scope.element.position().left)-offset.left, y: scope.y+1, autoAlpha: 1});
                        element.addClass("cloned");


                        timeline.to(scope.element, 0.2, { border: "solid 2px white", backgroundColor: '#abcdef' })
                        .to(scope.element, 0.2, { backgroundColor: "rgba(0, 0, 0, 0)" })
                        .to(scope.clone1, 0.8, {x: xDish1, top: yDish1}).to(scope.clone1, 0.3, {scale: 0.4},'-=0.4')
                        .to(scope.clone2, 0.8, {x: xDish2, top: yDish2}).to(scope.clone2, 0.3, {scale: 0.4})
                        scope.clone1.addClass('moved');
                        scope.clone2.addClass('moved');
                        that.foodMoved += 1;
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
        setCarousel() {
            let leftArrow = $("#left");
            TweenLite.set(leftArrow, { autoAlpha: 0});
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
            console.log("THE STEP:", this.step);
            let content = $("#tile-container");
            let tileWrapper = $(".tile-wrapper");
            var isMoving = false;
            let el = $("#scroll-box");
            let rightArrow = $("#right");
            let leftArrow = $("#left");
            let tl = new TimelineLite(); 

            let maxStep = this.food.length - this.carouselOptions.slidesToShow;

            if(isMoving == false) {
                isMoving = true;
                let xMove = '';
                if (direction == 'left') {
                    if (this.step != 0) {
                        this.step -= this.carouselOptions.slidesToScroll;
                        TweenLite.to(rightArrow, 0.5, { autoAlpha: 1});
                        if (this.step <= 0) {
                            TweenLite.to(leftArrow, 0.5, { autoAlpha: 0});
                        }
                    }
                    console.log("MAXSTEP", maxStep, this.step);
                    xMove = '-= ' + (this.ratio * this.carouselOptions.slidesToScroll) + '' 
                } else {
                    if (this.step < maxStep) {
                        this.step += this.carouselOptions.slidesToScroll;
                        TweenLite.to(leftArrow, 0.5, { autoAlpha: 1});
                        if (this.step >= maxStep) {
                            TweenLite.to(rightArrow, 0.5, { autoAlpha: 0});
                        }
                    }
                    console.log("MAXSTEP", maxStep, this.step);
                    xMove = '+= ' + (this.ratio * this.carouselOptions.slidesToScroll) + '' 
                }
                tl.to(el, this.carouselOptions.scrollVelocity, {scrollTo: {x: xMove}, onComplete: function() {
                    console.log("complete");
                    isMoving = false;
                    //tl.pause(0);
                }});
                tl.progress(1).progress(0);
            }
        },
        resetPositions() {
            const timeline = new TimelineLite({onComplete: function() {
                console.log("COMPLETED TIMELINE");
            }});

            let cloned = $('.moved');
            var container = $("#clone-container");
            this.foodMoved = 0;

            if (cloned.length > 0) {
                for(let scope of this.scopes) {
                    if (scope.moved == true) {
                        let element = $('#' + scope.name);
                        element.removeClass('cloned')
                        var offset  = element.position();

                        if (this.initial) {
                            timeline.to(scope.clone1, 1, { autoAlpha: 0 }, "alpha")
                            .to(scope.clone2, 1, { autoAlpha: 0}, "alpha")
                            .to(scope.element, 1, { border: "solid 0px black" }, "alpha")
                            .set(scope.clone1, { top: 0, left: 0, scale: 1})
                            .set(scope.clone2, { top: 0, left: 0, scale: 1});
                        }
                    }
                }
            } else {
                console.log("nothing to reset");
            }
        },
        hideStart() {
            let startPage = $('#over');
            let button = $('#start-game');
            this.sound.click.play();
            let that = this;
           
            TweenLite.from(button, 0.5, { scale: 0.7 ,ease:"power1.in",  onComplete:function(){
                TweenLite.to(startPage,1, { autoAlpha: 0});
                that.foodInitialMov();
            } });  
           
        },
        showEnding() {
            let endingPage = $('#over-ending');

            TweenLite.set(endingPage, { zIndex: 35 });
            TweenLite.to(endingPage, 1, { delay: 2, autoAlpha: 1 });
            this.resetPositions();
        },
        loadSound() {
            this.sound.click = new Howl({
                src: ['/static/sounds/click.wav'],
                html5: false,
                autoplay: false,
                volume: 1.0,
                format: 'mp3',
                onload: function() { console.log('song loaded!')},
                onloaderror: function(id, error) { console.log('loadError: ' + id +' - ' + error); }
            });
            this.sound.bip = new Howl({
                src: ['/static/sounds/blip.wav'],
                html5: false,
                autoplay: false,
                volume: 1.0,
                format: 'mp3',
                onload: function() { console.log('song loaded!')},
                onloaderror: function(id, error) { console.log('loadError: ' + id +' - ' + error); }
            });
        },
        playSound() {
            this.sound.click.play();
        }
    }
  }
</script>