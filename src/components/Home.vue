<template>
  <div class="home">
    <NavBar />
    <HomeBanner />
    <FeaturedProjects />
    <MoreProjects />
    <Skills />
    <AboutMe />
    <Footer />
  </div>
</template>

<script setup>
import HomeBanner from './HomeBanner.vue';
import NavBar from './NavBar.vue'
import FeaturedProjects from './FeaturedProjects.vue';
import MoreProjects from './MoreProjects.vue';
import Footer from './Footer.vue';
import Skills from './Skills.vue';
import AboutMe from './AboutMe.vue';
</script>

<style scoped>
/* styling */
</style>
