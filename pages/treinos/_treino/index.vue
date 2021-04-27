<template>
  <main
    class="p-3 min-h-screen flex flex-col justify-between align-center mx-auto max-w-screen-md w-full"
  >
    <div>
      <header class="mb-5">
        <h1 v-if="!!treino" class="text-center text-3xl font-black uppercase my-2">
          {{ treino.nome }}
        </h1>

        <table v-if="!!treino" class="border-collapse w-full mt-2 mb-4">
          <thead class="text-sm">
            <tr class="text-center">
              <th>Repetições</th>
              <th class="px-1 w-full">Séries</th>
              <th>Intervalo</th>
            </tr>
          </thead>
          <tbody class="text-center text-sm whitespace-nowrap">
            <tr>
              <td class="py-1">{{ treino.repeticoes }}</td>
              <td class="w-full p-1">{{ treino.series }}</td>
              <td class="py-1">
                {{ !!treino.intervalo ? treino.intervalo + '"' : '' }}
              </td>
            </tr>
          </tbody>
        </table>

        <p class="text-sm">
          Clique no exercício para começar as séries, ou clique no checkbox para marcá-lo como
          feito.
        </p>
      </header>
      <table class="border-collapse mt-2 mb-4" v-if="!!treino">
        <thead class="text-sm">
          <tr class="text-left border-b-2 border-gray-400">
            <th></th>
            <th class="w-full px-1">Nome</th>
            <th class="px-1">Peso</th>
            <th>Obs.</th>
          </tr>
        </thead>
        <tbody class="text-sm whitespace-nowrap">
          <tr
            v-for="exer in treino.exercicios"
            :key="exer.id"
            :class="{ 'text-gray-300': exer.selecionado }"
            class="relative border-b-2 border-gray-400 transition-color duration-300 ease-in-out"
          >
            <td class="p-1">
              <hr
                :class="{ 'w-full-12': exer.selecionado }"
                class="z-10 absolute w-0 border-t-1 border-gray-300 inset-y-0 right-0 my-auto transition-all duration-300 ease-in-out"
              />
              <input
                type="checkbox"
                class="cursor-pointer form-checkbox rounded h-5 w-5 text-primary-600"
                v-model="exer.selecionado"
              />
            </td>
            <td class="w-full py-1">
              <RouterLink class="block" :to="'/treinos/' + treino.id + '/' + exer.id">
                {{ exer.nome }}
              </RouterLink>
            </td>
            <td class="p-1">
              <RouterLink class="block" :to="'/treinos/' + treino.id + '/' + exer.id">
                {{ !!exer.peso ? exer.peso + ' kg' : '' }}
              </RouterLink>
            </td>
            <td class="py-1">
              <RouterLink class="block" :to="'/treinos/' + treino.id + '/' + exer.id">
                {{ exer.observacoes }}
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer>
      <button
        @click="resetarExercicios()"
        type="button"
        class="active:bg-tertiary-500 hover:bg-tertiary-300 focus:bg-tertiary-300 transition-colors duration-200 ease-in-out w-full block text-center py-3 px-4 bg-tertiary-400 text-white text-lg rounded-md font-bold"
      >
        Resetar exercícios
      </button>
    </footer>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  head() {
    return {
      title: `Treino ${!!this.treino ? this.treino.nome : ''}`,
    };
  },
  data() {
    return {
      treino: null,
    };
  },
  created() {
    this.setarBotaoEsquerdo({
      url: '/treinos',
      icone: 'chevron_left',
      titulo: 'Voltar',
    });

    this.setarBotaoDireito(null);
  },
  async mounted() {
    try {
      this.treino = await this.getTreino(this.$route.params.treino);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ...mapMutations({
      setarBotaoEsquerdo: 'setarBotaoEsquerdo',
      setarBotaoDireito: 'setarBotaoDireito',
    }),
    ...mapActions({
      getTreino: 'getTreino',
    }),
    resetarExercicios() {
      this.treino.exercicios.map(exercicio => {
        exercicio.selecionado = false;
      });
    },
  },
};
</script>

<style scoped>
.w-full-12 {
  width: calc(100% - theme('spacing.7'));
}
</style>
