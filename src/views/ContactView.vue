<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

onMounted(() => document.documentElement.classList.add('theme-red'))
onBeforeUnmount(() => document.documentElement.classList.remove('theme-red'))

const form = reactive({ name: '', email: '', message: '', hp: '' })
const status = ref('idle') // 'idle' | 'sending' | 'ok' | 'err'
const errors = reactive({ name: '', email: '', message: '' })

const validate = () => {
    errors.name = form.name.trim() ? '' : 'Vul je naam in.'
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Vul een geldig e-mailadres in.'
    errors.message = form.message.trim().length >= 10 ? '' : 'Minimaal 10 tekens.'
    return !errors.name && !errors.email && !errors.message
}

async function handleSubmit() {
    if (form.hp) return // simpele bot-block
    if (!validate()) return
    try {
        status.value = 'sending'
        // TODO: vervang door jouw echte endpoint (fetch naar Formspree/backend)
        await new Promise(r => setTimeout(r, 900))
        status.value = 'ok'
    } catch (e) {
        status.value = 'err'
    }
}

function resetForm() {
    form.name = ''
    form.email = ''
    form.message = ''
    status.value = 'idle'
}

// Mouse-follow (tilt + spotlight) op de kaart
let cardEl
function onCardMouseMove(e) {
    const rect = cardEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardEl.style.setProperty('--px', `${x}px`)
    cardEl.style.setProperty('--py', `${y}px`)

    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotY = ((x - midX) / midX) * 4   // links/rechts
    const rotX = -((y - midY) / midY) * 4  // boven/onder
    cardEl.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
}
function onCardLeave() {
    cardEl.style.transform = 'none'
    cardEl.style.removeProperty('--px')
    cardEl.style.removeProperty('--py')
}

onMounted(() => {
    cardEl = document.querySelector('.contact-card')
    if (cardEl) {
        cardEl.addEventListener('mousemove', onCardMouseMove, { passive: true })
        cardEl.addEventListener('mouseleave', onCardLeave, { passive: true })
    }
})
onBeforeUnmount(() => {
    if (cardEl) {
        cardEl.removeEventListener('mousemove', onCardMouseMove)
        cardEl.removeEventListener('mouseleave', onCardLeave)
    }
})
</script>

<template>
    <section class="contact">
        <div class="contact-hero-bg"></div>
        <div class="container">
            <!-- Hero -->
            <header class="page-hero">
                <h1>Contact</h1>
                <p class="subtitle">
                    Heb je een vraag, idee of wil je samenwerken aan een nieuw project?
                    Vul het formulier in en ik neem zo snel mogelijk contact met je op.
                </p>

                <div class="hero-actions">
                    <a href="#contact-form" class="btn btn--outline"><span>Stuur bericht</span></a>
                    <RouterLink to="/" class="btn btn--primary"><span>Terug naar home</span></RouterLink>
                </div>
            </header>

            <!-- Kaart met formulier -->
            <div class="contact-card" :class="{ 'is-sending': status === 'sending' }">
                <form id="contact-form" class="contact-form" novalidate @submit.prevent="handleSubmit">
                    <!-- honeypot -->
                    <input class="hp" autocomplete="off" tabindex="-1" v-model="form.hp" />

                    <div class="field" :class="{ invalid: errors.name }">
                        <label for="name">Naam</label>
                        <input id="name" v-model="form.name" type="text" placeholder="Jouw naam" />
                        <small class="error" v-if="errors.name">{{ errors.name }}</small>
                    </div>

                    <div class="field two" :class="{ invalid: errors.email }">
                        <label for="email">E-mailadres</label>
                        <input id="email" v-model="form.email" type="email" placeholder="jij@email.nl" />
                        <small class="error" v-if="errors.email">{{ errors.email }}</small>
                    </div>

                    <div class="field">
                        <label for="message">Bericht</label>
                        <textarea id="message" v-model="form.message" rows="6"
                            placeholder="Vertel kort waar ik mee kan helpen…"></textarea>
                        <small class="error" v-if="errors.message">{{ errors.message }}</small>
                    </div>

                    <div class="actions">
                        <button type="submit" class="btn btn--primary" :disabled="status === 'sending'">
                            <span v-if="status === 'sending'" class="spinner" aria-hidden="true"></span>
                            <span v-else>Versturen</span>
                        </button>
                    </div>
                </form>

                <!-- Succes -->
                <div class="success" v-if="status === 'ok'">
                    <div class="check">✓</div>
                    <h3>Bericht verzonden!</h3>
                    <p>Bedankt voor je bericht — ik kom bij je terug.</p>
                    <div class="btns">
                        <button class="btn btn--outline" @click="resetForm">Nog een bericht</button>
                        <RouterLink to="/" class="btn btn--primary">Terug naar home</RouterLink>
                    </div>
                </div>

                <!-- Fout -->
                <div class="error-pane" v-if="status === 'err'">
                    <h3>Oeps, er ging iets mis</h3>
                    <p>Probeer het later opnieuw of mail me: <a href="mailto:mail@voorbeeld.nl">mail@voorbeeld.nl</a>
                    </p>
                    <button class="btn btn--outline" @click="status = 'idle'">Opnieuw proberen</button>
                </div>
            </div>

            <p class="contact-alt">
                Of neem contact op via een van de kanalen hieronder 👇
            </p>
        </div>
    </section>
