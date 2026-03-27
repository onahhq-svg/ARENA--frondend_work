import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<typeof currentUser>) => void;
}

export function EditProfileModal({ open, onClose, onSave }: EditProfileModalProps) {
  const [name,     setName]     = useState(currentUser.name);
  const [bio,      setBio]      = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [website,  setWebsite]  = useState(currentUser.website || '');

  const handleSave = () => {
    onSave({ name, bio, location, website });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[560px] bg-[#0d0d0d] border border-white/10 rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-bold text-lg">Edit Profile</h2>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                className="px-5 py-1.5 bg-white text-black font-black text-sm rounded-full hover:bg-white/90 transition-colors">
                Save
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Cover */}
              <div className="h-32 bg-gradient-to-br from-[#ef4444]/40 to-[#dc2626]/20 relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Avatar */}
              <div className="px-5 -mt-10 mb-4 flex">
                <div className="relative group cursor-pointer">
                  <Avatar className="w-20 h-20 border-4 border-[#0d0d0d]">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-[#ef4444]/20 text-[#ef4444] text-2xl">{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="px-5 space-y-5 pb-6">
                {[
                  { label: 'Name',     value: name,     set: setName,     max: 50,  multiline: false },
                  { label: 'Bio',      value: bio,      set: setBio,      max: 160, multiline: true  },
                  { label: 'Location', value: location, set: setLocation, max: 30,  multiline: false },
                  { label: 'Website',  value: website,  set: setWebsite,  max: 100, multiline: false },
                ].map(field => (
                  <div key={field.label} className="relative">
                    <div className={cn(
                      'border rounded-xl px-3 pt-5 pb-2 transition-all focus-within:border-[#ef4444]/60',
                      field.value ? 'border-white/20' : 'border-white/10'
                    )}>
                      <label className="absolute top-2 left-3 text-xs text-[#71767b]">{field.label}</label>
                      {field.multiline ? (
                        <textarea value={field.value} onChange={e => field.set(e.target.value)} maxLength={field.max} rows={3}
                          className="w-full bg-transparent text-white text-sm outline-none resize-none" />
                      ) : (
                        <input value={field.value} onChange={e => field.set(e.target.value)} maxLength={field.max}
                          className="w-full bg-transparent text-white text-sm outline-none" />
                      )}
                    </div>
                    <span className="absolute bottom-2 right-3 text-xs text-[#71767b]">
                      {field.value.length} / {field.max}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}