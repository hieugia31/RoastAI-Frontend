import { ChevronDown } from "lucide-react"
import { useState } from "react"

const CharacterSuggestInput = ({ selectedCharacter, setSelectedCharacter }: any) => {
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e: any) => {
        const value = e.target.value;
        setSelectedCharacter(value);

        if (value.trim().length > 0) {
            const res = await fetch(`https://api.datamuse.com/sug?s=${value}`);
            const data = await res.json();
            setSuggestions(data.map((item: any) => item.word));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (word: any) => {
        setSelectedCharacter(word);
        setOpen(false); 
    };

    return (
        <div className="relative flex flex-col gap-1  w-1/3">
            <div onClick={() => setOpen(!open)} className="px-2 shadow-sm rounded-md relative w-full flex items-center border-[0.1px] border-[#a5a5a58a] ">
                <input
                    onChange={handleChange}
                    value={selectedCharacter}
                    type="text"
                    placeholder="Choose Characters"
                    className="w-full py-[6px] px-2 outline-none text-sm placeholder:text-sm placeholder:text-[#80808075]"
                />
                <ChevronDown
                    className={`absolute text-[#80808075] right-2 w-5 h-5 font-semibold transition-transform ${suggestions.length > 0 ? "" : "rotate-90"}`}
                />
            </div>
            <ul className={`${open && selectedCharacter.trim().length > 0 ? "absolute max-h-50 " : "hidden"} overflow-y-auto small-scroll custom-scroll top-10 px-2 bg-white border-[0.1px] border-[#a5a5a58a] rounded-md shadow-md inset-x-0`}>
                { selectedCharacter.trim().length > 0 && suggestions.map((suggestion) => (
                    <li onClick={() => handleSelect(suggestion)} className="py-[6px] text-sm my-1 px-2 hover:bg-[#F0F0F0] cursor-pointer active:bg-[#f0f0f09c] hover:rounded-md" key={suggestion}>{suggestion}</li>
                ))}
            </ul>
        </div>
    )
}

export default CharacterSuggestInput