import axios from "axios"
import { getCookie } from "./CookieService";

export interface User {
    id: number,
    full_name: string,
    email: string,
    password?: string,
    role_id: number,
}

export interface UserRole extends User {
    role: object
}

export async function getUsers (): Promise<any> {
    const response = await axios.get('/users', {
        headers: {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }   
    });
    return await response.data
}

export async function addUser (user: any) : Promise<UserRole> {
        const response = await axios.post('/users', user, {
            'headers': {
                'Authorization': `Bearer ${await getCookie('access_token')}`
            }
        })
        return await response.data
}

export async function updateUser (user: User) : Promise<any> {
    let userForm = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role_id: user.role_id,
        _method: 'patch'
    }
    console.log(userForm)
    const response = await axios.post(`/user/${user.id}/patch`, userForm, {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })

    return await response.data
}

export async function deleteUser (userId: Number) : Promise<void> {
    const response = await axios.delete(`/user/${userId}/delete`, {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })
}