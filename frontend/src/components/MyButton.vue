<template>
  <!-- Bouton dynamique utilisé "connect" et "share" -->
  <button :style="{ background, color }" :disabled="disabled">
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "connect",
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 40px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.5;
}

button:hover {
  filter: brightness(125%);
}
</style>
