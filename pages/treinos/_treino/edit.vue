<template>
  <TreinoForm :editMode="true" :treinoId="$route.params.treino" @treinoSalvo="salvouTreino()" />
</template>

<script>
export default {
  head() {
    return {
      title: `Editar ${this.$route.params.treino}`,
    };
  },
  salvouTreino() {
    this.$router.push('/treinos');
  },
};
</script>
