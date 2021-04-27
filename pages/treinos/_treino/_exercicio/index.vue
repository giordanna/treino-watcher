<template>
  <main class="p-3 flex items-center min-h-screen justify-between flex-col">
    <div>
      <header v-if="!!exercicio" class="w-full text-center">
        <h1 class="text-3xl font-bold my-3">
          {{ exercicio.nome }}
        </h1>
        <hr class="mb-3 border-t-2 border-gray-600 w-1/2 mx-auto" />
      </header>
      <article v-if="!!exercicio" class="grid grid-cols-2 w-full text-center">
        <section class="text-2xl p-3">
          <h2>Série</h2>
          <h3 class="font-black">
            {{ serie }}/{{ !!exercicio.treino.series ? exercicio.treino.series : '--' }}
          </h3>
        </section>

        <section class="text-2xl p-3">
          <h2>Rep.</h2>
          <h3 class="font-black">
            {{ !!exercicio.treino.repeticoes ? exercicio.treino.repeticoes + 's' : '--' }}
          </h3>
        </section>

        <section class="text-2xl p-3">
          <h2>Inter.</h2>
          <h3 class="font-black">
            {{ !!exercicio.treino.intervalo ? exercicio.treino.intervalo : '--' }}
          </h3>
        </section>

        <section class="text-2xl p-3">
          <h2>Peso</h2>
          <h3 class="font-black">
            {{ !!exercicio.peso ? exercicio.peso : '--' }}
          </h3>
        </section>
      </article>
    </div>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      exercicio: null,
      serie: 1,
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

      console.log(this.exercicio);
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
      getExercicio: 'getExercicio',
    }),
  },
};
</script>
