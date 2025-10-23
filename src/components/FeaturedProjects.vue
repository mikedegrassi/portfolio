<script setup>
import { ref, computed } from 'vue'
import projects from '../data/projects.json' // [{ id, title, description, image, url, highlight }]

/* Neem de eerste 3 highlights; pas aan zoals jij wilt */
const items = computed(() =>
    projects.filter(p => p.highlight).slice(0, 3)
)

const active = ref(0) // altijd eentje open (index 0)
const setActive = (i) => (active.value = i)

const imgSrc = (file) =>
  new URL(`../assets/images/${file}`, import.meta.url).href
</script>

<template>
    <section class="highlights">
        <div class="container">
            <h2 class="section-title">Uitgelichte projecten</h2>

            <div class="cards">
                <article v-for="(p, i) in items" :key="p.id" class="card"
                    :class="i === active ? 'card--active' : 'card--collapsed'" @click="setActive(i)" role="button"
                    :aria-expanded="(i === active).toString()" tabindex="0" @keyup.enter="setActive(i)">
                    <div class="media">
                        <img :src="imgSrc(p.image)" :alt="p.title" />
                    </div>

                    <div class="content">
                        <div>
                            <h3 class="title">{{ p.title }}</h3>
                            <p class="desc muted">{{ p.description }}</p>
                        </div>

                        <div class="actions" v-if="p.url">
                            <a class="btn btn--primary" :href="p.url" target="_blank" rel="noopener">
                                <span>Bekijk project</span>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.highlights {
    padding: 64px 0;
}

/* Rij met 3 kaarten */
.cards {
    display: flex;
    gap: 16px;
    align-items: stretch;
}

/* Kaart basis */
.card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    transition: width .35s ease, box-shadow .25s ease, transform .25s ease, background .25s ease;
    height: 420px;
}

/* Breedtes volgens jouw specs */
.card--active {
    width: 530px;
}

.card--active .actions {
    display: block;
}

.card--collapsed {
    width: 400px;
}

/* Media (image) */
.media {
    height: 230px;
    /* vaste hoogte */
    overflow: hidden;
    background: #0e0e0e;
    flex-shrink: 0;
    border-radius: 8px;
}

.media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.card:hover .media img {
    transform: scale(1.03);
}

/* Tekstcontent onder de image */
.content {
    padding: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
}

.content>div:first-child {
    width: 60%;
}

.title {
    color: var(--color-text);
    font-weight: 600;
    font-size: 1.05rem;
}

.desc {
    color: var(--color-text-muted);
    font-size: .95rem;
    line-height: 1.6;
}

/* Knop alleen zichtbaar bij actieve kaart */
.actions {
    margin-top: 8px;
    display: none;
}

/* Responsive:
   - onder 1100px: iets flexibelere breedtes
   - onder 900px: stack met 1 per rij (volledige breedte)
*/
@media (max-width: 1100px) {
    .card--active {
        width: 56vw;
    }

    .card--collapsed {
        width: 26vw;
    }
}

@media (max-width: 900px) {
    .cards {
        flex-direction: column;
    }

    .content>div:first-child {
        width: 100%;
    }

    .content {
        flex-direction: column;
        align-items: baseline;
        justify-content: space-evenly;
    }

    .actions {
        display: block;
    }

    .actions .btn {
        width: 100%;
    }

    .actions>a.btn--primary {
        border: none;
        padding: 0;
    }

    .card,
    .card--active,
    .card--collapsed {
        width: 100%;
    }
}
</style>