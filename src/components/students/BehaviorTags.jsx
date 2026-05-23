import React from 'react';
import { BEHAVIOR_TAGS } from '../../utils/constants';

const BehaviorTags = ({ activeTags = [], onToggle }) => {
    return (
        <div className="flex overflow-x-auto gap-2.5 pr-4 py-1 no-scrollbar select-none">
            {BEHAVIOR_TAGS.map(tag => {
                const isActive = activeTags.includes(tag.id);
                return (
                    <button
                        key={tag.id}
                        onClick={() => onToggle(tag.id)}
                        className={`flex-shrink-0 h-11 px-4 rounded-full border-2 text-[15px] flex items-center justify-center transition-all transform active:scale-95 ${isActive
                                ? 'bg-[#691C32] text-white border-[#691C32] shadow-md'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                    >
                        <span className="mr-1.5">{tag.icon}</span>
                        <span className="font-bold text-[11px] uppercase tracking-wider">{tag.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BehaviorTags;
