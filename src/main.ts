import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Modal from "@/components/Modal";
import "./index.css";

Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
