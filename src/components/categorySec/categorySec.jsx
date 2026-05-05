import { Link } from 'react-router-dom';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import TitleComponent from '../titleComponent/titleComponent';
import SectionTitle from '../sectionTitle/sectionTitle';

import formalShoesImg from '../../assets/formal-shoes-img.png';
import joggersImg from '../../assets/jogger-img.png';
import pantImg from '../../assets/pant-img.png';
import shirtsImg from '../../assets/shirts-img.png';

const categories = [
    {
        name: 'Formal Shirts',
        img: shirtsImg,
        path: '/clothing/shirts',
        bgColor: 'bg-[#f7f0f9]',
        label: 'Classic Look'
    },
    {
        name: 'Formal Pant',
        img: pantImg,
        path: '/clothing/pants',
        bgColor: 'bg-[#fdf9e6]',
        label: 'Perfect Fit'
    },
    {
        name: 'Formal Shoes',
        img: formalShoesImg,
        path: '/shoes/formal-shoes',
        bgColor: 'bg-[#f0f4f7]',
        label: 'Step into Style'
    },
    {
        name: 'Joggers',
        img: joggersImg,
        path: '/shoes/joggers',
        bgColor: 'bg-[#f9f0f0]',
        label: 'Dynamic Comfort'
    },
];

const CategorySec = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <SectionTitle
                    title="Explore Our Categories"
                    description="Discover our curated collection of premium formal wear and active lifestyle essentials."
                    headingLevel="h2"
                    className='text-center'
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "group relative flex flex-col items-center pt-10 pb-8 px-6 duration-500 hover:shadow-2",
                                cat.bgColor
                            )}
                        >
                            <div className="text-center mb-8 relative z-10">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-dark-40 mb-2 block">
                                    {cat.label}
                                </span>
                                <TitleComponent type="h4" className="text-dark duration-300 group-hover:text-primary">
                                    {cat.name}
                                </TitleComponent>
                            </div>

                            <div className="relative aspect-square mb-6 flex items-center justify-center duration-700 ease-out group-hover:scale-110">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="max-h-full w-auto object-contain drop-shadow-lg"
                                />
                            </div>

                            <Link
                                to={cat.path}
                                className="inline-flex items-center gap-2 text-sm font-bold text-dark duration-300 group/button group-hover/button:gap-4 mt-auto"
                            >
                                <span className='text-dark duration-300 group-hover/button:text-primary'>Shop Now</span>
                                <CaretDoubleRightIcon size={16} weight="bold" className="text-dark duration-300 group-hover/button:text-primary" />
                            </Link>

                            <div className="absolute -bottom-10 -right-10 size-32 bg-white opacity-0 rounded-full blur-2xl duration-500 group-hover:opacity-10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySec;
