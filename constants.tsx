
import { Member, Ministry, ScheduleEvent, Role } from './types';

export const MINISTRIES: Ministry[] = [
  { id: '1', name: 'Louvor', leaderId: 'leader-1', color: 'bg-blue-500' },
  { id: '2', name: 'Kids', leaderId: 'leader-2', color: 'bg-pink-500' },
  { id: '3', name: 'Acolhimento', leaderId: 'leader-3', color: 'bg-emerald-500' },
  { id: '4', name: 'Mídia', leaderId: 'leader-4', color: 'bg-purple-500' },
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '5511999999999',
    photoUrl: 'https://picsum.photos/seed/carlos/200',
    roles: [
      { ministryId: '1', title: 'Violonista' },
      { ministryId: '2', title: 'Professor' }
    ],
    status: 'ACTIVE',
    absencesCount: 0,
    lastPresence: '2024-05-12',
    unavailability: []
  },
  {
    id: 'm2',
    name: 'Ana Silva',
    email: 'ana@email.com',
    phone: '5511988888888',
    photoUrl: 'https://picsum.photos/seed/ana/200',
    roles: [
      { ministryId: '1', title: 'Backvocal' }
    ],
    status: 'AT_RISK',
    absencesCount: 8,
    lastPresence: '2024-03-10',
    unavailability: []
  },
  {
    id: 'm3',
    name: 'Roberto Santos',
    email: 'roberto@email.com',
    phone: '5511977777777',
    photoUrl: 'https://picsum.photos/seed/roberto/200',
    roles: [
      { ministryId: '4', title: 'Operador de Som' }
    ],
    status: 'ACTIVE',
    absencesCount: 2,
    lastPresence: '2024-05-12',
    unavailability: ['2024-05-26']
  }
];

export const MOCK_SCHEDULES: ScheduleEvent[] = [
  {
    id: 's1',
    memberId: 'm1',
    ministryId: '1',
    date: '2024-05-19',
    startTime: '09:00',
    endTime: '12:00',
    status: 'CONFIRMED'
  },
  {
    id: 's2',
    memberId: 'm3',
    ministryId: '4',
    date: '2024-05-19',
    startTime: '09:00',
    endTime: '12:00',
    status: 'PENDING'
  }
];
