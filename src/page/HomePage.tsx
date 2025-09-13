import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar"
import SidebarIcon from "../components/SidebarIcon"
import NewChatIcon from "../components/NewChatIcon"
import { useGetUser, useLogout } from "../api/MyUserApi"
import { useForm } from "react-hook-form"
import { useRoastMe } from "../api/RoastMeApi"
import MainContent from "../components/MainContent"
import SidebarforMobileView from "../components/Sidebar/SidebarforMobileView"
import HoverInfoIcon from "../components/HoverInfoIcon"
import WittyNewsSummary from "../components/WittyNewsSummary"
import FunnyCharactersPage from "./FunnyCharactersPage"
import FunnyFeudPage from "./FunnyFeudPage"
import FunnyQuotesPage from "./FunnyQuotesPage"

const HomePage = () => {

  const [openSidebar, setOpenSidebar] = useState(() => window.innerWidth >= 768);
  const [floatingSendButton, setFloatingSendButton] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState("roastMe");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { roastMeRequest, loading, roastData } = useRoastMe()
  const { getUserRequest, user } = useGetUser();
  const { register, handleSubmit, reset } = useForm();
  const { logoutRequest } = useLogout();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      await getUserRequest();
    }

    fetchUser();
  }, []);


  const onSubmit = (data: any) => {
    roastMeRequest(data.AskAnything);
    reset();
    setFloatingSendButton(false);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFloatingSendButton(value.trim().length > 0);
  };


