<template>
  <div class="cultura">
    <div class="main-wrapper">
        <div class="container">
          <div class="spacer">
            <div ref="cane1" class="cane"><p class="text-piatto">commestibile</p></div>
            <div ref="cane2" class="cane2"><p class="text-piatto">non commestibile</p> </div>
            <div ref="box" class="box"><img src="../assets/cammello.jpg" alt="" class="img"></div>
            <div class="elements">
              <template v-for="(elem,index) in gen">
                <div :ref="'box'+index" class="box-el"  v-bind:key="(elem,index)">{{elem.name}}</div>
              </template>
            </div>
            
            
            
          </div>
          
         
        </div>

    </div>
 
  </div>
</template>

<script>

import { TimelineLite } from 'gsap'
import gsap from 'gsap';
import Draggable from "gsap/Draggable";
import { data } from './../data/cultura.js'
import JQuery from 'jquery';
let $ = JQuery;

export default {
    components: { },
    data () {
        return {
              
          gen: data.generi,
              
        }
    },
    computed: {
      //
    },
    mounted() {
      gsap.registerPlugin(Draggable);
     
      const { box,box0, box1,box2,box3 , cane1, cane2} = this.$refs
      const timeline = new TimelineLite();
      var overlapThreshold = "50%"; 
      var k = 0
      var z = 0
      var comm=null;
      
     
      console.log("the cane", cane1);
    
      timeline.to(box, 1, { x: 200, rotation: 180 }) 
      /*Draggable.create(".box2", {
        type:"x,y", 
        edgeResistance:0.65, 
        bounds:".container", 
        inertia:true, 
        onDrag: function(e) { 
          if(this.hitTest($(cane1)),  overlapThreshold) {
            console.log("COMMESTIBILE");
          }
          if(this.hitTest($(cane2)),  overlapThreshold) {
            console.log("NON COMMESTIBILE");
          }
        },
        onDragEnd:function(e) {
          console.log("DRAG ENDED");
        }
      });
*/
      Draggable.create(box0, {
        bounds:window,
        throwProps: true,
        
        onDrag: function(e) {
            if (this.hitTest(cane1, overlapThreshold)) {
              console.log("commestibile", k);
              k += 1;
              comm=true;

            } else if(this.hitTest(cane2,  overlapThreshold)) {
              console.log("NON COMMESTIBILE", z);
              z+=1;
              comm=false;
            }else{
              comm=null;
            }
          },
        onDragEnd:function(e) {
          console.log("DRAG ENDED "+comm);
          if(comm==true){
            console.log("target "+this.target.data);
          }
        }
      });
    },
    created() {
    },
    watch: {
    
    },
    methods: {
      
    }
  }
</script>
