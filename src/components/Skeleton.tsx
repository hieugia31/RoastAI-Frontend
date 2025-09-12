
const Skeleton = () => {
    return (
        <div className="min-h-screen flex animate-pulse bg-[#fff]">
            <div className="w-64 bg-gray-300 p-4 space-y-4 rounded-lg">
                <div className="h-12 bg-gray-400 rounded-lg"></div>
                <div className="h-12 bg-gray-400 rounded-lg"></div>
                <div className="h-12 bg-gray-400 rounded-lg"></div>
                <div className="h-12 bg-gray-400 rounded-lg"></div>
            </div>


            <div className="flex-1 p-6 space-y-6">
                <div className="h-12 bg-gray-300 rounded-lg w-3/4"></div>
                <div className="h-64 bg-gray-300 rounded-lg w-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                    <div className="h-40 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
            </div>
        </div>
    )
}

export default Skeleton