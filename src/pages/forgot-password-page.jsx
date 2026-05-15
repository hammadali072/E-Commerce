import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    EnvelopeIcon, ArrowRightIcon, ArrowLeftIcon,
    LockKeyIcon, CheckCircleIcon
} from '@phosphor-icons/react';

import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

const ForgotPasswordPage = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setEmailSent(true);
        }
    };

    return (
        <div className="animate-fadeIn min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <section className="py-12 md:py-20 w-full">
                <div className="container">
                    <div className="max-w-lg mx-auto">
                        {/* Top Icon Area */}
                        <div className="size-16 sm:size-20 bg-amber/10 flex items-center justify-center mx-auto mb-8 rounded-sm animate-fade-in-down">
                            <LockKeyIcon size={32} weight="thin" className="text-amber sm:hidden" />
                            <LockKeyIcon size={36} weight="thin" className="text-amber hidden sm:block" />
                        </div>

                        {/* Heading Area */}
                        <div className="text-center mb-12">
                            <TitleComponent type="h2" className="text-center font-playfairDisplay font-bold mb-3">
                                Forgot your password?
                            </TitleComponent>
                            <div className="w-12 h-1 bg-amber mx-auto mb-6" />
                            <TitleComponent size="base" className="text-dark/40 text-center px-4">
                                {emailSent
                                    ? "We've sent a password reset link to your email address. Please check your inbox and spam folder."
                                    : "Enter the email address associated with your account and we'll send you a link to reset your password."
                                }
                            </TitleComponent>
                        </div>

                        {/* Content Card */}
                        <div className="border border-gray-100 p-6 sm:p-10 bg-white shadow-sm duration-500">
                            {!emailSent ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div>
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full border border-gray-200 px-4 py-3.5 sm:px-5 sm:py-4 text-sm font-medium text-dark focus:border-amber outline-none duration-300"
                                                required
                                            />
                                            <EnvelopeIcon size={20} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20" />
                                        </div>
                                    </div>

                                    <ThemeButton
                                        type="submit"
                                        variant="dark"
                                        className="w-full py-4 text-sm tracking-widest uppercase font-bold"
                                        icon={<ArrowRightIcon size={16} weight="bold" />}
                                    >
                                        Send Reset Link
                                    </ThemeButton>

                                    <Link to="/login" className="flex items-center justify-center gap-2 mt-2 text-xs font-bold uppercase tracking-widest text-dark/40 hover:text-amber duration-300">
                                        <ArrowLeftIcon size={14} weight="bold" />
                                        Back to Login
                                    </Link>
                                </form>
                            ) : (
                                <div className="text-center animate-fadeIn">
                                    <CheckCircleIcon size={56} weight="thin" className="text-green-500 mx-auto mb-6" />

                                    <TitleComponent type="h3" className="text-dark text-center font-bold mb-3">
                                        Check Your Email
                                    </TitleComponent>

                                    <div className="flex flex-col gap-4 mt-8">
                                        <ThemeButton
                                            variant="dark"
                                            className="w-full py-4 text-sm tracking-widest uppercase font-bold"
                                        >
                                            Open Email App
                                        </ThemeButton>

                                        <Link to="/login" className="w-full">
                                            <ThemeButton
                                                variant="outline"
                                                className="w-full py-4 text-sm tracking-widest uppercase font-bold"
                                            >
                                                Back to Login
                                            </ThemeButton>
                                        </Link>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-50">
                                        <TitleComponent size="small" className="text-dark/30 text-center">
                                            Didn't receive the email? {' '}
                                            <button
                                                onClick={() => setEmailSent(false)}
                                                className="text-amber font-bold text-sm hover:text-dark duration-300"
                                            >
                                                Try again
                                            </button>
                                        </TitleComponent>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPasswordPage;
