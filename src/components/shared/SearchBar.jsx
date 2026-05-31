import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = '🔍 Buscar alumno...' }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="block w-full h-[52px] pl-12 pr-4 rounded-[16px] border border-slate-200 bg-white text-slate-900 text-sm font-medium shadow-sm focus:outline-none focus:border-[#7A1235] focus:ring-2 focus:ring-[#7A1235]/10 transition-all placeholder:text-slate-400"
            />
        </div>
    );
};

export default SearchBar;
