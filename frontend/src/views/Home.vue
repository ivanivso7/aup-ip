<template>
  <v-container class="mt-10">
    <div class="dark-overlay mb-4">
      <h1 class="mb-4">Lista filmova</h1>

      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="pretraga"
            label="Pretraži po nazivu"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            color="white"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <v-select
            v-model="zanr"
            :items="dostupniZanrovi"
            label="Filtriraj po žanru"
            clearable
            hide-details
            color="white"
          />
        </v-col>

        <v-col cols="12" sm="2">
          <v-btn color="red" block class="mt-2" @click="obrisiFiltere">
            Obriši filtere
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-row>
      <v-col
        v-for="film in prikazaniFilmovi"
        :key="film.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="dark-overlay">
          <v-card-title>{{ film.naziv }} ({{ film.godina }})</v-card-title>
          <v-card-subtitle>{{ film.zanr }}</v-card-subtitle>
          <v-card-text>{{ film.opis }}</v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="postaviZaUredi(film)">Uredi</v-btn>
            <v-btn color="red" @click="obrisiFilm(film.id)">Obriši</v-btn>
            <v-btn color="indigo" @click="prikaziDetalje(film)">Detalji</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="dark-overlay mt-5">
      <v-pagination
        v-model="stranica"
        :length="ukupnoStranica"
        :total-visible="7"
        color="white"
        elevation="0"
        rounded
      />
    </div>

    <v-divider class="my-5" />

    <v-form @submit.prevent="spremiFilm" class="dark-overlay">
      <h2 class="mb-2">{{ urediId ? 'Uredi film' : 'Dodaj novi film' }}</h2>
      <v-text-field v-model="naziv" label="Naziv" required color="white" />
      <v-text-field v-model.number="godina" label="Godina" required type="number" color="white" />
      <v-text-field v-model="zanrUnos" label="Žanr" required color="white" />
      <v-textarea v-model="opis" label="Opis" required color="white" />
      <v-text-field v-model="redatelj" label="Redatelj" required color="white" />
      <v-text-field v-model.number="ocjena" label="IMDb ocjena" type="number" required color="white" />


      <v-btn type="submit" color="green" class="mt-2 mr-2">
        {{ urediId ? 'Spremi izmjene' : 'Dodaj film' }}
      </v-btn>
      <v-btn type="button" @click="ponistiFormu" class="mt-2" color="red">Poništi</v-btn>
    </v-form>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Detalji filma</v-card-title>
        <v-card-text v-if="odabraniFilm">
          <p><strong>Naziv:</strong> {{ odabraniFilm.naziv }}</p>
          <p><strong>Godina:</strong> {{ odabraniFilm.godina }}</p>
          <p><strong>Žanr:</strong> {{ odabraniFilm.zanr }}</p>
          <p><strong>Opis:</strong> {{ odabraniFilm.opis }}</p>
          <p><strong>Redatelj:</strong> {{ odabraniFilm.redatelj }}</p>
          <p><strong>IMDb ocjena:</strong> {{ odabraniFilm.ocjena }}</p>
          <p><strong>Cijena:</strong> 0,50 €</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Zatvori</v-btn>
          <v-btn color="green" @click="dodajUKorpu(odabraniFilm)">Dodaj u košaricu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const dodajUKorpu = (film) => {
  let korpa = JSON.parse(localStorage.getItem('korpa')) || [];
  korpa.push(film);
  localStorage.setItem('korpa', JSON.stringify(korpa));
  toast.success('Film dodan u košaricu!');
};

import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const sviFilmovi = ref([])
const pretraga = ref('')
const zanr = ref(null)
const dostupniZanrovi = ref([])
const stranica = ref(1)
const poStranici = 3

const naziv = ref('')
const godina = ref(null)
const opis = ref('')
const zanrUnos = ref('')
const redatelj = ref('')
const ocjena = ref(null)
const urediId = ref(null)

const dialog = ref(false)
const odabraniFilm = ref(null)

const filtriraniFilmovi = computed(() =>
  sviFilmovi.value.filter(f => {
    const nazivOk = f.naziv.toLowerCase().includes(pretraga.value.toLowerCase())
    const zanrOk = !zanr.value || f.zanr === zanr.value
    return nazivOk && zanrOk
  })
)

const ukupnoStranica = computed(() =>
  Math.ceil(filtriraniFilmovi.value.length / poStranici)
)

const prikazaniFilmovi = computed(() => {
  const start = (stranica.value - 1) * poStranici
  return filtriraniFilmovi.value.slice(start, start + poStranici)
})

watch(zanr, () => stranica.value = 1)
watch(pretraga, () => stranica.value = 1)
watch(sviFilmovi, () => {
  localStorage.setItem('filmovi', JSON.stringify(sviFilmovi.value))
}, { deep: true })

