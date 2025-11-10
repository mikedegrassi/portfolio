<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import cvUrl from '@/assets/images/cv.png' // pas pad aan als nodig

// --- MENU TOGGLE ---
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

// --- CV-tekst dynamisch ---
const cvText = ref('')
const updateCvText = () => {
    cvText.value = window.innerWidth > 768 ? 'Curriculum Vitae | CV' : 'CV'
}

// --- CV MODAL ---
const cvOpen = ref(false)
const openCv = () => (cvOpen.value = true)
const closeCv = () => (cvOpen.value = false)

// --- KEYDOWN ESCAPE ---
const onKey = (e) => {
    if (e.key === 'Escape') {
        if (cvOpen.value) return closeCv()
        closeMenu()
    }
}

// --- ROUTER ---
const router = useRouter()

onMounted(() => {
    updateCvText()
    window.addEventListener('resize', updateCvText)
    window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCvText)
    window.removeEventListener('keydown', onKey)
    // schoonmaken
    document.body.classList.remove('menu-open', 'modal-open')
    document.body.style.overflow = ''
})

// Sluit menu na navigatie
router.afterEach(() => closeMenu())

// --- Body state (cursor/scroll lock) sync met menuOpen & cvOpen
watch([menuOpen, cvOpen], ([menu, modal]) => {
    const anyOpen = menu || modal
    document.body.classList.toggle('menu-open', menu)
    document.body.classList.toggle('modal-open', modal)
    document.body.style.overflow = anyOpen ? 'hidden' : ''
})
</script>

<template>
    <header class="nav">
        <div class="container nav-inner">
            <!-- Logo / foto -->
            <RouterLink to="/" class="brand" aria-label="Naar home">
                <img src="../assets/images/me.png" alt="Mike Degrassi" class="brand-img" />
                <span class="brand-name">Mike</span>
            </RouterLink>

            <!-- Rechts: CV + Menu -->
            <div class="actions">
                <!-- CV open (modal) -->
                <button class="btn btn--cv" @click="openCv" aria-haspopup="dialog" aria-controls="cv-modal">
                    <span>{{ cvText }}</span>
                </button>

                <!-- Menu toggle -->
                <button class="btn btn--menu" @click="toggleMenu" :aria-expanded="menuOpen.toString()"
                    aria-controls="main-menu">
                    Menu
                </button>

                <!-- Menu panel -->
                <div v-show="menuOpen" id="main-menu" class="menu" role="menu">
                    <RouterLink to="/" class="menu-item" role="menuitem"><span>Home</span></RouterLink>
                    <RouterLink to="/projects" class="menu-item" role="menuitem"><span>Projecten</span></RouterLink>
                    <RouterLink to="/contact" class="menu-item" role="menuitem"><span>Contact</span></RouterLink>

                    <div class="menu-divider"></div>

                    <button class="menu-item menu-close" @click="closeMenu"><span>Close</span></button>
                </div>
            </div>

            <!-- Backdrop voor menu -->
            <transition name="fade">
                <div v-show="menuOpen" class="backdrop" @click="closeMenu" />
            </transition>
        </div>

        <!-- CV MODAL -->
        <transition name="fade">
            <div v-if="cvOpen" id="cv-modal" class="cv-modal" role="dialog" aria-modal="true"
                aria-label="CV van Mike Degrassi" @click.self="closeCv">
                <div class="cv-dialog" role="document">
                    <div class="cv-actions">
                        <div class="left-actions">
                            <a :href="cvUrl" download class="btn btn--outline" aria-label="Download CV">
                                Download CV
                            </a>
                            <a :href="cvUrl" target="_blank" rel="noopener" class="btn btn--outline"
                                aria-label="Open in nieuw tabblad">
                                Open in nieuw tabblad
                            </a>
                        </div>

                        <div class="right-actions">
                            <!-- wit kruis-icoon -->
                            <button class="icon-btn close-btn" @click="closeCv" aria-label="Sluit CV">
                                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="white" stroke-width="2.2"
                                        stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="cv-frame">
                        <img :src="cvUrl" alt="Curriculum Vitae van Mike Degrassi" />
                    </div>
                </div>

                <!-- Backdrop voor modal -->
                <div class="backdrop backdrop--modal" @click="closeCv" />
            </div>
        </transition>
    </header>
