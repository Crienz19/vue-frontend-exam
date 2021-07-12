<template>
    <tr class="text-center">
        <td class="text-left">{{ id }}</td>
        <td>
            <span v-if="!isEdit">{{ name }}</span>
            <input v-else v-model="name" type="text" class="form-control form-control-sm">
        </td>
        <td>
            <span v-if="!isEdit">{{ description }}</span>
            <input v-else v-model="description" type="text" class="form-control form-control-sm">
        </td>
        <td class="d-flex align-items-center justify-content-center">
            <div>
                <button v-if="!isEdit" class="btn btn-primary btn-sm mx-1" @click="isEdit = true">Edit</button>
                <button v-else  class="btn btn-primary btn-sm mx-1" @click="updateItem()">Update</button>
            </div>
            <button class="btn btn-danger btn-sm mx-1" @click="deleteItem()">Delete</button>
        </td>
    </tr>
</template>

<script lang="ts">
import { deleteRole, Role, updateRole } from '@/services/RoleService'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        role: {
            required: true,
            type: Object as PropType<Role>
        },
        index: {
            require: true,
            type: Number
        }
    },
    setup(props, {emit}) {
        const id = ref<number>(props.role.id)
        const name = ref<string>(props.role.name)
        const description = ref<string>(props.role.description)
        const isEdit = ref<boolean>(false)

        const updateItem = async () => {
            let form: Role = {
                id: id.value,
                name: name.value,
                description: description.value
            }
            const updatedRole = await updateRole(form)
            await emit('updatedRole', {
                role: updatedRole,
                index: props.index
            })
            isEdit.value = false
        }

        const deleteItem = async () => {
            await deleteRole(id.value)
            await emit('deletedRole', {
                id: id.value,
                index: props.index
            })
        }

        return { id, name, description, isEdit, updateItem, deleteItem }
    }
})
</script>
