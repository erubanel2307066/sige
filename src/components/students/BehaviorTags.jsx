import React from 'react';
import { BEHAVIOR_TAGS } from '../../utils/constants';

const BehaviorTags = ({ activeTags = [], onToggle }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {BEHAVIOR_TAGS.map(tag => {
                const isActive = activeTags.includes(tag.id);
                return (
                    <button
                        key={tag.id}
                        onClick={() => onToggle(tag.id)}
                        className={`min-w-0 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${isActive
                                ? 'bg-[#EEF2FF] border-[#2563EB] text-[#1E3A8A]'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                    >
                        <span>{tag.icon}</span>
                        <span className="truncate">{tag.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BehaviorTags;
