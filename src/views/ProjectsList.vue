<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import projects from '@/data/projects.json'

// Vite 6+ glob-urls
const imageMap = import.meta.glob('@/assets/images/*', {
    eager: true,
    import: 'default',
    query: '?url',
})
const imgSrc = (file) => imageMap[`/src/assets/images/${file}`] ?? ''

// evt. sorteren op datum, nieuwste eerst
const items = computed(() =>
    [...projects].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
)

onMounted(() => {
    document.documentElement.classList.add('theme-orange')
})
onBeforeUnmount(() => {
    document.documentElement.classList.remove('theme-orange')
})
</script>

<template>
    <section class="projects">
        <div class="projects-hero-bg"></div>
        <div class="container">
            <!-- Page hero gecentreerd -->
            <header class="page-hero">
                <h1>Alle Projecten</h1>
                <p class="subtitle">
                    Een selectie van school- en eigen projecten waarin ik mijn passie voor design en development
                    combineer.
                </p>

                <div class="hero-actions">
                    <a href="#projects-grid" class="btn btn--outline">
                        <span>Lees verder</span>
                    </a>
                    <RouterLink to="/" class="btn btn--primary">
                        <span>Terug naar home</span>
                    </RouterLink>
                </div>
            </header>

            <!-- Grid met kaarten -->
            <div class="grid project-list" id="projects-grid">
                <article v-for="p in items" :key="p.id" class="proj-card">
                    <!-- Media + tags overlay -->
                    <div class="media">
                        <img :src="imgSrc(p.image)" :alt="p.title" class="cover" />
                        <div class="tags" v-if="p.tags?.length">
                            <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
                        </div>
                    </div>

                    <div class="body">
                        <div class="text">
                            <h3>{{ p.title }}</h3>
                            <p class="muted">{{ p.description }}</p>
                        </div>

                        <!-- Subtiel pijltje rechtsonder -->
                        <RouterLink class="go" :to="`/projects/${p.slug || p.id}`" aria-label="Bekijk project">
                            <span aria-hidden="true">→</span>
                        </RouterLink>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.btn {
    margin: 0 20px;
}

.btn--outline:hover {
    background-color: var(--color-primary-hover);
    color: white;
}

.projects {
    position: relative;
    overflow: hidden;
}

.project-list {
    padding: 64px 0;
}

/* Achtergrondlaag */
.projects-hero-bg {
    position: absolute;
    inset: 0;
    height: 100vh;
    background-image: url('@/assets/images/project-banner.png');
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
    pointer-events: none;
    z-index: 0;
}

/* Content erboven */
.projects .container {
    position: relative;
    z-index: 1;
}

/* Page hero: centraal in viewport */
.page-hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 10px;
}

.page-hero h1 {
    margin: 0;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 800;
}

.page-hero .subtitle {
    color: #8a8a8a;
    max-width: 820px;
    line-height: 1.6;
    margin: 0;
}

/* Grid */
.grid {
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

/* Card */
.proj-card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    overflow: hidden;
    transition: transform .2s ease, box-shadow .2s ease;
}

/* Media */
.media {
    position: relative;
}

.cover {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
}

/* Tags overlay linksonder op de afbeelding */
.tags {
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tag {
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.35);
    padding: 4px 8px;
    border-radius: 999px;
    font-size: .8rem;
    color: #fff;
}

/* Body */
.body {
    position: relative;
    /* voor absolute pijltje */
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 14px;
}

.text {
    padding-right: 48px;
    /* ruimte voor pijltje */
}

/* Subtiel pijltje rechtsonder */
.go {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 1;
    color: var(--color-primary);
    background: linear-gradient(to top,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.35) 100%);
    background-repeat: no-repeat;
    background-size: 100% 0%;
    /* start “leeg” */
    background-position: bottom;
    transition:
        background-size 0.35s ease,
        border-color 0.2s ease,
        transform 0.2s ease;
}

.go:hover {
    background-size: 100% 100%;
    /* vult omhoog */
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
}

/* Mobiel: stack */
@media (max-width: 900px) {
    .body {
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 54px;
    }

    /* ruimte voor pijltje */
    .text {
        padding-right: 0;
    }
}
</style>