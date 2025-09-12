import { Avatar } from "../Avatar"
import NewChatIcon from "../NewChatIcon"
import SidebarIcon from "../SidebarIcon"

const SidebarforMobileView = ({ setOpenSidebar, openSidebar, user, setSelectedOption, selectedOption }: any) => {
    return (
        <div
            className={`md:hidden text-sm fixed top-0 bottom-0 left-0 overflow-hidden flex flex-col bg-[#f9f9f9] w-[16.25rem] min-h-screen border-r border-[#808080]/10 transition-all duration-300 ease-in-out z-50 ${openSidebar ? "translate-x-0 shadow-[var(--shadow)]" : "-translate-x-full"}`}>
            {/* Sidebar Icons */}
            <div className="flex items-center justify-between p-[1rem] border-b border-[#808080]/10">
                <div className="text-[18px] cursor-pointer">😂</div>
                <div onClick={() => setOpenSidebar(!openSidebar)} className="pr-[1rem] hover:cursor-ew-resize"><SidebarIcon /></div>
            </div>
            {/* Feature Section */}
            <div className="p-[1rem] flex flex-1 flex-col overflow-y-auto scroll-smooth custom-scroll">
                <div
                    onClick={() => setSelectedOption("roastMe")}
                    className={`flex items-center py-2 px-1 gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300 ${selectedOption === "roastMe" && ("bg-[#efefef]")} `}>
                    <NewChatIcon />
                    <span>Roast Me</span>
                </div>
                <div
                    onClick={() => setSelectedOption("dailyNewsletter")}
                    className={`flex items-center py-2 px-1 gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300 ${selectedOption === "dailyNewsletter" && ("bg-[#efefef]")} `}>
                    <img src="/news.svg" alt="news_2.img" />
                    <span>Funny Daily Newsletter</span>
                </div>
                <div
                    onClick={() => setSelectedOption("FunnyCharacters")}
                    className={`flex items-center py-2 px-1 gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300 ${selectedOption === "FunnyCharacters" && ("bg-[#efefef]")} `}>
                    <img src="/comedy_mask.svg" alt="comedy_mask.svg" />
                    <span>Funny Characters</span>
                </div>
                <div
                    onClick={() => setSelectedOption("FunnyFeud")}
                    className={`flex items-center py-2 px-1 gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300 ${selectedOption === "FunnyFeud" && ("bg-[#efefef]")} `}>
                    <img src="/Funny_Feud.svg" alt="Funny Feud" />
                    <span>Funny Feud</span>
                </div>
                <div
                    onClick={() => setSelectedOption("FunnyQuotes")}
                    className={`flex items-center py-2 px-1 gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300 ${selectedOption === "FunnyFeud" && ("bg-[#efefef]")} `}>
                    <img src="/Funny_Quotes.svg" alt="Funny Quotes" />
                    <span>Funny Quotes</span>
                </div>
            </div>
            {/* Profile bottom section */}
            {user && (
                <div className="p-[0.5rem] border-t border-[#808080]/10 z-50">
                    <div className="p-[0.3rem] flex items-center gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300">
                        <Avatar name={user.name} />
                        <div className="text-sm">
                            <h3>{user?.name}</h3>
                            <p className="text-sm text-[#a5a4a4]">{user.email}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SidebarforMobileView