</template>

<style scoped>
.btn {
    margin: 0 20px;
}

/* ===== Achtergrond ===== */
.contact {
    position: relative;
    overflow: hidden;
    color: #fff;
}

.contact-hero-bg {
    position: absolute;
    inset: 0;
    height: 100vh;
    background-image: url('@/assets/images/contact-banner.png');
    background-size: cover;
    background-position: center;
    filter: brightness(.6);
    pointer-events: none;
    z-index: 0;
}

.container {
    position: relative;
    z-index: 1;
}

/* ===== Hero ===== */
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
    color: #d4d4d4;
    max-width: 820px;
    line-height: 1.6;
    margin: 0;
}

/* ===== Card met mouse-follow (tilt + spotlight) ===== */
.contact-card {
    position: relative;
    max-width: 720px;
    margin: 72px auto 96px;
    border-radius: 16px;
    transition: transform .15s ease;
    /* spotlight laag (volgt --px/--py), alleen zichtbaar met muis */
    background:
        radial-gradient(600px circle at var(--px, -1000px) var(--py, -1000px),
            color-mix(in oklab, var(--color-primary) 16%, transparent) 0%,
            transparent 40%);
    will-change: transform;
}

@media (hover:none) and (pointer:coarse) {
    .contact-card {
        background: none;
    }
}

/* subtiele “glow ring” rand */
.contact-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    background: linear-gradient(120deg,
            color-mix(in oklab, var(--color-primary) 45%, #fff) 0%,
            color-mix(in oklab, var(--color-primary) 15%, #000) 100%);
    opacity: .14;
    pointer-events: none;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
}

/* ===== Formulier ===== */
.contact-form {
    background: rgba(255, 255, 255, .08);
    border: 1px solid rgba(255, 255, 255, .18);
    border-radius: 16px;
    padding: clamp(22px, 3.6vw, 28px);
    display: grid;
    gap: 16px;
    backdrop-filter: blur(8px);
}

.hp {
    position: absolute;
    left: -9999px;
    opacity: 0;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
}

.field.two {}

/* Labels boven de velden */
label {
    font-size: .95rem;
    color: #ffb3b3;
}

/* Inputs */
input,
textarea {
    color: #fff;
    font: inherit;
    width: 100%;
    background: rgba(255, 255, 255, .10);
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 10px;
    padding: 12px 14px;
    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
}

textarea {
    resize: vertical;
    min-height: 140px;
}

/* Focus glow */
input:focus,
textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 30%, transparent);
    background: rgba(255, 255, 255, .12);
}

/* Validatie */
.error {
    color: #ff9595;
    font-size: .84rem;
    min-height: 1em;
}

.invalid input,
.invalid textarea {
    border-color: #ff6b6b;
}

/* Acties */
.actions {
    display: flex;
    justify-content: flex-end;
}

.spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, .6);
    border-top-color: transparent;
    animation: spin .8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.is-sending .btn {
    opacity: .9;
}

/* Succes / Error panelen */
.success,
.error-pane {
    margin-top: 16px;
    text-align: center;
    background: rgba(255, 255, 255, .06);
    border: 1px solid rgba(255, 255, 255, .14);
    border-radius: 16px;
    padding: 20px;
}

.success .check {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 4px auto 8px;
    background: color-mix(in oklab, var(--color-primary) 65%, #fff 0%);
    color: #140909;
    font-weight: 800;
    font-size: 1.2rem;
    box-shadow: 0 8px 28px rgba(0, 0, 0, .35);
}

.success .btns {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 6px;
}

/* Hover voor outline in rood-thema */
.btn--outline:hover {
    background: var(--color-primary-hover);
    color: #fff;
}

.contact-alt {
    text-align: center;
    color: #d6d6d6;
    font-size: 1rem;
    margin-top: -50px;
    margin-bottom: 90px;
    letter-spacing: 0.3px;
    opacity: 0.85;
    animation: fadeIn 0.8s ease 0.3s both;
}

/* Responsive */
@media (max-width: 900px) {
    .page-hero {
        height: auto;
        padding: 100px 0 60px;
    }

    .contact-card {
        margin: 40px 16px 72px;
    }
}
</style>