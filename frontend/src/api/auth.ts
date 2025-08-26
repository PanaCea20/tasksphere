import api from "@/lib/axios"
import type { LoginFormData, RegisterFormData } from "@/lib/schemas"

export interface AuthResponse {
  token: string
}

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data)
    return response.data
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data)
    return response.data
  },
}
