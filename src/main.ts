import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router/routes";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.use(router);
app.config.globalProperties.$swal = Swal;
app.mount("#app");
