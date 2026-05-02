const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-gray-900 mb-4">SWOO - 1ST NYC TECH ONLINE MARKET</h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-600">HOTLINE 24/7</p>
                            <a href="tel:(025)36862516" className="text-orange-500 font-semibold text-lg block">(025) 3686 25 16</a>
                            <p className="text-gray-600 mt-4">257 Thatcher Road St, Brooklyn, Manhattan,</p>
                            <p className="text-gray-600">NY 10092</p>
                            <a href="mailto:contact@swootechmart.com" className="text-gray-900 block mt-2">contact@swootechmart.com</a>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                            </a>
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">TOP CATEGORIES</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-teal-500">Laptops</a></li>
                            <li><a href="#" className="hover:text-teal-500">PC & Computers</a></li>
                            <li><a href="#" className="hover:text-teal-500">Cell Phones</a></li>
                            <li><a href="#" className="hover:text-teal-500">Tablets</a></li>
                            <li><a href="#" className="hover:text-teal-500">Gaming & VR</a></li>
                            <li><a href="#" className="hover:text-teal-500">Networks</a></li>
                            <li><a href="#" className="hover:text-teal-500">Cameras</a></li>
                            <li><a href="#" className="hover:text-teal-500">Sounds</a></li>
                            <li><a href="#" className="hover:text-teal-500">Office</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">COMPANY</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-teal-500">About Swoo</a></li>
                            <li><a href="#" className="hover:text-teal-500">Contact</a></li>
                            <li><a href="#" className="hover:text-teal-500">Career</a></li>
                            <li><a href="#" className="hover:text-teal-500">Blog</a></li>
                            <li><a href="#" className="hover:text-teal-500">Sitemap</a></li>
                            <li><a href="#" className="hover:text-teal-500">Store Locations</a></li>
                        </ul>
                    </div>

                    {/* Help Center */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">HELP CENTER</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-teal-500">Customer Service</a></li>
                            <li><a href="#" className="hover:text-teal-500">Policy</a></li>
                            <li><a href="#" className="hover:text-teal-500">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-teal-500">Track Order</a></li>
                            <li><a href="#" className="hover:text-teal-500">FAQs</a></li>
                            <li><a href="#" className="hover:text-teal-500">My Account</a></li>
                            <li><a href="#" className="hover:text-teal-500">Product Support</a></li>
                        </ul>
                    </div>

                    {/* Partner */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">PARTNER</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-teal-500">Become Seller</a></li>
                            <li><a href="#" className="hover:text-teal-500">Affiliate</a></li>
                            <li><a href="#" className="hover:text-teal-500">Advertise</a></li>
                            <li><a href="#" className="hover:text-teal-500">Partnership</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <select className="px-4 py-2 border border-gray-300 rounded text-sm">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded text-sm">
                                <option>🇺🇸 Eng</option>
                                <option>🇪🇸 Esp</option>
                            </select>
                        </div>
                        <div className="flex-1 max-w-2xl">
                            <div className="text-center mb-4">
                                <span className="font-bold text-gray-900">SUBSCRIBE & GET </span>
                                <span className="font-bold text-orange-500">10% OFF </span>
                                <span className="font-bold text-gray-900">FOR YOUR FIRST ORDER</span>
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                                />
                                <button className="px-6 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors">
                                    SUBSCRIBE
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                By subscribing, you've accepted the our <a href="#" className="underline">Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                    <p>© 2024 <span className="font-semibold text-gray-900">Shawonetc3</span> . All Rights Reserved</p>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Klarna_Payment_Badge.svg" alt="Klarna" className="h-6" />
                    </div>
                    <a href="#" className="text-teal-500 hover:text-teal-600 mt-4 md:mt-0">Mobile Site</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
