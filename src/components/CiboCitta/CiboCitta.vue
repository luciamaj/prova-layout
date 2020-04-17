<template>
  <div class="cibocitta">
    <div id="over">
        <div id="name-game"></div>
        <div v-on:click="hideStart()" id="start-game">START GAME</div>
        <img src="../../assets/cammello.jpg" alt="">
    </div>
     <div id="modalita">
        <div class="tophalf">
            <div class="block"><div class="labelMode">MODALITÀ <br> AVANZATA</div></div>
            <div class="block">
                <div class="mode" id="hard" v-on:click="choice('hard')">
                    <div class="mode-txt">CLICCA QUI</div>
                </div>
            </div>
        </div>
        <div class="bottomhalf">
            <div class="block"><div class="labelMode">MODALITÀ <br> SEMPLICE</div></div>
            <div class="block">
                <div class="mode" id="easy" v-on:click="choice('easy')">
                    <div class="mode-txt">CLICCA QUI</div>
                </div>
            </div>
        </div>
    </div>
    <div id="explanation">
        <div v-if="myQuestions[currentStep] != null">
            {{ myQuestions[currentStep].spiegazione }}
        </div>
        <div id="continue-btn" class="button" v-on:click="nextQuestion()">CLICCA QUI PER CONTINUARE</div>
    </div>
    <div id="end-quiz">
        FINITO!
    </div>
    <div id="cibocitta-cont">
        <img class="thumb" id="up" src="/static/cibocitta/up.png" alt="thumbup">
        <img class="thumb" id="down" src="/static/cibocitta/down.png" alt="thumbdown">

        <div v-if="modeChosen != undefined">
            <div class="domanda-cont">
                DOMANDA {{currentStep + 1}}/5
            </div>
            <div class="leftHalf">
                <div class="domanda">
                    {{ myQuestions[currentStep].domanda }}
                </div>
            </div>
            <div class="rightHalf">
                <ul class="bulleted">
                    <li v-on:click="chooseAnswer(question)" v-bind:key="idxquestion" v-for="(question, idxquestion) in myQuestions[currentStep].risposte">                   
                        <span class="bullet">{{ indexes[idxquestion] }}</span>
                        <div  class="text">
                            <p>{{ question.testo }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="punti-cont">
                PUNTEGGIO {{this.punteggio}}
            </div>
          </div>
       </div>
    </div>
</template>

<script>

import gsap from 'gsap';
import { TimelineLite } from 'gsap';
import { TweenLite } from 'gsap'
import data from '../../data/cibocitta.js';
import JQuery from 'jquery';
import howler from 'howler';
let $ = JQuery;

export default {
    components: { },
    data () {
        return {
            dataApp: data,
            modeChosen: undefined,
            currentStep: 0,
            myQuestions: [],
            indexes: ["A", "B", "C"],
            upTimeline: {},
            downTimeline: {},
            explanationTimeline: {},
            revExplanationTimeline: {},
            punteggio: 0,
        }
    },
    mounted() {
        this.createThumbsTimelines();
        this.createExplanationTimeline();
        this.createRevExplanationTimeline();
    },
    created() {
        //
    },
    watch: {
        //
    },
    methods: {
        hideStart() {
            let startPage = $('#over');
            TweenLite.to(startPage, 1, { autoAlpha: 0 });
        },
        hideMode() {
            let modePage = $('#modalita');
            TweenLite.to(modePage, 1, { autoAlpha: 0 });
        },
        choice(type) {
            this.hideMode();

            this.myQuestions = [];
            this.modeChosen = type;
            let domande = this.dataApp.data[type];
            let randomArr = this.getRandomNumbers(5,1);


            for(let ran of randomArr) {
                this.myQuestions.push(domande[ran]);
            }
        },
        getRandomNumbers(max, min) {
            var randomArr = [];
            while(max>= min) randomArr.push(max--)    

            randomArr.sort(function(){return .5- Math.random()});  

            return randomArr;
        },
        chooseAnswer(answer) {
            if (this.currentStep < 4) {
                this.animateThumb(answer.corretta);
            }
        },
        animateThumb(correct) {
            if (correct) {
                this.upTimeline.play(0);
            } else {
                this.downTimeline.play(0);
            }
        },
        showExplanation() {
            TweenLite.set(explanationPage, {zIndex: 20})
            TweenLite.to(explanationPage, 1, { autoAlpha: 1 });
        },
        createExplanationTimeline() {
            let explanationPage = $('#explanation');
            let that = this;

            this.explanationTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("EXPLANATION COMPLETED");
            }});

            this.explanationTimeline.set(explanationPage, {zIndex: 20}).to(explanationPage, 1, { autoAlpha: 1 });
        },
        createRevExplanationTimeline() {
            let explanationPage = $('#explanation');
            let that = this;

            this.revExplanationTimeline = new TimelineLite({paused: true, onComplete: function() { 
                /*if (that.currentStep == 4) {
                    that.showEndQuiz();
                }*/
                console.log("EXPLANATION TIMELINE HIDDEN");
            }});

            this.revExplanationTimeline.to(explanationPage, 1, { autoAlpha: 0 }).set(explanationPage, {zIndex: -20});
        },
        createThumbsTimelines() {
            let up = $('#up');
            let down = $('#down');
            let that = this;

            this.upTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("THUMB UP COMPLETED");
                that.explanationTimeline.play(0);
                that.currentStep += 1;
            }});
            this.upTimeline.set(up, {autoAlpha: 1, display: "block"}).to(up, 0.4, {scale: 1.5}).to(up, 0.2, {scale: 1}).to(up, 0.2, {autoAlpha: 0}, "+=1").set(up, {display: 'none'});

            this.downTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("THUMB DOWN COMPLETED"); 
                that.explanationTimeline.play(0);
                that.currentStep += 1;
            }});
            this.downTimeline.set(down, {autoAlpha: 1, display: "block"}).to(down, 0.4, {scale: 1.5}).to(down, 0.2, {scale: 1}).to(down, 0.2, {autoAlpha: 0}, "+=1").set(down, {display: 'none'});
        },
        showEndQuiz() {
            let endPage = $('#end-quiz');
            TweenLite.set(endPage, { zIndex: 20 });
            TweenLite.to(endPage, 1, { autoAlpha: 1 });
        },
        nextQuestion() {
            if (this.currentStep == 4) {
                this.showEndQuiz();
            } else {
                this.revExplanationTimeline.play(0);
            }
        }
    }
  }
</script>
