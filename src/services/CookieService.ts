import Cookies from "universal-cookie/es6";

const cookie = new Cookies();

export async function getCookie(key: string) {
    return cookie.get(key)
}

export async function setCookie(key: string, value: string, options: Object) {
    cookie.set(key, value, options)
}

export async function removeCookie(key: string) {
    cookie.remove(key)
}