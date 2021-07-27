<template>

  <Navigation/>
  <div class="container">

  <router-view v-slot="{Component}" >
    <transition name="moveUp" >
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
 
  </div>
</template>

<script>
import Navigation from "@/components/Navigation"
export default {
  components: {Navigation},
  setup() {
    
    
  },
}
</script>

<style class="css">
  .moveUp-enter-active{
    animation: fadeIn 1s ease-in;
  }
  @keyframes fadeIn {
    0% {opacity: 0;}
    50% {opacity: 0.5;}
    100% {opacity: 1;}
  }
  .moveUp-leave-active{
    animation: moveUp 0.3s ease-in;
  }
  @keyframes moveUp {
    0% {transform: translateY(0);}
    100% {transform: translateY(-400px); }
  }
  
</style>