const handleLogout = async () => {

  try {
    await logoutRequest();
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setIsPopupOpen(false);
    navigate("/login");  
  }
};

  return (
    <div className="w-full flex relative flex-row">
      {openSidebar ? (
        // Expanded Sidebar (Desktop)
        <div className={`sticky cursor-pointer text-sm inset-y-0 left-0 hidden w-[16.25rem] h-screen md:flex flex-col justify-between z-50 bg-[#f9f9f9] border-r border-[#808080]/10 ${openSidebar ? "translate-x-0" : "-translate-x-100"} transition-all duration-300 ease-in-out`}>
          {/* Sidebar Icons */}
          <div className="flex items-center justify-between p-[1rem] border-b border-[#808080]/10">
            <div className="text-[18px] cursor-pointer">😂</div>
            <div onClick={() => setOpenSidebar(!openSidebar)} className="pr-[1rem] hover:cursor-ew-resize"><SidebarIcon /></div>
          </div>
          {/* Feature Section */}
          <div className="scroll-x-none gap-2 p-[1rem] flex flex-1 flex-col overflow-y-auto scroll-smooth custom-scroll">
            <div
              onClick={() => setSelectedOption("roastMe")}
              className={`flex items-center py-2 px-1 gap-2 ${selectedOption === "roastMe" && ("bg-[#efefef]")} hover:bg-[#efefef] rounded-lg transition-colors duration-300`}>
              <NewChatIcon />
              <span>Roast Me</span>
            </div>
            <div
              onClick={() => setSelectedOption("dailyNewsletter")}
              className={`flex items-center py-2 px-1 gap-2 ${selectedOption === "dailyNewsletter" && ("bg-[#efefef]")} hover:bg-[#efefef] rounded-lg transition-colors duration-300`}>
              <img src="/news.svg" alt="news_2.img" />
              <span>Funny Daily Newsletter</span>
            </div>
            <div
              onClick={() => setSelectedOption("FunnyCharacters")}
              className={`flex items-center py-2 px-1 gap-2 ${selectedOption === "FunnyCharacters" && ("bg-[#efefef]")} hover:bg-[#efefef] rounded-lg transition-colors duration-300`}>
              <img src="/comedy_mask.svg" alt="comedy_mask.svg" />
              <span>Funny Characters</span>
            </div>
            <div
              onClick={() => setSelectedOption("FunnyFeud")}
              className={`flex items-center py-2 px-1 gap-2 ${selectedOption === "FunnyFeud" && ("bg-[#efefef]")} hover:bg-[#efefef] rounded-lg transition-colors duration-300`}>
              <img src="/Funny_Feud.svg" alt="Funny Feud" />
              <span>Funny Feud</span>
            </div>
            <div
              onClick={() => setSelectedOption("FunnyQuotes")}
              className={`flex items-center py-2 px-1 gap-2 ${selectedOption === "FunnyQuotes" && ("bg-[#efefef]")} hover:bg-[#efefef] rounded-lg transition-colors duration-300`}>
              <img src="/Funny_Quotes.svg" alt="Funny_Quotes" />
              <span>Funny Quotes</span>
            </div>
          </div>
          {/* Profile bottom section */}
          {user && (
            <div onClick={() => setIsPopupOpen((prev) => !prev)} className="p-[0.5rem] relative border-t border-[#808080]/10 z-50">
              <div className="p-[0.3rem] flex items-center gap-2 hover:bg-[#efefef] rounded-lg transition-colors duration-300">
                <Avatar name={user.name} />
                <div className="text-sm">
                  <h3>{user?.name}</h3>
                  <p className="text-sm text-[#a5a4a4]">{user.email}</p>
                </div>
              </div>
              {isPopupOpen && (
                <div onClick={(e) => e.stopPropagation()} className="absolute bottom-18 inset-x-2 p-3 bg-[#fff] rounded-lg shadow-md border-[#cecece] border-[0.1px] text-md">
                  <p className="text-sm text-gray-400 hover:text-gray-900">
                    {user.email}
                  </p>
                  <div className="border-t border-gray-100 my-2 text-md"></div>
                  <button
                    onClick={() => {
                    handleLogout();
                    setIsPopupOpen(false);
                    }}
                    className="flex items-center gap-1 text-sm text-gray-900 w-full hover:text-gray-500">
                    <img src="/logout2.svg" alt="" />
                    <p>Logout</p>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Collapsed Sidebar (Desktop)
        <div className="sticky cursor-pointer text-sm inset-y-0 left-0 hidden md:flex items-center flex-col h-screen bg-[#fff] w-[3.25rem] border-r border-[#808080]/10 transition-all duration-300 ease-in-out">
          <div className="w-full min-h-screen flex flex-col items-center">
            {/* Sidebar Icons */}
            <div onClick={() => setOpenSidebar(!openSidebar)} className="text-[18px] p-[1rem] cursor-pointer">
              😂
            </div>
            {/* Feature Section */}
            <div className="p-[1rem] flex flex-1 flex-col items-center overflow-visible scroll-x-none scroll-smooth custom-scroll">
              <div
                className=" gap-3 flex flex-col"
              >
                <HoverInfoIcon
                  icon={<NewChatIcon />}
                  label="Roast Me"
                  onClick={() => setSelectedOption("roastMe")}
                />
                <HoverInfoIcon
                  icon={<img src="/news.svg" alt="news_2.img" />}
                  label="Funny Daily Newsletter"
                  onClick={() => setSelectedOption("dailyNewsletter")}
                />
                <HoverInfoIcon
                  icon={<img src="/comedy_mask.svg" alt="comedy_mask.svg" />}
                  label="Funny Characters"
                  onClick={() => setSelectedOption("FunnyCharacters")}
                />
                <HoverInfoIcon
                  icon={<img src="/Funny_Feud.svg" alt="Funny Feud" />}
                  label="Funny Feud"
                  onClick={() => setSelectedOption("FunnyFeud")}
                />
                <HoverInfoIcon
                  icon={<img src="/Funny_Quotes.svg" alt="Funny Feud" />}
                  label="Funny Quotes"
                  onClick={() => setSelectedOption("FunnyQuotes")}
                />
              </div>
            </div>
            {/* Profile bottom section */}
            <div className="cursor-pointer fixed bottom-[1rem] left-[1rem]">
              {user && (
                <div onClick={() => setIsPopupOpen((prev) => !prev)} className="relative">
                  <Avatar
                    name={user.name}
                  />
                  {isPopupOpen && (
                    <div onClick={(e) => e.stopPropagation()} className="absolute bottom-full mb-2 inset-x-0 p-3 bg-[#fff] h-fit w-fit rounded-lg shadow-md border-[#cecece] border-[0.1px] text-md">
                      <p className="text-sm text-gray-400 hover:text-gray-900">
                        {user.email}
                      </p>
                      <div className="border-t border-gray-100 my-2 text-md"></div>
                        <button onClick={() => {
                          handleLogout();   
                          setIsPopupOpen(false); 
                        }}
                        className="flex items-center gap-1 text-sm text-gray-900 w-full hover:text-gray-500"
                      >
                        <img src="/logout2.svg" alt="Logout Icon" />
                        <p>Logout</p>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for Mobile View */}
      <SidebarforMobileView setOpenSidebar={setOpenSidebar} setSelectedOption={setSelectedOption} selectedOption={selectedOption} openSidebar={openSidebar} user={user} handleLogout={handleLogout} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />

      {/* Main Content Area */}
      <div className={`flex-1 flex relative flex-col overflow-y-auto min-h-screen`}>
        {selectedOption === "roastMe" && (
          <MainContent setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} roastData={roastData} loading={loading} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} handleInputChange={handleInputChange} floatingSendButton={floatingSendButton} />
        )}
        {selectedOption === "dailyNewsletter" && (
          <WittyNewsSummary openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        )}
        {selectedOption === "FunnyCharacters" && (
          <FunnyCharactersPage openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} onSubmit={onSubmit} register={register} floatingSendButton={floatingSendButton} setFloatingSendButton={setFloatingSendButton} />
        )}
        {selectedOption === "FunnyFeud" && (
          <FunnyFeudPage openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} onSubmit={onSubmit} register={register} floatingSendButton={floatingSendButton} setFloatingSendButton={setFloatingSendButton} />
        )}
        {selectedOption === "FunnyQuotes" && (
          <FunnyQuotesPage openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        )}
      </div>
    </div>
  )
}

export default HomePage;