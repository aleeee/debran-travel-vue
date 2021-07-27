<template>
  <div class="experience">
   <div class="card">
   <router-link 
     :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
     >
   
     <h2>{{experience.name}}</h2>
       <img :src="`/images/${experience.image}`" :alt="experience.name"/>
    </router-link>
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