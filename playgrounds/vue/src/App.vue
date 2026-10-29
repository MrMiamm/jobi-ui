<template>
  <main class="flex min-h-screen flex-col items-start gap-6 bg-light p-8">
    <h1 class="text-2xl font-bold text-primary-700">Jobi UI - Playground Vue</h1>

    <div class="flex flex-wrap items-center gap-3">
      <JobiButton text="Primary" />
      <JobiButton text="Secondary" variant="secondary" />
      <JobiButton text="Contrast" variant="contrast" />
      <JobiButton text="Ghost" variant="ghost" />
      <JobiButton text="Lien" to="/" />
      <JobiButton text="Noise" noise />
      <JobiButton text="Noise secondary" variant="secondary" noise />
    </div>

    <h2 class="text-xl font-bold text-primary-700">Cartes</h2>

    <div class="grid w-full max-w-5xl gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="cardCase in cardCases" :key="cardCase.label" class="flex flex-col gap-2">
        <p class="text-sm font-light text-dark/70">{{ cardCase.label }}</p>
        <JobiCard
          :variant="cardCase.variant"
          :noise="cardCase.noise"
          :shadow="cardCase.shadow"
          :hover-animation="cardCase.hover"
        >
          <template #header> Header </template>
          Contenu de la carte.
          <template #footer> Footer </template>
        </JobiCard>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
type CardCase = {
  label: string
  variant: 'primary' | 'secondary' | 'contrast' | 'ghost'
  noise?: boolean
  shadow?: boolean
  hover?: boolean
}

/*************************************************************************/
// Tous les cas de la carte : chaque variante, avec et sans noise,
// puis les options (ombre portée, animation au survol) et leur cumul.

const variants = ['primary', 'secondary', 'contrast', 'ghost'] as const

const cardCases: CardCase[] = [
  ...variants.flatMap((variant) => [
    { label: `${variant} · sans noise`, variant },
    { label: `${variant} · noise`, variant, noise: true },
  ]),
  { label: 'primary · shadow', variant: 'primary', shadow: true },
  { label: 'primary · hover animation', variant: 'primary', hover: true },
  { label: 'primary · noise + shadow', variant: 'primary', noise: true, shadow: true },
  { label: 'primary · noise + hover animation', variant: 'primary', noise: true, hover: true },
  {
    label: 'primary · tout',
    variant: 'primary',
    noise: true,
    shadow: true,
    hover: true,
  },
]
</script>
