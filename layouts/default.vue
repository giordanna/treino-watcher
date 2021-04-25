<template>
  <div class="box-border min-h-screen bg-background-200 relative">
    <Header class="sticky top-0 z-10" />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    try {
      const treinos = JSON.parse(window.localStorage.getItem('treinos'));
      if (!!treinos) {
        this.setarTreinos(treinos);
        console.log('setou treinos de localstorage!');
      }
    } catch (error) {
      window.localStorage.removeItem('treinos');
    }
  },
  methods: {
    ...mapActions({
      setarTreinos: 'setarTreinos',
    }),
  },
};
</script>
