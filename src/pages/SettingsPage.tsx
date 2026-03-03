import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Lock, Bell, Palette, Shield, 
  Link, ChevronRight, ArrowLeft, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsSections = [
  {
    id: 'account',
    icon: User,
    label: 'Account Settings',
    description: 'Manage your username, email and account info',
  },
  {
    id: 'privacy',
    icon: Lock,
    label: 'Privacy Settings',
    description: 'Control who sees your content and activity',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notification Settings',
    description: 'Choose what alerts and updates you receive',
  },
  {
    id: 'display',
    icon: Palette,
    label: 'Display Settings',
    description: 'Customize your theme and appearance',
  },
  {
    id: 'security',
    icon: Shield,
    label: 'Security',
    description: 'Password, two-factor authentication and sessions',
  },
  {
    id: 'connected',
    icon: Link,
    label: 'Connected Accounts',
    description: 'Manage linked social and sports accounts',
  },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center gap-4">
        {activeSection && (
          <button onClick={() => setActiveSection(null)} className="hover:text-[#ef4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold">
          {activeSection 
            ? settingsSections.find(s => s.id === activeSection)?.label 
            : 'Settings'}
        </h1>
      </div>

      {!activeSection ? (
        // Main Settings List
        <div className="p-4 space-y-2">
          {settingsSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveSection(section.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-white/5 hover:border-red-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#ef4444]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{section.label}</p>
                  <p className="text-sm text-[#71767b]">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71767b] group-hover:text-[#ef4444] transition-colors" />
              </motion.button>
            );
          })}
        </div>
      ) : (
        // Section Detail View
        <div className="p-6 space-y-6">
          {activeSection === 'account' && (
            <div className="space-y-4">
              {['Username', 'Email', 'Phone Number', 'Date of Birth'].map(field => (
                <div key={field}>
                  <label className="text-sm text-[#71767b] mb-1 block">{field}</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder={`Enter your ${field.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-4">
              {[
                { label: 'Private Account', desc: 'Only approved followers see your posts' },
                { label: 'Show Activity Status', desc: 'Let others see when you were last active' },
                { label: 'Allow Tags', desc: 'Let others tag you in posts' },
                { label: 'Show Predictions', desc: 'Make your predictions visible to others' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-[#71767b]">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-[#ef4444] rounded-full cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              {[
                { label: 'Match Alerts', desc: 'Get notified when matches start' },
                { label: 'Prediction Results', desc: 'Know when your predictions are settled' },
                { label: 'Mentions', desc: 'When someone mentions you in a post' },
                { label: 'New Followers', desc: 'When someone follows you' },
                { label: 'Community Updates', desc: 'Activity in your communities' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-[#71767b]">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-[#ef4444] rounded-full cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'display' && (
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-3">Theme</p>
                <div className="flex gap-3">
                  {['Dark', 'Dim', 'Light'].map(theme => (
                    <button key={theme} className={cn(
                      "flex-1 py-3 rounded-xl border transition-all",
                      theme === 'Dark' 
                        ? "border-[#ef4444] bg-red-500/10 text-[#ef4444]" 
                        : "border-white/10 text-[#71767b] hover:border-white/30"
                    )}>
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-3">Font Size</p>
                <input type="range" min="1" max="5" defaultValue="3" className="w-full accent-[#ef4444]" />
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              {['Change Password', 'Two-Factor Authentication', 'Active Sessions', 'Login History'].map(item => (
                <button key={item} className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/30 transition-all">
                  <p className="font-medium">{item}</p>
                  <ChevronRight className="w-4 h-4 text-[#71767b]" />
                </button>
              ))}
            </div>
          )}

          {activeSection === 'connected' && (
            <div className="space-y-4">
              {['Google', 'Facebook', 'Twitter / X', 'Apple'].map(platform => (
                <div key={platform} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="font-medium">{platform}</p>
                  <button className="px-4 py-1.5 rounded-full border border-white/20 text-sm hover:border-red-500/50 transition-colors">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-full font-bold text-white flex items-center justify-center gap-2"
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
          </motion.button>
        </div>
      )}
    </div>
  );
}