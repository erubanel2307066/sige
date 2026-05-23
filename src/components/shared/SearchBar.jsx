import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 bg-white text-gray-900 font-medium text-[15px] border-2 border-transparent rounded-2xl shadow-inner focus:outline-none focus:border-[#BC955C] focus:ring-4 focus:ring-[#BC955C]/10 transition-all placeholder:text-gray-400 placeholder:font-normal"
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchBar;
