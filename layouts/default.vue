<template>
  <div class="box-border min-h-screen bg-background-200 relative">
    <Header class="sticky top-0 z-10" />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'get-treinos',
  destroyed() {
    window.removeEventListener('resize', this.setVh);
  },
  mounted() {
    this.setVh();
    window.addEventListener('resize', this.setVh);
  },
  methods: {
    setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
  },
};
</script>
