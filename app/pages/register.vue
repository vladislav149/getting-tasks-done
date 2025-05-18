<script setup lang="ts">
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useAuthForm} from '~/composables/useAuthForm'

definePageMeta({
  middleware: ['auth'],
})

const {$auth} = useNuxtApp()
const router = useRouter()

const {form, loading, errors, isFormInvalid, handleSubmit} = useAuthForm({
  onSubmit: (email, password) => createUserWithEmailAndPassword($auth, email, password),
  onSuccess: () => router.push('/'),
  errorMessages: {
    emailInUse: 'Этот email уже используется',
    weakPassword: 'Пароль должен быть не менее 6 символов',
    default: 'Произошла ошибка при регистрации',
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
          <v-card-title class="text-h5 mb-4">Регистрация</v-card-title>
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
              Зарегистрироваться
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
