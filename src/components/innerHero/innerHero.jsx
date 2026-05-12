import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CaretRightIcon } from '@phosphor-icons/react';

const InnerHero = ({ title, subtitle, breadcrumbs }) => {
    return (
        <section className="relative py-20 md:py-26 w-full bg-dark-deep flex items-center justify-center overflow-hidden border-b border-amber/30">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 flex flex-col items-center text-center">
                <span className="text-amber font-semibold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 animate-fade-in-down">
                    {subtitle || "Discover Our Collection"}
                </span>

                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                    {title}
                </h1>

                <nav className="flex items-center gap-2 text-[11px] md:text-xs font-medium tracking-wider uppercase">
                    {breadcrumbs && breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <CaretRightIcon size={10} weight="bold" className="text-white/20" />}
                            {crumb.active ? (
                                <span className="text-amber font-bold">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link to={crumb.path} className="text-white/40 hover:text-white duration-300 transition-colors">
                                    {crumb.label}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
        </section>
    );
};

InnerHero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string,
            active: PropTypes.boolean
        })
    )
};

export default InnerHero;
