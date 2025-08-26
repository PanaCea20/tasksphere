import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "@/store/auth"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "/api",
    headers: { "Content-Type": "application/json" },
})

const getToken = () => {
    // Zustand state first, then persisted JSON
    const fromStore = useAuthStore.getState().token
    if (fromStore) return fromStore
    try {
        const raw = localStorage.getItem("auth-storage")
        return raw ? JSON.parse(raw)?.state?.token ?? null : null
    } catch {
        return null
    }
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
        if (config.headers && typeof (config.headers as any).set === "function") {
            ;(config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`)
        } else {
            config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` }
        }
    }
    return config
})

export default api

