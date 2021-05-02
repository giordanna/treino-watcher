<template>
  <div
    :class="{
      'bg-danger-400 text-white': cor === 'danger',
      'bg-success-400 text-white': cor === 'success',
      'bg-warning-300 text-white': cor === 'warning',
    }"
    class="flex justify-between items-center bg-white fixed bottom-20 w-11/12 sm:w-96 rounded-lg shadow p-3 mx-auto inset-x-0"
  >
    <p class="flex-auto">
      <slot></slot>
    </p>
    <button class="flex-none" @click="fecharSnack">
      <span class="material-icons inline align-bottom">close</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    cor: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    ...mapGetters({
      snack: 'snack',
    }),
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.setarSnack({
        ...this.snack,
        mostrar: false,
      });
    }, this.snack.duracao);
  },
  methods: {
    ...mapMutations({
      setarSnack: 'setarSnack',
    }),
    fecharSnack() {
      this.setarSnack({
        ...this.snack,
        mostrar: false,
      });
    },
  },
};
</script>
