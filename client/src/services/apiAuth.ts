
const getCurrentUser = async () => {


}


const login = async ({ email, password }: { email: string, password: string }) => {

    console.log(email, password)

    const res = await fetch("http://127.0.0.1:8080/api/v1/users/login", {
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

export { getCurrentUser, login, logout }