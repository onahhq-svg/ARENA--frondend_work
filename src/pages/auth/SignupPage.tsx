import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X, Check, ArrowLeft } from 'lucide-react';

interface SignupPageProps {
  onSuccess: () => void;
  onLogin: () => void;
  onBack: () => void;
}

function Field({ label, type = 'text', placeholder, value, onChange, error, suffix }: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  error?: string; suffix?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#71767b] uppercase tracking-wider">{label}</label>
      <div className={`flex items-center bg-[#111] border rounded-xl px-4 py-3.5 transition-all ${
        error ? 'border-[#ef4444]' : 'border-white/10 focus-within:border-[#ef4444]/60'
      }`}>
        <input type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder:text-[#444] text-sm outline-none" />
        {suffix}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-[#ef4444] flex items-center gap-1">
            <X className="w-3 h-3" />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SignupPage({ onSuccess, onLogin, onBack }: SignupPageProps) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [agree,    setAgree]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())         e.name     = 'Full name is required';
    if (!email.includes('@')) e.email    = 'Enter a valid email or phone';
    if (password.length < 8)  e.password = 'Password must be at least 8 characters';
    if (!agree)               e.agree    = 'You must agree to continue';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess();
  };

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const pwColors   = ['', 'bg-[#ef4444]', 'bg-yellow-400', 'bg-green-400'];
  const pwLabels   = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 py-8 overflow-y-auto">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-[#71767b] hover:text-white transition-colors mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-black mb-1">Create Account</h1>
        <p className="text-[#71767b] text-sm">Join ARENA and start your game</p>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col gap-5 flex-1">

        <Field label="Full Name" placeholder="Your full name"
          value={name} onChange={setName} error={errors.name} />

        <Field label="Email / Phone" placeholder="email@example.com or +447..."
          value={email} onChange={setEmail} error={errors.email} />

        <div className="flex flex-col gap-1.5">
          <Field label="Password" type={showPw ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={password} onChange={setPassword} error={errors.password}
            suffix={
              <button type="button" onClick={() => setShowPw(s => !s)} className="text-[#71767b] hover:text-white ml-2">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            } />
          {/* Password strength */}
          {password.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= pwStrength ? pwColors[pwStrength] : 'bg-white/10'}`} />
                ))}
              </div>
              <span className={`text-xs font-medium ${pwColors[pwStrength].replace('bg-', 'text-')}`}>
                {pwLabels[pwStrength]}
              </span>
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <button onClick={() => setAgree(a => !a)} className="flex items-start gap-3 text-left">
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              agree ? 'bg-[#ef4444] border-[#ef4444]' : 'border-white/30'
            }`}>
              {agree && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-[#71767b]">
              I agree to ARENA's{' '}
              <span className="text-white underline">Terms of Service</span> and{' '}
              <span className="text-white underline">Privacy Policy</span>
            </span>
          </button>
          {errors.agree && (
            <p className="text-xs text-[#ef4444] flex items-center gap-1 ml-8">
              <X className="w-3 h-3" />{errors.agree}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-white text-base bg-gradient-to-r from-[#dc2626] to-[#ef4444] shadow-lg shadow-red-500/25 disabled:opacity-60 transition-all mt-2">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
              Creating account...
            </span>
          ) : 'Create Account'}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-[#71767b]">or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-semibold">
            <span className="text-lg">🔵</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-semibold">
            <span className="text-lg">🍎</span> Apple
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-[#71767b] mt-2">
          Already have an account?{' '}
          <button onClick={onLogin} className="text-white font-bold hover:text-[#ef4444] transition-colors">
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}