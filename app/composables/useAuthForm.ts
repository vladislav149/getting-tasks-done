import {ref, reactive, computed} from 'vue'
import type {UserCredential} from 'firebase/auth'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email: string
  password: string
}

interface UseAuthFormOptions {
  onSubmit: (email: string, password: string) => Promise<UserCredential>
  onSuccess: () => void
  errorMessages: {
    invalidCredential?: string
    emailInUse?: string
    weakPassword?: string
    default?: string
  }
}

export const useAuthForm = (options: UseAuthFormOptions) => {
  const form = reactive<FormData>({
    email: '',
    password: '',
  })

  const loading = ref(false)
  const errors = ref<FormErrors>({
    email: '',
    password: '',
  })

  const isFormInvalid = computed(
    () => form.password.length < 6 || !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
  )

  const handleSubmit = async () => {
    try {
      loading.value = true
      errors.value = {email: '', password: ''}

      await options.onSubmit(form.email, form.password)
      options.onSuccess()
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' && options.errorMessages.invalidCredential) {
        errors.value.email = options.errorMessages.invalidCredential
      } else if (error.code === 'auth/email-already-in-use' && options.errorMessages.emailInUse) {
        errors.value.email = options.errorMessages.emailInUse
      } else if (error.code === 'auth/weak-password' && options.errorMessages.weakPassword) {
        errors.value.password = options.errorMessages.weakPassword
      } else {
        errors.value.email = options.errorMessages.default || 'Произошла ошибка'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    errors,
    isFormInvalid,
    handleSubmit,
  }
}
