<template>
  <main class="flex min-h-screen flex-col items-start gap-6 bg-light p-8">
    <h1 class="text-2xl font-bold text-primary-700">Jobi UI - Playground Vue</h1>

    <div class="flex flex-wrap items-center gap-3">
      <JobiButton text="Primary" />
      <JobiButton text="Secondary" variant="secondary" />
      <JobiButton text="Contrast" variant="contrast" />
      <JobiButton text="Ghost" variant="ghost" />
      <JobiButton text="Lien" to="/" />
    </div>
  </main>
</template>
