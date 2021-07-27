<template>
  <div class="experience-details">
    
   <div>
     <h2>{{experience.name}}</h2>
       <img :src="`/images/${experience.image}`" :alt="experience.name"/>
   
  </div>
  </div>
</template>

<script>

export default {
  props: {
      experience: {}
  }
}
</script>