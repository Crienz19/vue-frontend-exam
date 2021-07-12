<template>
    <div class="row">
        <div class="col-md-4" style="margin: 0 auto">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Login</h5>
                </div>
                <div class="card-body">
                    <div class="row" v-if="errors">
                        <div class="col-12">
                            <div class="alert alert-danger">
                                <ul v-for="e in errors" :key="e.id">
                                    <li>{{ e }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="login">
                        <div class="form-group my-1">
                            <label for="email">E-mail</label>
                            <input v-model="email" type="text" class="form-control" required>
                        </div>
                        <div class="form-group my-1">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-block btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userData from '@/stores/user'
import router from '@/router'

export default defineComponent({
    setup() {
        const email = ref<string>('')
        const password = ref<string>('')
        const errors = ref<any>()

        const login = async () => {
            if (await userData.login(email.value, password.value)) {
                await router.push('/users')
                errors.value = null
            } 

            errors.value = userData.state.error
        }

        return { login, errors, email, password }
    },
})
</script>
