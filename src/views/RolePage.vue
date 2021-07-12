<template>
   <div class="row">
        <div class="col-12 my-2">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Create Role</h5>
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
                        <div class="form-group my-2">
                            <label for="name">Name</label>
                            <input v-model="form.name" type="text" class="form-control form-control-sm">
                        </div>
                        <div class="form-group my-2">
                            <label for="description">Description</label>
                            <textarea v-model="form.description" class="form-control form-control-sm"></textarea>
                        </div>
                        <div class="form-group my-2">
                            <button class="btn btn-sm btn-success mx-1" @click="save()">Add Role</button>
                            <button class="btn btn-sm btn-danger mx-1" @click="resetForm()">Clear field</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Roles</h5>
                </div>
                <div class="card-body p-0">
                    <table class="table table-sm table-striped">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <role-item v-for="(role, index) in roles"
                                :key="role.id" 
                                :index="index"
                                @updatedRole="updateRole"
                                :role="role"></role-item>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { addRole, getRoles, Role, updateRole, deleteRole } from '@/services/RoleService'
import RoleItem from '@/components/RoleItem.vue'

export default defineComponent({
    components: {
        RoleItem  
    },
    setup() {
        const roles = ref<Role[]>([])
        const isEdit = ref<boolean>(false)
        const hasError = ref<any>()
        const form = reactive({
            name: '',
            description: ''
        })

        onMounted(async () => {
            roles.value = await getRoles()
        })
        
        const save = async() => {
            try {
                const addedRole = await addRole(form)
                await roles.value?.push(addedRole)
                await resetForm()
                hasError.value = null
            } catch (error) {
                hasError.value = error.response.data.errors
            }
        }

        const updateRole = async (data: any) => {
            await roles.value.splice(data.index, 1, data.role)
        }

        const removeRole = async (data: any) => {
            await roles.value.splice(data.index, 1)
        }

        const resetForm = async () => {
            form.name = ''
            form.description = ''
        }

        return { isEdit, roles, hasError, form, save, updateRole, removeRole, resetForm}
    },
})
</script>
