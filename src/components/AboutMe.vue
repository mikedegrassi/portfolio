
<template>
    <section class="about section">
      <div class="container about-inner">
        <!-- Afbeelding links -->
        <div class="image-wrap">
          <div class="image-shadow"></div>
          <img src="../assets//images/me2.png" alt="Mike L. Degrassi" />
        </div>
  
        <!-- Tekst rechts -->
        <div class="about-content">
          <h2 class="section-title">About me</h2>
  
          <p class="muted">
            Ik ben Mike L. Degrassi, afgestudeerd aan de Hogeschool Rotterdam in Creative Media & Game Technologies (CMGT). 
            Tijdens mijn studie heb ik geleerd om projecten van idee tot eindproduct te realiseren, 
            met aandacht voor zowel design als functionaliteit.
          </p>
  
          <p class="muted">
            Mijn kracht ligt in het combineren van creatieve concepten met technische uitvoering. 
            Ik werk graag met moderne frameworks zoals Vue.js en React, en besteed veel aandacht aan 
            gebruiksvriendelijkheid en design consistentie.
          </p>
  
          <p class="muted">
            Buiten school om heb ik aan diverse persoonlijke projecten gewerkt — van interactieve websites 
            en prototypes in Figma tot AI-interfaces en custom dashboards. 
            Ik blijf mezelf ontwikkelen door constant te experimenteren met nieuwe tools en technologieën.
          </p>
  
          <p class="muted">
            Als ik niet achter mijn scherm zit, ben ik bezig met fitness, designconcepten uitwerken of nieuwe 
            technologieën verkennen. Mijn doel is om mijn creatieve en technische skills te blijven combineren 
            in alles wat ik maak.
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>

.image-wrap {
    height: 600px;
}

  .about {
    padding: 6rem 0;
  }
  
  .about-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }
  
  /* Tekst rechts */
  .about-content {
    flex: 1;
    max-width: 550px;
  }
  
  .about-content p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  /* Responsive */
  @media (max-width: 900px) {
    .about-inner {
      flex-direction: column;
      text-align: center;
    }
  
    .about-content {
      max-width: 100%;
    }
  }
  </style>