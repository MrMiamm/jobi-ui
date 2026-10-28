<template>
  <div class="flex flex-col gap-4 border-2 border-secondary-400/20 rounded-xl bg-linear-90 from-primary-400/20 to-primary-700/20 py-8 px-6">
    <header>
      <slot name="header" />
    </header>
    <div class="grow">
      <slot />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
