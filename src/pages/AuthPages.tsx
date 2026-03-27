import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Shared Components ────────────────────────────────────────────────────────
function AuthInput({ label, type = 'text', placeholder, value, onChange, error, suffix }: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  error?: string; suffix?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#71767b] uppercase tracking-wider">{label}</label>
      <div className={cn(
        'flex items-center bg-[#111] border rounded-xl px-4 py-3.5 transition-all',
        error ? 'border-[#ef4444]' : 'border-white/10 focus-within:border-[#ef4444]/60'
      )}>
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder:text-[#444] text-sm outline-none" />
        {suffix}
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#ef4444] flex items-center gap-1">
          <X className="w-3 h-3 shrink-0" />{error}
        </motion.p>
      )}
    </div>
  );
}

function PrimaryButton({ label, onClick, disabled, loading }: {
  label: string; onClick: () => void; disabled?: boolean; loading?: boolean;
}) {
  return (
    <motion.button whileTap={{ scale: disabled ? 1 : 0.97 }} onClick={onClick} disabled={disabled || loading}
      className={cn('w-full py-4 rounded-2xl font-black text-sm transition-all',
        disabled || loading
          ? 'bg-[#ef4444]/30 text-white/40 cursor-not-allowed'
          : 'bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40')}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
          Loading...
        </span>
      ) : label}
    </motion.button>
  );
}

function OutlineButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} onClick={onClick}
      className="w-full py-4 rounded-2xl font-bold text-sm border border-white/15 text-white hover:bg-white/5 transition-all">
      {label}
    </motion.button>
  );
}

