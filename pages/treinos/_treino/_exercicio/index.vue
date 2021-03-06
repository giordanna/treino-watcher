<template>
  <main
    class="p-3 min-h-screen flex flex-col justify-between align-center mx-auto max-w-screen-md w-full"
  >
    <div class="w-full" v-if="!!exercicio">
      <header class="text-center">
        <h1 class="text-3xl font-bold my-3 truncate">
          {{ exercicio.nome }}
        </h1>
        <hr class="border-t-2 border-gray-400 w-3/4 mx-auto" />
      </header>
      <article
        class="text-3xl h-48 w-48 mx-auto max-w-full grid grid-cols-2 grid-rows-2 text-center"
      >
        <section class="relative flex flex-col justify-center items-center">
          <h2>Série</h2>
          <h3 class="font-bold">
            {{ serie }}/{{ !!exercicio.treino.series ? exercicio.treino.series : '--' }}
          </h3>

          <div class="absolute w-1/2 bottom-0 right-0 border-b-2 border-gray-400"></div>
          <div class="absolute h-1/2 bottom-0 right-0 border-r-2 border-gray-400"></div>
        </section>

        <section class="relative flex flex-col justify-center items-center">
          <h2>Rep.</h2>
          <h3 class="font-bold">
            {{ !!exercicio.treino.repeticoes ? exercicio.treino.repeticoes : '--' }}
          </h3>

          <div class="absolute w-1/2 bottom-0 left-0 border-b-2 border-gray-400"></div>
        </section>

        <section class="relative flex flex-col justify-center items-center">
          <h2>Inter.</h2>
          <h3 class="font-bold">
            {{ !!exercicio.treino.intervalo ? exercicio.treino.intervalo + 's' : '--' }}
          </h3>

          <div class="absolute h-1/2 top-0 right-0 border-r-2 border-gray-400"></div>
        </section>

        <section class="relative flex flex-col justify-center items-center">
          <h2>Peso</h2>
          <h3 class="font-bold">
            {{ !!exercicio.peso ? exercicio.peso + ' kg' : '--' }}
          </h3>
        </section>
      </article>

      <article class="text-3xl mb-3 text-center" v-if="!!exercicio.observacoes">
        <hr class="border-t-2 border-gray-400 w-3/4 mx-auto" />
        <h1 class="mt-2">Obs.</h1>
        <h1 class="mb-2 font-bold truncate">
          {{ exercicio.observacoes }}
        </h1>
        <hr class="border-t-2 border-gray-400 w-3/4 mx-auto" />
      </article>

      <button
        type="button"
        v-if="!isIntervalo && !finalizado"
        @click="iniciarIntervalo"
        class="w-full mt-2 active:bg-tertiary-500 hover:bg-tertiary-300 focus:bg-tertiary-300 transition-colors duration-200 ease-in-out block text-center py-3 px-4 bg-tertiary-400 text-white text-lg rounded-md font-bold"
      >
        Intervalo
      </button>

      <button
        type="button"
        v-if="isIntervalo && !finalizado"
        @click="pararIntervalo"
        class="w-full mt-2 active:bg-tertiary-500 hover:bg-danger-300 focus:bg-danger-300 transition-colors duration-200 ease-in-out block text-center py-3 px-4 bg-danger-400 text-white text-lg rounded-md font-bold"
      >
        {{
          !!exercicio.treino.series && serie >= exercicio.treino.series
            ? 'Finalizar exercício'
            : 'Próxima série'
        }}
      </button>

      <article
        :class="{
          'text-danger-400': !!exercicio.treino.intervalo
            ? segundos > exercicio.treino.intervalo
            : false,
        }"
        class="transition-colors duration-150 ease-in-out text-center font-bold my-4"
        v-if="isIntervalo && !finalizado"
      >
        <h4 class="text-5xl">
          {{ segundos }} / {{ !!exercicio.treino.intervalo ? exercicio.treino.intervalo : '--' }}
        </h4>
        <p>segundos</p>
      </article>

      <article v-if="finalizado" class="uppercase text-center text-4xl font-black my-4">
        <h4 class="mb-4">Finalizado</h4>
        <h5>💪 🎉</h5>
      </article>
    </div>
    <footer class="mx-auto">
      <NuxtLink
        v-if="!!linkAnterior"
        :to="!!linkAnterior ? linkAnterior : '/treinos/' + $route.params.treino"
        class="inline-block active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
      >
        Anterior
      </NuxtLink>
      <button
        v-if="!linkAnterior"
        disabled
        class="active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
      >
        Anterior
      </button>

      <NuxtLink
        v-if="!!linkProximo"
        :to="!!linkProximo ? linkProximo : '/treinos/' + $route.params.treino"
        class="inline-block ml-2 active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
      >
        Próximo
      </NuxtLink>

      <button
        v-if="!linkProximo"
        disabled
        class="active:bg-primary-700 ml-2 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
      >
        Próximo
      </button>
    </footer>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      exercicio: null,
      serie: 1,
      segundos: 1,
      finalizado: false,
      intervalo: null,
      isIntervalo: false,
      linkAnterior: null,
      linkProximo: null,
    };
  },
  created() {
    this.setarBotaoEsquerdo({
      url: '/treinos/' + this.$route.params.treino,
      icone: 'chevron_left',
      titulo: 'Voltar',
    });

    this.setarBotaoDireito(null);
  },
  async mounted() {
    try {
      this.exercicio = await this.getExercicio({
        idTreino: this.$route.params.treino,
        idExercicio: this.$route.params.exercicio,
      });

      if (this.exercicio.selecionado) {
        this.finalizado = true;
        if (!!this.exercicio.treino.series) {
          this.serie = this.exercicio.treino.series;
        }
      }

      const index = this.exercicio.treino.exercicios.findIndex(
        exercicio => exercicio.id === this.exercicio.id,
      );

      if (index === 0) {
        this.linkProximo = `/treinos/${this.$route.params.treino}/${
          this.exercicio.treino.exercicios[index + 1].id
        }`;
      } else if (index === this.exercicio.treino.exercicios.length - 1) {
        this.linkAnterior = `/treinos/${this.$route.params.treino}/${
          this.exercicio.treino.exercicios[index - 1].id
        }`;
      } else {
        this.linkAnterior = `/treinos/${this.$route.params.treino}/${
          this.exercicio.treino.exercicios[index - 1].id
        }`;
        this.linkProximo = `/treinos/${this.$route.params.treino}/${
          this.exercicio.treino.exercicios[index + 1].id
        }`;
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ...mapMutations({
      setarBotaoEsquerdo: 'setarBotaoEsquerdo',
      setarBotaoDireito: 'setarBotaoDireito',
      setarExercicio: 'setarExercicio',
      setarSnack: 'setarSnack',
    }),
    ...mapActions({
      getExercicio: 'getExercicio',
    }),
    iniciarIntervalo() {
      this.isIntervalo = true;
      this.segundos = 1;
      this.intervalo = setInterval(() => {
        this.segundos++;
      }, 1000);
    },
    pararIntervalo() {
      this.isIntervalo = false;
      clearInterval(this.intervalo);

      if (!!this.exercicio.treino.series && this.exercicio.treino.series === this.serie) {
        try {
          this.finalizado = true;
          this.setarExercicio({
            idTreino: this.$route.params.treino,
            idExercicio: this.$route.params.exercicio,
            exercicio: {
              selecionado: true,
            },
          });
        } catch (error) {
          this.setarSnack({
            cor: 'danger',
            texto: error.message,
          });
        }
      } else {
        this.serie++;
      }
    },
  },
};
</script>
