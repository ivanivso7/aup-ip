// src/components/FilmForm.vue
<template>
  <v-card class="pa-4 mb-5">
    <v-card-title>Dodaj novi film</v-card-title>
    <v-form @submit.prevent="dodajFilm">
      <v-text-field v-model="film.naziv" label="Naziv" required />
      <v-text-field v-model="film.godina" label="Godina" type="number" required />
      <v-text-field v-model="film.zanr" label="Žanr" required />
      <v-textarea v-model="film.opis" label="Opis" required />

      <v-btn color="primary" type="submit">Spremi</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['film-dodan'])

const film = ref({
  naziv: '',
  godina: '',
  zanr: '',
  opis: ''
})

const dodajFilm = async () => {
  try {
    await axios.post('http://localhost:8000/api/filmovi', film.value)
    emit('film-dodan')
    film.value = { naziv: '', godina: '', zanr: '', opis: '' }
  } catch (err) {
    console.error('Greška pri dodavanju filma:', err)
  }
}
</script>
