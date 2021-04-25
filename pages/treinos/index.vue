<template>
  <div class="p-3 container mx-auto min-h-screen-16 flex justify-between flex-col">
    <main>
      <header class="mx-auto text-center mb-5">
        <h1 class="text-3xl font-black uppercase my-2">Meus treinos</h1>
        <h2>Clique em um dos seus treinos para começar.</h2>
      </header>
      <table class="border-collapse w-full mt-2 mb-4">
        <thead class="text-sm">
          <tr class="text-left border-b-2 border-gray-400">
            <th class="w-full">Nome</th>
            <th class="px-1">Exercícios</th>
            <th class="px-1">Tempo</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody class="text-sm whitespace-nowrap">
          <tr v-for="treino in treinos" :key="treino.id" class="border-b-2 border-gray-400">
            <td class="w-full py-1">
              <NuxtLink class="block" :to="'/treinos/' + treino.id">
                {{ treino.nome }}
              </NuxtLink>
            </td>
            <td class="p-1">
              <NuxtLink class="block" :to="'/treinos/' + treino.id">
                {{ treino.exercicios.length }}
              </NuxtLink>
            </td>
            <td class="p-1">
              <NuxtLink class="block" :to="'/treinos/' + treino.id">
                {{ calcularTempo(treino) }}
              </NuxtLink>
            </td>
            <td class="text-center">
              <NuxtLink
                :to="'/treinos/' + treino.id + '/edit'"
                class="active:text-gray-500 hover:text-gray-300 focus:text-gray-300 transition-colors duration-200 ease-in-out text-gray-400 p-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Editar"
              >
                <span class="material-icons inline align-bottom"> build </span>
              </NuxtLink>
              <button
                @click="removerTreino(treino)"
                type="button"
                class="active:text-danger-500 hover:text-danger-300 focus:text-danger-300 transition-colors duration-200 ease-in-out text-danger-400 p-0.5 ml-1 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Remover"
              >
                <span class="material-icons inline align-bottom"> delete </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <footer>
      <NuxtLink
        class="bg-gradient-to-r to-primary-600 from-secondary-500 text-white block text-center uppercase rounded py-3 text-xl font-bold shadow"
        to="/treinos/criar"
      >
        Criar novo treino
      </NuxtLink>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      treinos: 'treinos',
    }),
  },
  methods: {
    removerTreino(treino) {
      console.log(treino);
    },
    calcularTempo(treino) {
      if (!!treino.intervalo && !!treino.series) {
        let total = treino.intervalo * treino.series * treino.exercicios.length;

        const horas = Math.floor(total / 3600) % 24;
        total -= horas * 3600;

        const minutos = Math.floor(total / 60) % 60;
        total -= minutos * 60;

        const segundos = Math.floor(total % 60);

        const final = `
          ${horas > 0 ? horas : ''}${horas > 0 ? 'h ' : ''}
          ${minutos > 0 ? minutos : ''}${minutos > 0 ? "' " : ''}
          ${segundos >= 0 ? segundos : ''}${segundos >= 0 ? '"' : ''}
          `;

        return final;
      } else {
        return '';
      }
    },
  },
};
</script>

<style scoped>
.min-h-screen-16 {
  min-height: calc(100vh - theme('spacing.16'));
}
</style>
