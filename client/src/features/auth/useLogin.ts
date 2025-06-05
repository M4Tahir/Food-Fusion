import { useMutation } from "@tanstack/react-query"
import { login as loginAPI } from "../../services"
import { useNavigate } from "react-router"

const useLogin = () => {
    const navigate = useNavigate()


    const { isPending, mutate: login, error } = useMutation({
        mutationFn: loginAPI,
        mutationKey: ["login"],
        onSuccess: (data, variables, context) => {
            console.log(data)
            navigate("/")
        },
        onError: () => {

        }
    })


    return { isPending, login, error }
}

export { useLogin }