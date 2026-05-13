import { useState } from 'react';
import clsx from 'clsx';
import { BellIcon, ShieldCheckIcon, GlobeIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react';
import ThemeButton from '../themeButton/themeButton';

const Toggle = ({ value, onChange, label, description }) => (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-gray-50 last:border-0">
        <div>
            <p className="text-sm font-semibold text-dark">{label}</p>
            {description && <p className="text-xs text-dark/40 font-medium mt-0.5">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!value)}
            className={clsx(
                'relative w-11 h-6 rounded-full flex-shrink-0 duration-300 mt-0.5',
                value ? 'bg-amber' : 'bg-gray-200'
            )}
        >
            <span className={clsx(
                'absolute top-1 size-4 rounded-full bg-white shadow duration-300',
                value ? 'left-6' : 'left-1'
            )} />
        </button>
    </div>
);

const LANGS = ['English', 'Urdu', 'Arabic', 'French', 'German'];
const CURRENCIES = ['USD ($)', 'PKR (₨)', 'EUR (€)', 'GBP (£)', 'AED (د.إ)'];

export default function ProfileSettings() {
    const [notifs, setNotifs] = useState({ orders: true, promos: true, sms: false, email: true, security: true });
    const [privacy, setPrivacy] = useState({ activityLog: true, twoFactor: false, dataSave: true });
    const [lang, setLang] = useState('English');
    const [currency, setCurrency] = useState('USD ($)');
    const [showDelete, setShowDelete] = useState(false);
    const [confirmText, setConfirmText] = useState('');

    const n = k => v => setNotifs(p => ({ ...p, [k]: v }));
    const p = k => v => setPrivacy(prev => ({ ...prev, [k]: v }));

    return (
        <div className="animate-fadeIn">
            <div className="mb-6 pb-5 border-b border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-dark uppercase tracking-tight">Settings</h3>
                <p className="text-xs text-dark/40 font-semibold mt-0.5">Manage notifications, privacy & preferences</p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Notifications */}
                <div className="bg-off-white p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <BellIcon size={18} weight="fill" className="text-amber" />
                        <h4 className="text-xs font-semibold text-dark uppercase tracking-widest">Notifications</h4>
                    </div>
                    <Toggle value={notifs.orders} onChange={n('orders')} label="Order Updates" description="Status changes, shipping & delivery alerts" />
                    <Toggle value={notifs.promos} onChange={n('promos')} label="Promotions & Offers" description="Deals, flash sales & discount codes" />
                    <Toggle value={notifs.email} onChange={n('email')} label="Email Notifications" description="Receive updates via your registered email" />
                    <Toggle value={notifs.sms} onChange={n('sms')} label="SMS Alerts" description="Text messages for critical order updates" />
                    <Toggle value={notifs.security} onChange={n('security')} label="Security Alerts" description="Login attempts & password changes" />
                </div>

                {/* Privacy & Security */}
                <div className="bg-off-white p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <ShieldCheckIcon size={18} weight="fill" className="text-amber" />
                        <h4 className="text-xs font-semibold text-dark uppercase tracking-widest">Privacy & Security</h4>
                    </div>
                    <Toggle value={privacy.twoFactor} onChange={p('twoFactor')} label="Two-Factor Authentication" description="Add an extra layer of security to your account" />
                    <Toggle value={privacy.activityLog} onChange={p('activityLog')} label="Activity Log" description="Keep a record of your account activity" />
                    <Toggle value={privacy.dataSave} onChange={p('dataSave')} label="Save Browsing Data" description="Remember recently viewed items & searches" />
                </div>

                {/* Language & Region */}
                <div className="bg-off-white p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <GlobeIcon size={18} weight="fill" className="text-amber" />
                        <h4 className="text-xs font-semibold text-dark uppercase tracking-widest">Language & Region</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">Language</label>
                            <select value={lang} onChange={e => setLang(e.target.value)}
                                className="bg-white border border-gray-200 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300 appearance-none cursor-pointer">
                                {LANGS.map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">Currency</label>
                            <select value={currency} onChange={e => setCurrency(e.target.value)}
                                className="bg-white border border-gray-200 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300 appearance-none cursor-pointer">
                                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <ThemeButton variant="dark" className="text-xs px-8 py-3 tracking-widest font-semibold">Save Preferences</ThemeButton>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="border border-red-100 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <WarningIcon size={18} weight="fill" className="text-red-400" />
                        <h4 className="text-xs font-semibold text-red-500 uppercase tracking-widest">Danger Zone</h4>
                    </div>
                    <p className="text-xs text-dark/50 font-medium mb-4 leading-relaxed">
                        Permanently delete your account and all associated data. This action is irreversible.
                    </p>
                    <button onClick={() => setShowDelete(true)}
                        className="text-xs font-semibold uppercase tracking-widest border border-red-300 text-red-500 px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 duration-300">
                        Delete My Account
                    </button>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm shadow-2xl p-6">
                        <div className="text-center mb-6">
                            <WarningIcon size={44} weight="fill" className="text-red-400 mx-auto mb-4" />
                            <h4 className="text-sm font-semibold text-dark uppercase tracking-widest mb-2">Delete Account?</h4>
                            <p className="text-xs text-dark/50 font-semibold leading-relaxed">
                                All your orders, addresses and payment methods will be permanently erased. Type <strong className="text-red-500">DELETE</strong> to confirm.
                            </p>
                        </div>
                        <input
                            value={confirmText}
                            onChange={e => setConfirmText(e.target.value)}
                            placeholder="Type DELETE to confirm"
                            className="w-full border border-gray-200 focus:border-red-400 px-3 py-2.5 text-sm font-mono font-bold text-dark outline-none duration-300 mb-4 text-center"
                        />
                        <div className="flex gap-3">
                            <ThemeButton variant="outline" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={() => { setShowDelete(false); setConfirmText(''); }}>
                                Cancel
                            </ThemeButton>
                            <button
                                disabled={confirmText !== 'DELETE'}
                                className={clsx('flex-1 py-3 text-xs font-semibold uppercase tracking-widest duration-300',
                                    confirmText === 'DELETE' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                )}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
