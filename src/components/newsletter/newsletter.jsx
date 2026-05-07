import ThemeButton from '../themeButton/themeButton';
import TitleComponent from '../titleComponent/titleComponent';

import newsletterImg from '../../assets/newsletter-img.svg';

const Newsletter = () => {
    return (
        <section className="bg-[#f2f2f2]">
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 lg:py-10 lg:px-[72px] sm:p-9 p-5">
                    <div className="flex flex-col items-center lg:items-start">
                        <h2 className="text-3xl md:text-5xl font-bold text-dark leading-tight">
                            Subscribe to the Newsletter and Get Nice Offers
                        </h2>
                        <TitleComponent size="base" className="text-dark-65 md:text-lg mt-4 mb-10">Bring a spring upon her cable holystone blow the man down</TitleComponent>

                        <form
                            className="flex flex-col sm:flex-row w-full gap-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="flex-1 text-dark bg-white border border-grey-100 px-6 py-4 text-dark focus:border-primary duration-300"
                                required
                            />
                            <ThemeButton
                                type="submit"
                                variant="primary"
                                className="sm:px-10 whitespace-nowrap sm:self-auto self-start"
                            >
                                Subscribe
                            </ThemeButton>
                        </form>
                    </div>

                    <div className="md:w-2/3 w-full">
                        <img
                            src={newsletterImg}
                            alt="Newsletter Illustration"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
