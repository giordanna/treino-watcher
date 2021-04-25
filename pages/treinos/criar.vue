<template>
  <TreinoForm @treinoSalvo="salvouTreino()" />
</template>

<script>
export default {
  head() {
    return {
      title: `Criar`,
    };
  },
  methods: {
    salvouTreino() {
      this.$router.push('/treinos');
    },
  },
};
</script>
