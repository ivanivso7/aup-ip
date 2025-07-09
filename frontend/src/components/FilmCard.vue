<template>
  <v-card class="ma-4 pa-3">
    <v-card-title>{{ film.title }} ({{ film.year }})</v-card-title>
    <v-card-subtitle>{{ film.genre }}</v-card-subtitle>
    <v-card-text>{{ film.description }}</v-card-text>

    <v-card-actions>
      <v-btn color="info" @click="showDetails = true">Detalji</v-btn>
      <v-btn color="blue" @click="$emit('edit', film)">Uredi</v-btn>
      <v-btn color="red" @click="$emit('delete', film.id)">Obriši</v-btn>
    </v-card-actions>

    <v-dialog v-model="showDetails" max-width="500">
      <v-card>
        <v-card-title>Detalji filma</v-card-title>
        <v-card-text>
          <p><strong>Naziv:</strong> {{ film.title }}</p>
          <p><strong>Godina:</strong> {{ film.year }}</p>
          <p><strong>Žanr:</strong> {{ film.genre }}</p>
          <p><strong>Opis:</strong> {{ film.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDetails = false">Zatvori</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['film'])
const showDetails = ref(false)
</script>
