<!-- src/App.vue -->
<template>
    <NavBar />
    <main class="page">
        <RouterView />
    </main>
    <SiteFooter />
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/Footer.vue'
</script>