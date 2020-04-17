<template>
    <div class="cibosdg">

        <div id="over">
            <div id="name-game"></div>
            <div v-on:click="hideStart()" id="start-game">START GAME</div>
            <img src="../../assets/cammello.jpg" alt="">
        </div>
        
        <div class="content">
            <div class="row tiles">
                <div class="col-lg-2 col-md-3">
                    <div class="square"><div class="inner" style=" box-shadow:none"> <div class="first-tile">scegli il tuo obiettivo</div></div>
                    </div>
                </div>
                <template v-for="(obs,index) in punti ">
                    <div class="col-lg-2 col-md-3 ">
                        <div class="square">
                            <div class="inner" :style="'background-color:'+obs.color+';'" v-on:click="selectedCard(obs)" :id="obs.id"> <div class="up"><div class="number">{{obs.id}}</div> <div class="name">{{obs.name}}</div></div></div>
                        </div>
                    </div>
                </template>
             
            </div>

        </div>
         <div id="text1">
            <div>{{slide.text1}}</div>
            <div class="comandi"><button v-on:click="control('text1','indietro')"> < indietro </button> <button v-on:click="control('text1','avanti')"> avanti ></button></div>
        </div>
        <div id="img">
            <div>{{slide.text1}} IMG</div>
            <div class="comandi"><button v-on:click="control('img','indietro')"> < indietro </button> <button v-on:click="control('img','avanti')"> avanti ></button></div>
        </div>
        <div id="text2">
            <div>{{slide.text1}} TEXT2</div>
            <div class="comandi"><button v-on:click="control('text2','indietro')"> < indietro </button> <button v-on:click="control('text2','avanti')"> avanti ></button></div>
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
import { data } from './../../data/sdg.js';
import JQuery from 'jquery';
import howler from 'howler';
let $ = JQuery;

const timeline = new TimelineLite();
let tl = new TimelineLite(); 

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
           
            punti:data.obiettivi,
          
            ratio: 0,
         
            sound: {
                click:null,
                bip:null},
            slide:{
                text1:null,
                text2:null
            },
            anim:null,
            anim1:null,
         
        }
    },
    mounted() {
        this.loadSound();    
    },
    
    methods: {
       
        hideStart() {
            console.log("HIDE START");
            let startPage = $('#over');
            let button = $('#start-game');
            this.sound.bip.play();
            TweenLite.to(button, 0.2, { scale: 0.7 ,  onComplete:function(){
                TweenLite.to(startPage,1, { autoAlpha: 0});
                TweenLite.to(button, 0.6, { scale: 1});
             
            } });  
        },

        selectedCard(element){
            this.slide.text1=element.name;
            this.slide.text2=element.name;
            let card=$('#'+element.id);
            let slide1=$('#text1');
            let slide2=$('#img');
            let slide3=$('#text2');
            this.sound.bip.play();
            TweenLite.set(slide1, { backgroundColor:element.color,zIndex:5});
            TweenLite.set(slide2, { backgroundColor:element.color});
            TweenLite.set(slide3, { backgroundColor:element.color});
            TweenLite.to(card, 0.3, { scale: 0.7 , onComplete:function(){
            TweenLite.to(slide1, 1, { autoAlpha:1 });
            TweenLite.to(card, 0.4, { scale: 1,  autoAlpha:0.7});
             
            } });
             
        },
        control(position, direction){
            let slide1=$('#text1');
            let slide2=$('#img');
            let slide3=$('#text2');
            
            switch (position) {
                case "text1":
                    if(direction=="indietro"){
                       
                        TweenLite.set(slide1, {autoAlpha:0, zIndex:-2});
                    }else{
                        TweenLite.set(slide1, { zIndex:-2});
                        TweenLite.set(slide2, {autoAlpha:1, zIndex:5});
                    }
                    
                    break;
                case "img":
                    if(direction=="indietro"){
                        TweenLite.set(slide2, { zIndex:-2});
                        TweenLite.set(slide1, {autoAlpha:1,zIndex:5});
                    }else{
                        TweenLite.set(slide2, { zIndex:-2});
                        TweenLite.set(slide3, {autoAlpha:1,zIndex:5});
                    }
                    break;
                case "text2":
                    if(direction=="indietro"){
                        TweenLite.set(slide3, { zIndex:-2});
                        TweenLite.set(slide2, {autoAlpha:1,zIndex:5});
                    }else{
                        TweenLite.set(slide2, { zIndex:-2});
                        TweenLite.set(slide3, {autoAlpha:1,zIndex:5});
                    }
                
                 break;
            
            }

        },
        indietro(position){
            let slide1=$('#text1');
            let slide2=$('#img');
            let slide3=$('#text2');
            TweenLite.set(slide1, { zIndex:-2});
            TweenLite.set(slide2, {zIndex:5});
           



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
        playSoundclick() {
            this.sound.click.play();
        },

      
    }
}

</script>