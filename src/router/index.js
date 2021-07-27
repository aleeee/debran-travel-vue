import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {path: '/destination/:id/:slug', 
    name:"destination.show",  
    component: ()=> import("@/views/DestinationShow.vue"),
    props: route => ({slug: route.params.slug}),
    children:[
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route => ({...route.params, slug: route.params.slug})
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path:'/protected',
    name: 'protected',
    component: ()=> import('@/views/Protected.vue'),
    meta: {
      /**any value can be used here to indicate this path 
       * neeed authentication
       */
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/Login.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: ()=> import('@/views/Invoices.vue'),
    meta:{
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'travel-active-link',
  /**
   * scroll to top on transition from page to page
   * @param {*} to 
   * @param {*} from 
   * @param {*} savedPosition , the position with promise to wait
   * until transition completes 
   * @returns 
   */
  scrollBehavior(to, from, savedPosition){
    return savedPosition || new Promise((resolve) => {
      setTimeout(()=> resolve({top:0}), 300)  
    })
  }
})

/**
 * this will be fired eveytime the route changes
 */

router.beforeEach((to) =>{
  
  if(to.meta.requiresAuth && !window.user){
    return {name: 'login', query: {redirect: to.fullPath}}
  }
})

export default router;
