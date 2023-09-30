import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState} from "react";
import useCreatePost from "../hooks/useCreatePost";
import { useConnection } from "./context/connection";

const CreatePost = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState("");
    const [sendingTx, setSendingTx] = useState(false);
    // const { active } = useConnection();
    

    const makePost = useCreatePost();

    function closeModal() {
        if (sendingTx) return;
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    const handleCreatePost = async () => {
        if(!post)
        return alert("Write a Post")
        // if (!active) return alert ("please, connect");
        try {
            setSendingTx(true);
            const tx = await makePost(post);
            const receipt = await tx.wait();
            if (receipt.status === 0) return alert("tx failed")
            alert("Post created!!");
            setIsOpen(false);
        } catch (error) {
            console.log("error: ", error);
            if(error.info.error.code === 4001) {
                return alert("You rejected the request");
            }
            alert("something went wrong")
        }finally {
            setSendingTx(false);
        }
    };
    
        return (
            <Fragment>
                (<button
                    onClick={openModal}
                    className="w-[fit-content] block rounded-md mx-auto bg-blue-400 px-4 py-4 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Post
                </button>)
    
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-50" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Create Post
                                        </Dialog.Title>
                                        
                                        <form className="mt-4 space-y-4" onSubmit={handleCreatePost}>
                                            <div className="flex flex-col">
                                                <label className="font-bold">
                                                    Create Post
                                                </label>
                                                <input
                                                    value={post}
                                                    onChange={(e) =>
                                                        setPost(e.target.value)
                                                    }
                                                    type="text"
                                                    className="outline-0 py-2 px-1 rounded-lg mt-2 border border-gray-400"
                                                />
                                            </div>
                                            <button onClick={handleCreatePost}
                                            value="Submit"
                                            type="submit"
                                        >
                                            POST
                                        </button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Fragment>
    );
};

export default CreatePost;

