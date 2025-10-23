<script setup>
import { RouterLink } from 'vue-router'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer">
    <hr class="divider" />

    <div class="container footer-content">
      <!-- Social icons -->
      <div class="socials">
        <a href="https://github.com/" target="_blank" aria-label="GitHub" class="icon">
          <Github />
        </a>
        <a href="https://linkedin.com/" target="_blank" aria-label="LinkedIn" class="icon">
          <Linkedin />
        </a>
        <a href="mailto:example@mail.com" aria-label="Email" class="icon">
          <Mail />
        </a>
        <a href="https://wa.me/31600000000" target="_blank" aria-label="WhatsApp" class="icon">
          <MessageCircle />
        </a>
      </div>

      <!-- Footer nav -->
      <nav class="footer-nav" aria-label="Footer navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/projects">Projecten</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>

      <!-- Credits -->
      <p class="credits muted">Made by Mike L. Degrassi</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 3rem 0 2.5rem;
}

.divider {
  width: 90%;
  margin: 0 auto 2rem;
  height: 1px;
  border: 0;
  background: var(--color-text);
  opacity: 0.2;
}

.footer-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

/* Social icons */
.socials {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.25rem;
}

.icon {
  display: inline-flex;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.icon:hover {
  transform: translateY(-3px);
  background: rgba(127, 185, 255, 0.15);
  color: var(--color-primary-hover);
}

.icon svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

/* Nav links */
.footer-nav {
  display: flex;
  gap: 2rem;
  margin-top: 0.25rem;
}

.footer-nav a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: var(--color-primary);
}

/* Credits */
.credits {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 600px) {
  .divider {
    width: 92%;
  }

  .footer-nav {
    gap: 1.25rem;
  }

  .icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
  }
}
</style>