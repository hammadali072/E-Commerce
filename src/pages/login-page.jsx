import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
    EnvelopeIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon, CheckIcon,
    LockIcon, ShieldCheckIcon, UserIcon
} from '@phosphor-icons/react';

import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="animate-fadeIn min-h-screen flex items-center bg-gray-50">
            <section className="py-8 md:py-20 w-full">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-6xl mx-auto">

                        {/* Left Side — Decorative Panel */}
                        <div className="hidden lg:flex flex-col justify-between bg-dark p-12 xl:p-16 h-full min-h-[500px] xl:min-h-[600px] relative overflow-hidden">
                            {/* Logo */}
                            <div>
                                <Link to="/" className="text-white font-black text-3xl font-playfairDisplay italic">
                                    E-SHOP<span className="text-amber">.</span>
                                </Link>
                            </div>

                            {/* Quote & Content */}
                            <div>
                                <div className="text-white text-3xl md:text-4xl font-playfairDisplay font-bold leading-tight">
                                    "Style is a way to say who you are without having to speak."
                                </div>
                                <div className="w-16 h-1 bg-amber my-8" />
                                <TitleComponent size="base" className="text-white/40">
                                    Join thousands of fashion-forward individuals who trust E-SHOP for premium clothing and artisanal footwear.
                                </TitleComponent>
                            </div>

                            {/* Trust Items */}
                            <div className="flex gap-8">
                                <div className="flex flex-col gap-2">
                                    <LockIcon size={20} weight="bold" className="text-amber" />
                                    <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">Secure Login</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <ShieldCheckIcon size={20} weight="bold" className="text-amber" />
                                    <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">Data Protected</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <UserIcon size={20} weight="bold" className="text-amber" />
                                    <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">Private Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side — Login Form */}
                        <div className="bg-white p-6 sm:p-10 md:p-16">
                            <div className="mb-10">
                                <TitleComponent type="h2" className="font-playfairDisplay">
                                    Welcome Back
                                </TitleComponent>
                                <div className="w-20 h-1 bg-amber mt-3 mb-2" />
                                <TitleComponent size="base" className="text-dark/40">
                                    Sign in to your account to continue shopping.
                                </TitleComponent>
                            </div>

                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-200 px-5 py-4 text-sm font-medium text-dark placeholder:text-dark/30 focus:border-amber focus:outline-none duration-300"
                                            required
                                        />
                                        <EnvelopeIcon size={20} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20" />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-200 px-5 py-4 text-sm font-medium text-dark placeholder:text-dark/30 focus:border-amber focus:outline-none duration-300"
                                            required
                                        />
                                        <div
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark cursor-pointer duration-300"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <EyeSlashIcon size={18} weight="bold" /> : <EyeIcon size={18} weight="bold" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Row below password */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className={clsx(
                                            "size-4 border border-gray-300 flex items-center justify-center duration-300",
                                            formData.rememberMe ? "bg-amber border-amber" : "bg-white"
                                        )}>
                                            {formData.rememberMe && <CheckIcon size={10} weight="bold" className="text-white" />}
                                        </div>
                                        <span className="text-sm text-dark/50 font-medium">Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="text-xs font-bold text-amber hover:text-dark duration-300 uppercase tracking-widest whitespace-nowrap">
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <ThemeButton
                                    variant="dark"
                                    className="w-full py-4 text-sm tracking-widest uppercase font-bold"
                                    icon={<ArrowRightIcon size={16} weight="bold" />}
                                >
                                    Sign In
                                </ThemeButton>

                                {/* Divider */}
                                <div className="flex items-center gap-4 my-2">
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <TitleComponent size="small" className="text-dark/30 whitespace-nowrap">
                                        or continue with
                                    </TitleComponent>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>

                                {/* Social Buttons */}
                                <div className="flex flex-col min-[450px]:flex-row gap-4">
                                    <button
                                        type="button"
                                        className="flex-1 border border-gray-200 py-3.5 flex items-center justify-center gap-3 text-sm font-bold text-dark hover:border-dark hover:bg-light-bg duration-300"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span>Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 border border-gray-200 py-3.5 flex items-center justify-center gap-3 text-sm font-bold text-dark hover:border-dark hover:bg-light-bg duration-300"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.03 4.388 11.03 10.125 11.927V15.56H7.078v-3.487h3.047V9.413c0-3.007 1.791-4.673 4.657-4.673 1.373 0 2.812.246 2.812.246V7.92h-1.543c-1.487 0-1.951.923-1.951 1.874v2.279h3.328l-.532 3.487h-2.796v8.44C19.612 23.103 24 18.103 24 12.073z" fill="#1877F2" />
                                            <path d="M16.671 15.56l.532-3.487h-3.328V9.794c0-.95.464-1.874 1.951-1.874h1.543V4.986s-1.439-.246-2.812-.246c-2.866 0-4.657 1.666-4.657 4.673v2.66H7.078v3.487h3.047v8.44c.625.097 1.266.147 1.923.147.657 0 1.298-.05 1.923-.147v-8.44h2.796z" fill="white" />
                                        </svg>
                                        <span>Facebook</span>
                                    </button>
                                </div>

                                {/* Bottom Link */}
                                <div className="text-center mt-4">
                                    <TitleComponent size="small" className="text-dark/40">
                                        Don't have an account? {' '}
                                        <Link to="/signup" className="text-amber font-bold hover:text-dark duration-300">
                                            Create one here
                                        </Link>
                                    </TitleComponent>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
