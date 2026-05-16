import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyIcon, EyeIcon, EyeSlashIcon, ChartLineUpIcon } from '@phosphor-icons/react';
import clsx from 'clsx';

import ThemeButton from '../../components/themeButton/themeButton';
import TitleComponent from '../../components/titleComponent/titleComponent';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLoginPage = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Artificial delay for premium feel
        setTimeout(() => {
            const result = adminLogin(password);
            if (result.success) {
                navigate('/admin/dashboard');
            } else {
                setError(result.message);
                setIsSubmitting(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 selection:bg-amber selection:text-dark">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-amber/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] size-[500px] bg-amber/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Branding */}
                <div className="flex flex-col items-center mb-10">
                    <div className="size-16 bg-dark flex items-center justify-center mb-4 shadow-2xl rounded-sm">
                        <ChartLineUpIcon size={32} weight="bold" className="text-amber" />
                    </div>
                    <TitleComponent type="h1" className="text-dark tracking-tight">
                        E-SHOP <span className="text-amber">ADMIN</span>
                    </TitleComponent>
                    <TitleComponent type="p" size="extra-small-bold" className="text-dark/40 uppercase tracking-[0.3em] mt-2">
                        Central Management Portal
                    </TitleComponent>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-grey-100 p-8 sm:p-10 shadow-xl relative overflow-hidden group/card rounded-sm">
                    {/* Animated Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent opacity-50 group-hover/card:opacity-100 duration-700" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-dark/40 font-bold uppercase tracking-widest ml-1">
                                Secure Access Key
                            </label>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within/input:text-amber duration-300">
                                    <LockKeyIcon size={20} weight="bold" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Admin Password"
                                    className={clsx(
                                        "w-full bg-light-bg border border-grey-100 px-12 py-4 text-dark text-sm outline-none duration-300 placeholder:text-dark/20",
                                        error ? "border-red-500/50" : "focus:border-amber/50"
                                    )}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/20 hover:text-dark duration-300"
                                >
                                    {showPassword ? <EyeSlashIcon size={18} weight="bold" /> : <EyeIcon size={18} weight="bold" />}
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1 animate-shake">
                                    {error}
                                </p>
                            )}
                        </div>

                        <ThemeButton
                            type="submit"
                            variant="dark"
                            disabled={isSubmitting}
                            className="w-full py-4 text-xs tracking-[0.2em] uppercase rounded-sm"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            ) : (
                                "Initialize Session"
                            )}
                        </ThemeButton>
                    </form>
                </div>

                {/* Footer Info */}
                <TitleComponent type="p" size="extra-small-medium" className="text-center text-dark/20 uppercase tracking-[0.1em] mt-8">
                    &copy; 2026 E-SHOP Digital Ecosystem. All Rights Reserved.
                </TitleComponent>
            </div>
        </div>
    );
};

export default AdminLoginPage;
