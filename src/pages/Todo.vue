<template>
  <div class="q-pa-md q-gutter-sm">
    <q-pag>
    <h5 class="titleTodo">Todo</h5>
    <!-- Q-EDITOR 1 -->
    <q-editor
      v-if="!modoEdition"
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

    <!-- Q-EDITOR 2 -->

    <q-editor
      v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar nota',
          icon: 'save',
          label: 'Actualizar',
          handler: upDateWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-card
      class="row"
      flat
      bordered
      v-for="(task, index) in tasks"
      :key="index"
    >
      <q-card-section
        class="col"
        v-html="task.texto"
        :class="task.estado ? 'tachar' : '.'"
      />
      <!-- btn de editar -->
      <q-btn flat color="blue" @click="editar(index, task.id)">Editar</q-btn>
      <!-- =============================== -->
      <!-- btn de tachar -->
      <!-- <q-btn @click="task.estado = !task.estado" flat color="blue"
        >Accion</q-btn
      > -->
      <!-- cada
      vez que vaya a eliminar algo usar el index que esta iterando -->
      <q-btn flat color="red" @click="eliminar(index, task.id)">Eliminar</q-btn>
    </q-card>
    <div class="flex flex-center" v-if="tasks.length == 0">
      <h6>Sin notas</h6>
    </div>
    </q-pag>
  </div>
</template>

<script>
import { db } from "boot/firebase";
export default {
  data() {
    return {
      editor: "",
      tasks: [
        //es un array vacio y llenado por el push
        // prueba de id
        // {
        //   id: "hPGfBzIgU4VvjQnlz9g0",
        //   texto: "prueba",
        //   estado: false
        // },
        // {
        //   id: "idTask625",
        //   texto: "prueba2",
        //   estado: false
        // }
        //estatico de ejemplo:
        // { texto: "Tarea #1", estado: false },
        // { texto: "Tarea #2", estado: true },
        // { texto: "Tarea #3", estado: false }
      ],
      index: null,
      modoEdition: false,
      id: null
    };
  }, //final de data
  created() {
    this.listarTarea();
  },
  methods: {
    async upDateWork() {
      try {
        this.$q.loading.show();
        const resDB = await db
          .collection("tareas")
          .doc(this.id)
          .update({
            texto: this.editor
          });
        this.tasks[this.index].texto = this.editor;
        this.index = null;
        this.modoEdition = false;
        this.id = null;
        this.editor = "";
        this.$q.notify({
          message: "Tarea Actualizada",
          color: "dark",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
    },
    editar(index, id) {
      this.modoEdition = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].texto;
    },
    async listarTarea() {
      try {
        const resDB = await db.collection("tareas").get();
        resDB.forEach(res => {
          console.log(res.id);
          const tarea = {
            id: "res.id",
            texto: res.data().texto,
            estado: res.data().estado
          };
          this.tasks.push(tarea);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWork() {
      try {
        const resDB = await db.collection("tareas").add({
          texto: this.editor,
          estado: false
        });

        this.tasks.push({
          texto: this.editor,
          estado: false,
          id: resDB.id
        });
        this.editor = "";
        this.$q.notify({
          message: "Tarea Guardada",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log(error);
      }
    }, //final de saveWork
    eliminar(index, id) {
      //dialog
      this.$q
        .dialog({
          title: "Acción Peligrosa",
          message: "¿Realmente, quieres eliminar la task?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          //recuerda splice elimina y agrega. si es 0 el segundo parametro, no va eliminar.
          try {
            await db
              .collection("tareas")
              .doc(id)
              .delete();
            this.tasks.splice(index, 1);
          } catch (error) {
            console.log(error);
          }
        });
    }
  } //final de metodo
};
</script>

<style lang="scss" scoped>
.tachar {
  text-decoration: line-through;
}
.titleTodo{
  margin: 10px;
}
</style>
