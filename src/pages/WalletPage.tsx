import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, Plus, Minus } from 'lucide-react';
import { Header } from '@/layout/Header';
import { cn } from '@/lib/utils';

const tabs = ['Overview', 'Transactions', 'Withdraw', 'Deposit'];

const transactions = [
  { id: '1', type: 'credit', label: 'Prediction Reward', amount: '+500 pts', date: 'Today 14:32', status: 'completed' },
  { id: '2', type: 'debit', label: 'Prediction Entry', amount: '-100 pts', date: 'Today 10:15', status: 'completed' },
  { id: '3', type: 'credit', label: 'Weekly Bonus', amount: '+250 pts', date: 'Yesterday', status: 'completed' },
  { id: '4', type: 'credit', label: 'Referral Reward', amount: '+1000 pts', date: 'Feb 27', status: 'completed' },
  { id: '5', type: 'debit', label: 'Prediction Entry', amount: '-200 pts', date: 'Feb 26', status: 'pending' },
];

export function WalletPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div>
      <Header title="Wallet"
        settingsOptions={[
          { label: 'Transaction Notifications', type: 'toggle', defaultValue: true },
          { label: 'Show Balance Publicly', type: 'toggle', defaultValue: false },
          { type: 'divider', label: '' },
          { label: 'Wallet Settings', type: 'link', href: '/settings' },
        ]}
      />

      <div className="flex border-b border-white/10">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("flex-1 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab ? "text-white" : "text-[#71767b] hover:text-white")}>
            {tab}
            {activeTab === tab && <motion.div layoutId="walletTab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#ef4444] rounded-full" />}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="p-4 space-y-4">
          {/* Balance Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#ef4444] to-[#b91c1c] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
            <p className="text-white/70 text-sm mb-1">Total Balance</p>
            <p className="text-4xl font-bold text-white">3,400 pts</p>
            <div className="flex gap-4 mt-4">
              <div><p className="text-white/70 text-xs">This Week</p><p className="text-white font-semibold">+750 pts</p></div>
              <div><p className="text-white/70 text-xs">This Month</p><p className="text-white font-semibold">+2,100 pts</p></div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {[{ icon: Plus, label: 'Deposit', color: 'text-green-400 bg-green-400/10' },
              { icon: Minus, label: 'Withdraw', color: 'text-blue-400 bg-blue-400/10' }].map(action => {
              const Icon = action.icon;
              return (
                <button key={action.label} onClick={() => setActiveTab(action.label)}
                  className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", action.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold">Recent Transactions</p>
              <button onClick={() => setActiveTab('Transactions')} className="text-sm text-[#ef4444]">See all</button>
            </div>
            <div className="space-y-2">
              {transactions.slice(0, 3).map(tx => (
                <div key={tx.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                    tx.type === 'credit' ? "bg-green-400/10" : "bg-red-400/10")}>
                    {tx.type === 'credit'
                      ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                      : <ArrowUpRight className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{tx.label}</p>
                    <p className="text-xs text-[#71767b]">{tx.date}</p>
                  </div>
                  <p className={cn("font-bold text-sm", tx.type === 'credit' ? "text-green-400" : "text-red-400")}>{tx.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Transactions' && (
        <div className="divide-y divide-white/5">
          {transactions.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                tx.type === 'credit' ? "bg-green-400/10" : "bg-red-400/10")}>
                {tx.type === 'credit'
                  ? <ArrowDownLeft className="w-5 h-5 text-green-400" />
                  : <ArrowUpRight className="w-5 h-5 text-red-400" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{tx.label}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-xs text-[#71767b]">{tx.date}</p>
                  {tx.status === 'pending' && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
              </div>
              <p className={cn("font-bold", tx.type === 'credit' ? "text-green-400" : "text-red-400")}>{tx.amount}</p>
            </motion.div>
          ))}
        </div>
      )}

      {(activeTab === 'Deposit' || activeTab === 'Withdraw') && (
        <div className="p-6 space-y-5">
          <div className="text-center py-8 text-[#71767b]">
            <Wallet className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-white">{activeTab} coming soon</p>
            <p className="text-sm mt-1">This feature will be available in the next update</p>
          </div>
        </div>
      )}
    </div>
  );
}