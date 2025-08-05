import { isAxiosError } from "axios";

export function handleApiError(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.response) {
      const apiErrorData = error.response.data;
      if (
        apiErrorData &&
        typeof apiErrorData === "object" &&
        "message" in apiErrorData
      ) {
        return String(apiErrorData.message);
      }

      return "Erro desconhecido na resposta da API.";
    }

    if (error.code === "ERR_NETWORK") {
      return "Erro de rede. Verifique sua conexão com a internet.";
    }

    return error.message || "Erro desconhecido ao fazer requisição.";
  }

  if (error instanceof Error) {
    return error.message || "Ocorreu um erro inesperado.";
  }

  return "Ocorreu um erro desconhecido.";
}
