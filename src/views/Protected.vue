<template>
<div>
    <h1>Hello, {{username}}</h1>
    <button
        @click="logout"
        >
        Logout
    </button>
    <router-link :to="{name: 'invoices'}">
        <button>Invoices</button>
    </router-link>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
    setup() {
        const username= window.user

        const router = useRouter()

        function logout(){
            window.user = null
            router.push({name: 'Home'})
        }
        return {
            username,
            logout
        }
    },
}
</script>