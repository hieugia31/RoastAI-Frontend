import { useState } from "react";
import Header from "./Header"
import { ChevronDown } from "lucide-react";
import { countries } from 'countries-list';
import { useDailyNewsMail } from "../api/DailyNewsMail";

const countryNames = (Object.values(countries) as { name: string }[]).map(country => country.name);
const WittyNewsSummary = ({ setOpenSidebar, openSidebar }: any) => {

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const newsCategories = [
    "Technology",
    "Business",
    "Finance",
    "Health",
    "Science",
    "Sports",
    "Entertainment",
    "Politics",
    "World News",
    "Lifestyle",
    "Travel",
    "Education",
    "Environment",
    "Food",
    "Fashion",
    "Gaming",
    "Music",
    "Movies",
    "Art",
    "Culture",
    "Economy",
    "Startups",
    "Cryptocurrency",
    "AI & Robotics",
    "Space",
    "Social Media",
    "Books",
    "Law & Justice",
    "Automotive",
    "Real Estate",
    "Personal Finance",
    "Psychology",
    "Fitness",
    "Parenting",
    "Events",
    "Agriculture",
    "History",
    "Photography",
    "Design",
    "Marketing",
    "Economics",
    "Blockchain",
    "Celebrity News",
    "Podcasts",
    "Environment",
    "Wildlife",
    "Innovation",
    "Politics US",
    "Politics UK"
  ];

  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = newsCategories.filter(
    (c) => c.toLowerCase().includes(categorySearch.toLowerCase()) && !selectedCategories.includes(c)
  );

  const addCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
    setCategorySearch('');
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const filtered = countryNames.filter(
    (c) => c.toLowerCase().includes(search.toLowerCase()) && !selected.includes(c)
  );

  const addCountry = (country: any) => {
    setSelected([...selected, country]);
    setSearch('');
  };

  const removeCountry = (country: any) => {
    setSelected(selected.filter((c) => c !== country));
  };

  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [dailyInsightsEnabled, setDailyInsightsEnabled] = useState(false);
  const { dailyNewsMailRequest, loading, error } = useDailyNewsMail()

  const times = [
    "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM",
    "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
    "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
  ];

  const handleSave = async () => {
    let userTZ = "";
    if (enabled) {
      userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    await dailyNewsMailRequest({
      timeZone: userTZ,
      dailyInsightsTime: selectedTime,
      countries: selected,
      categories: selectedCategories,
      dailyInsightsEnabled
    })
  };

  return (
    <div className="min-w-full">
      <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      <div className="max-w-[48rem] mx-auto h-full flex flex-col gap-5 px-8 py-4 sm:px-16 transition-all duration-300">
        <h1 className="text-2xl font-semibold mb-4 text-zinc-800">  📰  Daily Insights Settings  </h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Time zone */}
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <span className="text-base font-semibold">Time zone</span>
            <input type="text" placeholder="Enter your time zone" className="placeholder:text-[#80808075] border-[0.1px] border-[#a5a5a58a] rounded-md px-2 py-[6px] outline-none shadow-sm text-sm placeholder:text-sm" />
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#0000006c] mt-1">
                {enabled
                  ? "Timezone will be detected automatically 📍"
                  : "Turn this on to auto-detect your timezone"}
              </p>
              <button
                onClick={() => { setEnabled(!enabled) }}
                className="h-6 w-10 bg-black rounded-full relative"
              >
                <span className={`block ml-[1px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-4" : "translate-x-0"}`}></span>
              </button>
            </div>
          </div>
          {/* Daily Insights Time */}
          <div className="relative flex flex-col gap-1 w-full md:w-1/2">
            <h2 className="text-base font-semibold">Daily Insights Time</h2>
            <div
              onClick={() => setOpen(!open)}
              className="py-[6px] px-2 w-full border-[0.1px] border-[#a5a5a58a] shadow-sm text-sm rounded-md text-[#80808075] flex items-center justify-between"
            >
              <span className={`text-sm ${selectedTime ? "text-gray-800" : "text-[#80808075]"}`}>
                {selectedTime || "Select time..."}
              </span>
              <ChevronDown
                className={`w-5 h-5 font-semibold transition-transform ${open ? "rotate-90" : ""}`}
              />
            </div>
            {open && (
              <ul className="absolute inset-x-0 top-16 z-10 w-full max-h-48 overflow-y-auto bg-[#fff] border-[0.1px] border-[#a5a5a58a] rounded-lg shadow-lg transform transition-all duration-200 ease-out">
                {times.map((time, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer py-[6px] px-2 text-[#424242b7] text-sm hover:bg-[#42424211]"
                    onClick={() => {
                      setSelectedTime(time);
                      setOpen(false);
                    }}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-[#0000006c]">Your daily newsletter will be sent at the time you select here</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Countries */}
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <h1 className="text-base font-semibold">Daily Insight Countries</h1>
            <div className="relative flex flex-col gap-1">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full py-[6px] px-2 outline-none border-[0.1px] border-[#a5a5a58a] rounded-md shadow-sm text-sm placeholder:text-sm placeholder:text-[#80808075]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChevronDown
                  className={`absolute text-[#80808075] right-2 w-5 h-5 font-semibold transition-transform ${open ? "rotate-90" : ""}`}
                />
              </div>
              {search && filtered.length > 0 && (
                <ul className="absolute z-10 bg-[#fff] border-[0.1px] border-[#a5a5a58a] rounded-lg shadow-2xl max-h-30 w-full overflow-y-auto">
                  {filtered.map((c) => (
                    <li
                      key={c}
                      className="cursor-pointer py-[6px] px-2 text-[#424242b7] text-sm hover:bg-[#42424211]"
                      onClick={() => addCountry(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              {selected.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mt-2">
                  {selected.map((c) => (
                    <div
                      key={c}
                      className="bg-[#42424211] p-4 py-[6px] w-fit rounded-full text-sm flex items-center gap-1"
                    >
                      {c}
                      <button
                        onClick={() => removeCountry(c)}
                        className="font-semibold text-[#424242] border-black"
                      >
                        <img src="./delete.svg" alt="x" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {selected.length === 0 && (
                <p className="text-xs text-[#0000006c]">Select regions to get news from</p>
              )}
            </div>
          </div>
          {/* Categories */}
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <h1 className="text-base font-semibold">Choose Your Categories</h1>
            <div className="relative flex flex-col gap-1">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full py-[6px] px-2 outline-none border-[0.1px] border-[#a5a5a58a] rounded-md shadow-sm text-sm placeholder:text-sm placeholder:text-[#80808075]"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
                <ChevronDown
                  className={`absolute text-[#80808075] right-2 w-5 h-5 font-semibold transition-transform ${open ? "rotate-90" : ""}`}
                />
              </div>
              {categorySearch && filteredCategories.length > 0 && (
                <ul className="absolute top-9 z-10 bg-[#fff] border-[0.1px] border-[#a5a5a58a] rounded-lg shadow-2xl max-h-30 w-full overflow-y-auto">
                  {filteredCategories.map((c, i) => (
                    <li
                      key={c + i}
                      className="cursor-pointer py-[6px] px-2 text-[#424242b7] text-sm hover:bg-[#42424211]"
                      onClick={() => addCategory(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              {selectedCategories.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mt-2">
                  {selectedCategories.map((c) => (
                    <div
                      key={c}
                      className="bg-[#42424211] p-4 py-[6px] w-fit rounded-full text-sm flex items-center gap-1"
                    >
                      {c}
                      <button
                        onClick={() => removeCategory(c)}
                        className="font-semibold text-[#424242] border-black"
                      >
                        <img src="./delete.svg" alt="x" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {selectedCategories.length === 0 && (
                <p className="text-xs text-[#0000006c]">Select the topics or industries you want news about</p>
              )}
            </div>
          </div>
        </div>
        {/* Daily Insights */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-base font-semibold">Daily Insights</h1>
              <button
                onClick={() => { setDailyInsightsEnabled(!dailyInsightsEnabled) }}
                className="h-6 w-10 bg-black rounded-full relative"
              >
                <span className={`block ml-[1px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${dailyInsightsEnabled ? "translate-x-4" : "translate-x-0"}`}></span>
              </button>
            </div>
            <div className="flex w-full justify-between items-center">
              <h4 className="text-xs text-[#0000006c] flex-1 min-w-0">
                Enable to receive daily emails.
              </h4>
              <p className="text-xs text-[#0000006c] flex-shrink-0 ml-4">
                {dailyInsightsEnabled ? "Daily Insights is on" : "Daily Insights is off"}
              </p>
            </div>
          </div>
          <button onClick={handleSave} className="w-fit hover:bg-[#111111dc] h-fit text-[#fffffff5] bg-black text-sm font-normal rounded-md px-2 py-[7px] tracking-wide">{loading ? 'Saving...' : 'Save Settings'}</button>
          {error && <button onClick={handleSave} className="w-fit hover:bg-[#111111dc] h-fit text-[#df4646f5] bg-white border-[0.1px] border-black text-sm font-normal rounded-md px-2 py-[7px] tracking-wide"> Error occurred</button>}
        </div>
      </div>
    </div>
  )
}

export default WittyNewsSummary

