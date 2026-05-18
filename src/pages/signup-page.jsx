import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
    EnvelopeIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon, CheckIcon,
    LockIcon, ShieldCheckIcon, UserIcon, CheckCircleIcon
} from '@phosphor-icons/react';

import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const passwordStrength = useMemo(() => {
        const len = formData.password.length;
        if (len === 0) return { score: 0, label: '', color: 'bg-gray-200' };
        if (len <= 3) return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-400' };
        if (len <= 7) return { score: 2, label: 'Fair', color: 'bg-amber', textColor: 'text-amber' };
        if (len <= 11) return { score: 3, label: 'Good', color: 'bg-blue-400', textColor: 'text-blue-400' };
        return { score: 4, label: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' };
    }, [formData.password]);

    const passwordsMatch = formData.password === formData.confirmPassword;
    const isConfirmPasswordDirty = formData.confirmPassword.length > 0;
    const isFormValid = formData.firstName && formData.lastName && formData.email && formData.password.length >= 8 && passwordsMatch && formData.agreeTerms;

    return (
        <div className="animate-fadeIn min-h-screen flex items-center bg-gray-50">
            <section className="py-8 md:py-20 w-full">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-6xl mx-auto">

                        {/* Left Side — Decorative Panel */}
                        <div className="hidden lg:flex flex-col justify-between bg-dark p-12 xl:p-16 h-full min-h-[600px] xl:min-h-[700px] relative overflow-hidden">
                            <div>
                                <Link to="/" className="text-white font-black text-3xl font-playfairDisplay italic">
                                    E-SHOP<span className="text-amber">.</span>
                                </Link>
                                <div className="mt-12">
                                    <div className="text-white text-3xl md:text-4xl font-playfairDisplay font-bold leading-tight">
                                        Join the E-SHOP Community.
                                    </div>
                                    <div className="w-16 h-1 bg-amber my-8" />
                                    <TitleComponent size="base" className="text-white/40">
                                        Get exclusive access to new arrivals, member-only deals, and premium collections delivered to your inbox.
                                    </TitleComponent>
                                </div>
                            </div>

                            <div className="flex flex-col gap-0">
                                <div className="flex items-start gap-4 py-5 border-b border-white/5">
                                    <CheckCircleIcon size={24} weight="bold" className="text-amber shrink-0" />
                                    <div>
                                        <TitleComponent type="h6" className="text-white font-bold mb-1">Free Shipping</TitleComponent>
                                        <TitleComponent size="small" className="text-white/40">On all orders over $100 — automatically applied at checkout.</TitleComponent>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 py-5 border-b border-white/5">
                                    <CheckCircleIcon size={24} weight="bold" className="text-amber shrink-0" />
                                    <div>
                                        <TitleComponent type="h6" className="text-white font-bold mb-1">Exclusive Deals</TitleComponent>
                                        <TitleComponent size="small" className="text-white/40">Member-only discounts and early access to seasonal sales.</TitleComponent>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pt-5">
                                    <CheckCircleIcon size={24} weight="bold" className="text-amber shrink-0" />
                                    <div>
                                        <TitleComponent type="h6" className="text-white font-bold mb-1">Easy Returns</TitleComponent>
                                        <TitleComponent size="small" className="text-white/40">Hassle-free 30-day returns on all eligible purchases.</TitleComponent>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side — Sign Up Form */}
                        <div className="bg-white p-6 sm:p-10 md:p-16">
                            <div className="mb-10 text-center lg:text-left">
                                <TitleComponent type="h2" className="font-playfairDisplay">
                                    Create Account
                                </TitleComponent>
                                <div className="w-20 h-1 bg-amber mt-3 mb-2 mx-auto lg:mx-0" />
                                <TitleComponent size="base" className="text-dark/40">
                                    Fill in your details below to get started.
                                </TitleComponent>
                            </div>

                            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">First Name</label>
                                        <div className="relative">
                                            <input
                                                type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                                className="w-full border border-gray-200 px-4 py-3.5 text-sm font-medium text-dark focus:border-amber duration-300"
                                                placeholder="John" required
                                            />
                                            <UserIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">Last Name</label>
                                        <div className="relative">
                                            <input
                                                type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                                className="w-full border border-gray-200 px-4 py-3.5 text-sm font-medium text-dark focus:border-amber duration-300"
                                                placeholder="Doe" required
                                            />
                                            <UserIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleInputChange}
                                            className="w-full border border-gray-200 px-4 py-3.5 sm:px-5 sm:py-4 text-sm font-medium text-dark focus:border-amber duration-300"
                                            placeholder="your@email.com" required
                                        />
                                        <EnvelopeIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange}
                                            className="w-full border border-gray-200 px-4 py-3.5 sm:px-5 sm:py-4 text-sm font-medium text-dark focus:border-amber duration-300"
                                            placeholder="••••••••" required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark duration-300">
                                            {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                                        </button>
                                    </div>
                                    {/* Strength Indicator */}
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={clsx("h-1 flex-1 rounded-full duration-300", i <= passwordStrength.score ? passwordStrength.color : "bg-gray-200")} />
                                        ))}
                                    </div>
                                    {passwordStrength.label && <span className={clsx("text-xs font-bold mt-1 block", passwordStrength.textColor)}>{passwordStrength.label}</span>}
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-2 block">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                                            className={clsx(
                                                "w-full border px-4 py-3.5 sm:px-5 sm:py-4 text-sm font-medium text-dark focus:border-amber duration-300 pr-12",
                                                !passwordsMatch && isConfirmPasswordDirty ? "border-red-400" : "border-gray-200",
                                                passwordsMatch && isConfirmPasswordDirty && "border-green-500"
                                            )}
                                            placeholder="••••••••" required
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            {passwordsMatch && isConfirmPasswordDirty && <CheckCircleIcon size={18} weight="fill" className="text-green-500" />}
                                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-dark/30 hover:text-dark duration-300">
                                                {showConfirmPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    {!passwordsMatch && isConfirmPasswordDirty && <p className="text-xs text-red-500 mt-2 font-medium">Passwords do not match.</p>}
                                </div>

                                <div className="py-2">
                                    <label className="flex items-start sm:items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className={clsx("size-5 border-2 flex items-center justify-center duration-300 rounded-sm", formData.agreeTerms ? "bg-amber border-amber" : "bg-white border-gray-200 group-hover:border-amber")}>
                                            {formData.agreeTerms && <CheckIcon size={12} weight="bold" className="text-white" />}
                                        </div>
                                        <span className="text-sm text-dark/50">
                                            I agree to the <Link to="/terms" className="text-amber font-bold hover:text-dark duration-300">Terms of Service</Link> and <Link to="/privacy" className="text-amber font-bold hover:text-dark duration-300">Privacy Policy</Link>
                                        </span>
                                    </label>
                                </div>

                                <ThemeButton
                                    variant="dark" className="w-full py-4 text-sm tracking-widest uppercase font-bold"
                                    icon={<ArrowRightIcon size={16} weight="bold" />}
                                    disabled={!isFormValid}
                                >
                                    Create Account
                                </ThemeButton>

                                <div className="flex items-center gap-4 my-2">
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <TitleComponent size="small" className="text-dark/30 whitespace-nowrap">or continue with</TitleComponent>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>

                                <div className="flex flex-col min-[450px]:flex-row gap-4">
                                    <button type="button" className="flex-1 border border-gray-200 py-3.5 flex items-center justify-center gap-3 text-sm font-bold text-dark hover:border-dark hover:bg-light-bg duration-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span>Google</span>
                                    </button>
                                    <button type="button" className="flex-1 border border-gray-200 py-3.5 flex items-center justify-center gap-3 text-sm font-bold text-dark hover:border-dark hover:bg-light-bg duration-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.03 4.388 11.03 10.125 11.927V15.56H7.078v-3.487h3.047V9.413c0-3.007 1.791-4.673 4.657-4.673 1.373 0 2.812.246 2.812.246V7.92h-1.543c-1.487 0-1.951.923-1.951 1.874v2.279h3.328l-.532 3.487h-2.796v8.44C19.612 23.103 24 18.103 24 12.073z" fill="#1877F2" />
                                            <path d="M16.671 15.56l.532-3.487h-3.328V9.794c0-.95.464-1.874 1.951-1.874h1.543V4.986s-1.439-.246-2.812-.246c-2.866 0-4.657 1.666-4.657 4.673v2.66H7.078v3.487h3.047v8.44c.625.097 1.266.147 1.923.147.657 0 1.298-.05 1.923-.147v-8.44h2.796z" fill="white" />
                                        </svg>
                                        <span>Facebook</span>
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    <TitleComponent size="small" className="text-dark/40">
                                        Already have an account? <Link to="/login" className="text-amber font-bold hover:text-dark duration-300">Sign in here</Link>
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

export default SignupPage;
