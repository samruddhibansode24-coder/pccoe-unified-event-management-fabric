// User and Role definitions
export enum UserRole {
  STUDENT = 'Student',
  ORGANIZER = 'Organizer',
  ADMIN = 'Admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  year?: number; // Academic year (for students)
}

// Event definitions
export enum EventStatus {
  CREATED = 'Created',
  LIVE = 'Live',
  COMPLETED = 'Completed'
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  venue: string;
  organizerId: string;
  status: EventStatus;
  priority: number; // 1-3, lower is higher priority
  capacity: number;
}

// Participation definitions
export enum ParticipationStatus {
  REGISTERED = 'Registered',
  ATTENDED = 'Attended',
  CERTIFIED = 'Certified'
}

export interface ParticipationRecord {
  id: string;
  studentId: string;
  eventId: string;
  status: ParticipationStatus;
  checkInTime?: string; // ISO 8601 format
  certificateHash?: string; // SHA256 hash for verified participation
}