const ucitajFilmove = () => {
  const lokalno = JSON.parse(localStorage.getItem('filmovi'))
  if (lokalno && Array.isArray(lokalno)) {
    sviFilmovi.value = lokalno
  } else {
    sviFilmovi.value = [
    { id: 1, naziv: 'Inception', godina: 2010, opis: 'Sci-fi triler o snovima.', zanr: 'Sci-Fi', redatelj: 'Christopher Nolan', ocjena: 8.8 },
    { id: 2, naziv: 'The Matrix', godina: 1999, opis: 'Haker otkriva stvarnost.', zanr: 'Akcija', redatelj: 'Lana Wachowski, Lilly Wachowski', ocjena: 8.7 },
    { id: 3, naziv: 'Interstellar', godina: 2014, opis: 'Putovanje kroz crvotočinu.', zanr: 'Sci-Fi', redatelj: 'Christopher Nolan', ocjena: 8.6 },
    { id: 4, naziv: 'Gladiator', godina: 2000, opis: 'Rimski general postaje gladijator.', zanr: 'Povijesni', redatelj: 'Ridley Scott', ocjena: 8.5 },
    { id: 5, naziv: 'The Godfather', godina: 1972, opis: 'Priča o mafijaškoj obitelji.', zanr: 'Kriminalistički', redatelj: 'Francis Ford Coppola', ocjena: 9.2 },
    { id: 6, naziv: 'Pulp Fiction', godina: 1994, opis: 'Nelinearna priča gangstera.', zanr: 'Kriminalistički', redatelj: 'Quentin Tarantino', ocjena: 8.9 },
    { id: 7, naziv: 'The Dark Knight', godina: 2008, opis: 'Batman se suočava s Jokerom.', zanr: 'Akcija', redatelj: 'Christopher Nolan', ocjena: 9.0 },
    { id: 8, naziv: 'Forrest Gump', godina: 1994, opis: 'Život jednostavnog čovjeka.', zanr: 'Drama', redatelj: 'Robert Zemeckis', ocjena: 8.8 },
    { id: 9, naziv: 'Fight Club', godina: 1999, opis: 'Muškarac osniva klub borbe.', zanr: 'Drama', redatelj: 'David Fincher', ocjena: 8.8 },
    {id: 10, naziv: 'Forrest Gump', godina: 1994, opis: 'Život običnog čovjeka kroz povijest.', zanr: 'Drama', redatelj: 'Robert Zemeckis', ocjena: 8.8 }
    ]
  }
  const zanrovi = sviFilmovi.value.map(f => f.zanr)
  dostupniZanrovi.value = [...new Set(zanrovi)]
}


const spremiFilm = () => {
  if (!naziv.value || !godina.value || !opis.value || !zanrUnos.value || !redatelj.value || !ocjena.value) return

  if (urediId.value !== null) {
    const index = sviFilmovi.value.findIndex(f => f.id === urediId.value)
    if (index !== -1) {
      sviFilmovi.value[index] = {
        id: urediId.value,
        naziv: naziv.value,
        godina: godina.value,
        opis: opis.value,
        zanr: zanrUnos.value,
        redatelj: redatelj.value,
        ocjena: ocjena.value
      }
      toast.success('Film uspješno ažuriran')
    }
  } else {
    const noviId = Math.max(...sviFilmovi.value.map(f => f.id)) + 1
    sviFilmovi.value.push({
      id: noviId,
      naziv: naziv.value,
      godina: godina.value,
      opis: opis.value,
      zanr: zanrUnos.value,
      redatelj: redatelj.value,
      ocjena: ocjena.value
    })
    toast.success('Film uspješno dodan')
    if (!dostupniZanrovi.value.includes(zanrUnos.value)) {
      dostupniZanrovi.value.push(zanrUnos.value)
    }
  }

  ponistiFormu()
}

const obrisiFilm = (id) => {
  sviFilmovi.value = sviFilmovi.value.filter(f => f.id !== id)
  toast.success('Film uspješno obrisan')
}

const postaviZaUredi = (film) => {
  urediId.value = film.id
  naziv.value = film.naziv
  godina.value = film.godina
  opis.value = film.opis
  zanrUnos.value = film.zanr
  redatelj.value = film.redatelj
  ocjena.value = film.ocjena
}

const ponistiFormu = () => {
  urediId.value = null
  naziv.value = ''
  godina.value = null
  opis.value = ''
  zanrUnos.value = ''
  redatelj.value = ''
  ocjena.value = null
}

const obrisiFiltere = () => {
  pretraga.value = ''
  zanr.value = null
}

const prikaziDetalje = (film) => {
  odabraniFilm.value = film
  dialog.value = true
}

onMounted(() => {
  ucitajFilmove()
})
</script>

<style scoped>

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 10px;
  padding: 1rem;
}
.dark-overlay .v-btn {
  color: white !important;
}
.v-pagination .v-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: white !important;
  border-radius: 6px;
}
.v-pagination .v-btn--disabled {
  opacity: 0.4 !important;
}
.v-pagination .v-btn .v-icon {
  color: white !important;
  font-size: 24px !important;
}

.v-pagination .v-icon {
  color: white !important;
  font-size: 24px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  visibility: visible !important;
}




</style>
