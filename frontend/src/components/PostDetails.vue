<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <header class="modal-header">
          <slot name="header">
            {{ post.title }}
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body"> {{ post.description }} </slot>
        </section>

        <section class="modal-body">
          <slot name="body"
            ><img :src="post.imageUrl" alt="postename" id="modalDescription" />
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #f05454;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 10px 10px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #f05454;
  background: transparent;
}

.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
@media all and (max-width: 768px) {
  #modalDescription {
    width: 70%;
  }
}
</style>