<template>
    <section class="hero">
        <!-- Achtergrondafbeelding -->
        <div class="hero-bg"></div>

        <!-- Tekst -->
        <div class="container">
            <div class="hero-content">
                <h1>
                    Welcome, ik ben <br />
                    <span>Mike L. Degrassi</span>
                </h1>

                <p class="intro muted">
                    Ik ben een afgestudeerde student van de Hogeschool Rotterdam, waar ik de opleiding
                    Creative Media & Game Technologies (CMGT) heb gevolgd. Tijdens deze studie heb ik geleerd om eigen
                    ideeën vanaf nul uit te werken en af te stemmen op de behoeften van de doelgroep. Mijn focus lag
                    voornamelijk op ontwerp en programmeren, waarin ik graag de creatieve en technische kanten
                    combineer.
                </p>

                <button class="btn btn--primary"><span>Contact Me!</span></button>
            </div>

            <!-- Scroll hint -->
            <a href="#projects" class="scroll-hint" aria-label="Scroll to content">
                <!-- chevron-down icon (inline SVG) -->
                <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M6.7 8.7a1 1 0 0 1 1.4 0L12 12.6l3.9-3.9a1 1 0 1 1 1.4 1.4L12.7 15a1 1 0 0 1-1.4 0L6.7 10.1a1 1 0 0 1 0-1.4z" />
                </svg>
                <span class="label">Scroll</span>
            </a>
        </div>
    </section>
</template>


<script setup>
// Geen script nodig voor deze sectie
</script>

<style scoped>

.hero {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--color-text);
    background: var(--color-bg);
}

/* Full-bleed bg */
.hero-bg {
    position: absolute;
    inset: 0;
    margin-top: -50px;
    background-image: url('@/assets/images/banner.png');
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
    pointer-events: none;
    z-index: 0;
}

/* Zachte gradient links voor leesbaarheid */
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, .45) 0%, rgba(0, 0, 0, 0) 55%);
    z-index: 0;
    /* onder content, boven bg */
}

/* Container binnen hero: links uitlijnen en ademruimte */
.hero .container {
    position: relative;
    z-index: 1;
    /* boven bg/overlay */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
}

.hero-content {
    max-width: 640px;
    text-align: left;
}

.hero h1 {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.hero h1 span {
    color: var(--color-primary);
}

.intro {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 2.2rem;
    color: var(--color-text-muted);
}

/* Scroll hint: onderaan, gecentreerd, boven bg */
.scroll-hint{
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .25rem;
  text-transform: uppercase;
  font-size: .85rem;
  letter-spacing: .12em;
  color: var(--color-text-muted);
  z-index: 2;            /* boven overlay */
  text-decoration: none; /* link zonder underline */
}

/* Chevron animaties (delay 2s) */
.scroll-hint .chev{
  width: 22px;
  height: 22px;
  fill: var(--color-text-muted);
  opacity: 0;
  /* eerst infade, dan eindeloos bounce */
  animation: hint-fade .4s ease 2s forwards,
             hint-bounce 1.6s ease-in-out 2.4s infinite;
}

/* Label infade met dezelfde delay */
.scroll-hint .label{
  opacity: 0;
  animation: hint-fade .4s ease 2s forwards;
}

/* Keyframes */
@keyframes hint-fade{
  to { opacity: 1; }
}
@keyframes hint-bounce{
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(6px); }
}

/* Respecteer reduced motion */
@media (prefers-reduced-motion: reduce){
  .scroll-hint .chev,
  .scroll-hint .label{
    animation: none;
    opacity: 1;
  }
}

/* Responsiveness */
@media (max-width: 768px) {
    .hero {
        justify-content: center;
        /* midden op mobiel */
        text-align: center;
    }

    .hero .container {
        padding-left: 1.25rem;
        /* standaard side padding */
        padding-right: 1.25rem;
        justify-content: center;
    }

    .hero-content {
        max-width: 90%;
        text-align: center;
    }

    .hero h1 {
        font-size: 2.2rem;
    }
}
</style>