
export enum Role {
  PASTOR = 'PASTOR',
  ADMIN = 'ADMIN',
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

export interface Ministry {
  id: string;
  name: string;
  leaderId: string;
  color: string;
}

export interface MemberRole {
  ministryId: string;
  title: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  roles: MemberRole[];
  status: 'ACTIVE' | 'INACTIVE' | 'AT_RISK';
  absencesCount: number;
  lastPresence: string;
  unavailability: string[]; // ISO Dates
}

export interface ScheduleEvent {
  id: string;
  memberId: string;
  ministryId: string;
  date: string; // ISO Date
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'DECLINED';
  declineReason?: string;
}

export interface AttendanceRecord {
  date: string;
  memberIds: string[];
}

export interface Notification {
  id: string;
  to: string;
  message: string;
  timestamp: string;
  type: 'WHATSAPP' | 'SYSTEM';
}
