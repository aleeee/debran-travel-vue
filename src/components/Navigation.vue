<template>
  <div id="nav">
      <AppLink id="logo"
      to="/">
      Debran Travels
      </AppLink>
    <AppLink v-for="destination in destinations" :key="destination.id"
      :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}" 
     >
     <h2>{{destination.name}}</h2>
    </AppLink>

    <AppLink :to="{name: 'protected'}">Dashboard</AppLink>

    <AppLink to="https://vueschool.io">Vue School</AppLink>
  </div>
</template>

<script>
import sourceData from '@/data.json'
// import {reactive} from 'vue'
export default {
  setup() {
    const destinations = sourceData.destinations;
   /*  console.log(destinations); */
    return {
      destinations
    }
  },
}
</script>

<style >

    #nav .travel-active-link {
        color: red;
        border-bottom: 2px solid rgba(221, 13, 152, 0.801);
    }
</style>