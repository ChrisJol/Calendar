import Modal from "./Modal.vue";
import _vue, { VueConstructor } from "vue";

let vueInstance: typeof _vue;

declare interface modalParams {
  parent: any;
  component: VueConstructor;
  props?: any;
  onSuccess?: (params: any) => any;
  onFail?: (params: any) => any;
  onClose?: (params: any) => any;
}

const modal = {
  open(params: modalParams): Vue {
    const vm =
      typeof window !== "undefined" && window.Vue ? window.Vue : vueInstance;

    const propsData = {
      component: params.component,
      props: params.props,
    };

    const modalComponent = vm.extend(Modal);
    const newModal = new modalComponent({
      parent: params.parent,
      el: document.createElement("div"),
      propsData,
    });

    if (params.onSuccess) {
      newModal.$on("success", params.onSuccess);
    }

    if (params.onFail) {
      newModal.$on("fail", params.onFail);
    }

    if (params.onClose) {
      newModal.$on("close", params.onClose);
    }

    return newModal;
  },
};

const plugin = {
  install(Vue: typeof _vue): void {
    vueInstance = Vue;
    if (!Vue.prototype.$modal) Vue.prototype.$modal = {};
    Vue.prototype.$modal = modal;
  },
};

declare module "vue/types/vue" {
  interface Vue {
    $modal: typeof modal;
  }
}

export { modal };

export default plugin;
