import { defineStore } from 'pinia'

export const useWineStore = defineStore('wine', () => {
  const data = ref({} as any)
  return { data }
})
