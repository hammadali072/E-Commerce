import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { UserIcon, CameraIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import ThemeButton from '../themeButton/themeButton';

const Field = ({ label, value, onChange, placeholder, type = 'text', readOnly }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold text-dark/30 uppercase tracking-widest">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className={clsx(
                'bg-off-white border-b px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300',
                readOnly ? 'border-gray-100 text-dark/30 cursor-not-allowed' : 'border-gray-100 focus:border-amber'
            )}
        />
    </div>
);

// ── Extracted outside parent to keep a stable component reference ──────────
const PwdField = ({ label, value, onChange, visible, onToggleVisibility, error }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold text-dark/30 uppercase tracking-widest">{label}</label>
        <div className="relative">
            <input
                type={visible ? 'text' : 'password'}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-off-white border-b px-3 py-2.5 pr-10 text-sm font-medium text-dark outline-none duration-300 border-gray-100 focus:border-amber"
            />
            <button
                type="button"
                onClick={onToggleVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark duration-300"
            >
                {visible ? <EyeSlashIcon size={16} weight="bold" /> : <EyeIcon size={16} weight="bold" />}
            </button>
        </div>
        {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
    </div>
);
// ───────────────────────────────────────────────────────────────────────────

export default function ProfileInfo() {
    const [info, setInfo] = useState({ firstName: 'Hammad', lastName: 'Ali', email: 'hammad@example.com', phone: '+92 300 1234567', dob: '1998-04-15', gender: 'male' });
    const [saved, setSaved] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const fileRef = useRef();

    // Password change state
    const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
    const [show, setShow] = useState({ current: false, next: false, confirm: false });
    const [pwdErrors, setPwdErrors] = useState({});
    const [pwdSaved, setPwdSaved] = useState(false);

    const f = k => v => setInfo(p => ({ ...p, [k]: v }));
    const pf = useCallback(k => v => setPwd(p => ({ ...p, [k]: v })), []);
    const toggleShow = useCallback(k => setShow(p => ({ ...p, [k]: !p[k] })), []);

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        if (file) setAvatar(URL.createObjectURL(file));
    };

    const handleSaveInfo = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const validatePwd = () => {
        const e = {};
        if (!pwd.current) e.current = 'Required';
        if (pwd.next.length < 8) e.next = 'Min 8 characters';
        if (pwd.next !== pwd.confirm) e.confirm = 'Passwords do not match';
        setPwdErrors(e);
        return !Object.keys(e).length;
    };

    const handleSavePwd = () => {
        if (!validatePwd()) return;
        setPwdErrors({});
        setPwd({ current: '', next: '', confirm: '' });
        setPwdSaved(true);
        setTimeout(() => setPwdSaved(false), 2500);
    };

    return (
        <div className="animate-fadeIn flex flex-col gap-8">
            {/* Header */}
            <div className="pb-5 border-b border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-dark uppercase tracking-tight">My Profile</h3>
                <p className="text-xs text-dark/40 font-medium mt-0.5">Manage your personal information</p>
            </div>

            {/* Avatar + Name Banner */}
            <div className="bg-off-white p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative flex-shrink-0">
                    <div className="size-20 sm:size-24 bg-white border-2 border-gray-100 flex items-center justify-center overflow-hidden shadow-md">
                        {avatar
                            ? <img src={avatar} alt="avatar" className="size-full object-cover" />
                            : <UserIcon size={36} weight="duotone" className="text-dark/20" />
                        }
                    </div>
                    <button
                        onClick={() => fileRef.current.click()}
                        className="absolute -bottom-1 -right-1 size-7 bg-amber flex items-center justify-center hover:bg-amber/80 duration-300 shadow"
                    >
                        <CameraIcon size={14} weight="bold" className="text-white" />
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                </div>
                <div className="text-center sm:text-left">
                    <h4 className="text-lg font-black text-dark">{info.firstName} {info.lastName}</h4>
                    <p className="text-xs text-dark/40 font-medium mt-0.5">{info.email}</p>
                    <button onClick={() => fileRef.current.click()} className="mt-2 text-[10px] font-semibold text-amber uppercase tracking-widest hover:text-amber/70 duration-300">
                        Change Photo
                    </button>
                </div>
            </div>

            {/* Personal Info Form */}
            <div className="bg-off-white p-5 sm:p-6">
                <h4 className="text-sm font-black text-dark/40 uppercase tracking-widest mb-5">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="First Name" value={info.firstName} onChange={f('firstName')} placeholder="John" />
                    <Field label="Last Name" value={info.lastName} onChange={f('lastName')} placeholder="Doe" />
                    <Field label="Email Address" value={info.email} onChange={f('email')} type="email" placeholder="john@example.com" />
                    <Field label="Phone Number" value={info.phone} onChange={f('phone')} type="tel" placeholder="+1 555 000 0000" />
                    <Field label="Date of Birth" value={info.dob} onChange={f('dob')} type="date" />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-dark/30 uppercase tracking-widest">Gender</label>
                        <select value={info.gender} onChange={e => f('gender')(e.target.value)}
                            className="bg-off-white border-b-2 border-gray-100 focus:border-amber px-3 py-2.5 text-sm font-medium text-dark outline-none duration-300 appearance-none cursor-pointer">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                    <ThemeButton variant="dark" className="px-8 py-3 text-xs tracking-widest font-semibold" onClick={handleSaveInfo}>
                        Save Changes
                    </ThemeButton>
                    {saved && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 animate-fadeIn">
                            <CheckIcon size={14} weight="bold" />Saved!
                        </span>
                    )}
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-off-white p-5 sm:p-6">
                <h4 className="text-sm font-black text-dark/40 uppercase tracking-widest mb-5">Change Password</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                        <PwdField
                            label="Current Password"
                            value={pwd.current}
                            onChange={pf('current')}
                            visible={show.current}
                            onToggleVisibility={() => toggleShow('current')}
                            error={pwdErrors.current}
                        />
                    </div>
                    <PwdField
                        label="New Password"
                        value={pwd.next}
                        onChange={pf('next')}
                        visible={show.next}
                        onToggleVisibility={() => toggleShow('next')}
                        error={pwdErrors.next}
                    />
                    <PwdField
                        label="Confirm New Password"
                        value={pwd.confirm}
                        onChange={pf('confirm')}
                        visible={show.confirm}
                        onToggleVisibility={() => toggleShow('confirm')}
                        error={pwdErrors.confirm}
                    />
                </div>
                {pwd.next && (
                    <div className="mt-3 flex gap-1.5">
                        {['8+ chars', 'Uppercase', 'Number'].map((req, i) => {
                            const passed = i === 0 ? pwd.next.length >= 8 : i === 1 ? /[A-Z]/.test(pwd.next) : /\d/.test(pwd.next);
                            return (
                                <span key={req} className={clsx('text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider', passed ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-dark/30')}>
                                    {req}
                                </span>
                            );
                        })}
                    </div>
                )}
                <div className="mt-5 flex items-center gap-3">
                    <ThemeButton variant="dark" className="px-8 py-3 text-xs tracking-widest font-semibold" onClick={handleSavePwd}>
                        Update Password
                    </ThemeButton>
                    {pwdSaved && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 animate-fadeIn">
                            <CheckIcon size={14} weight="bold" />Password Updated!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}