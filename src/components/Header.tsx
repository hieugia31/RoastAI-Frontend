import MenuIcon from "./MenuIcon"
import NewChatIcon from "./NewChatIcon"

const Header = ({ setOpenSidebar , openSidebar }:any) => {
  return (
      <div className="bg-[#ffffff] z-20 overflow-hidden sticky top-0 w-full border-b border-[#808080]/10 px-5 py-[1.1rem] flex justify-between items-center">
          <span onClick={() => setOpenSidebar(!openSidebar)} className="md:hidden flex-shrink-0">
              <MenuIcon />
          </span>
          <span className="flex-shrink-0 text-zinc-600 font-semibold sm:font-bold tracking-wide ">RoastAI</span>
          <span className="flex-shrink-0">
              <NewChatIcon />
          </span>
      </div>
  )
}

export default Header