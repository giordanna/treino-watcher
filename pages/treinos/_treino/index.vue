<template>
  <main>
    index de treino
    {{ $route.params.treino }}
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$route.params.treino} | Treino Tracker`,
    };
  },
};
</script>