</template>

<style scoped>
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    background: transparent;
}

.nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 0.5rem;
}

/* Brand */
.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color-text);
}

.brand-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--color-border);
    box-shadow: 0 0 10px rgba(127, 185, 255, .15);
}

.brand-name {
    font-weight: 600;
    letter-spacing: .3px;
}

/* Actions */
.actions {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* ==== Extra button types (basisknoppen zitten in base.css) ==== */
.btn--outline {
    background: transparent;
    border: 1.5px solid var(--color-primary);
}

.btn--outline:hover {
    background: var(--color-primary-hover);
    color: #fff;
}

.btn--ghost {
    background: transparent;
    border: 1px solid var(--color-border);
}

.btn--ghost:hover {
    border-color: var(--color-primary-hover);
}

.btn--cv {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 2px solid var(--color-primary);
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    transition: color 0.4s ease;
}

.btn--cv::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .5s ease;
    border-radius: 0;
}

.btn--cv:hover::before {
    transform: scaleX(1);
}

.btn--cv span {
    position: relative;
    z-index: 1;
    transition: color .4s ease;
}

.btn--cv:hover span {
    color: #fff;
}

.btn--menu {
    min-width: 80px;
}

/* ===== Menu panel ===== */
.menu {
    position: absolute;
    right: 0;
    top: calc(100% + 15px);
    background: var(--color-primary);
    border-radius: 8px;
    padding: 8px;
    min-width: 180px;
    z-index: 20;
}

.menu-item {
    position: relative;
    display: block;
    width: 100%;
    padding: 0.6rem 0.8rem;
    margin-bottom: 5px;
    border-radius: 8px;
    color: var(--color-text);
    background: transparent;
    overflow: hidden;
    transition: color .3s ease;
}

.menu-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-primary-hover);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .4s ease;
    border-radius: inherit;
    z-index: 0;
}

.menu-item:hover::before {
    transform: scaleX(1);
}

.menu-item span,
.menu-item {
    position: relative;
    z-index: 1;
}

.menu-divider {
    height: 2px;
    background: var(--color-text);
    margin: .4rem 0 .6rem;
    opacity: .5;
}

.menu-close {
    color: var(--color-text-muted);
    font-size: .95rem;
}

.menu-close:hover {
    color: var(--color-text);
}

/* Backdrop (menu) */
.backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* ===== CV MODAL ===== */
.cv-modal {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
}

.cv-dialog {
    position: relative;
    width: min(1100px, 94vw);
    max-height: 90vh;
    border-radius: 14px;
    background: rgba(20, 20, 22, .9);
    border: 1px solid var(--color-border);
    box-shadow: 0 12px 50px rgba(0, 0, 0, .6);
    backdrop-filter: blur(8px);
    padding: 12px;
    z-index: 61;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 10px;
}

/* Actiebalk bovenin: links groep, rechts close */
.cv-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.left-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.right-actions {
    display: flex;
    align-items: center;
}

/* Icon-only close button (wit kruis) */
.icon-btn {
    display: inline-grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, .25);
    transition: background .2s ease, border-color .2s ease, transform .1s ease;
}

.icon-btn:hover {
    background: rgba(255, 255, 255, .08);
    border-color: rgba(255, 255, 255, .5);
}

.icon-btn:active {
    transform: translateY(1px);
}

.cv-frame {
    overflow: auto;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: #0e0e10;
}

.cv-frame img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
}

/* Backdrop (modal) */
.backdrop--modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .55);
    z-index: 59;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-inner {
        padding: 1.2rem 1.2rem;
    }
}

@media (max-width: 420px) {
    .btn--cv {
        padding: 0.5rem 0.7rem;
        font-size: 0.9rem;
        border: none;
    }

    .brand-name {
        display: none;
    }
}
</style>