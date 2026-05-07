import PropTypes from 'prop-types';
import clsx from "clsx";

const ThemeButton = ({ children, icon: Icon, variant = 'primary', className = '', ...props }) => {
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

    const combinedClasses = clsx(baseClasses, variantClasses, className).trim();

    return (
        <button className={combinedClasses} {...props}>
            <span className={clsx(
                "absolute top-1/2 -translate-y-1/2 left-0 w-[110%] h-[110%] scale-x-0 origin-left duration-500 ease-out group-hover:scale-x-100",
                hoverBgClasses
            )} />

            <div className={clsx("relative z-10 flex items-center gap-3 duration-500", hoverTextClasses)}>
                {Icon && <span className="flex items-center">{Icon}</span>}
                <span className="leading-none">{children}</span>
            </div>
        </button>
    );
};

ThemeButton.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    className: PropTypes.string
};

export default ThemeButton;
