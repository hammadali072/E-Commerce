import PropTypes from 'prop-types';
import clsx from 'clsx';

import TitleComponent from '../titleComponent/titleComponent';

const SectionTitle = ({
    title,
    description,
    headingLevel = 'h2',
    className = '',
    descriptionClassName = ''
}) => {
    return (
        <div className={clsx("flex flex-col mb-10 md:mb-14 lg:mb-20", className)}>
            <TitleComponent
                type={headingLevel}
                className="text-dark leading-[1.2] md:leading-tight"
            >
                {title}
            </TitleComponent>

            <div className="h-1 md:h-1.5 bg-primary mt-3 md:mt-4 mb-5 md:mb-8 duration-500 w-12 md:w-24" />

            {description && (
                <TitleComponent
                    size="base"
                    className={clsx(
                        "text-dark-65 max-w-2xl leading-relaxed text-sm md:text-base lg:text-lg",
                        descriptionClassName
                    )}
                >
                    {description}
                </TitleComponent>
            )}
        </div>
    );
};

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    className: PropTypes.string,
    descriptionClassName: PropTypes.string
};

export default SectionTitle;
