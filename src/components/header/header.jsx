const Header = () => {
    return (
        <>
            <header className="w-full">
                {/* Top Bar */}
                <div className="bg-gray-100 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Hotline 24/7</span>
                            <a href="tel:(025)38862516" className="text-gray-900 font-semibold">(025) 3886 25 16</a>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-gray-700 hover:text-gray-900">Sell on Swoo</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Order Tracki</a>
                            <select className="bg-transparent text-gray-700 border-none outline-none cursor-pointer">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                            </select>
                            <select className="bg-transparent text-gray-700 border-none outline-none cursor-pointer flex items-center">
                                <option>🇺🇸 Eng</option>
                                <option>🇪🇸 Esp</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">SWOO</div>
                                <div className="text-xs text-gray-600">TECH MART</div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-8">
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-900 font-medium hover:text-teal-500">
                                    HOMES
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-900 font-medium hover:text-teal-500">
                                    PAGES
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-900 font-medium hover:text-teal-500">
                                    PRODUCTS
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <a href="#" className="text-gray-900 font-medium hover:text-teal-500">CONTACT</a>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <div className="text-xs text-gray-500">WELCOME</div>
                                    <div className="text-sm font-semibold text-gray-900">LOG IN / REGISTER</div>
                                </div>
                            </div>
                            <div className="relative">
                                <button className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white relative">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 rounded-full text-xs flex items-center justify-center">2</span>
                                </button>
                                <div className="text-right mt-1">
                                    <div className="text-xs text-gray-500">CART</div>
                                    <div className="text-sm font-semibold text-gray-900">$1,689.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Nav Style 3 - Search Bar with Features */}
            <div className="relative">
                <div className="absolute left-[15px] right-[15px] top-0 h-[75px] bg-[#01A49E] rounded-[10px] shadow-lg z-10">
                    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                        {/* Search Section - Combined white background */}
                        <div className="flex items-center bg-white rounded-lg overflow-hidden flex-1 max-w-md">
                            <div className="relative group border-r border-gray-200">
                                <button className="px-4 py-3 flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                                    All Categories
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-full px-4 py-3 border-none focus:outline-none"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-8 text-white">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <span className="text-sm font-medium">FREE SHIPPING OVER $199</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">30 DAYS MONEY BACK</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-sm font-medium">100% SECURE PAYMENT</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Spacer to prevent content overlap */}
                <div className="h-[90px]"></div>
            </div>
        </>
    )
}

export default Header
