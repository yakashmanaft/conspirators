import { ref, computed } from 'vue'

//
export const useImageDisplay = (imageFileName: string | null) => {

    const imageUrl = ref<string | null>(null)

  const fullImageUrl = computed(() => {
    // if (!imageFileName) return null

    const baseUrl = useRuntimeConfig().public.imageBaseUrl
    return `${baseUrl}/${imageFileName}`
    // return `${baseUrl}/${imageFileName}`
    // return 'https://conspirators/uploads/images/bc449d9a769d039121d99041de2r--dlya-doma-i-interera-prikrovatnaya-tumba-deep-forest-s-radius.jpg'
  })

  const setImage = (fileName: string) => {
    imageUrl.value = fileName
  }

  return {
    imageUrl,
    fullImageUrl,
    setImage
  }
}