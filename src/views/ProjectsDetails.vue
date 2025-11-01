<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import projects from '@/data/projects.json'

const route = useRoute()

// Vite 6+ syntax voor glob URL's
const imageMap = import.meta.glob('@/assets/images/*', {
    eager: true,
    import: 'default',
    query: '?url',
})
const imgSrc = (file) => imageMap[`/src/assets/images/${file}`] ?? ''

const project = computed(() => {
    const key = route.params.slugOrId
    return projects.find(p => p.slug === key || String(p.id) === String(key))
})

const sections = computed(() => {
    if (!project.value) return []
    const p = project.value
    return [
        { key: 'problem', title: 'Probleem', text: p.problem },
        { key: 'assignment', title: 'Opdracht', text: p.assignment },
        { key: 'role', title: 'Mijn rol', text: p.role },
        { key: 'result', title: 'Resultaat', text: p.result },
    ].filter(s => s.text)
})
</script>

<template>
    <section class="project-detail page" v-if="project">
        <div class="container">
            <!-- Page hero -->
            <header class="page-hero">
                <h1>{{ project.title }}</h1>
                <p class="subtitle">{{ project.description }}</p>
            </header>

            <!-- Intro / cover -->
            <header class="hero">
                <div class="text">
                    <div class="meta">
                        <div class="chips" v-if="project.tech?.length">
                            <span class="chip" v-for="t in project.tech" :key="t">{{ t }}</span>
                        </div>
                        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener"
                            class="btn btn--primary">
                            <span>Bekijk live</span>
                        </a>
                    </div>
                </div>
                <img class="cover" :src="imgSrc(project.image)" :alt="project.title" />
            </header>

            <!-- Content blocks -->
            <div class="content">
                <article v-for="s in sections" :key="s.key" class="block">
                    <h2>{{ s.title }}</h2>
                    <p>{{ s.text }}</p>
                </article>

                <RouterLink to="/projects" class="back">← Terug naar overzicht</RouterLink>
            </div>
        </div>
    </section>

    <section v-else class="container page">
        <header class="page-hero">
            <h1>Project niet gevonden</h1>
            <p class="subtitle">Controleer de URL of ga terug naar het overzicht.</p>
        </header>
        <RouterLink to="/projects" class="back">← Terug naar overzicht</RouterLink>
    </section>
</template>

<style scoped>
/* Page spacing */
.page {
    padding-top: var(--nav-offset, 96px);
}

/* Hero header */
.page-hero {
    text-align: center;
    margin-bottom: 22px;
}

.page-hero h1 {
    margin: 0 0 8px;
    font-size: clamp(2rem, 4.6vw, 3rem);
    font-weight: 800;
}

.page-hero .subtitle {
    color: #8a8a8a;
    max-width: 820px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Back link */
.back {
    display: inline-block;
    margin-top: 10px;
    color: #7FB9FF;
    text-decoration: none;
}

/* Intro hero (cover + meta) */
.hero {
    display: grid;
    gap: 18px;
    grid-template-columns: 1.2fr .8fr;
    align-items: center;
    margin-bottom: 24px;
}

.hero .text h1 {
    margin: 0 0 8px;
}

.hero .text .muted {
    color: #8a8a8a;
    margin: 0 0 12px;
}

.meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.chip {
    background: #262626;
    border: 1px solid #2f2f2f;
    border-radius: 999px;
    padding: 6px 10px;
    font-size: .85rem;
}

.cover {
    width: 100%;
    border-radius: 14px;
    object-fit: cover;
    aspect-ratio: 16/9;
    border: 1px solid #2a2a2a;
}

/* Content blocks */
.content {
    display: grid;
    gap: 18px;
}

.block {
    background: #1b1b1b;
    border: 1px solid #2a2a2a;
    border-radius: 14px;
    padding: 16px;
}

.block h2 {
    margin: 0 0 6px;
}

/* Responsive */
@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;
    }
}
</style>