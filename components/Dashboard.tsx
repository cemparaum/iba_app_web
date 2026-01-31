
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { Users, CalendarCheck, AlertTriangle, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', membros: 400, presença: 240 },
  { name: 'Fev', membros: 420, presença: 260 },
  { name: 'Mar', membros: 450, presença: 280 },
  { name: 'Abr', membros: 480, presença: 320 },
  { name: 'Mai', membros: 512, presença: 380 },
];

const ministryStats = [
  { name: 'Louvor', value: 85, color: '#3b82f6' },
  { name: 'Kids', value: 92, color: '#ec4899' },
  { name: 'Mídia', value: 78, color: '#a855f7' },
  { name: 'Acolhimento', value: 95, color: '#10b981' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saúde da Igreja</h2>
          <p className="text-slate-500 dark:text-slate-400">Visão geral do crescimento e engajamento.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-700 rounded-md">Últimos 30 dias</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-md">90 dias</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Membros', value: '512', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%' },
          { label: 'Freq. Média', value: '78%', icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '+3%' },
          { label: 'Em Risco', value: '14', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: '+2' },
          { label: 'Novos Visitantes', value: '28', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: '+15%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Crescimento de Membros</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMembros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="membros" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMembros)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Taxa de Presença por Ministério</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ministryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} width={100} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {ministryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
