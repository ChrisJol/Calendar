import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Modal from "@/components/Modal";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

Vue.use(Modal);
Vue.use(mdiVue, {
  icons: mdijs,
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
