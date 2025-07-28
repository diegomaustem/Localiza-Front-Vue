<script setup lang="ts">
import { ref } from "vue";
import type { ILoginCredentials } from "../types/ILoginCredentials";
import api from "../services/apiClient";

const email = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);
const errorMessage = ref<string>("");

const handleLogin = async () => {
  errorMessage.value = "";
  const credentials: ILoginCredentials = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await api.post("login", credentials);
    const { accessToken, loggedUser } = response.data;

    if (accessToken) {
      localStorage.setItem("userToken", accessToken);

      if (loggedUser) {
        localStorage.setItem("userData", JSON.stringify(loggedUser));
      }

      // 3. Redirecionar o usuário para uma página protegida
      // router.push("/dashboard");
    } else {
      // Se não houver token na resposta de sucesso (comportamento inesperado da API)
      errorMessage.value = "Resposta de login inválida: token não encontrado.";
      console.error("Erro: Token não recebido na resposta da API.");
    }
  } catch (error: any) {
    console.log("Deu error");
    errorMessage.value = error.response.data.message;
  }

  // FAZER A REQUISIÇÃO PARA API :::
};
</script>
<template>
  <div class="container">
    <h2><i class="fa-solid fa-user"></i> LOCALIZA</h2>
    <form
      class="form-login d-flex flex-column border rounded shadow p-3"
      @submit.prevent="handleLogin"
    >
      <div class="form-group form-text text-muted">
        <label class="d-flex justify-content-start" for="email">E-mail</label>
        <input
          v-model="email"
          required
          autocomplete="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group form-text text-muted">
        <label for="passwordLogin" class="d-flex justify-content-start"
          >Senha</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          required
          autocomplete="current-password"
          class="form-control"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Lembrar-me</label>
      </div>
      <button type="submit" class="btn btn-enter" :disabled="loading">
        {{ loading ? "Entrando..." : "Entrar" }}
      </button>
    </form>
  </div>
  <footer class="text-center mt-3">
    <p class="text-muted">
      <small>Localiza - 2025 </small>
      <small> - Todos direitos reservados</small>
    </p>
  </footer>
</template>

<style scoped>
.form-login {
  max-width: 400px;
  width: 100%;
  margin: auto;
}
h2 {
  color: #78de1f;
  font-weight: bold;
}
.btn-enter {
  background-color: #78de1f;
  color: white;
  border: none;
  font-weight: bold;
}
.btn-enter:hover {
  background-color: #66c41a;
}
</style>
