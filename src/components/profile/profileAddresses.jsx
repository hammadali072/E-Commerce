import { useState } from 'react';
import clsx from 'clsx';
import {
    MapPinIcon, PlusIcon, PencilSimpleIcon, TrashIcon, CheckCircleIcon, HouseIcon, BuildingsIcon
} from '@phosphor-icons/react';
import ThemeButton from '../themeButton/themeButton';

const INITIAL = [
    {
        id: 1, label: 'Home', type: 'home', isDefault: true,
        name: 'Hammad Ali', phone: '+92 300 1234567',
        line1: '24 Gulberg Main Boulevard', city: 'Lahore', country: 'Pakistan', zip: '54000'
    },
    {
        id: 2, label: 'Office', type: 'office', isDefault: false,
        name: 'Hammad Ali', phone: '+92 321 9876543',
        line1: 'Plot 5, DHA Phase 6', city: 'Karachi', country: 'Pakistan', zip: '75500'
    },
];

const EMPTY_FORM = { label: '', type: 'home', name: '', phone: '', line1: '', city: '', country: '', zip: '' };

const Field = ({ label, value, onChange, placeholder, type = 'text', half }) => (
    <div className={clsx('flex flex-col gap-1.5', half ? '' : 'col-span-2')}>
        <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="bg-off-white border-b-2 border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300"
        />
    </div>
);

export default function ProfileAddresses() {
    const [addresses, setAddresses] = useState(INITIAL);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [deleteId, setDeleteId] = useState(null);

    const f = k => v => setForm(p => ({ ...p, [k]: v }));

    const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };
    const openEdit = addr => { setForm({ ...addr }); setEditId(addr.id); setShowForm(true); };

    const handleSave = () => {
        if (!form.name || !form.line1 || !form.city) return;
        if (editId) {
            setAddresses(prev => prev.map(a => a.id === editId ? { ...form, id: editId } : a));
        } else {
            setAddresses(prev => [...prev, { ...form, id: Date.now(), isDefault: prev.length === 0 }]);
        }
        setShowForm(false);
    };

    const handleDelete = id => {
        setAddresses(prev => {
            const next = prev.filter(a => a.id !== id);
            if (next.length && !next.some(a => a.isDefault)) next[0].isDefault = true;
            return next;
        });
        setDeleteId(null);
    };

    const setDefault = id => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));

    return (
        <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dark uppercase tracking-tight">Saved Addresses</h3>
                    <p className="text-xs text-dark/40 font-medium mt-0.5">{addresses.length} address{addresses.length !== 1 && 'es'} saved</p>
                </div>
                <ThemeButton variant="dark" className="text-xs px-5 py-2.5 tracking-widest font-semibold" icon={<PlusIcon size={14} weight="bold" />} onClick={openAdd}>
                    Add Address
                </ThemeButton>
            </div>

            {/* Address Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {addresses.map(addr => (
                    <div key={addr.id} className={clsx('border p-4 sm:p-5 relative duration-300', addr.isDefault ? 'border-amber bg-amber/5' : 'border-gray-100 bg-white hover:border-gray-200')}>
                        {addr.isDefault && (
                            <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-semibold text-amber uppercase tracking-widest">
                                <CheckCircleIcon size={12} weight="fill" />Default
                            </span>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="size-8 bg-white border border-gray-100 flex items-center justify-center text-amber">
                                {addr.type === 'home' ? <HouseIcon size={16} weight="fill" /> : <BuildingsIcon size={16} weight="fill" />}
                            </div>
                            <span className="text-xs font-semibold text-dark uppercase tracking-widest">{addr.label || addr.type}</span>
                        </div>
                        <p className="text-sm font-bold text-dark">{addr.name}</p>
                        <p className="text-xs text-dark/50 font-medium mt-0.5">{addr.phone}</p>
                        <p className="text-xs text-dark/60 font-medium mt-1 leading-relaxed">
                            {addr.line1}, {addr.city}, {addr.country} {addr.zip}
                        </p>
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 flex-wrap">
                            {!addr.isDefault && (
                                <button onClick={() => setDefault(addr.id)} className="text-xs font-semibold text-dark/40 hover:text-amber duration-300 uppercase tracking-widest">
                                    Set Default
                                </button>
                            )}
                            <div className="flex items-center gap-3 ml-auto">
                                <button onClick={() => openEdit(addr)} className="flex items-center gap-1.5 text-xs font-semibold text-dark/40 hover:text-dark duration-300 uppercase tracking-widest">
                                    <PencilSimpleIcon size={14} weight="bold" />Edit
                                </button>
                                {!addr.isDefault && (
                                    <button onClick={() => setDeleteId(addr.id)} className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-600 duration-300 uppercase tracking-widest">
                                        <TrashIcon size={14} weight="bold" />Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {addresses.length === 0 && (
                    <div className="col-span-2 text-center py-14 text-dark/30">
                        <MapPinIcon size={36} className="mx-auto mb-3" weight="duotone" />
                        <p className="text-sm font-bold uppercase tracking-wider">No addresses yet</p>
                        <p className="text-xs mt-1">Add your first shipping address</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h4 className="text-xs font-semibold text-dark uppercase tracking-widest">{editId ? 'Edit Address' : 'New Address'}</h4>
                            <button onClick={() => setShowForm(false)} className="text-dark/30 hover:text-dark duration-300 text-lg font-bold p-2 -mr-2">✕</button>
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-4">
                            <Field label="Label (e.g. Home)" value={form.label} onChange={f('label')} placeholder="Home" half />
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-dark/30 uppercase tracking-widest">Type</label>
                                <select value={form.type} onChange={e => f('type')(e.target.value)}
                                    className="bg-off-white border-b-2 border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300">
                                    <option value="home">Home</option>
                                    <option value="office">Office</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <Field label="Full Name *" value={form.name} onChange={f('name')} placeholder="John Doe" />
                            <Field label="Phone" value={form.phone} onChange={f('phone')} placeholder="+1 555 000 0000" />
                            <Field label="Street Address *" value={form.line1} onChange={f('line1')} placeholder="Street, Area" />
                            <Field label="City *" value={form.city} onChange={f('city')} placeholder="City" half />
                            <Field label="Country" value={form.country} onChange={f('country')} placeholder="Country" half />
                            <Field label="ZIP Code" value={form.zip} onChange={f('zip')} placeholder="00000" half />
                        </div>
                        <div className="flex gap-3 p-5 border-t border-gray-100">
                            <ThemeButton variant="outline" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={() => setShowForm(false)}>Cancel</ThemeButton>
                            <ThemeButton variant="dark" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={handleSave}>Save Address</ThemeButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm shadow-2xl p-8 text-center">
                        <TrashIcon size={44} className="text-red-400 mx-auto mb-4" weight="duotone" />
                        <h4 className="text-sm font-semibold text-dark uppercase tracking-widest mb-2">Delete Address?</h4>
                        <p className="text-xs text-dark/50 font-medium mb-8 leading-relaxed">This action cannot be undone. All information associated with this address will be lost.</p>
                        <div className="flex gap-3">
                            <ThemeButton variant="outline" className="flex-1 py-3 text-xs tracking-widest font-semibold" onClick={() => setDeleteId(null)}>Cancel</ThemeButton>
                            <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 text-xs font-semibold uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 duration-300">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
