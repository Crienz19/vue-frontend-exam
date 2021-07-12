import axios from "axios";
import { getCookie } from "./CookieService";

export interface Role {
    id: number,
    name: string,
    description: string
}

export async function getRoles() :Promise<any> {
    const response = await axios.get('/roles', {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })
    return await response.data
}

export async function addRole(role: any) : Promise<Role> {
    const response = await axios.post('/roles', role, {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })
    return await response.data
}

export async function updateRole(role: Role) : Promise<any> {
    let roleForm = {
        id: role.id,
        name: role.name,
        description: role.description,
        _method: 'PATCH'
    }

    const response = await axios.post(`/role/${role.id}/patch`, roleForm)
    return await response.data
}

export async function deleteRole (roleId: number) : Promise<void> {
    const response = await axios.delete(`/role/${roleId}/delete`, {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })
}