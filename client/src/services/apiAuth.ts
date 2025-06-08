import { config } from "../config";


const getCurrentUser = async () => {


}


const login = async ({ email, password }: { email: string, password: string }) => {

    const res = await fetch(`${config.backend.apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    console.log(res)

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Login Failed")
    }


    const data = await res.json()
    console.log(data)
    return data
}

const logout = async () => {

}

const getMe = async () => {
    
}


export { getCurrentUser, login, logout }