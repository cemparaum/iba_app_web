
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { INITIAL_MEMBERS, MINISTRIES } from '../constants';
import { Member } from '../types';

const MemberManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredMembers = INITIAL_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || member.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Membros</h2>
          <p className="text-slate-500 dark:text-slate-400">Gerencie perfis, funções e histórico de presença.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Novo Membro
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400" size={18} />
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="ALL">Todos os Status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="AT_RISK">Em Risco</option>
            <option value="INACTIVE">Inativo</option>
          </select>
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img src={member.photoUrl} alt={member.name} className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-slate-700" />
                  <div>
                    <h4 className="font-bold text-lg">{member.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{member.email}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {member.roles.map((role, idx) => {
                  const ministry = MINISTRIES.find(m => m.id === role.ministryId);
                  return (
                    <span key={idx} className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${ministry?.color.replace('bg-', 'bg-opacity-10 text-')} ${ministry?.color}`}>
                      {ministry?.name}: {role.title}
                    </span>
                  );
                })}
              </div>

              {member.status === 'AT_RISK' && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex items-center gap-3">
                  <AlertCircle size={20} className="text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    Atenção: {member.absencesCount} faltas consecutivas. Necessário contato pastoral.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone size={14} />
                  <span className="text-xs">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} />
                  <span className="text-xs">Último culto: {member.lastPresence}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManagement;
