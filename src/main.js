import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// --- Custom cursor ---
const cursorEl = document.querySelector('.cursor');
if (cursorEl) {
    let x = 0, y = 0, tx = 0, ty = 0;
    const ease = 1; // hoe “traag” de trailing is (lager = trager)

    // fade-in bij eerste move
    let revealed = false;
    window.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!revealed) {
            revealed = true;
            cursorEl.style.opacity = '1';
        }
    });

    // smooth trailing
    function raf() {
        x += (tx - x) * ease;
        y += (ty - y) * ease;
        cursorEl.style.transform = `translate(${x - 14}px, ${y - 14}px)`; // 14 = helft van 28
        requestAnimationFrame(raf);
    }
    raf();

    // hover states voor klikbare elementen (delegation werkt met Vue-dynamiek)
    const hoverSelector = 'a, button, .btn, [role="button"]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelector)) {
            cursorEl.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelector)) {
            cursorEl.classList.remove('hover');
        }
    });

    // verberg bij verlaten van het venster
    document.addEventListener('mouseleave', () => {
        cursorEl.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorEl.style.opacity = '1';
    });
}

const app = createApp(App)

app.use(router)
app.mount('#app')
