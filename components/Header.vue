<template>
  <nav class="w-full h-14 shadow-md text-white bg-gradient-to-r to-primary-600 from-secondary-500">
    <div class="h-14 max-w-screen-md w-full mx-auto flex justify-between items-center relative">
      <BotaoUrl class="z-10" v-if="!!botaoEsquerdo" :botao="botaoEsquerdo" />

      <RouterLink
        to="/"
        title="Ir para o ínicio"
        class="z-0 font-light text-xl h-full py-3 absolute inset-x-0 mx-auto text-center"
      >
        Treino <span class="font-bold">Watcher</span>
        <img src="~static/logo.png" class="ml-2 h-full inline align-middle" alt="Logo" />
      </RouterLink>

      <BotaoUrl class="z-10" v-if="!!botaoDireito" :botao="botaoDireito" />
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      botaoEsquerdo: 'botaoEsquerdo',
      botaoDireito: 'botaoDireito',
    }),
  },
};
</script>
