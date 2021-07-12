<template>
    <tr class="text-center">
        <td class="text-left">{{ id }}</td>
        <td>
            <span v-if="!isEdit">{{ full_name }}</span>
            <input v-else v-model="full_name" type="text" class="form-control form-control-sm">
        </td>
        <td>
            <span v-if="!isEdit">{{ email }}</span>
            <input v-else v-model="email" type="text" class="form-control form-control-sm">
        </td>
        <th>
            <span v-if="isEdit">{{ (!role) ? 'No assigned role' : role.name }}</span>
            <select @change="updateItem()" v-else v-model="role_id" class="form-control form-control-sm">
                <option value="">Select Role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
        </th>
        <td class="d-flex align-items-center justify-content-center">
            <div>
                <button v-if="!isEdit" class="btn btn-primary btn-sm mx-1" @click="isEdit = true">Edit</button>
                <button v-else @click="updateItem()" class="btn btn-primary btn-sm mx-1">Update</button>
            </div>
            <button @click="deleteItem()" class="btn btn-danger btn-sm mx-1">Delete</button>
        </td>
    </tr>
</template>

<script lang="ts">
import { Role } from '@/services/RoleService'
import { deleteUser, updateUser, User, UserRole } from '@/services/UserService'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        user: {
            required: true,
            type: Object as PropType<UserRole>
        },
        roles: {
            required: true,
            type: Object as PropType<Role[]>
        },
        index: {
            required: true,
            type: Number
        }
    },
    setup(props, {emit}) {
        const id = ref<number>(props.user.id)
        const full_name = ref<string>(props.user.full_name)
        const email = ref<string>(props.user.email)
        const role_id = ref<number>(props.user.role_id)
        const role = ref<object>(props.user.role)
        const isEdit = ref<boolean>(false)

        const updateItem = async () => {
            let form: User = {
                id:  id.value,
                full_name: full_name.value,
                email: email.value,
                role_id: role_id.value,
            }

            const updatedUser = await updateUser(form)
            await emit('updatedUser', {
                user: updatedUser,
                index: props.index
            })
            isEdit.value = false
        }

        const deleteItem = async () => {
            await deleteUser(id.value);
            await emit('deletedUser', {
                id: id.value,
                index: props.index
            })
        }

        return { id, full_name, email, role_id, role, isEdit, updateItem, deleteItem}
    },
})
</script>
