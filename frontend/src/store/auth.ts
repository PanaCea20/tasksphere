import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AuthState {
    token: string | null
    setToken: (token: string) => void
    clearToken: () => void
    // hydration flag
    hasHydrated: boolean
    setHasHydrated: (v: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),

            hasHydrated: false,
            setHasHydrated: (v) => set({ hasHydrated: v }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({ token: s.token }),
            onRehydrateStorage: () => (state) => {
                // called after hydration
                state?.setHasHydrated(true)
            },
        },
    ),
)


