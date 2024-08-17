<template>
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition" max-width="500">
        <v-card>
            <v-card-title class="text-h6 font-weight-medium">
                <div class="d-flex flex-row">
                    <v-icon medium color="red" left>mdi-alert</v-icon>
                    <slot name="title"></slot>
                </div>
            </v-card-title>
            <v-card-text class="text-body-1 black--text text-justify">
                <span class="font-weight-medium">Atención: </span> si elimina
                <slot name="subject"></slot>, el registro se eliminará permanentemente.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
                <v-btn class="text-none text-subtitle-1 mr-1" color="red" variant="flat"
                    @click="toggleModal">Cancelar</v-btn>
                <v-btn color="red" class="white--text" @click="confirm">Sí, eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

//DECLARES
const dialog = ref(false);
const emit = defineEmits(['delete'])

//METHODS
const toggleModal = () => {
    dialog.value = !dialog.value;
};

const confirm = () => {
    toggleModal();
    emit('delete');
}

defineExpose({
    toggleModal
});
</script>