import React, { useState, useRef, useEffect } from 'react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, value, onChange, placeholder, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={clsx("relative", className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "w-full flex items-center justify-between bg-white border p-4 text-sm font-medium outline-none duration-300",
                    isOpen ? "border-primary/50 text-dark shadow-sm" : "border-gray-200 text-dark hover:border-primary/50"
                )}
            >
                <span className={!value ? "text-dark/60" : "truncate pr-4"}>
                    {value || placeholder}
                </span>
                <CaretDownIcon
                    size={16}
                    weight="bold"
                    className={clsx("text-dark/40 duration-300 shrink-0", isOpen && "rotate-180 text-primary")}
                />
            </button>

            {/* Dropdown Menu */}
            <div
                className={clsx(
                    "absolute top-full left-0 w-full min-w-max mt-1 bg-white border border-gray-100 shadow-1 z-50 overflow-hidden duration-200 origin-top",
                    isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
                )}
            >
                <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
                    {options.map((opt, idx) => {
                        const isSelected = value === opt;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelect(opt)}
                                className={clsx(
                                    "w-full text-left px-4 py-2.5 text-sm duration-200 flex items-center justify-between group gap-4",
                                    isSelected ? "bg-primary/5 text-primary font-bold" : "text-dark/70 hover:bg-gray-50 hover:text-dark font-medium"
                                )}
                            >
                                <span className="truncate">{opt}</span>
                                {isSelected && <CheckIcon size={14} weight="bold" className="text-primary shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

CustomDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string
};

export default CustomDropdown;
