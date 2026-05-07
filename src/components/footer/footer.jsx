import { Link } from 'react-router-dom';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@phosphor-icons/react';
import VisaIcon from '../../assets/visa.svg'
import StripeIcon from '../../assets/stripe.svg'
import PaypalIcon from '../../assets/paypal.svg'

import TitleComponent from '../../components/titleComponent/titleComponent'
import { footerQuickLinks, footerCategoryLinks, footerSocialLinks } from '../../Data';

const Footer = () => {

    return (
        <footer className="bg-dark text-white">
            <div className="container">
                <div className="lg:pt-24 lg:pb-12 pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-12 gap-8">
                    <div className="flex flex-col">
                        <Link to="/" className="text-3xl font-black font-playfairDisplay tracking-tighter mb-8">
                            E-SHOP<span className="text-primary">.</span>
                        </Link>
                        <TitleComponent size="base" className="text-white/40 leading-relaxed mb-10 max-w-sm">Redefining the modern wardrobe with a curated selection of premium clothing and artisanal footwear. Excellence in every stitch.</TitleComponent>
                        <div className="flex gap-4">
                            {footerSocialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    to={social.path}
                                    className="size-11 border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <TitleComponent type="h5" className='text-white mb-8'>Quick Links</TitleComponent>
                        <ul className="flex flex-col gap-4">
                            {footerQuickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/40 text-base hover:text-primary duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <TitleComponent type="h5" className='text-white mb-8'>Categories</TitleComponent>
                        <ul className="flex flex-col gap-4">
                            {footerCategoryLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/40 text-base hover:text-primary duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <TitleComponent type="h5" className='text-white mb-8'>Contact Us</TitleComponent>
                        <ul className="flex flex-col gap-6">
                            <li className="flex gap-4 group">
                                <div className="bg-primary/10 size-11 flex items-center justify-center shrink-0">
                                    <EnvelopeIcon className='text-primary' size={22} />
                                </div>
                                <Link to="mailto:support@eshop.com" className="text-white/40 text-base group-hover:text-primary duration-300">support@eshop.com</Link>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="bg-primary/10 size-11 flex items-center justify-center shrink-0">
                                    <PhoneIcon className='text-primary' size={22} />
                                </div>
                                <Link to="tel:+15550001234" className="text-white/40 text-base group-hover:text-primary duration-300">+1 (555) 000-1234</Link>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="bg-primary/10 size-11 flex items-center justify-center shrink-0">
                                    <MapPinIcon className='text-primary' size={22} weight='bold' />
                                </div>
                                <Link to="" className="text-white/40 text-base group-hover:text-primary duration-300">
                                    123 Fashion Ave, Suite 100<br />New York, NY 10001
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-dark2 mb-10 px-6 py-3 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <TitleComponent size="large-semibold" className='text-white'>Acceptable Payment Methods</TitleComponent>
                    <ul className='flex gap-4 items-center justify-center'>
                        <li>
                            <img className='md:w-14 w-12 h-auto object-contain' src={VisaIcon} alt="Visa" />
                        </li>
                        <li>
                            <img className='md:w-14 w-12 h-auto object-contain' src={PaypalIcon} alt="PayPal" />
                        </li>
                        <li>
                            <img className='md:w-14 w-12 h-auto object-contain' src={StripeIcon} alt="Stripe" />
                        </li>
                    </ul>
                </div>

                <div className="border-t border-white/5 py-5">
                    <p className="text-center text-white/60 text-base">
                        © 2024 <Link to="#" className="text-white font-bold hover:text-primary duration-300">E-Shop</Link>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;
