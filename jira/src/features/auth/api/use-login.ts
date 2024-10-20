import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType} from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.login[":userId"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login[":userId"]["$post"]>;

export const useLogin = () => {
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.auth.login[":userId"]["$post"]({ json, param });
            return await response.json();
        },
    });

    return mutation;
};