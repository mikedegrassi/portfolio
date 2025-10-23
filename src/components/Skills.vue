<script setup>
import { ref, computed } from 'vue'
import skills from '@/data/skills.json'

const PANELS = [
    { key: 'programmingAndFrameworks', title: 'Programmeren' },
    { key: 'design', title: 'Design' },
    { key: 'databaseAndApi', title: 'Database & API' },
    { key: 'languages', title: 'Talen' }
]

const panelColors = ['#7FB9FF', '#8ABFFF', '#95C4FF', '#A0CAFF']

/* --- Carousel logic (generic per panel) --- */
const PAGE_SIZE = 6
const activePages = ref({}) // keyed by panel.key

const hasCarouselFor = (key) => (skills[key]?.length ?? 0) > PAGE_SIZE
const totalPagesFor = (key) => Math.max(1, Math.ceil((skills[key]?.length ?? 0) / PAGE_SIZE))
const pagedItems = (key) => {
    const list = skills[key] ?? []
    const chunks = []
    for (let i = 0; i < list.length; i += PAGE_SIZE) chunks.push(list.slice(i, i + PAGE_SIZE))
    return chunks
}
const nextPage = (key) => {
    const total = totalPagesFor(key)
    activePages.value[key] = ((activePages.value[key] ?? 0) + 1) % total
}
const prevPage = (key) => {
    const total = totalPagesFor(key)
    activePages.value[key] = ((activePages.value[key] ?? 0) - 1 + total) % total
}

/* --- Asset helpers --- */
const iconSrc = (item) =>
    item?.icon ? new URL(`../assets/icons/${item.icon}`, import.meta.url).href : null
const getFlagSrc = (file) =>
    new URL(`../assets/icons/${file}`, import.meta.url).href

/* --- Languages: pad to 6 slots --- */
const paddedLanguages = computed(() => {
    const arr = [...(skills.languages ?? [])]
    while (arr.length < 6) arr.push(null)
    return arr.slice(0, 6)
})
</script>

<template>
    <section class="skills section">
        <div class="container">
            <h2 class="section-title">What I Work With</h2>

            <div class="panel-grid">
                <div v-for="(panel, index) in PANELS" :key="panel.key" class="panel"
                    :style="{ backgroundColor: panelColors[index] }">
                    <!-- Header -->
                    <div class="panel-head">
                        <h3>{{ panel.title }}</h3>

                        <!-- Controls for any non-language panel with > PAGE_SIZE items -->
                        <div v-if="panel.key !== 'languages' && hasCarouselFor(panel.key)" class="controls">
                            <button class="ctrl" @click="prevPage(panel.key)" aria-label="Vorige">&lsaquo;</button>
                            <span class="page">
                                {{ (activePages[panel.key] ?? 0) + 1 }} / {{ totalPagesFor(panel.key) }}
                            </span>
                            <button class="ctrl" @click="nextPage(panel.key)" aria-label="Volgende">&rsaquo;</button>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="panel-body">
                        <!-- Generic: Design / Database & API / Programming -->
                        <template v-if="panel.key !== 'languages'">
                            <div class="grid">
                                <div v-for="item in (hasCarouselFor(panel.key)
                                    ? pagedItems(panel.key)[activePages[panel.key] ?? 0]
                                    : skills[panel.key])" :key="item.name" class="skill">
                                    <div class="iconbox">
                                        <img v-if="iconSrc(item)" :src="iconSrc(item)" :alt="item.name" />
                                        <div v-else class="placeholder"></div>
                                    </div>
                                    <div class="label">{{ item.name }}</div>
                                </div>
                            </div>
                        </template>

                        <!-- Languages: fixed 2x3 grid with padding -->
                        <template v-else>
                            <div class="grid">
                                <div v-for="(l, i) in paddedLanguages" :key="l?.name ?? `empty-${i}`" class="skill"
                                    :class="{ 'skill--empty': !l }">
                                    <div class="iconbox flagbox">
                                        <img v-if="l?.icon" :src="getFlagSrc(l.icon)"
                                            :alt="(l?.name || 'Leeg') + ' vlag'" />
                                    </div>
                                    <div class="label" v-if="l">
                                        <strong>{{ l.name }}</strong>
                                        <span class="muted" v-if="l.cefr">({{ l.cefr }})</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- /panel -->
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-title {
    text-align: center;
    margin-bottom: 50px;
}

/* Section layout */
.panel-grid {
    display: grid;
    gap: 50px;
    grid-template-columns: 1fr;
}

/* Panel */
.panel {
    border-radius: 22px;
    padding: 24px;
    position: relative;
    box-shadow: 0 18px 28px rgba(0, 0, 0, 0.35);
    color: #fff;
    margin: auto;
    width: 50%;
}

/* Header */
.panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}

.panel-head h3 {
    font-size: clamp(1.2rem, 2.2vw, 1.8rem);
    font-weight: 700;
}

/* Controls */
.controls {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
}

.ctrl {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: transform .15s ease, background .2s ease;
}

.ctrl:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.25);
}

.page {
    opacity: .9;
}

/* Grid 2×3 */
.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px 30px;
    padding-top: 6px;
}

/* Skill */
.skill {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.skill--empty {
    opacity: 0.4;
}

/* Icon box */
.iconbox {
    width: 86px;
    height: 64px;
    display: grid;
    place-items: center;
    overflow: hidden;
    transition: transform .2s ease;
}

.iconbox img {
    width: 80%;
    height: 80%;
    object-fit: contain;
}

.skill:hover .iconbox {
    transform: translateY(-2px);
}

.placeholder {
    width: 44px;
    height: 28px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.45);
}

/* Flags */
.flagbox {
    width: 60px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    display: grid;
    place-items: center;
    transition: transform .2s ease, box-shadow .2s ease;
}

.flagbox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.skill:hover .flagbox {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
}

/* Label */
.label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.05rem;
    text-align: center;
}

.label .muted {
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .panel {
        padding: 18px;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    .iconbox {
        width: 84px;
        height: 60px;
    }

    .flagbox {
        width: 56px;
        height: 36px;
    }
}
</style>