<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-text>
                    <form class="pt-6" @submit.prevent="submit">
                        <legend class="text-h4 mb-6">Actualizar Aplicación</legend>

                        <v-text-field v-model="name.value.value" class="me-10" :error-messages="name.errorMessage.value"
                            label="Nombre"></v-text-field>
                        <v-text-field v-model="description.value.value" class="me-10"
                            :error-messages="description.errorMessage.value" label="Descripción"></v-text-field>
                        <v-btn class="me-4" type="submit">
                            Actualizar
                        </v-btn>

                        <v-btn @click="handleReset">
                            Limpiar
                        </v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as ApplicationService from '@/services/main/application.service';

// Props
const props = defineProps({
    initialData: {
        type: Object,
        required: true
    }
});

// State
const dialog = ref(false);
const emit = defineEmits(['reload-data']);

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true
            return 'Nombre es requerido'
        },
        description(value) {
            if (value?.length >= 6) return true
            return 'Descripción es requerido'
        }
    },
})
const name = useField('name')
const description = useField('description')
// Methods
const submit = handleSubmit(async values => {
    const payload = {
        name: values.name,
        description: values.description
    };
    const id = props.initialData.id;
    ApplicationService.updateApplication(payload, id)
        .then(() => {
            emit('reload-data');
        })
        .catch(error => {
            console.log("ERROR", error.message);
        })
        .finally(() => {
            toggleModal();
        });
});

const toggleModal = () => {
    dialog.value = !dialog.value;
};

watch(dialog, (newValue, oldValue) => {
    if (newValue) {
        name.value.value = props.initialData.name;
        description.value.value = props.initialData.description;
    }
})

defineExpose({
    toggleModal
});
</script>