<template>
<div>
    <section v-if="destination" class="destination">
    <div>
        <h2>
            Hello Destination {{destination.name}}
        </h2>
        <GoBack />
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="destination.name">
            <p>{{destination.description}}</p>
        </div>
    </div>

   
</section >
<section class="experiences">
  <h2>Top Experiences in {{destination.name}}</h2>
  <div class="cards">
    <router-link
      v-for="experience in destination.experiences"
      :key="experience.slug"
      :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
    >
      <ExperienceCard 
        :experience="experience"
      />
    </router-link>
  </div>
  
</section>
<router-view/>
</div>
</template>

<script>
// import { useRoute} from 'vue-router'
import {ref,toRefs } from 'vue'
import {  onBeforeRouteUpdate } from 'vue-router'
import ExperienceCard from '@/components/ExperienceCard.vue';
import GoBack from '@/components/GoBack.vue'
export default {
components: {
  ExperienceCard,
  GoBack
},
 props:{
   slug: {
     type: String, required: true
   }
 },
  setup(props) {
    const {slug} = toRefs(props)
    const destination = ref();
    /**
     * alternatevly we can use useRoute to access the route params
     * but it will create a tight coupling with the route,
     * in this solution we used props to pass params from the route
     * using props: route => ({}) inside index.js of route folder
     */
    // const route = useRoute();  

     async function fetchDestination(slug) {
       let response = await fetch(`https://travel-dummy-api.netlify.app/${slug}`);
      if(!response.ok){
              throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      return response.json();
    }
    fetchDestination(slug.value)
        .then((dest) => {
            destination.value = dest;
        }); 


    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
            
        fetchDestination(to.params.slug)
        .then((dest) => {
            destination.value = dest;
        }); 
      }
    })
     
  return {
      destination
      
    }
  },
}
</script>