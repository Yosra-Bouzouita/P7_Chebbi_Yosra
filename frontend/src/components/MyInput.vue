<template>
  <!-- formulaire de signup et login -->
  <div class="input">
    <div class="label">
      <label :for="name">{{ name }}</label>
      <div class="error">{{ error }}</div>
    </div>
    <input :id="name" :type="type" :value="value" @input="input" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    error() {
      return this.validate(this.value);
    },
  },
  // les méthodes de validation des inputs de formulaire de login et signup
  methods: {
    validate(value) {
      if (value.length === 0) return "*";
      if (this.name == "FirstName" && !/^[a-zA-ZéèçàÀÉÈÇ ]+$/.test(value)) {
        return "Only lettres are accepted in " + this.name;
      }
      if (this.name == "LastName" && !/^[a-zA-ZéèçàÀÉÈÇ ]+$/.test(value)) {
        return "Only lettres are accepted in " + this.name;
      }
      if (
        this.name == "Email" &&
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
      ) {
        return "Wrong format of " + this.name;
      }
      if (this.name == "Password" && value.length <= 8) {
        return "Minimum length of " + this.name + " is 8";
      }
    },

    input($event) {
      this.$emit("update", {
        name: this.name.toLowerCase(),
        value: $event.target.value,
        valid: !this.validate($event.target.value),
      });
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.label {
  display: flex;
  justify-content: space-between;
}

.error {
  color: red;
}

input {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid silver;
  margin: 2px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
}
</style>
