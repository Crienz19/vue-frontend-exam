import axios from 'axios'
import { getCookie, setCookie } from './CookieService'

export async function doLogin(email: string, password: string) {
    const response = await axios.post('/login', {
        'email': email,
        'password': password
    })
    const result = response.data

    setCookie('access_token', result.token, {
        maxAge: 60 * 60
    })

    return result
}

export async function doLogout() : Promise<void>{
    const response = await axios.get('/logout', {
        'headers': {
            'Authorization': `Bearer ${await getCookie('access_token')}`
        }
    })

}