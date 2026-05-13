import { useState } from 'react';
import clsx from 'clsx';
import {
    CreditCardIcon, PaypalLogoIcon, PlusIcon, TrashIcon, CheckCircleIcon, LockIcon
} from '@phosphor-icons/react';
import ThemeButton from '../themeButton/themeButton';

const INITIAL_CARDS = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/27', holder: 'Hammad Ali', isDefault: true },
    { id: 2, type: 'mastercard', last4: '5353', expiry: '08/26', holder: 'Hammad Ali', isDefault: false },
];

const CARD_BRAND = {
    visa: { label: 'Visa', color: 'from-blue-600 to-blue-800', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    mastercard: { label: 'Mastercard', color: 'from-gray-800 to-gray-900', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
};

const EMPTY_FORM = { holder: '', number: '', expiry: '', cvv: '' };

export default function ProfilePayments() {
    const [cards, setCards] = useState(INITIAL_CARDS);
    const [paypal, setPaypal] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [deleteId, setDeleteId] = useState(null);
    const [errors, setErrors] = useState({});

    const f = k => v => setForm(p => ({ ...p, [k]: v }));

    const detectBrand = num => num.startsWith('4') ? 'visa' : 'mastercard';

    const validate = () => {
        const e = {};
        if (!form.holder.trim()) e.holder = 'Required';
        if (form.number.replace(/\s/g, '').length < 16) e.number = 'Enter 16-digit card number';
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY format';
        if (form.cvv.length < 3) e.cvv = 'Invalid CVV';
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleAdd = () => {
        if (!validate()) return;
        const type = detectBrand(form.number.replace(/\s/g, ''));
        const last4 = form.number.replace(/\s/g, '').slice(-4);
        setCards(prev => [...prev, { id: Date.now(), type, last4, expiry: form.expiry, holder: form.holder, isDefault: prev.length === 0 }]);
        setForm(EMPTY_FORM);
        setErrors({});
        setShowForm(false);
    };

    const setDefault = id => setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    const handleDelete = id => { setCards(prev => { const next = prev.filter(c => c.id !== id); if (next.length && !next.some(c => c.isDefault)) next[0].isDefault = true; return next; }); setDeleteId(null); };

    const formatNumber = val => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

    return (
        <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dark uppercase tracking-tight">Payment Methods</h3>
                    <p className="text-xs text-dark/40 font-semibold mt-0.5">Manage your saved cards & wallets</p>
                </div>
                <ThemeButton variant="dark" className="text-sm px-6 py-3 tracking-widest font-semibold" icon={<PlusIcon size={16} weight="bold" />} onClick={() => setShowForm(true)}>
                    Add Card
                </ThemeButton>
            </div>

            {/* Saved Cards */}
            <div className="mb-8">
                <p className="text-xs font-semibold text-dark/30 uppercase tracking-widest mb-4">Saved Cards</p>
                <div className="flex flex-col gap-3">
                    {cards.map(card => {
                        const brand = CARD_BRAND[card.type] || CARD_BRAND.visa;
                        return (
                            <div key={card.id} className={clsx(
                                'flex flex-col sm:flex-row sm:items-center gap-4 p-4 border bg-white duration-300',
                                card.isDefault ? 'border-amber bg-amber/5' : 'border-gray-100 hover:border-gray-200'
                            )}>
                                {/* Brand Logo */}
                                <div className="size-10 bg-off-white border border-gray-100 flex items-center justify-center flex-shrink-0 p-1.5">
                                    <img src={brand.logo} alt={brand.label} className="w-full h-full object-contain" />
                                </div>

                                {/* Card Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-base font-semibold text-dark font-mono">•••• {card.last4}</span>
                                        <span className="text-xs font-semibold text-dark/40 uppercase tracking-widest">{brand.label}</span>
                                        {card.isDefault && (
                                            <span className="flex items-center gap-1 text-xs font-semibold text-amber uppercase tracking-widest">
                                                <CheckCircleIcon size={12} weight="fill" />Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-dark/40 font-semibold mt-0.5">
                                        {card.holder} · Expires {card.expiry}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-gray-50">
                                    {!card.isDefault && (
                                        <button onClick={() => setDefault(card.id)}
                                            className="text-xs font-semibold text-dark/40 hover:text-amber duration-300 uppercase tracking-widest whitespace-nowrap">
                                            Set Default
                                        </button>
                                    )}
                                    {!card.isDefault && (
                                        <button onClick={() => setDeleteId(card.id)}
                                            className="ml-auto sm:ml-0 flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 duration-300 uppercase tracking-widest">
                                            <TrashIcon size={16} weight="bold" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {cards.length === 0 && (
                        <div className="text-center py-12 text-dark/30 border border-dashed border-gray-200">
                            <CreditCardIcon size={36} className="mx-auto mb-2" weight="duotone" />
                            <p className="text-xs font-semibold uppercase tracking-wider">No cards saved</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Digital Wallets */}
            <div>
                <p className="text-xs font-semibold text-dark/30 uppercase tracking-widest mb-4">Digital Wallets</p>
                <div className={clsx('flex items-center justify-between p-4 border duration-300', paypal ? 'border-amber bg-amber/5' : 'border-gray-100 bg-white')}>
                    <div className="flex items-center gap-3">
                        <PaypalLogoIcon size={28} weight="fill" className="text-blue-600" />
                        <div>
                            <p className="text-sm font-semibold text-dark uppercase tracking-wide">PayPal</p>
                            <p className="text-xs text-dark/40 font-semibold">{paypal ? 'hammad@example.com · Connected' : 'Not connected'}</p>
                        </div>
                    </div>
                    <button onClick={() => setPaypal(p => !p)} className={clsx('px-5 py-2 text-xs font-semibold uppercase tracking-widest duration-300', paypal ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-dark text-white hover:bg-dark/80')}>
                        {paypal ? 'Disconnect' : 'Connect'}
                    </button>
                </div>
            </div>

            {/* Add Card Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <LockIcon size={16} weight="bold" className="text-amber" />
                                <h4 className="text-xs font-semibold text-dark uppercase tracking-widest">Add New Card</h4>
                            </div>
                            <button onClick={() => { setShowForm(false); setErrors({}); }} className="text-dark/30 hover:text-dark duration-300 font-bold">✕</button>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            {[
                                { label: 'Cardholder Name', key: 'holder', placeholder: 'John Doe' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key} className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">{label}</label>
                                    <input value={form[key]} onChange={e => f(key)(e.target.value)} placeholder={placeholder}
                                        className="bg-off-white border-b border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300" />
                                    {errors[key] && <p className="text-[10px] text-red-500 font-medium">{errors[key]}</p>}
                                </div>
                            ))}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">Card Number</label>
                                <input value={form.number} onChange={e => f('number')(formatNumber(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19}
                                    className="bg-off-white border-b border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-mono font-medium text-dark outline-none duration-300" />
                                {errors.number && <p className="text-[10px] text-red-500 font-medium">{errors.number}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">Expiry (MM/YY)</label>
                                    <input value={form.expiry} onChange={e => { let v = e.target.value.replace(/\D/g,''); if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2,4); f('expiry')(v); }} placeholder="MM/YY" maxLength={5}
                                        className="bg-off-white border-b border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300" />
                                    {errors.expiry && <p className="text-xs text-red-500 font-medium">{errors.expiry}</p>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">CVV</label>
                                    <input value={form.cvv} onChange={e => f('cvv')(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="•••" type="password" maxLength={4}
                                        className="bg-off-white border-b border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300" />
                                    {errors.cvv && <p className="text-xs text-red-500 font-medium">{errors.cvv}</p>}
                                </div>
                            </div>
                             <p className="flex items-center gap-2 text-xs text-dark/30 font-semibold leading-relaxed mt-2">
                                <LockIcon size={14} weight="fill" className="text-green-500 flex-shrink-0" />
                                Your card info is encrypted and stored securely.
                            </p>
                        </div>
                        <div className="flex gap-3 p-5 border-t border-gray-100">
                            <ThemeButton variant="outline" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={() => { setShowForm(false); setErrors({}); }}>Cancel</ThemeButton>
                            <ThemeButton variant="dark" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={handleAdd}>Save Card</ThemeButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm shadow-2xl p-6 text-center">
                        <CreditCardIcon size={44} className="text-red-400 mx-auto mb-4" weight="duotone" />
                        <h4 className="text-sm font-semibold text-dark uppercase tracking-widest mb-2">Remove Card?</h4>
                        <p className="text-xs text-dark/50 font-semibold mb-8 leading-relaxed">This card will be permanently removed from your account.</p>
                        <div className="flex gap-3">
                            <ThemeButton variant="outline" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={() => setDeleteId(null)}>Cancel</ThemeButton>
                            <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 text-xs font-semibold uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 duration-300">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
