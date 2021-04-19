<template>
  <div class="group mt-2 mb-6 relative text-gray-500">
    <label
      @click="$refs.input.focus()"
      :class="{
        ['bg-' + background]: appearance === 'outline',
        'bg-transparent': appearance === 'standard',
        '-top-3 text-sm': (value !== '' && !!value) || focusedInput,
        ['text-' + color]: focusedInput && !error,
        'text-danger-400': error,
        'top-2': (value === '' || !value) && !focusedInput,
      }"
      class="z-10 absolute ml-2 px-1 transition-all duration-100 ease-in-out cursor-text"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      ref="input"
      :id="id"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :class="{
        'ring-danger-400 focus:ring-danger-400': error,
        'placeholder-current': (value !== '' && !!value) || focusedInput,
        [classAppearance]: true,
      }"
      :disabled="disabled"
      class="placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed p-2 w-full text-black font-light ring-gray-400 outline-none transition-opacity duration-200 ease-in-out"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="focusedInput = true"
      @blur="
        focusedInput = false;
        touchedInput = true;
      "
    />
    <small
      :class="{ 'opacity-100 text-danger-400': error, 'opacity-100': !!$slots['tip'] && !error }"
      class="text-xs absolute -bottom-5 left-0 ml-2 opacity-0 transition-opacity ease-in-out"
    >
      <slot name="tip" v-if="!error"></slot>
      <slot name="error" v-else></slot>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    appearance: {
      type: String,
      required: false,
      default: 'outline',
    },
    background: {
      type: String,
      required: false,
      default: 'background-200',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: 'secondary-500',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'off',
    },
    id: {
      type: String,
      required: false,
      default: 'input',
    },
    value: {
      type: [String, Number],
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
  },
  data() {
    return {
      focusedInput: false,
      touchedInput: false,
    };
  },
  computed: {
    classAppearance() {
      switch (this.appearance) {
        case 'standard': {
          return `ring-0 border-b-2 bg-transparent border-gray-400 focus:border-${this.color}`;
        }
        case 'outline':
        default: {
          return `bg-${this.background} rounded ring-2 group-hover:ring focus:ring bg-white focus:ring-${this.color}`;
        }
      }
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
