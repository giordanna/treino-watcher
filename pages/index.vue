<template>
  <main class="w-full max-w-screen-md mx-auto p-3 min-h-screen flex justify-between flex-col">
    <header class="mx-auto text-center">
      <h1 class="text-xl my-2">
        Crie seu treino <span class="block text-3xl font-black uppercase">maromba</span> hoje!
      </h1>
      <img src="~/static/3297248.svg" alt="stories - br.freepik.com" class="inline-block" />
      <a class="block text-gray-400 text-xs my-2" href="https://br.freepik.com/vetores/esporte"
        >stories - br.freepik.com</a
      >
    </header>
    <footer>
      <NuxtLink
        class="bg-gradient-to-r to-primary-600 from-secondary-500 text-white block text-center uppercase rounded py-3 text-xl font-bold shadow"
        to="/treinos/criar"
      >
        Iniciar
      </NuxtLink>
      <button class="block py-2 mx-auto">
        O que é
        <strong class="font-bold">
          Treino Tracker?
          <span class="ml-1 material-icons inline align-bottom"> expand_more </span>
        </strong>
      </button>
    </footer>
  </main>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  head() {
    return {
      title: `Início`,
    };
  },
  middleware: 'sem-treino',
  created() {
    this.setarBotaoEsquerdo(null);
    this.setarBotaoDireito(null);
  },
  methods: {
    ...mapMutations({
      setarBotaoEsquerdo: 'setarBotaoEsquerdo',
      setarBotaoDireito: 'setarBotaoDireito',
    }),
  },
};
</script>
