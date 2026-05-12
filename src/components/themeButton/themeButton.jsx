import React from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { ArrowRightIcon, TrashIcon, ShoppingBagIcon, HeartIcon, CaretRightIcon } from '@phosphor-icons/react';

const IconMap = {
    'ArrowRightIcon': ArrowRightIcon,
    'TrashIcon': TrashIcon,
    'ShoppingBagIcon': ShoppingBagIcon,
    'HeartIcon': HeartIcon,
    'CaretRightIcon': CaretRightIcon
};

const ThemeButton = ({ children, icon, iconPosition = 'right', variant = 'primary', className = '', ...props }) => {
    let variantClasses = '';
    let hoverBgClasses = '';
    let hoverTextClasses = '';

    const baseClasses = 'relative flex items-center justify-center gap-3 px-6 py-3.5 text-base font-semibold overflow-hidden duration-500 group';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-primary text-dark';
            hoverBgClasses = 'bg-secondary';
            hoverTextClasses = 'group-hover:text-white';
            break;
        case 'secondary':
            variantClasses = 'bg-secondary text-white';
            hoverBgClasses = 'bg-primary';
            hoverTextClasses = 'group-hover:text-dark';
            break;
        case 'outline':
            variantClasses = 'border-2 border-secondary text-secondary bg-transparent hover:border-primary';
            hoverBgClasses = 'bg-primary';
            hoverTextClasses = 'group-hover:text-white';
            break;
        case 'dark':
            variantClasses = 'bg-dark text-white';
            hoverBgClasses = 'bg-primary';
            hoverTextClasses = 'group-hover:text-dark';
            break;
        default:
            variantClasses = 'bg-primary text-dark';
            hoverBgClasses = 'bg-secondary';
            hoverTextClasses = 'group-hover:text-white';
    }

    const combinedClasses = clsx(
        baseClasses,
        variantClasses,
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        className
    ).trim();

    // Determine icon to render
    const renderIcon = () => {
        if (!icon) return null;
        
        let IconComponent = null;
        if (typeof icon === 'string') {
            IconComponent = IconMap[icon];
        } else if (typeof icon === 'function' || (typeof icon === 'object' && icon.$$typeof)) {
            // It's a component or an element
            if (React.isValidElement(icon)) return icon;
            IconComponent = icon;
        }

        if (!IconComponent) return null;
        
        return <IconComponent size={18} weight={icon === 'TrashIcon' ? "regular" : "bold"} className="duration-300" />;
    };

    const iconElement = renderIcon();

    return (
        <button className={combinedClasses} disabled={props.disabled} {...props}>
            <span className={clsx(
                "absolute top-1/2 -translate-y-1/2 left-0 w-[110%] h-[110%] scale-x-0 origin-left duration-500 ease-out group-hover:scale-x-100",
                hoverBgClasses
            )} />

            <div className={clsx("relative z-10 flex items-center gap-2 duration-500", hoverTextClasses)}>
                {iconElement && iconPosition === 'left' && <span className="flex items-center">{iconElement}</span>}
                <span className="leading-none">{children}</span>
                {iconElement && iconPosition === 'right' && <span className="flex items-center">{iconElement}</span>}
            </div>
        </button>
    );
};

ThemeButton.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'dark']),
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default ThemeButton;
