
import React, { useState } from 'react';
import { Calendar, UserCheck, AlertTriangle, Send } from 'lucide-react';
import { INITIAL_MEMBERS } from '../constants';

const Attendance: React.FC = () => {
  const [attended, setAttended] = useState<string[]>([]);
  
  const toggleAttendance = (id: string) => {
    setAttended(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const membersAtRisk = INITIAL_MEMBERS.filter(m => m.absencesCount >= 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Frequência</h2>
          <p className="text-slate-500 dark:text-slate-400">Checklist do culto de hoje: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          Finalizar Chamada <Send size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="font-bold">Membros Ativos</span>
              <span className="text-xs text-slate-500">{attended.length} presentes</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[500px] overflow-y-auto custom-scrollbar">
              {INITIAL_MEMBERS.map((member) => (
                <div 
                  key={member.id} 
                  className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => toggleAttendance(member.id)}
                >
                  <div className="flex items-center gap-3">
                    <img src={member.photoUrl} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-bold">{member.name}</p>
                      <p className="text-xs text-slate-500">Faltas seguidas: {member.absencesCount}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    attended.includes(member.id) 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-200 dark:border-slate-600'
                  }`}>
                    {attended.includes(member.id) && <UserCheck size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-amber-600">
            <AlertTriangle size={20} /> Alertas de Abandono (8+ Faltas)
          </h3>
          <div className="space-y-3">
            {membersAtRisk.map((member) => (
              <div key={member.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border-l-4 border-l-amber-500 border-y border-r border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img src={member.photoUrl} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-sm">{member.name}</p>
                    <p className="text-[10px] text-slate-500">Último culto em {member.lastPresence}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-md hover:bg-indigo-100 transition-colors">
                    WhatsApp
                  </button>
                  <button className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-md hover:bg-slate-200 transition-colors">
                    Tarefa Visita
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
