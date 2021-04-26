<template>
  <span>
    <RouterLink
      class="h-full p-3 inline-block"
      v-if="!!botao.url && !botao.funcao"
      :to="botao.url"
      :title="botao.titulo"
    >
      <span v-if="!!botao.icone" class="material-icons inline align-bottom">
        {{ botao.icone }}
      </span>
      <span v-if="!!botao.texto">
        {{ botao.texto }}
      </span>
    </RouterLink>

    <button
      class="h-full p-3 inline-block"
      v-if="!!botao.funcao && !botao.url"
      @click="botao.funcao"
      :title="botao.titulo"
    >
      <span v-if="!!botao.icone" class="material-icons inline align-bottom">
        {{ botao.icone }}
      </span>
      <span v-if="!!botao.texto">
        {{ botao.texto }}
      </span>
    </button>
  </span>
</template>

<script>
export default {
  props: {
    botao: {
      type: Object,
      required: true,
    },
  },
};
</script>
