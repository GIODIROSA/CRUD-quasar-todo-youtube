<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Todo Windows
        </q-toolbar-title>

        <div>aufield</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header> Menu de Navegacion</q-item-label>
             <router-link :to="{ name: 'Hola' }">Hola</router-link>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
      
          <q-item-section>
            <q-item-label>TODO</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// revisar a posterior
// const linksData = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   }
// ];

export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
