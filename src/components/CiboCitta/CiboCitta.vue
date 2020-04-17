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
        <div v-if="myQuestions[currentStep - 1] != null">
            {{ myQuestions[currentStep - 1].spiegazione }}
        </div>
        <div id="continue-btn" class="button" v-on:click="nextQuestion()">CLICCA QUI PER CONTINUARE</div>
    </div>
    <div id="end-quiz">
        <div class="finale-cont">
            <div class="title">
                {{ this.getResult().title }}
            </div>
            <div class="description">
                {{ this.getResult().description }}
            </div>
            <div class="punti-cont-finale">
                PUNTEGGIO {{this.punteggio}}
            </div>
            <div class="punti-cont-finale" v-on:click="resetGame()">
                CLICCA PER TERMINARE
            </div>
        </div>
    </div>
    <div id="cibocitta-cont">
        <img class="thumb" id="up" src="/static/cibocitta/up.png" alt="thumbup">
        <img class="thumb" id="down" src="/static/cibocitta/down.png" alt="thumbdown">

        <div v-if="modeChosen != undefined && myQuestions.length == 5">
            <div class="domanda-cont">
                DOMANDA {{currentStep}}/5
            </div>
            <div class="leftHalf">
                <div class="domanda" v-if="myQuestions[currentStep - 1] != null">
                    {{ myQuestions[currentStep - 1].domanda }}
                </div>
            </div>
            <div class="rightHalf">
                <ul class="bulleted" v-if="myQuestions[currentStep - 1] != null">
                    <li v-bind:key="idxquestion" v-for="(question, idxquestion) in myQuestions[currentStep - 1].risposte">                   
                        <span v-on:mouseover="playFocusAnimation($event, true)" v-on:mouseleave="playFocusAnimation($event, false)" :id='idxquestion + "span"' v-on:click="chooseAnswer(question, idxquestion)" class="bullet">{{ indexes[idxquestion] }}</span>
                        <div v-on:click="chooseAnswer(question, idxquestion)" class="text">
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
    data() {
        return {
            dataApp: data,
            modeChosen: undefined,
            currentStep: 1,
            myQuestions: [],
            indexes: ["A", "B", "C"],
            upTimeline: {},
            downTimeline: {},
            explanationTimeline: {},
            revExplanationTimeline: {},
            choiceTimeline: {},
            punteggio: 0,
            clickedAnswer: false,
            results: [{"title": "OTTIMO RISULTATO!", "description": "Sei un cittadino ben informato!"}, {"title": "DECENTE RISULTATO!", "description": "Sei un cittadino ben informato!"}, {"title": "PESSIMO RISULTATO!", "description": "Sei un cittadino ben informato!"}]
        }
    },
    mounted() {
        this.createThumbsTimelines();
        this.createExplanationTimeline();
        this.createRevExplanationTimeline();
        this.createChoiceTimeline();
    },
    created() {
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
        chooseAnswer(answer, idx) {
            if (this.clickedAnswer == false) {
                this.clickedAnswer = true;
                console.log(idx);
                let span = $('#' + idx + 'span');
                let that = this;
                let timeLine = new TimelineLite({ onComplete: function() {
                    that.animateThumb(answer.corretta);
                }});

                timeLine.to(span, 0.15, {scale: 1.06, fontSize: '0.85em', lineHeight: '4.8vh', backgroundColor: '#9e3e7e', color: 'white'});
            }
        },
        animateThumb(correct) {
            if (correct) {
                this.punteggio += 10;
                this.upTimeline.play(0);
            } else {
                this.downTimeline.play(0);
            }
        },
        createExplanationTimeline() {
            let explanationPage = $('#explanation');
            let that = this;

            this.explanationTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("EXPLANATION COMPLETED");
                var spans = $('.bullet');
                TweenLite.to(spans, 0.15, {scale: 1.0, lineHeight: '4.9vh', backgroundColor: 'white', color: 'black'});
            }});

            this.explanationTimeline.set(explanationPage, {zIndex: 20}).to(explanationPage, 1, { autoAlpha: 1 });
        },
        createRevExplanationTimeline() {
            let explanationPage = $('#explanation');
            let that = this;

            this.revExplanationTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("EXPLANATION TIMELINE HIDDEN");
            }});

            this.revExplanationTimeline.to(explanationPage, 1, { autoAlpha: 0 }).set(explanationPage, {zIndex: -220});
        },
        createThumbsTimelines() {
            let up = $('#up');
            let down = $('#down');
            let that = this;

            this.upTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("THUMB UP COMPLETED");
                that.explanationTimeline.play(0);
            }});
            this.upTimeline.set(up, {autoAlpha: 1, display: "block"}).to(up, 0.4, {scale: 1.5}).to(up, 0.2, {scale: 1}).to(up, 0.2, {autoAlpha: 0}, "+=1").set(up, {display: 'none'});

            this.downTimeline = new TimelineLite({paused: true, onComplete: function() { 
                console.log("THUMB DOWN COMPLETED"); 
                that.explanationTimeline.play(0);
            }});
            this.downTimeline.set(down, {autoAlpha: 1, display: "block"}).to(down, 0.4, {scale: 1.5}).to(down, 0.2, {scale: 1}).to(down, 0.2, {autoAlpha: 0}, "+=1").set(down, {display: 'none'});
        },
        showEndQuiz() {
            let endPage = $('#end-quiz');
            TweenLite.set(endPage, { zIndex: 110 });
            TweenLite.to(endPage, 1, { autoAlpha: 1 });
        },
        nextQuestion() {
            console.log("THE CURRENT STEPPPPPP" , this.currentStep);
            if (this.currentStep == 5) {
                this.showEndQuiz();
            } else {
                this.clickedAnswer = false;
                this.currentStep += 1;
                this.revExplanationTimeline.play(0);
            }
        },
        createChoiceTimeline() {
            //
        },
        playFocusAnimation(event, toggle) {
            console.log("THE ID", $(event.target).attr('id'));
            let idBullet = $(event.target).attr('id');
            let bullet = $('#' + idBullet + 'span');
            console.log(bullet);
        },
        getResult() {
            if (this.punteggio <= 20) {
                return this.results[2];
            } else if (this.punteggio > 20 && this.punteggio <= 30) {
                return this.results[1];
            } else {
                return this.results[0];
            }
        },
        resetGame() {
            //VARIABLES
            this.modeChosen = undefined;
            this.currentStep = 1;
            this.myQuestions = [];
            this.punteggio = 0;
            this.clickedAnswer = false;

            let startPage = $('#over');
            TweenLite.set(startPage, { autoAlpha: 1, visibility: 'visible' });
            let modePage = $('#modalita');
            TweenLite.set(modePage, { autoAlpha: 1, visibility: 'visible' });

            //PAGES POSITIONS
            let endPage = $('#end-quiz');
            TweenLite.set(endPage, { zIndex: -99 });
            TweenLite.set(endPage, { autoAlpha: 0 });

            let explanationPage = $('#explanation');
            TweenLite.set(explanationPage, { zIndex: -99 });
            TweenLite.set(explanationPage, { autoAlpha: 0 });
        }
    }
  }
</script>
