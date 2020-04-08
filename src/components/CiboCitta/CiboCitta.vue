<template>
  <div class="cibocitta">
    <div class="main-wrapper">
        <div class="container-fluid">
           <div class="mode" id="easy" v-on:click="choice('easy')">EASY</div>
           <div class="mode" id="hard" v-on:click="choice('hard')">HARD</div>

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
            <!-- non scrivere nulla al di fuori del container -->
        </div>
    </div>
  </div>
</template>

<script>

import gsap from 'gsap';
import { TimelineLite } from 'gsap';
import data from '../../data/cibocitta.js'

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
