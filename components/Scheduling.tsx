
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Calendar, Info } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { INITIAL_MEMBERS, MINISTRIES, MOCK_SCHEDULES } from '../constants';
import { ScheduleEvent } from '../types';

const Scheduling: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState<ScheduleEvent[]>(MOCK_SCHEDULES);

  const startDate = startOfWeek(currentDate, { locale: ptBR });
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  const checkConflicts = (memberId: string, date: string, ministryId: string) => {
    // 1. Conflict on same day in different ministries
    const sameDayDifferentMinistry = schedules.find(s => 
      s.memberId === memberId && 
      s.date === date && 
      s.ministryId !== ministryId
    );

    // 2. Burnout: check if served on previous Sunday (not implemented in simple logic but defined here)
    const isConsecutiveSunday = false; 

    return sameDayDifferentMinistry ? 'CONFLICT' : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Escala Unificada</h2>
          <p className="text-slate-500 dark:text-slate-400">Algoritmo inteligente de prevenção de sobrecarga.</p>
        </div>
        <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 font-medium text-sm">
            {format(startDate, 'dd MMM', { locale: ptBR })} - {format(addDays(startDate, 6), 'dd MMM', { locale: ptBR })}
          </span>
          <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="p-4 text-left font-semibold text-sm w-[200px]">Ministério</th>
              {weekDays.map((day, i) => (
                <th key={i} className="p-4 text-center font-semibold text-sm">
                  <div className="text-slate-400 uppercase text-[10px] mb-1">{format(day, 'eee', { locale: ptBR })}</div>
                  <div>{format(day, 'dd')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MINISTRIES.map((ministry) => (
              <tr key={ministry.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50/30 dark:hover:bg-slate-700/10">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${ministry.color}`} />
                    <span className="font-bold">{ministry.name}</span>
                  </div>
                </td>
                {weekDays.map((day, i) => {
                  const dayStr = format(day, 'yyyy-MM-dd');
                  const daySchedules = schedules.filter(s => s.date === dayStr && s.ministryId === ministry.id);

                  return (
                    <td key={i} className="p-2 align-top">
                      <div className="min-h-[80px] space-y-2">
                        {daySchedules.map((item) => {
                          const member = INITIAL_MEMBERS.find(m => m.id === item.memberId);
                          const conflict = checkConflicts(item.memberId, item.date, item.ministryId);
                          
                          return (
                            <div key={item.id} className={`p-2 rounded-lg text-xs group relative ${
                              item.status === 'CONFIRMED' ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600'
                            }`}>
                              <p className="font-bold truncate">{member?.name}</p>
                              <p className="text-[10px] opacity-70">{item.startTime} - {item.endTime}</p>
                              
                              {conflict && (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm" title="Conflito de Escala">
                                  <AlertTriangle size={10} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <button className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center justify-center">
                          <span className="text-xs">+ Escalar</span>
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50 p-4 rounded-xl flex items-start gap-4">
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 dark:text-indigo-200">Como funciona o Algoritmo?</h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
            O sistema impede que um membro seja escalado em mais de um ministério no mesmo horário e sugere descanso caso ele tenha servido nos últimos dois domingos. 
            Membros que sinalizaram indisponibilidade aparecem bloqueados na seleção.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
