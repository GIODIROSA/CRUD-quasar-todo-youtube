<template>
  <div class="q-pa-md q-gutter-sm">
    <router-link :to="{ name: 'Hola' }">Hola</router-link>
    <router-view />
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar task',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-card class="row"
    flat bordered v-for="(task, index) in tasks" :key="index">
      <q-card-section class="col" v-html="task.texto" :class="task.estado ? 'tachar' : '.'" />
      <q-btn @click="task.estado = !task.estado"
      flat color="blue">Accion</q-btn>
      <q-btn flat color="red">Eliminar</q-btn>

    </q-card>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: "",
      tasks: [
        { texto: "Tarea #1", estado: false },
        { texto: "Tarea #2", estado: true },
        { texto: "Tarea #3", estado: false }
      ]
    };
  }, //final de data
  methods: {
    saveWork() {
      this.tasks.push({
        texto: this.editor,
        estado: false
      });
      this.$q.notify({
        message: "Tarea Guardada",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
    }
  },//final de metodo
  
};
</script>

<style lang="scss" scoped>
.tachar{
  text-decoration: line-through;
}

</style>
