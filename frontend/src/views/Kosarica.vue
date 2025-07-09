<template>
  <v-container class="mt-10">
    <div class="dark-overlay">
      <h2 class="mb-4">Košarica</h2>

      <div v-if="artikli.length === 0">
        <p>Vaša košarica je prazna.</p>
      </div>

      <div v-else>
        <v-row>
          <v-col
            v-for="(item, index) in prikazaniArtikli"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="dark-card">
              <v-card-title>{{ item.naziv }} — 0,50 €</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon color="red" @click="ukloniIzKorpe(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-pagination
          v-model="stranica"
          :length="ukupnoStranica"
          :total-visible="5"
          class="my-4"
          color="white"
        />

        <h3>Ukupno: {{ ukupnaCijena.toFixed(2) }} €</h3>

        <v-form @submit.prevent="naruci" class="mt-4">
  <v-text-field
    v-model="ime"
    label="Ime"
    :rules="[v => !!v || 'Ime je obavezno']"
    required
    color="white"
  />
  <v-text-field
    v-model="prezime"
    label="Prezime"
    :rules="[v => !!v || 'Prezime je obavezno']"
    required
    color="white"
  />
  <v-text-field
    v-model="kartica"
    label="Broj kartice"
    :rules="[v => /^\d{16,}$/.test(v) || 'Kartica mora imati najmanje 16 znamenki']"
    required
    color="white"
  />
  <v-text-field
    v-model="email"
    label="Email"
    :rules="[v => /.+@.+\..+/.test(v) || 'Email mora sadržavati znak @ i domenu']"
    required
    color="white"
  />

  <v-row class="mt-2">
    <v-col cols="6">
      <v-btn type="submit" color="green" block>Naruči</v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn color="red" block @click="isprazniKosaricu">Isprazni košaricu</v-btn>
    </v-col>
  </v-row>
</v-form>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const artikli = ref([])
const stranica = ref(1)
const poStranici = 3

const ime = ref('')
const prezime = ref('')
const kartica = ref('')
const email = ref('')

onMounted(() => {
  const podaci = JSON.parse(localStorage.getItem('korpa')) || []
  artikli.value = podaci
})

watch(artikli, () => {
  localStorage.setItem('korpa', JSON.stringify(artikli.value))
})

const ukupnaCijena = computed(() => artikli.value.length * 0.5)

const ukupnoStranica = computed(() =>
  Math.ceil(artikli.value.length / poStranici)
)

const prikazaniArtikli = computed(() => {
  const start = (stranica.value - 1) * poStranici
  return artikli.value.slice(start, start + poStranici)
})

const ukloniIzKorpe = (indexNaStranici) => {
  const stvarniIndex = (stranica.value - 1) * poStranici + indexNaStranici
  const naziv = artikli.value[stvarniIndex]?.naziv
  artikli.value.splice(stvarniIndex, 1)
  localStorage.setItem('korpa', JSON.stringify(artikli.value)) // DODANO
  toast.success(`Uklonjen "${naziv}" iz košarice`)
  if ((stranica.value - 1) * poStranici >= artikli.value.length && stranica.value > 1) {
    stranica.value--
  }
}

const isprazniKosaricu = () => {
  artikli.value = []
  localStorage.removeItem('korpa')
  toast.success('Košarica je ispražnjena')
  stranica.value = 1
}

const naruci = () => {
  if (!ime.value || !prezime.value || !kartica.value || !email.value) return
  toast.success('Vaša narudžba je isporučena na mail!')
  artikli.value = []
  localStorage.removeItem('korpa')
  ime.value = prezime.value = kartica.value = email.value = ''
  stranica.value = 1
}
</script>

<style scoped>
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 10px;
  padding: 1rem;
}
.dark-card {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
</style>
