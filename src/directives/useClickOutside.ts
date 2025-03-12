import { onMounted, onUnmounted, ref } from 'vue'

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const elementRef = ref<T | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })

  return elementRef
}
