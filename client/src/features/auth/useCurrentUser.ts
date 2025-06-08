import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services"

const useCurrentUser = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["me"],
        queryFn: getCurrentUser
    })

    return { data, isLoading, error }

}

export { useCurrentUser }