function SocialButtons() {
  return (
    <div className="flex gap-3">
      {[{ icon: 'G', label: 'Google' }, { icon: '🍎', label: 'Apple' }].map(s => (
        <button key={s.label}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors text-sm text-white font-semibold">
          <span className="text-base">{s.icon}</span>{s.label}
        </button>
      ))}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-xs text-[#444]">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

function Shell({ children, onBack }: { children: ReactNode; onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col px-6 pt-14 pb-10 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-10">
        {onBack ? (
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/8 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        ) : null}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-black text-white tracking-tight">ARENA</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── OTP Boxes ────────────────────────────────────────────────────────────────
function OTPBoxes({ value, onChange, hasError }: { value: string; onChange: (v: string) => void; hasError: boolean }) {
  const len = 6;
  return (
    <div className="relative flex gap-2.5 justify-center">
      {Array.from({ length: len }).map((_, i) => (
        <div key={i} className={cn(
          'w-12 h-14 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all',
          hasError ? 'border-[#ef4444] bg-[#ef4444]/5' :
          i < value.length ? 'border-[#ef4444] bg-[#ef4444]/10 text-white' :
          i === value.length ? 'border-[#ef4444]/50 bg-[#111]' :
          'border-white/10 bg-[#111]'
        )}>
          {i < value.length ? (
            <span className="text-white">{value[i]}</span>
          ) : i === value.length ? (
            <motion.span className="w-0.5 h-5 bg-[#ef4444] rounded-full"
              animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
          ) : (
            <span className="text-white/10">·</span>
          )}
        </div>
      ))}
      <input type="tel" maxLength={len} value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, len))}
        className="absolute inset-0 opacity-0 cursor-text w-full"
        autoFocus />
    </div>
  );
}

// ─── 1. Splash ────────────────────────────────────────────────────────────────
function Splash({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-[#ef4444] flex flex-col items-center justify-between px-6 pt-20 pb-14 relative overflow-hidden">
      {/* bg blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4" />
      <div />
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="flex flex-col items-center gap-5 relative z-10">
        <div className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl">
          <Zap className="w-16 h-16 text-[#ef4444] fill-[#ef4444]" />
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight">ARENA</h1>
        <p className="text-white/70 font-medium">The Sports Social Platform</p>
      </motion.div>
      <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }} whileTap={{ scale: 0.97 }} onClick={onNext}
        className="w-full py-4 bg-white text-[#ef4444] font-black text-base rounded-2xl shadow-2xl relative z-10">
        Get Started
      </motion.button>
    </div>
  );
}

// ─── 2. Onboarding ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    emoji: '🎯',
    title: 'Play Smart,\nPlay Safe',
    body: 'Follow verified game providers and join a trusted, transparent platform. No more shady choices or hidden payments.',
  },
  {
    emoji: '🏆',
    title: 'Clarity Wins\nEvery Time',
    body: 'View complete game history, activity records, and community engagement all in one place. Make smarter decisions.',
  },
];

function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }} className="flex flex-col items-center gap-6">
            <div className="w-28 h-28 bg-[#ef4444]/15 border border-[#ef4444]/20 rounded-3xl flex items-center justify-center text-5xl">
              {slide.emoji}
            </div>
            <h2 className="text-3xl font-black text-white whitespace-pre-line leading-tight">{slide.title}</h2>
            <p className="text-[#71767b] text-sm leading-relaxed max-w-xs">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-1.5 mb-8">
        {SLIDES.map((_, i) => (
          <motion.div key={i} animate={{ width: i === step ? 24 : 6 }}
            className={cn('h-1.5 rounded-full transition-colors', i === step ? 'bg-[#ef4444]' : 'bg-white/20')} />
        ))}
      </div>

      <div className="px-6 pb-14 flex gap-3">
        {step > 0 && <OutlineButton label="Back" onClick={() => setStep(s => s - 1)} />}
        <PrimaryButton label={isLast ? 'Start Your Game' : 'Next'}
          onClick={() => isLast ? onFinish() : setStep(s => s + 1)} />
      </div>
    </div>
  );
}

// ─── 3. Role Select ───────────────────────────────────────────────────────────
function RoleSelect({ onSelect }: { onSelect: (role: string) => void }) {
  const [selected, setSelected] = useState('');
  const roles = [
    { id: 'user',    icon: '👤', title: 'Regular User',    desc: 'Enjoy everything on the platform as a normal sports fan.' },
    { id: 'tipster', icon: '🔮', title: 'Tipster Creator', desc: 'Share your predictions, grow an audience, track your record.' },
  ];
  return (
    <Shell>
      <h2 className="text-2xl font-black text-white mb-1.5">What will you be using Arena for?</h2>
      <p className="text-[#555] text-sm mb-7">Choose your account type to get started</p>
      <div className="flex flex-col gap-3 mb-7">
        {roles.map(r => (
          <button key={r.id} onClick={() => setSelected(r.id)}
            className={cn('flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all',
              selected === r.id ? 'border-[#ef4444] bg-[#ef4444]/8' : 'border-white/8 bg-[#111] hover:border-white/15')}>
            <span className="text-3xl shrink-0 mt-0.5">{r.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-white text-sm mb-0.5">{r.title}</p>
              <p className="text-[#555] text-xs leading-relaxed">{r.desc}</p>
            </div>
            <div className={cn('w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all',
              selected === r.id ? 'bg-[#ef4444] border-[#ef4444]' : 'border-white/20')}>
              {selected === r.id && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        ))}
      </div>
      <PrimaryButton label="Continue" onClick={() => selected && onSelect(selected)} disabled={!selected} />
    </Shell>
  );
}

// ─── 4. Sign Up ───────────────────────────────────────────────────────────────
function SignUp({ onSuccess, onLogin }: { onSuccess: () => void; onLogin: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [accountExists, setAccountExists] = useState(false);

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.includes('@')) e.email = 'Enter a valid email or phone number';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!agree) e.agree = 'You must agree to the Terms and Privacy';
    if (Object.keys(e).length) { setErrors(e); return; }
    // Simulate existing account
    if (email === 'existing@arena.com') { setAccountExists(true); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 900);
  };

  return (
    <Shell>
      <h2 className="text-2xl font-black text-white mb-1.5">Create an Account</h2>
      <p className="text-[#555] text-sm mb-7">Fill in the details to continue</p>
      <div className="flex flex-col gap-4">
        <AuthInput label="Full Name" placeholder="Enter your full name" value={name}
          onChange={v => { setName(v); setErrors(p => ({ ...p, name: '' })); }} error={errors.name} />
        <AuthInput label="Email / Phone Number" placeholder="Enter your email address" value={email}
          onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: '' })); setAccountExists(false); }} error={errors.email} />
        <AuthInput label="Create a Password" type={showPw ? 'text' : 'password'} placeholder="Pick a strong password"
          value={password} onChange={v => { setPassword(v); setErrors(p => ({ ...p, password: '' })); }} error={errors.password}
          suffix={<button type="button" onClick={() => setShowPw(p => !p)} className="text-[#555] hover:text-white transition-colors ml-2">
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>} />

        {/* Account exists error */}
        <AnimatePresence>
          {accountExists && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-xl px-3 py-2.5">
              <X className="w-4 h-4 text-[#ef4444] shrink-0" />
              <p className="text-xs text-[#ef4444]">Account already exists. <button onClick={onLogin} className="underline font-semibold">Log in instead</button></p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-3">
          <button type="button" onClick={() => setAgree(a => !a)}
            className={cn('w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all',
              agree ? 'bg-[#ef4444] border-[#ef4444]' : 'border-white/20 hover:border-white/40')}>
            {agree && <Check className="w-3 h-3 text-white" />}
          </button>
          <p className="text-xs text-[#555] leading-relaxed">
            I hereby agree to the <span className="text-[#ef4444]">Terms</span> and{' '}
            <span className="text-[#ef4444]">Privacy Policy</span> of Arena
          </p>
        </div>
        {errors.agree && <p className="text-xs text-[#ef4444] -mt-2">{errors.agree}</p>}

        <PrimaryButton label="Next" onClick={submit} loading={loading} />
        <Divider label="or sign up with" />
        <SocialButtons />
        <p className="text-center text-sm text-[#555]">
          Already have an account?{' '}
          <button onClick={onLogin} className="text-[#ef4444] font-semibold hover:underline">Log In</button>
        </p>
      </div>
    </Shell>
  );
}

// ─── 5. Email Verification ────────────────────────────────────────────────────
function EmailVerify({ onSuccess, onBack, context }: {
  onSuccess: () => void; onBack: () => void; context: 'signup' | 'reset';
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const verify = () => {
    if (code.length < 6) { setError('Please enter the full 6-digit code'); return; }
    if (code !== '123456') { setError('The code you entered is invalid. Please try again'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 700);
  };

  const resend = () => {
    setResent(true);
    setCode('');
    setError('');
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <Shell onBack={onBack}>
      <h2 className="text-2xl font-black text-white mb-1.5">Email Verification</h2>
      <p className="text-[#555] text-sm mb-8">
        {context === 'reset'
          ? 'Enter the code we sent to your email to continue resetting your password'
          : 'Enter the code we sent to your email to confirm your registration'}
      </p>
      <div className="mb-6">
        <OTPBoxes value={code} onChange={v => { setCode(v); setError(''); }} hasError={!!error} />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-[#ef4444] text-center flex items-center justify-center gap-1 mb-4">
            <X className="w-3 h-3" />{error}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-3">
        <PrimaryButton label="Verify Code" onClick={verify} loading={loading} />
        <p className="text-center text-xs text-[#555]">
          Didn't receive a code?{' '}
          {resent ? (
            <span className="text-green-400 font-semibold">Code sent ✓</span>
          ) : (
            <button onClick={resend} className="text-[#ef4444] font-semibold hover:underline">Resend Code</button>
          )}
        </p>
      </div>
    </Shell>
  );
}

// ─── 6. Congratulations ───────────────────────────────────────────────────────
function Congrats({ onContinue, message }: { onContinue: () => void; message: string }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, delay: 0.1 }}
        className="w-24 h-24 rounded-full border-[3px] border-green-400 flex items-center justify-center mb-6 bg-green-400/10">
        <Check className="w-12 h-12 text-green-400" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="text-2xl font-black text-white mb-2">Congratulations!</motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-[#555] text-sm mb-10 max-w-xs leading-relaxed">{message}</motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="w-full max-w-sm px-6">
        <PrimaryButton label="Enter Arena" onClick={onContinue} />
      </motion.div>
    </div>
  );
}

// ─── 7. Login ─────────────────────────────────────────────────────────────────
function Login({ onSuccess, onSignUp, onForgot }: {
  onSuccess: () => void; onSignUp: () => void; onForgot: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [noAccount, setNoAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = 'Enter your email or phone number';
    if (!password) e.password = 'Enter your password';
    if (Object.keys(e).length) { setErrors(e); return; }
    // Demo: any email that doesn't include "arena" shows error
    if (!email.includes('arena')) { setNoAccount(true); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 900);
  };

  return (
    <Shell>
      <h2 className="text-2xl font-black text-white mb-1.5">Login</h2>
      <p className="text-[#555] text-sm mb-7">Fill in the details to continue</p>
      <div className="flex flex-col gap-4">
        <AuthInput label="Email / Phone Number" placeholder="Enter your address" value={email}
          onChange={v => { setEmail(v); setErrors({}); setNoAccount(false); }} error={errors.email} />
        <div className="flex flex-col gap-1.5">
          <AuthInput label="Enter Password" type={showPw ? 'text' : 'password'} placeholder="Enter your password"
            value={password} onChange={v => { setPassword(v); setErrors({}); setNoAccount(false); }} error={errors.password}
            suffix={<button type="button" onClick={() => setShowPw(p => !p)} className="text-[#555] hover:text-white transition-colors ml-2">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>} />
          <button onClick={onForgot} className="text-xs text-[#ef4444] hover:underline self-end mt-0.5">Forgot Password?</button>
        </div>

        <AnimatePresence>
          {noAccount && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-xl px-3 py-3">
              <X className="w-4 h-4 text-[#ef4444] shrink-0" />
              <p className="text-sm text-[#ef4444] font-medium">Account does not exist</p>
            </motion.div>
          )}
        </AnimatePresence>

        <PrimaryButton label="Next" onClick={submit} loading={loading} />
        <Divider label="or Login with" />
        <SocialButtons />
        <p className="text-center text-sm text-[#555]">
          Don't have an account?{' '}
          <button onClick={onSignUp} className="text-[#ef4444] font-semibold hover:underline">Sign Up</button>
        </p>
      </div>
    </Shell>
  );
}

// ─── 8. Reset Password ────────────────────────────────────────────────────────
function ResetPassword({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const valid = email.includes('@') && email.includes('.');

  const submit = () => {
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 800);
  };

  return (
    <Shell onBack={onBack}>
      <h2 className="text-2xl font-black text-white mb-1.5">Reset Password</h2>
      <p className="text-[#555] text-sm mb-7">Enter your registration email to get a code to reset your password</p>
      <div className="flex flex-col gap-4">
        <AuthInput label="Email Address" placeholder="Enter your email address" value={email} onChange={setEmail} />
        <PrimaryButton label="Continue" onClick={submit} disabled={!valid} loading={loading} />
      </div>
    </Shell>
  );
}

// ─── 9. New Password ──────────────────────────────────────────────────────────
function NewPassword({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [show, setShow] = useState([false, false]);
  const [error, setError] = useState('');

  const submit = () => {
    if (pw1.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (pw1 !== pw2) { setError("Passwords don't match"); return; }
    onSuccess();
  };

  return (
    <Shell onBack={onBack}>
      <h2 className="text-2xl font-black text-white mb-1.5">Create New Password</h2>
      <p className="text-[#555] text-sm mb-7">Set a strong password to secure your account</p>
      <div className="flex flex-col gap-4">
        <AuthInput label="Enter New Password" type={show[0] ? 'text' : 'password'} placeholder="Enter a password"
          value={pw1} onChange={v => { setPw1(v); setError(''); }}
          suffix={<button type="button" onClick={() => setShow(s => [!s[0], s[1]])} className="text-[#555] hover:text-white ml-2">
            {show[0] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>} />
        <AuthInput label="Confirm New Password" type={show[1] ? 'text' : 'password'} placeholder="Confirm password"
          value={pw2} onChange={v => { setPw2(v); setError(''); }}
          suffix={<button type="button" onClick={() => setShow(s => [s[0], !s[1]])} className="text-[#555] hover:text-white ml-2">
            {show[1] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>} />
        {error && <p className="text-xs text-[#ef4444] flex items-center gap-1"><X className="w-3 h-3" />{error}</p>}
        <PrimaryButton label="Continue" onClick={submit} disabled={!pw1 || !pw2} />
      </div>
    </Shell>
  );
}

// ─── Auth Flow ────────────────────────────────────────────────────────────────
type Screen =
  | 'splash' | 'onboarding' | 'role'
  | 'signup' | 'verify-signup' | 'congrats-signup'
  | 'login'
  | 'reset' | 'verify-reset' | 'new-password' | 'congrats-reset';

export function AuthFlow({ onComplete }: { onComplete: () => void }) {
  const [screen, setScreen] = useState<Screen>('splash');

  const go = (s: Screen) => setScreen(s);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div key={screen}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}>

          {screen === 'splash'          && <Splash       onNext={() => go('onboarding')} />}
          {screen === 'onboarding'      && <Onboarding   onFinish={() => go('role')} />}
          {screen === 'role'            && <RoleSelect   onSelect={(role) => { localStorage.setItem('arena_role', role); go('signup'); }} />}

          {screen === 'signup'          && <SignUp       onSuccess={() => go('verify-signup')} onLogin={() => go('login')} />}
          {screen === 'verify-signup'   && <EmailVerify  onSuccess={() => go('congrats-signup')} onBack={() => go('signup')} context="signup" />}
          {screen === 'congrats-signup' && <Congrats     onContinue={onComplete} message="Your registration has been completed successfully." />}

          {screen === 'login'           && <Login        onSuccess={onComplete} onSignUp={() => go('role')} onForgot={() => go('reset')} />}

          {screen === 'reset'           && <ResetPassword onBack={() => go('login')} onSuccess={() => go('verify-reset')} />}
          {screen === 'verify-reset'    && <EmailVerify  onSuccess={() => go('new-password')} onBack={() => go('reset')} context="reset" />}
          {screen === 'new-password'    && <NewPassword  onBack={() => go('verify-reset')} onSuccess={() => go('congrats-reset')} />}
          {screen === 'congrats-reset'  && <Congrats     onContinue={() => go('login')} message="Password created successfully. You can now log in." />}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}