import { useCallback } from "react";
import { calculateGasMargin, getInkTokenContract } from "../utils";

const useCreatePost = () => {
    const createPost = useCallback(
        async(post) => {
            if (!post)
                return alert("Write a post")
                const contract = await getInkTokenContract(true);
                const estimatedGas = await contract.createPost.estimateGas(post);
                return contract.createPost(post, {
                    gasLimit: calculateGasMargin(estimatedGas),
                });
        },
    );
    return createPost;
}
export default useCreatePost;