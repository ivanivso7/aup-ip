<template>
  <v-app id="inspire">
    <!-- App bar -->
    <v-app-bar color="black" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <router-link to="/" class="logo-link">
        <v-app-bar-title class="font-weight-bold">Filmoteka</v-app-bar-title>
      </router-link>
    </v-app-bar>

    <!-- Navigacija -->
    <v-navigation-drawer v-model="drawer" temporary class="dark-overlay" color="black">
      <v-list>
        <v-list-item to="/" title="Početna" />
        <v-list-item to="/filmovi" title="Filmovi" />
        <v-list-item to="/kosarica" title="Košarica" />
      </v-list>
    </v-navigation-drawer>

    <!-- Glavni sadržaj -->
    <v-main :style="mainStyle">
      <v-container class="pa-4">
        <div v-if="route.path === '/'" class="welcome-overlay">
          <h1>Dobrodošli u Filmoteku 🎬</h1>
          <p>Ova aplikacija koristi Vue, Vuetify, Express backend + ALP API</p>

          <router-link to="/filmovi">
            <v-btn color="deep-orange-darken-3" class="mt-3">FILMOVI</v-btn>
          </router-link>
        </div>

        <router-view v-else />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(false)
const route = useRoute()

watch(route, () => {
  document.body.style.overflow = route.path === '/' ? 'hidden' : 'auto'
})
onMounted(() => {
  document.body.style.overflow = route.path === '/' ? 'hidden' : 'auto'
})

// Pozadinske slike za različite rute
const mainStyle = computed(() => {
  if (route.path === '/' || route.path === '/filmovi' || route.path === '/kosarica') {
    return {
      background: "url('https://bramptonist.com/wp-content/uploads/2018/06/netflix-image.jpg') no-repeat center center fixed",
      backgroundSize: 'cover',
      minHeight: '100vh'
    }
  } else {
    return {
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }
  }
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.welcome-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 8rem;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}
</style>
