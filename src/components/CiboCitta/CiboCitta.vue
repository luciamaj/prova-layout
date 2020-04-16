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
    <div class="cibocitta-cont">
        <div v-if="modeChosen != undefined">
            Modalità {{ modeChosen }}

            <div class="domanda">
                La domanda: {{ myQuestions[currentStep].domanda }}
            </div>
            Le risposte:
            <div v-for="(question, idxquestion) in myQuestions[currentStep].risposte">
                <div v-on:click="chooseAnswer(question)" v-bind:key="idxquestion" class="risposta">{{ question.testo }}</div>
            </div>
            <div>
                Counter {{currentStep + 1}}/5
            </div>
            <div v-if="currentStep == 4">TEST COMPLETATO!</div>
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
        }
    },
    computed: {
      //
    },
    mounted() {
        //
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
        choice(type) {
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
                this.currentStep += 1;
                alert(answer.corretta);
            }
        }
    }
  }
</script>
