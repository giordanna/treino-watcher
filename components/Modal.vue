<template>
  <div class="fixed z-30 w-screen h-screen inset-0 flex items-center justify-between">
    <!-- modal -->
    <div class="rounded-lg overflow-hidden bg-white z-50 mx-auto max-h-full max-w-full shadow">
      <slot></slot>
    </div>

    <!-- backdrop-->
    <div class="z-40 w-full h-full fixed opacity-75 bg-black" @click="fechar"></div>
  </div>
</template>

<script>
export default {
  methods: {
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>
