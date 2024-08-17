<template>
  <v-app>
    <v-app-bar color="primary" app elevate-on-scroll dark>
      <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CRUD VUE3</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list density="compact">
        <RouterLink v-for="(item, i) in items" :key="i" :to="item.value" v-slot="{ href, navigate }" custom>
          <v-list-item :href="href" @click="navigate" :value="item">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const drawer = ref(false)
const items = ref([
  { icon: 'mdi-application-cog-outline', text: 'Aplicaciones', value: '/applications' },
  { icon: 'mdi-application-cog-outline', text: 'Categorías', value: '/categories' }
])

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>