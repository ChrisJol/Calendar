<template>
  <div
    v-show="active"
    class="absolute inset-0 flex justify-center items-center pointer-events-auto rounded-lg"
  >
    <div class="z-50">
      <component
        :is="component"
        @closed="close"
        v-bind="props"
        @success="onSuccess"
        @failed="onFail"
      />
    </div>
    <div @click="close" class="absolute inset-0 z-40"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "w-modal",

  props: ["component", "props"],

  data() {
    return {
      parent: null as HTMLDivElement | null,
      el: null as Element | null,
      active: true,
      escapeListener: null as ((e: KeyboardEvent) => void) | null,
    };
  },

  beforeMount() {
    this.setupContainer();
  },

  beforeDestroy() {
    if (this.escapeListener !== null) {
      document.removeEventListener("keydown", this.escapeListener);
    }
  },

  mounted() {
    this.open();
    document.addEventListener(
      "keydown",
      (this.escapeListener = this.onEscape.bind(this))
    );
  },

  methods: {
    open(): void {
      if (this.parent !== null) {
        this.el = this.$el;
        this.parent.insertAdjacentElement("afterbegin", this.el);
      }
    },

    onSuccess(): void {
      this.$emit("success");
    },

    onFail(): void {
      this.$emit("fail");
    },

    close(): void {
      this.active = false;
      if (this.parent && this.el) {
        this.parent.removeChild(this.el);
      }
      this.$emit("close");
      this.$destroy();
    },

    onEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        this.close();
      }
    },

    setupContainer() {
      const container = document.querySelector(
        ".modal-container"
      ) as HTMLDivElement;

      if (container === null) {
        this.parent = document.createElement("div");
        this.parent.className = "modal-container";

        document.body.appendChild(this.parent);
      } else {
        this.parent = container;
      }
    },
  },
});
</script>
