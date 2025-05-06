
const getCurrentUser = async () => {


}


const login = async ({ email, password }: { email: string, password: string }) => {
    const res = await fetch("localhost:/8080", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Login Failed")
    }


    return await res.json()
}

const logout = async () => {

}

export { getCurrentUser, login, logout }