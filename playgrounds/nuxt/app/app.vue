<template>
  <main class="flex min-h-screen flex-col items-start gap-6 bg-light p-8">
    <NuxtRouteAnnouncer />

    <h1 class="text-2xl font-bold text-primary-700">Jobi UI - Playground Nuxt</h1>

    <div class="flex flex-wrap items-center gap-3">
      <JobiButton text="Primary" />
      <JobiButton text="Secondary" variant="secondary" />
      <JobiButton text="Contrast" variant="contrast" />
      <JobiButton text="Ghost" variant="ghost" />
      <JobiButton text="Lien" to="/" />
      <JobiButton text="Icon left" icon="material-symbols:add-2-rounded" variant="primary" />
      <JobiButton text="Icon left" icon="material-symbols:add-2-rounded" variant="primary" icon-position="right" />
    </div>

    <JobiCard>
      <template #header>
        Header
      </template>
      Main
      <template #footer>
        Footer
      </template>
    </JobiCard>
  </main>
</template>
