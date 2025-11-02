<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import projects from '@/data/projects.json'

const route = useRoute()

// Vite 6+ glob URL's
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
        { key: 'problem', title: 'Probleem', text: p.problem, icon: '⚠️' },
        { key: 'assignment', title: 'Opdracht', text: p.assignment, icon: '📋' },
        { key: 'role', title: 'Mijn rol', text: p.role, icon: '👤' },
        { key: 'result', title: 'Resultaat', text: p.result, icon: '✅' },
    ].filter(s => s.text)
})

// Theme: oranje aan op mount, uit bij verlaten
onMounted(() => document.documentElement.classList.add('theme-orange'))
onBeforeUnmount(() => document.documentElement.classList.remove('theme-orange'))
</script>

<template>
    <section v-if="project" class="project-detail page">
        <div class="container">
            <!-- Cover met overlay -->
            <div class="cover-wrap">
                <img class="cover" :src="imgSrc(project.image)" :alt="project.title" />

                <div class="cover-overlay">
                    <div class="overlay-left">
                        <h1 class="title">{{ project.title }}</h1>
                        <div class="tags" v-if="project.tech?.length">
                            <span class="tag" v-for="t in project.tech" :key="t">{{ t }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Korte intro -->
            <p class="subtitle center">{{ project.description }}</p>

            <!-- Calm flow timeline -->
            <div class="flow" v-if="sections.length">
                <div class="flow-item" v-for="s in sections" :key="s.key">
                    <div class="flow-icon" aria-hidden="true">
                        <span class="bubble">{{ s.icon }}</span>
                    </div>

                    <article class="flow-card">
                        <h2 class="flow-title">{{ s.title }}</h2>
                        <p class="flow-text">{{ s.text }}</p>
                    </article>
                </div>
            </div>

            <RouterLink to="/projects" class="back">← Terug naar overzicht</RouterLink>
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
/* Container houdt veel ademruimte */
.flow {
    display: grid;
    gap: 22px;
    max-width: 900px;
    margin: 0 auto;
    padding-block: 8px;
}

/* Elk item: rustige 2-koloms grid (icon | content) */
.flow-item {
    display: grid;
    grid-template-columns: 56px 1fr;
    align-items: start;
    gap: 16px;
}

/* Icon-bol: klein, subtiel, niet schreeuwerig */
.flow-icon {
    display: grid;
    place-items: center;
    padding-top: 6px;
    /* optisch uitlijnen met titel */
}

.bubble {
    display: inline-grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: var(--color-text);
    font-size: 18px;
    line-height: 1;
    user-select: none;
}

/* Kaart: rustige rand, zachte achtergrond, royale padding */
.flow-card {
    background: color-mix(in oklab, var(--color-primary) 10%, transparent);
    border: 1px solid color-mix(in oklab, var(--color-primary) 28%, #2a2a2a);
    border-radius: 14px;
    padding: clamp(14px, 2.4vw, 20px);
    transition: box-shadow .2s ease, transform .12s ease, border-color .2s ease;
}

.flow-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, .18);
    border-color: color-mix(in oklab, var(--color-primary) 42%, #2a2a2a);
}

.flow-title {
    margin: 0 0 6px;
    font-weight: 700;
    font-size: clamp(1.05rem, 2.4vw, 1.25rem);
}

.flow-text {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.65;
}

/* Mobiel: stack; icon boven content met kleiner bolletje */
@media (max-width: 700px) {
    .flow-item {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .flow-icon {
        padding-top: 0;
    }

    .bubble {
        width: 32px;
        height: 32px;
        font-size: 16px;
    }
}

/* Pagina offset onder je vaste nav (zo nodig) */
.page {
    padding-top: var(--nav-offset, 96px);
}

/* ========== COVER ========== */
.cover-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;
}

.cover {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    /* hou ‘m cinematic; haal weg als je echte hoogte wilt */
    object-fit: cover;
}

/* overlay met gradient en content onderin links */
.cover-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    padding: 16px;
    background: linear-gradient(to top,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.28) 38%,
            rgba(0, 0, 0, 0) 65%);
}

.overlay-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.title {
    margin: 0;
    color: #fff;
    font-size: clamp(1.6rem, 3.8vw, 2.4rem);
    font-weight: 800;
    text-shadow: 0 2px 10px rgba(0, 0, 0, .35);
}

.tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

/* “Bekijk live” pijltje rechtsonder */
.go {
    position: relative;
    right: 0;
    bottom: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 1;
    color: var(--color-primary);
    border: 1px solid rgba(255, 255, 255, 0.45);
    background: linear-gradient(to top, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.35) 100%);
    background-repeat: no-repeat;
    background-size: 100% 0%;
    background-position: bottom;
    transition: background-size .35s ease, border-color .2s ease, transform .2s ease;
}

.go:hover {
    background-size: 100% 100%;
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
}

/* subtitel onder de cover */
.subtitle.center {
    text-align: center;
    color: #8a8a8a;
    max-width: 820px;
    margin: 10px auto 26px;
    line-height: 1.6;
}

/* ========== TIMELINE ========== */
.timeline {
    position: relative;
    display: grid;
    gap: 18px;
    margin-bottom: 10px;
}

/* node-col + card-col */
.step {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 12px;
    align-items: start;
}

/* lijn + dot */
.node {
    position: relative;
    display: grid;
    place-items: center;
}

.node::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: -18px;
    /* beetje voorbij kaart */
    width: 2px;
    background: rgba(255, 255, 255, 0.18);
}

.node[data-last="true"]::before {
    bottom: 12px;
}

/* stop lijn bij laatste */

.dot {
    z-index: 1;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 15px;
    background: var(--color-primary);
    color: #0b1620;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .25);
    border: 1px solid rgba(255, 255, 255, .2);
}

/* content kaart */
.step-card {
    background: #1b1b1b;
    border: 1px solid #2a2a2a;
    border-radius: 14px;
    padding: 16px;
}

.step-card h2 {
    margin: 0 0 6px;
}

/* back link */
.back {
    display: inline-block;
    margin-top: 14px;
    color: var(--color-primary);
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
}

/* onderstreep-animatie */
.back::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    /* net onder de tekst */
    width: 0%;
    height: 2px;
    background: var(--color-primary);
    transition: width 0.3s ease;
}

/* hover: underline van links → rechts */
.back:hover::after {
    width: 100%;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 900px) {
    .cover-overlay {
        padding: 12px;
    }

    .go {
        width: 42px;
        height: 42px;
    }

    .timeline {
        gap: 14px;
    }

    .step {
        grid-template-columns: 28px 1fr;
        gap: 10px;
    }

    .dot {
        width: 24px;
        height: 24px;
        font-size: 14px;
    }
}
</style>