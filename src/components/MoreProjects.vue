<template>
    <section class="more-projects">
        <div class="container inner">
            <!-- Tekst -->
            <div class="text">
                <h2 class="section-title">Meer projecten?</h2>
                <p class="muted">
                    Op de projectenpagina vind je nog talloze andere projecten om te bekijken — van design tot front-end
                    en back-end, gebouwd met diverse talen, tools en frameworks.
                </p>
                <RouterLink to="/projects" class="btn btn--primary">
                    <span>Bekijk Alle Projecten</span>
                </RouterLink>
            </div>

            <!-- Afbeelding -->
            <div class="image-wrap">
                <div class="image-shadow"></div>
                <img src="../assets/images/collage.png" alt="Meer projecten" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.more-projects {
    padding: 100px 0;
    background: var(--color-background);
}

.inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
}

/* Tekstgedeelte */
.text {
    flex: 1;
    max-width: 460px;
}

.text h2 {
    color: var(--color-text);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.text p {
    font-size: 1.05rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

/* Afbeeldinggedeelte */


/* Responsiveness */
@media (max-width: 900px) {
    .inner {
        flex-direction: column;
        text-align: center;
    }
}
</style>