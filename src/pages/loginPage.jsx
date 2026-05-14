import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    EnvelopeIcon, LockIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon,
    ArrowRightIcon
} from '@phosphor-icons/react';
import ThemeButton from '../components/themeButton/themeButton';
import clsx from 'clsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
        // Add authentication logic here
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-fadeIn">
            {/* Left Side: Branding/Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                        alt="Fashion"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 p-16 flex flex-col justify-between w-full">
                    <div>
                        <Link to="/" className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            E-Shop<span className="text-primary">.</span>
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-6xl font-bold text-white leading-tight mb-6 font-playfairDisplay">
                            Curated <br /> Elegance for <br /> Every Journey.
                        </h2>
                        <p className="text-white/60 text-lg max-w-md font-medium tracking-wide">
                            Join our exclusive community and discover the art of refined living through our premium collections.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 lg:py-0">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-dark mb-3 font-playfairDisplay">Welcome Back</h1>
                        <p className="text-dark/40 text-sm font-medium">Please enter your details to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Field */}
                        <div className="group flex flex-col gap-2">
                            <label className="text-[10px] font-semibold text-dark/30 uppercase tracking-[0.2em] ml-0.5 group-focus-within:text-primary duration-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="yourname@example.com"
                                    className="w-full bg-transparent border-b border-gray-200 py-3 pr-10 text-sm font-medium text-dark outline-none focus:border-primary duration-300"
                                />
                                <EnvelopeIcon size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within:text-primary duration-300" weight="bold" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-semibold text-dark/30 uppercase tracking-[0.2em] ml-0.5 group-focus-within:text-primary duration-300">
                                    Password
                                </label>
                                <Link to="#" className="text-[10px] font-semibold text-primary uppercase tracking-widest hover:text-dark duration-300">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b border-gray-200 py-3 pr-10 text-sm font-medium text-dark outline-none focus:border-primary duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-dark/20 hover:text-dark duration-300"
                                >
                                    {showPassword ? <EyeSlashIcon size={18} weight="bold" /> : <EyeIcon size={18} weight="bold" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3">
                            <label className="relative flex items-center cursor-pointer group">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="size-4 border-2 border-gray-200 rounded-sm bg-white peer-checked:bg-primary peer-checked:border-primary duration-300" />
                                <span className="ml-3 text-xs font-semibold text-dark/60 uppercase tracking-widest">Remember for 30 days</span>
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-4 pt-4">
                            <ThemeButton
                                type="submit"
                                variant="dark"
                                className="w-full py-4 tracking-[0.2em] uppercase text-xs"
                                icon={<ArrowRightIcon size={16} weight="bold" />}
                            >
                                Sign In
                            </ThemeButton>

                            <button
                                type="button"
                                className="w-full h-14 flex items-center justify-center gap-3 border border-gray-200 bg-white text-dark text-xs font-semibold uppercase tracking-[0.2em] hover:bg-off-white hover:border-dark/20 duration-300"
                            >
                                <GoogleLogoIcon size={18} weight="bold" className="text-secondary" />
                                Sign in with Google
                            </button>
                        </div>

                        <div className="text-center pt-6">
                            <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest">
                                Don't have an account? {' '}
                                <Link to="/signup" className="text-primary hover:text-dark duration-300 underline underline-offset-4">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
