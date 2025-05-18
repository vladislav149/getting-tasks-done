<script setup lang="ts">
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useAuthForm} from '~/composables/useAuthForm'

definePageMeta({
  middleware: ['auth'],
})

const {$auth} = useNuxtApp()
const router = useRouter()

const {form, loading, errors, isFormInvalid, handleSubmit} = useAuthForm({
  onSubmit: (email, password) => signInWithEmailAndPassword($auth, email, password),
  onSuccess: () => router.push('/'),
  errorMessages: {
    invalidCredential: 'Неверный email или пароль',
    default: 'Произошла ошибка при входе',
  },
})
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">Вход</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              required
              :error-messages="errors.email"
            />
            <v-text-field
              v-model="form.password"
              label="Пароль"
              type="password"
              required
              :error-messages="errors.password"
            />
            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading"
              class="mt-4"
              :disabled="isFormInvalid"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
