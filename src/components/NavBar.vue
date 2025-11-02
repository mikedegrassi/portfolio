<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

// --- MENU TOGGLE ---
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

// --- CV-tekst dynamisch ---
const cvText = ref('')

const updateCvText = () => {
    cvText.value = window.innerWidth > 768 ? 'Curriculum Vitae | CV' : 'CV'
}

// --- KEYDOWN ESCAPE ---
const onKey = (e) => {
    if (e.key === 'Escape') closeMenu()
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
    // zorg dat body state altijd schoon is bij unmount
    document.body.classList.remove('menu-open')
    document.body.style.overflow = ''
})

// Sluit menu na navigatie
router.afterEach(() => closeMenu())

// --- Keep body state (cursor verbergen + scroll lock) in sync met menuOpen
watch(menuOpen, (open) => {
    document.body.classList.toggle('menu-open', open) // <- nodig voor custom cursor
    document.body.style.overflow = open ? 'hidden' : ''
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
                <!-- CV download/open -->
                <button class="btn btn--cv">
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

                    <!-- Divider -->
                    <div class="menu-divider"></div>

                    <!-- Close item -->
                    <button class="menu-item menu-close" @click="closeMenu"><span>Close</span></button>
                </div>
            </div>

            <!-- Backdrop om buiten te kunnen klikken -->
            <transition name="fade">
                <div v-show="menuOpen" class="backdrop" @click="closeMenu" />
            </transition>
        </div>
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
    box-shadow: 0 0 10px rgba(127, 185, 255, 0.15);
}

.brand-name {
    font-weight: 600;
    letter-spacing: 0.3px;
}

/* Actions */
.actions {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--color-primary);
    color: var(--color-text);
}

.btn:hover {
    background: var(--color-primary-hover);
}

.btn:active {
    transform: translateY(1px);
}

.btn--cv {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: transparent;
    border: 2px var(--color-primary) solid;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    transition: color 0.4s ease;
}

.btn--cv:hover {
    background: none;
}

/* vul-laag */
.btn--cv::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
    border-radius: 0px;
}

.btn--cv:hover::before {
    transform: scaleX(1);
}

/* tekst boven pseudo */
.btn--cv span {
    position: relative;
    z-index: 100;
    transition: color 0.4s ease;
}

.btn--cv:hover span {
    color: var(--color-text);
}

/* Menu panel */
.btn--menu {
    min-width: 80px;
}

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
    transition: color 0.3s ease;
}

.menu-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-primary-hover);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: 0;
    border-radius: inherit;
}

.menu-item:hover::before {
    transform: scaleX(1);
}

/* tekst boven pseudo */
.menu-item span,
.menu-item {
    position: relative;
    z-index: 1;
}

/* Divider */
.menu-divider {
    height: 2px;
    background: var(--color-text);
    margin: 0.4rem 0 0.6rem;
    opacity: 0.5;
}

/* Close button */
.menu-close {
    color: var(--color-text-muted);
    font-size: 0.95rem;
}

.menu-close:hover {
    color: var(--color-text);
}

/* Backdrop */
.backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

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