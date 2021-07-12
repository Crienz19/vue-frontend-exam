<template>
    <div class="row">
        <div class="col-12 my-2">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Create User</h5>
                </div>
                <div class="card-body">
                    <div class="row" v-if="hasError">
                        <div class="col-12">
                            <div class="alert alert-danger">
                                <ul v-for="errors in hasError" :key="errors.id">
                                    <li>{{ errors }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="form-group my-2 col-6">
                            <label for="full_name">Full Name</label>
                            <input v-model="form.full_name" type="text" class="form-control form-control-sm">
                            <span class="text-red" v-if="error"></span>
                        </div>
                        <div class="form-group my-2 col-6">
                            <label for="email">Email</label>
                            <input v-model="form.email" type="email" class="form-control form-control-sm">
                        </div>
                        <div class="form-group my-2 col-6">
                            <label for="password">Password</label>
                            <input v-model="form.password" type="password" class="form-control form-control-sm">
                        </div>
                        <div class="form-group my-2 col-6">
                            <label for="confirm_password">Confirm Password</label>
                            <input v-model="form.password_confirmation" type="password" class="form-control form-control-sm">
                        </div>
                        <div class="form-group my-2">
                            <label for="role">Assign Role</label>
                            <select v-model="form.role_id" class="form-control form-control-sm">
                                <option value="">Select Role</option>
                                <option value="">Select Role</option>
                                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                            </select>
                        </div>
                        <div class="form-group my-2">
                            <button @click="add()" class="btn btn-sm btn-success mx-1">Add User</button>
                            <button class="btn btn-sm btn-danger mx-1">Clear field</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Users</h5>
                </div>
                <div class="card-body p-0">
                    <table class="table table-sm table-striped">
                        <thead>
                            <tr class="text-center">
                                <th class="text-left">#</th>
                                <th>Full Name</th>
                                <th>E-mail</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <user-item v-for="(user, index) in users" 
                                :key="user.id" 
                                :user="user" 
                                :index="index"
                                :roles="roles"
                                @updatedUser="updateItem"
                                @deletedUser="deleteItem"></user-item>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getUsers, deleteUser,  UserRole, addUser } from '@/services/UserService'
import { getRoles, Role } from '@/services/RoleService'
import UserItem from '@/components/UserItem.vue'

export default defineComponent({
    components: {
        UserItem
    },
    setup() {
        const users = ref<UserRole[]>([])
        const roles = ref<Role[]>()
        const isEdit = ref<boolean>(false)
        const hasError = ref<any>()
        const form = reactive({
            full_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role_id: ''
        })

        onMounted(async () => {
            users.value = await getUsers()
            roles.value = await getRoles()
        })

        const add = async () => {
            try {
                const addedUser = await addUser(form)
                await users.value.push(addedUser)
                await resetForm
                hasError.value = [];
            } catch (error) {
                hasError.value = await error.response.data.errors
            }
        }

        const updateItem = async (data: any) => {
            await users.value.splice(data.index, 1, data.user)
        }

        const deleteItem = async (data: any) => {
            await users.value.splice(data.index, 1)
        }

        const resetForm = async () => {
            form.full_name = ''
            form.email = ''
            form.password = ''
            form.password_confirmation = ''
            form.role_id = ''
        }

        return { hasError, users, roles, isEdit, form, add, updateItem, deleteItem, resetForm }
    }
})
</script>

<style>
    .card-header {
        display: flex;
        justify-content: space-between;
    }
</style>