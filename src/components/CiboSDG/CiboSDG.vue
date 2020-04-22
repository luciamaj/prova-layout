<template>
    <div class="cibosdg">

        <div id="over">
            <div id="name-game"><div class="inner"><div class="appName">cibo & sdg</div> </div></div>
            <div v-on:click="hideStart()" id="start-game">START GAME</div>
            <img src="../../assets/cammello.jpg" alt="">
        </div>
        
        <div class="content">
            <div class="row tiles">
                <div class="col-lg-2 col-md-3 col-sm-6">
                    <div class="square">
                        <div class="innerSq first-tile fall" style=" box-shadow:none" id="first"> <div class="">scegli il tuo obiettivo</div></div>
                    </div>
                </div>
                <template v-for="(obs,index) in punti ">
                    <div class="col-lg-2 col-md-3 col-sm-6" :key="(obs,index)">
                        <div class="square">
                            <div class="innerSq fall"  v-on:click="selectedCard(obs)" :id="obs.id"> 
                                
                                <img :src="'../../../static/cibo_SDG/SDG_Icons/SDG-icon-'+obs.id+'.jpg'" :alt="'img obiettivo'+obs.id">
                       
                            </div>

                        </div>
                    </div>
                </template>
             
            </div>

        </div>
         <div id="text1">
             <div class=" row endingContainer">
                <div class="col-lg-3 col-md-4 col-sm-12"> 
                    <div class="square">
                        <div class="innerSq " :style="'background-image:url);'"> 
                            <img :src="'../../../static/cibo_SDG/SDG_Icons/SDG-icon-'+slideObject.id+'.jpg'" :alt="'img obiettivo'+slideObject.id">
                        </div>

                    </div>
                </div>
                <div class="col-lg-9 col-md-8 col-sm-12">
                    <div class="titleEnd">{{slideObject.name}}</div>
                    <div class="textEnd">{{slideObject.text1}}</div>
                </div>
             </div>
            <div class="comandi" id="com1"><button v-on:click="control('text1','indietro')"> > indietro </button> <button v-on:click="control('text1','avanti')"> avanti ></button></div>
        </div>
        <div id="img">
            <div class="imgContainer">
                <img src="../../assets/cammello.jpg" alt="">
            </div>
            <div class="comandi" id="com2"><button v-on:click="control('img','indietro')"> > indietro </button> <button v-on:click="control('img','avanti')"> avanti ></button></div>
        </div>
        <div id="text2">
            <div class="slide3">
                <div class="p1">{{slide3.p1}}</div>
                <div class="p2">{{slide3.p2}}</div>
                <div class="p3">{{slide3.p3}}</div>
            </div>
            <div class="comandi" id="com3"><button v-on:click="control('text2','indietro')"> > indietro </button> <button v-on:click="control('text2','avanti')"> Obiettivi ></button></div>
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
            slide3:data. testoFinale,
            position:[],
            ratio: 0,
         
            sound: {
                click:null,
                bip:null},
            //anim:null,
          
            slideObject:{},
         
        }
    },
    mounted() {
        this.loadSound();    
        //this.getTilePos();
    },
    
    methods: {
        getTilePos(){
            var positions=[];
            var tiles = $('.innerSq');
            //console.log("tiles "+ tiles);
            for(let tile of tiles){
                console.log("ids "+tile.id);
                let tilele= document.getElementById(tile.id).getBoundingClientRect();
                console.log("Tiles position "+tilele.x, tilele.y);
                let toPush = {tile:tile.id, pos:tilele}
                positions.push(toPush); 
            }

            this.position=positions;
          
           
        },
        hideStart() {
           
            let startPage = $('#over');
            let button = $('#start-game');
            this.sound.bip.play();
            var that=this;
            TweenLite.from(button, 0.5, { scale: 0.7 ,ease:"power1.in",  onComplete:function(){
                TweenLite.to(startPage,1, { autoAlpha: 0});
            } });  
             this.initalComposition();
        },

        initalComposition(){
            var tiles = $('.innerSq');
           
            var that=this;
            
             tl.from(tiles, 0.5,{  y:1000, stagger:{ each:0.05, ease:"circ"} });
           
            
        },

        selectedCard(element){
            this.slideObject=element;
            console.log("ELEm", element);
            let card=$('#'+element.id); 
            let slide1=$('#text1');
            let slide2=$('#img');
            let slide3=$('#text2');
            this.sound.bip.play();
            card.removeClass("fall");
            
            var that=this;
            TweenLite.set(slide1, { backgroundColor:element.color,zIndex:5});
            TweenLite.set(slide2, { backgroundColor:element.color});
           
           
            TweenLite.from(card, 0.5, { scale: 0.5 });
            var boxC =$(".fall");
            var fade=TweenLite.to(boxC ,{autoAlpha:0.1, duration:1 });
            var fall=TweenLite.to(boxC ,{scale: 0.01, duration:0.45, stagger: { each: 0.085, from:"start",ease:"exp"}, });
            var anim=TweenLite.to(card, 0.6, { autoAlpha:0,delay:1.5, ease:"power2.in"});
            TweenLite.set($('#com1'), {autoAlpha:0});
            TweenLite.to(slide1, 0.8,{autoAlpha:1, delay:2.1, onComplete:function () {  
                TweenLite.to($('#com1'),1, {autoAlpha:1, delay:1.5, yoyo:true, repeat:2});
                anim.reverse();
                fall.reverse();
                fade.reverse();
            }},'-=2');
            
            
            
            card.addClass("fall");
            
             
        },
       
        control(position, direction){
            let slide1=$('#text1');
            let slide2=$('#img');
            let slide3=$('#text2');
             TweenLite.set($('.comandi'), {autoAlpha:0});
            switch (position) {
                case "text1":
                    if(direction=="indietro"){
                       
                        TweenLite.set(slide1, {autoAlpha:0, zIndex:-2});
                        this.initalComposition();
                    }else{
                        TweenLite.set(slide1, { zIndex:-2});
                        TweenLite.set(slide2, {autoAlpha:1, zIndex:5});
                        TweenLite.to($('#com2'),1.5, {autoAlpha:1, delay:1.5, yoyo:true, repeat:2});
                    }
                     
                    break;
                case "img":
                    if(direction=="indietro"){
                        TweenLite.set(slide2, { zIndex:-2});
                        TweenLite.set(slide1, {autoAlpha:1,zIndex:5});
                        TweenLite.set($('#com1'), {autoAlpha:1});
                    }else{
                        TweenLite.set(slide2, { zIndex:-2});
                        TweenLite.set(slide3, {autoAlpha:1,zIndex:5});
                        TweenLite.to($('#com3'),1.5, {autoAlpha:1, delay:1.5, yoyo:true, repeat:2});
                    }
                     
                    break;
                case "text2":
                    if(direction=="indietro"){
                        TweenLite.set(slide3, { zIndex:-2});
                        TweenLite.set(slide2, {autoAlpha:1,zIndex:5});
                         TweenLite.set($('#com2'), {autoAlpha:1});
                        
                    }else{
                        TweenLite.set(slide3, {autoAlpha:0, zIndex:-2});
                        this.initalComposition();
                    }
                     
                 break;
                 default:
                    
                     break;
            }
            
            console.log("after switch");

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