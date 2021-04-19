<template>
  <main class="container mx-auto p-3 pl-1">
    <article class="mt-2">
      <section>
        <button @click="proximoPasso(1)" class="focus:outline-none w-full py-2 flex items-center">
          <span
            class="mr-2 rounded-full bg-primary-600 text-white h-6 w-6 text-center inline-block"
          >
            1
          </span>
          <h2 class="text-lg">Treino</h2>
        </button>
        <form @submit.prevent="proximoPasso(2)" class="border-l-2 ml-2.5 pl-3 py-1 border-gray-400">
          <div
            ref="passo1"
            :style="{
              'max-height': validaTamanhoPasso(1),
            }"
            class="relative px-0.5 w-full overflow-hidden max-h-0 transition-all duration-300 ease-in-out"
          >
            <div class="grid grid-cols-2 gap-x-3">
              <Input
                :error="$v.treino.nome.$error"
                v-model.trim="$v.treino.nome.$model"
                label="Nome *"
                ref="treino"
                autocomplete="on"
                type="text"
                id="treino"
                class="col-span-2"
              >
                <template v-slot:error>
                  <div v-if="!$v.treino.nome.required">* Obrigatório</div>
                </template>
              </Input>

              <Input
                label="Repetições"
                type="tel"
                autocomplete="on"
                :error="$v.treino.repeticoes.$error"
                v-model.number="$v.treino.repeticoes.$model"
              >
                <template v-slot:error>
                  <div v-if="!$v.treino.repeticoes.integer">* Apenas números</div>
                  <div v-else-if="!$v.treino.repeticoes.minValue">* Valor inválido</div>
                </template>
              </Input>

              <Input
                label="Séries"
                autocomplete="on"
                type="tel"
                v-model.number="$v.treino.series.$model"
                :error="$v.treino.series.$error"
              >
                <template v-slot:error>
                  <div v-if="!$v.treino.series.integer">* Apenas números</div>
                  <div v-else-if="!$v.treino.series.minValue">* Valor inválido</div>
                </template>
              </Input>

              <Input
                label="Intervalo"
                autocomplete="on"
                type="tel"
                v-model.number="$v.treino.intervalo.$model"
                :error="$v.treino.intervalo.$error"
              >
                <template v-slot:tip> Em segundos </template>
                <template v-slot:error>
                  <div v-if="!$v.treino.intervalo.integer">* Apenas números</div>
                  <div v-else-if="!$v.treino.intervalo.minValue">* Valor inválido</div>
                </template>
              </Input>
            </div>
            <button
              @click="proximoPasso(2)"
              type="submit"
              class="active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
            >
              Próximo
            </button>
          </div>
        </form>
      </section>

      <section>
        <button @click="proximoPasso(2)" class="focus:outline-none w-full py-2 flex items-center">
          <span
            :class="{ 'bg-primary-600': passo > 1 }"
            class="relative transition-color duration-150 ease-in-out mr-2 rounded-full bg-gray-400 text-white h-6 w-6 text-center inline-block"
          >
            2
          </span>
          <h2 class="text-lg">Lista de exercícios</h2>
        </button>
        <form @submit.prevent="proximoPasso(3)" class="border-l-2 ml-2.5 pl-3 py-1 border-gray-400">
          <div
            ref="passo2"
            :style="{
              'max-height': validaTamanhoPasso(2),
            }"
            class="px-0.5 w-full overflow-hidden max-h-0 transition-all duration-300 ease-in-out"
          >
            <div>
              <h3 class="text-lg font-bold">Exercícios</h3>
              <p v-if="exercicios.length === 0">
                Preencha o formulário abaixo para criar um exercício.
              </p>
              <table v-if="exercicios.length > 0" class="border-collapse w-full mt-2 mb-4">
                <thead class="text-sm">
                  <tr class="text-left border-b-2 border-gray-400">
                    <th class="w-full">Nome</th>
                    <th class="px-1">Peso</th>
                    <th class="px-1">Obs.</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <transition-group
                  enter-active-class="transform-gpu"
                  enter-class="opacity-0 -translate-x-full"
                  enter-to-class="opacity-100 translate-x-0"
                  leave-active-class="transform-gpu"
                  leave-class="opacity-100 translate-x-0"
                  leave-to-class="opacity-0 -translate-x-full"
                  class="text-sm whitespace-nowrap"
                  tag="tbody"
                >
                  <tr
                    v-for="(exer, exerIndex) in exercicios"
                    :key="exer.id"
                    class="transition-all duration-300 ease-in-out border-b-2 border-gray-400"
                  >
                    <td class="py-1 w-full">{{ exer.nome }}</td>
                    <td class="p-1">{{ !!exer.peso ? exer.peso + ' kg' : '' }}</td>
                    <td class="p-1">{{ exer.observacoes }}</td>
                    <td
                      class="text-center uppercase font-bold text-xs py-1"
                      v-if="editandoExercicio === exerIndex"
                    >
                      Editando
                    </td>
                    <td class="text-center" v-if="editandoExercicio !== exerIndex">
                      <button
                        @click="editarExercicio(exerIndex)"
                        :disabled="editandoExercicio > -1"
                        type="button"
                        class="active:text-gray-500 hover:text-gray-300 focus:text-gray-300 transition-colors duration-200 ease-in-out text-gray-400 p-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Editar"
                      >
                        <span class="material-icons inline align-bottom"> build </span>
                      </button>
                      <button
                        @click="removerExercicio(exerIndex)"
                        :disabled="editandoExercicio > -1"
                        type="button"
                        class="active:text-danger-500 hover:text-danger-300 focus:text-danger-300 transition-colors duration-200 ease-in-out text-danger-400 p-0.5 ml-1 disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Remover"
                      >
                        <span class="material-icons inline align-bottom"> delete </span>
                      </button>
                    </td>
                  </tr>
                </transition-group>
              </table>
            </div>
            <h4 class="font-bold">
              {{ editandoExercicio > -1 ? 'Editar exercício' : 'Criar exercício' }}
            </h4>
            <div class="grid grid-cols-2 gap-x-3">
              <Input
                label="Nome do exercício *"
                autocomplete="on"
                type="text"
                ref="exercicio"
                class="col-span-2"
                :error="$v.exercicio.nome.$error"
                v-model.trim="$v.exercicio.nome.$model"
              >
                <template v-slot:error>
                  <div v-if="!$v.exercicio.nome.required">* Obrigatório</div>
                  <div v-else-if="!$v.exercicio.nome.maxLength">
                    * Máximo {{ $v.exercicio.nome.$params.maxLength.max }} caracteres
                  </div>
                </template>
              </Input>

              <Input
                label="Peso"
                type="tel"
                autocomplete="on"
                v-model.number="$v.exercicio.peso.$model"
                :error="$v.exercicio.peso.$error"
              >
                <template v-slot:tip> Em kg </template>
                <template v-slot:error>
                  <div v-if="!$v.exercicio.peso.integer">* Apenas números</div>
                  <div v-else-if="!$v.exercicio.peso.minValue">* Valor inválido</div>
                </template>
              </Input>

              <Input label="Observações" autocomplete="on" v-model.trim="exercicio.observacoes" />
            </div>

            <button
              @click="adicionarExercicio()"
              v-if="editandoExercicio === -1"
              type="button"
              class="active:bg-tertiary-500 hover:bg-tertiary-300 focus:bg-tertiary-300 transition-colors duration-200 ease-in-out w-full block my-3 text-center py-3 px-4 bg-tertiary-400 text-white text-lg rounded-md font-bold"
            >
              Adicionar exercício
            </button>

            <div v-if="editandoExercicio > -1" class="grid grid-cols-2 gap-x-3">
              <button
                @click="salvarEdicao()"
                type="button"
                class="active:bg-tertiary-500 hover:bg-tertiary-300 focus:bg-tertiary-300 transition-colors duration-200 ease-in-out block my-3 text-center py-3 px-4 bg-tertiary-400 text-white text-lg rounded-md font-bold"
              >
                Salvar
              </button>
              <button
                @click="cancelarEdicao()"
                type="button"
                class="active:bg-danger-500 hover:bg-danger-300 focus:bg-danger-300 transition-colors duration-200 ease-in-out block my-3 text-center py-3 px-4 bg-danger-400 text-white text-lg rounded-md font-bold"
              >
                Cancelar
              </button>
            </div>

            <div>
              <button
                @click="proximoPasso(1)"
                type="button"
                class="active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out inline-block py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
              >
                Anterior
              </button>
              <button
                @click="proximoPasso(3)"
                type="submit"
                class="active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out inline-block ml-2 py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
              >
                Próximo
              </button>
            </div>
          </div>
        </form>
      </section>

      <section>
        <button @click="proximoPasso(3)" class="focus:outline-none w-full py-2 flex items-center">
          <span
            :class="{ 'bg-primary-600': passo > 2 }"
            class="transition-color duration-150 ease-in-out mr-2 rounded-full bg-gray-400 text-white h-6 w-6 text-center inline-block"
          >
            3
          </span>
          <h2 class="text-lg">Confirme seu treino</h2>
        </button>
        <form @submit.prevent="upsertTreino()" class="border-l-2 ml-2.5 pl-3 py-1 border-gray-400">
          <div
            ref="passo3"
            :style="{
              'max-height': validaTamanhoPasso(3),
            }"
            class="relative px-0.5 w-full overflow-hidden max-h-0 transition-all duration-300 ease-in-out"
          >
            <div class="my-2">
              <h3 class="text-lg font-bold">
                Treino: <span class="font-normal">{{ treino.nome }}</span>
              </h3>
              <table class="border-collapse w-full mt-2 mb-4">
                <thead class="text-sm">
                  <tr class="text-center">
                    <th class="px-1 w-1/3">Repetições</th>
                    <th class="px-1 w-1/3">Séries</th>
                    <th class="w-1/3">Intervalo</th>
                  </tr>
                </thead>
                <tbody class="text-center text-sm whitespace-nowrap">
                  <tr>
                    <td class="w-1/3 p-1">{{ treino.repeticoes }}</td>
                    <td class="w-1/3 p-1">{{ treino.series }}</td>
                    <td class="w-1/3 py-1">
                      {{ !!treino.intervalo ? treino.intervalo + '"' : '' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 class="text-lg font-bold">Exercício(s)</h3>
              <table class="border-collapse w-full mt-2 mb-4">
                <thead class="text-sm">
                  <tr class="text-left border-b-2 border-gray-400">
                    <th class="w-full">Nome</th>
                    <th class="px-1">Peso</th>
                    <th>Obs.</th>
                  </tr>
                </thead>
                <tbody class="text-sm whitespace-nowrap">
                  <tr v-for="exer in exercicios" :key="exer.id" class="border-b-2 border-gray-400">
                    <td class="w-full py-1">{{ exer.nome }}</td>
                    <td class="p-1">{{ !!exer.peso ? exer.peso + ' kg' : '' }}</td>
                    <td class="py-1">{{ exer.observacoes }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <button
                @click="proximoPasso(2)"
                type="button"
                class="active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 bg-primary-600 text-white text-lg rounded-md font-bold"
              >
                Anterior
              </button>

              <button
                type="submit"
                class="active:to-primary-700 active:from-secondary-600 hover:to-primary-500 hover:from-secondary-400 focus:to-primary-500 focus:from-secondary-400 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 mt-3 mb-1 w-full bg-gradient-to-r to-primary-600 from-secondary-500 text-white block text-center uppercase rounded py-3 text-xl font-bold shadow"
              >
                Criar treino
              </button>
            </div>
          </div>
        </form>
      </section>
    </article>
  </main>
</template>

<script>
import { required, integer, maxLength, minValue } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      treino: {
        nome: '',
        series: null,
        repeticoes: null,
        intervalo: null,
      },
      editandoExercicio: -1,
      passo: 0,
      exercicios: [],
      exercicio: {
        nome: '',
        peso: null,
        observacoes: null,
        id: this.gerarId(),
      },
    };
  },
  validations: {
    treino: {
      nome: {
        required,
      },
      series: {
        integer,
        minValue: minValue(1),
      },
      repeticoes: {
        integer,
        minValue: minValue(1),
      },
      intervalo: {
        integer,
        minValue: minValue(1),
      },
    },

    exercicio: {
      nome: {
        required,
        maxLength: maxLength(12),
      },
      peso: {
        integer,
        minValue: minValue(1),
      },
    },
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.passo = 1;

      setTimeout(() => {
        this.$refs.treino.focus();
      }, 300);
    }, 300);
  },
  methods: {
    gerarId() {
      const data = new Date();
      return data.getTime();
    },
    proximoPasso(index) {
      if (this.passo === index) return;

      switch (index) {
        case 1: {
          this.passo = index;
          this.$v.treino.$reset();

          setTimeout(() => {
            this.$refs.treino.focus();
          }, 300);
          break;
        }
        case 2: {
          this.$v.treino.$touch();

          if (!this.$v.treino.$error) {
            this.passo = index;
            this.$v.exercicio.$reset();

            setTimeout(() => {
              this.$refs.exercicio.focus();
            }, 300);
          }
          break;
        }
        case 3: {
          this.$v.treino.$touch();

          if (!this.$v.treino.$error && this.exercicios.length > 0) {
            this.passo = index;
          } else if (this.exercicios.length === 0) {
            this.$v.exercicio.$touch();
          }
          break;
        }
      }
    },
    adicionarExercicio() {
      this.$v.exercicio.$touch();
      if (!this.$v.exercicio.$error) {
        this.exercicios.push({
          ...this.exercicio,
        });

        this.$v.exercicio.$reset();

        this.$nextTick(() => {
          this.exercicio = {
            nome: '',
            peso: null,
            observacoes: null,
            id: this.gerarId(),
          };

          setTimeout(() => {
            this.$refs.exercicio.focus();
          }, 300);
        });
      }
    },
    removerExercicio(index) {
      this.exercicios.splice(index, 1);

      setTimeout(() => {
        this.$refs.exercicio.focus();
      }, 300);
    },
    editarExercicio(index) {
      this.editandoExercicio = index;

      this.$nextTick(() => {
        this.exercicio = {
          ...this.exercicios[index],
        };

        setTimeout(() => {
          this.$refs.exercicio.focus();
        }, 300);
      });
    },
    salvarEdicao() {
      this.$v.exercicio.$touch();

      if (!this.$v.exercicio.$error) {
        this.exercicios[this.editandoExercicio] = {
          ...this.exercicio,
        };

        this.editandoExercicio = -1;

        this.$v.exercicio.$reset();

        this.$nextTick(() => {
          this.exercicio = {
            nome: '',
            peso: null,
            observacoes: null,
            id: this.gerarId(),
          };

          setTimeout(() => {
            this.$refs.exercicio.focus();
          }, 300);
        });
      }
    },
    cancelarEdicao() {
      this.editandoExercicio = -1;

      this.$v.exercicio.$reset();

      this.$nextTick(() => {
        this.exercicio = {
          nome: '',
          peso: null,
          observacoes: null,
          id: this.gerarId(),
        };

        setTimeout(() => {
          this.$refs.exercicio.focus();
        }, 300);
      });
    },
    validaTamanhoPasso(index) {
      return this.passo == index && this.$refs['passo' + index]
        ? this.$refs['passo' + index].scrollHeight + 'px'
        : '';
    },
    upsertTreino() {
      console.log(this.treino, this.exercicios);
    },
  },
};
</script>
