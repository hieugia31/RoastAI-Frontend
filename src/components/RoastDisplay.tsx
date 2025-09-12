
interface RoastDisplayProps {
    roastData: any;
    loading: boolean;
}

const RoastDisplay = ({ loading, roastData }: RoastDisplayProps) => {
    const hasData = roastData && Object.keys(roastData).length > 0;

    return (
        <div className="my-5 flex">
            {loading ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex items-center gap-2 w-fit px-auto">
                        <div className="animate-spin border-2 border-[#808080] h-4 w-4 rounded-full border-t-transparent"></div>
                        <p className="text-[#808080] font-semibold text-lg">Loading...</p>
                    </div>
                </div>
            ) : hasData ? (
                <div className="flex flex-col gap-8">
                    <div className="flex justify-end">
                        {roastData?.prompt && (
                            <span className="font-normal bg-[#f4f4f4] py-2 px-4 text-md rounded-full">
                                {roastData?.prompt}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 items-stretch">
                        {roastData?.title && <h3 className="font-bold text-lg w-full">{roastData?.title}</h3>}
                        {roastData?.body && <p className="mt-2 w-full">{roastData?.body}</p>}
                        {roastData?.advice && <p className="italic mt-2 w-full">{roastData?.advice}</p>}
                        {roastData?.fun && <p className="mt-2 w-full">{roastData?.fun}</p>}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <p className="text-[#000000d0] text-center md:text-3xl">Welcome to Roast AI! 🤖🔥</p>
                </div>
            )}
        </div>
    )
}

export default RoastDisplay