<script setup lang="ts">
import {signOut, onAuthStateChanged} from 'firebase/auth'
import type {MenuItem} from '~/types'

const drawer = ref(false)
const {$auth} = useNuxtApp()
const router = useRouter()
const isAuthenticated = ref(false)
const userEmail = computed(() => $auth.currentUser?.email || '')

onMounted(() => {
  onAuthStateChanged($auth, user => {
    isAuthenticated.value = !!user
  })
})

const menuItems = computed<MenuItem[]>(() => [
  {
    title: 'Главная',
    to: 'index',
    auth: true,
  },
  {
    title: 'Вход',
    to: 'login',
    auth: false,
  },
  {
    title: 'Регистрация',
    to: 'register',
    auth: false,
  },
])

const filteredMenuItems = computed(() =>
  menuItems.value.filter(item => item.auth === isAuthenticated.value)
)

const handleLogout = async () => {
  try {
    await signOut($auth)
    router.push('/login')
  } catch (error) {
    console.error('Ошибка при выходе:', error)
  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>GTD board</v-toolbar-title>

        <v-spacer />

        <div class="d-flex align-center">
          <span
            v-if="isAuthenticated"
            class="text-body-1 mr-4"
            >{{ userEmail }}</span
          >
          <v-btn
            v-if="isAuthenticated"
            icon="$logout"
            variant="text"
            @click="handleLogout"
          />
        </div>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <NuxtLink
            v-for="item in filteredMenuItems"
            :key="item.to"
            #="{href, navigate, isExactActive}"
            :to="{name: item.to}"
            custom
          >
            <v-list-item
              :active="isExactActive"
              :href="href"
              @click="navigate"
            >
              {{ item.title }}
            </v-list-item>
          </NuxtLink>
          <v-list-item
            @click="handleLogout"
            v-if="isAuthenticated"
          >
            Выйти
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh">
        <v-card-text class="h-100">
          <slot />
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>
