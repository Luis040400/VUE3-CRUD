<template>
  <v-container>
    <v-row justify="space-between" align="center" no-gutters>
      <v-col md="10" sm="12" class="d-flex justify-start">
        <h1>Aplicaciones</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="2" sm="12" class="d-flex justify-end">
        <v-btn class="text-none ms-4 text-white" color="blue-darken-4" rounded="3" variant="flat" @click="openModal">
          CREAR
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" :loading="isLoading">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="yellow-darken-2" class="me-2" size="small" @click="selectItem(item); openUpdateModal()">
              mdi-pencil
            </v-icon>
            <v-icon color="red-darken-2" size="small" @click="selectItem(item); openDeleteModal()">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <CreateApplicationModal ref="CreateApplicationModalRef" @reload-data="loadAllApplications()">
    </CreateApplicationModal>
    <UpdateApplicationModal ref="UpdateApplicationModalRef" @reload-data="loadAllApplications()"
      :initial-data="selectedItem">
    </UpdateApplicationModal>
    <DeleteModal ref="DeleteModalRef" @delete="deleteApplication">
      <template v-slot:title>¿Desea eliminar esta Aplicación?</template>
      <template v-slot:subject>
        la aplicación
        <span class="font-weight-bold">{{ selectedItem.name }}</span>
      </template>
    </DeleteModal>
    <Notivue v-slot="item">
      <Notification :item="item">
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Notivue, Notification, push, NotificationProgress } from 'notivue'
import CreateApplicationModal from '@/components/modals/applications/CreateApplicationModal.vue'
import UpdateApplicationModal from '@/components/modals/applications/UpdateApplicationModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import * as ApplicationService from '@/services/main/application.service'

// Declare state
const headers = ref([
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' },
  { title: 'Clave', key: 'key_identifier' },
  { title: 'Acciones', key: 'actions', sortable: false }
])

const items = ref([])
const selectedItem = ref({})
let isLoading = ref(false)
const CreateApplicationModalRef = ref(null)
const UpdateApplicationModalRef = ref(null)
const DeleteModalRef = ref(null)

// Methods
const selectItem = (obj) => {
  selectedItem.value = { ...obj }
}

const openModal = () => {
  if (CreateApplicationModalRef.value) {
    CreateApplicationModalRef.value.toggleModal()
  }
}

const openUpdateModal = () => {
  if (UpdateApplicationModalRef.value) {
    UpdateApplicationModalRef.value.toggleModal()
  }
}

const openDeleteModal = () => {
  if (DeleteModalRef.value) {
    DeleteModalRef.value.toggleModal()
  }
}

const loadAllApplications = () => {
  isLoading.value = true;
  ApplicationService.getAllApplications().then((data) => {
    items.value = data;
  }).catch((error) => {
    push.error({ title: error.message })
  }).finally(() => {
    isLoading.value = false;
  })
}

const deleteApplication = () => {
  ApplicationService.deleteApplication(selectedItem.value.id).then((data) => {
    loadAllApplications();
    push.success({ title: data.message })
  }).catch((error) => {
    push.error({ title: error.message })
  })
}

// Mounted hook
onMounted(() => {
  loadAllApplications()
})
</script>
