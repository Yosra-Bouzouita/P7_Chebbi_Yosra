<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <small class="form-text text-muted">{{ comment.user.firstname }} {{ comment.user.lastname }} écrit :{{ comment.message }}</small>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object,
    },
  },
  data: function () {
    return { };
  },
  methods: {

  },
};
</script>

<style scoped>

</style>