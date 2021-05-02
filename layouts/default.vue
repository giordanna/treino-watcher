<template>
  <div class="box-border min-h-screen bg-background-200 relative">
    <Header class="sticky top-0 z-10" />

    <transition
      name="snack"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
      enter-class="opacity-0 transform translate-y-full"
      leave-to-class="opacity-0 transform translate-y-full"
    >
      <Snackbar v-if="!!snack && snack.mostrar" :cor="snack.cor">
        {{ snack.texto }}
      </Snackbar>
    </transition>

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: 'get-treinos',
  destroyed() {
    window.removeEventListener('resize', this.setVh);
  },
  mounted() {
    this.setVh();
    window.addEventListener('resize', this.setVh);
  },
  computed: {
    ...mapGetters({
      snack: 'snack',
    }),
  },
  methods: {
    setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
  },
};
</script>
