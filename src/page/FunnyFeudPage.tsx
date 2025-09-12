import { useEffect, useState } from "react"
import CharacterSuggestInput from "../components/CharacterSuggestInput"
import Header from "../components/Header"
import { useForm } from "react-hook-form";
import { useFunnyFeud } from "../api/FunnyFeudApi";

const FunnyFeudPage = ({ setOpenSidebar, openSidebar, floatingSendButton, setFloatingSendButton }: any) => {
    const [selectedCharacter1, setSelectedCharacter1] = useState('');
    const [selectedCharacter2, setSelectedCharacter2] = useState('');
    const { register, handleSubmit, reset } = useForm();
    const { funnyFeudRequest, funnyFeudResponse } = useFunnyFeud();
    const [isToggled, setIsToggled] = useState(funnyFeudResponse?.parsedRoast.length > 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFloatingSendButton(value.trim().length > 0);
        if (funnyFeudResponse?.parsedRoast.length > 0) {
            setIsToggled(false)
        }
    };

    const onSubmit = (data: any) => {
        funnyFeudRequest({ ...data, selectedCharacter1, selectedCharacter2 })
        reset();
        setFloatingSendButton(false);
    };

    useEffect(() => {
        setIsToggled(funnyFeudResponse?.parsedRoast.length > 0);
    }, [funnyFeudResponse]);

    return (
        <div className="h-screen flex flex-col">
            <div className="fixed top-0 w-full z-50">
                <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
            </div>
            {/* Main content area */}
            <div className="max-w-[48rem] pt-20 mx-auto h-full w-full flex flex-col justify-between">
                {isToggled ? (
                    <div className="flex flex-col w-full">
                        <div className="flex text-center ">
                            <span className="font-normal bg-[#f4f4f4] py-2 px-4 text-md rounded-full flex flex-row">
                                <p className="font-semibold mr-1">Time for a Funny Feud about : </p>  {funnyFeudResponse?.prompt}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap justify-between my-5">
                            {funnyFeudResponse?.parsedRoast.map((data: any, index: any) => (
                                <div key={index} className={`flex flex-col ${data.name === selectedCharacter1 ? "justify-end" : "justify-start"} sm:w-2/5 h-fit text-md flex flex-col gap-2 border-[0.5px] border-[#d3d3d3] rounded-md p-4 shadow m-5`}>
                                    <h4 className="font-semibold">{data?.name}</h4>
                                    <p className="text-[#686868]">{data?.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-between h-[45%]">
                        <div className="flex flex-1 justify-between">
                            <CharacterSuggestInput selectedCharacter={selectedCharacter1} setSelectedCharacter={setSelectedCharacter1} />
                            <CharacterSuggestInput selectedCharacter={selectedCharacter2} setSelectedCharacter={setSelectedCharacter2} />
                        </div>
                        <div className="flex justify-center">
                            <p className="text-[#000000d0] text-center md:text-3xl">🎭 Pick 2 characters & a topic to start a funny debate!</p>
                        </div>
                    </div>
                )}

                {/* Ask Anything Input */}
                <div className="sticky bottom-0 left-0 right-0 w-full rounded-t-xl flex flex-col bg-[#ffffff]">
                    <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-end py-4 pl-6  rounded-[1.25rem] shadow-c">
                        <textarea
                            {...register("AskAnything")}
                            placeholder={`Set a topic for ${selectedCharacter1} and ${selectedCharacter2} showdown!`}
                            className="appearance-none resize-none custom-scrollbar min-h-[2rem] max-h-[6.25rem] pr-12 outline-none  text-[1rem] placeholder:text-[1rem] w-full"
                            rows={1}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                        <button disabled={!floatingSendButton} type="submit" className={` absolute outline-none rounded-full right-2 p-2 ${floatingSendButton ? "bg-[#000] hover:bg-[#303030] text-[#ffffff]" : "bg-[#f0f0f0] text-[#3D3D3D]"}`}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`icon transition-transform duration-700 ${floatingSendButton ? "rotate-90" : "rotate-0"
                                    }`}
                            >
                                <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
                            </svg>
                        </button>
                    </form>
                    <p className="text-[12px] text-[#5d5d5d] my-2 text-center">
                        AI-generated content may be sensitive or offensive. We do not endorse or take responsibility. Use with discretion.
                    </p>
                </div>
            </div>
        </div >
    )
}

export default FunnyFeudPage