<template>
    <main class="clone-piramide">
        <div class="piramide">
            piramideee 
        </div>
        <div class="carousel"> 
            <div class="left arrow">
                <button id="left">
                        LEFT
                </button>
            </div>
            <div class="right arrow">
                <button id="right">
                        RIGHT
                </button>
            </div>
            <section id="top-bar">
                <div id="clone-container">
                    <div id="scroll-box">
                        <div id="tile-container">

                        <div class="tile-wrapper">
                            <div class="tile">A</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">B</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">C</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">D</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">E</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">F</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">G</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">H</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">I</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">J</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">K</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">L</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">M</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">N</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">O</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">P</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">Q</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">R</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">S</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">T</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">U</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">W</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">X</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">Y</div>
                        </div>
                        <div class="tile-wrapper">
                            <div class="tile">Z</div>
                        </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>
<script>

import { TimelineLite } from 'gsap'
import { TweenLite } from 'gsap'
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { ScrollTo } from "gsap";
import { quiz } from './../../quiz/quiz.js';
import JQuery from 'jquery';
let $ = JQuery;

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
            quiz: quiz,
                    // Store current question index
            questionIndex: 0,
            // An array initialized with "false" values for each question
            // It means: "did the user answered correctly to the question n?" "no".
            userResponses: Array(quiz.questions.length).fill(false),
            selectedrole: ''
        }
    },
    computed: {
      //
    },
    mounted() {
        this.scrollArrows();
        this.clone();
    },
    created() {
    },
    watch: {
      selectedrole: function(newRole)
      {
        console.log("NEWROLE", newRole);
        this.selectedrole = newRole;
        console.log("SELECTED ROLE", this.selectedrole);
      }
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
                        scrollLeft: '-=80'
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
                        scrollLeft: '+=80'
                    }, 500, 'swing', function () {
                        console.log("done");
                        isMoving = false;
                    });
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
                    clone2   : element.clone().addClass("clone").addClass("clone2").prependTo(container),
                    element : element,
                    wrapper : wrapper,
                    width   : wrapper.outerWidth(),
                    dropped : false,
                    moved   : false,
                    get x() { return getPosition(wrapper, offset, container).x; },
                    get y() { return getPosition(wrapper, offset, container).y; }
                };

                console.log("THE ELEMENT", element);

                const timeline = new TimelineLite();


                //scope.draggable = createDraggable(scope);

                element.click(function() {
                    console.log("ho cliccato sugli elementi");
                    TweenLite.set(scope.element, { autoAlpha: 0.5 });
                    TweenLite.set(scope.clone1, { x: scope.x, y: scope.y, autoAlpha: 1 });
                    TweenLite.set(scope.clone2, { x: scope.x, y: scope.y, autoAlpha: 1 });

                    console.log("POS", scope.x, scope.y);



                    timeline.to(scope.clone1, 1, {left: 60 - scope.x, top: -400});
                    timeline.to(scope.clone2, 1, {left: 180 - scope.x, top: -500});
                });

                scope.clone1.click(function() {
                    console.log("ho cliccato sui cloni");
                })
            });
        },
    }
  }
</script>