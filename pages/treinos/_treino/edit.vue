<template>
  <TreinoForm :editMode="true" :treinoId="$route.params.treino" />
</template>

<script>
export default {
  head() {
    return {
      title: `Editar ${this.$route.params.treino} | Treino Tracker`,
    };
  },
};
</script>
