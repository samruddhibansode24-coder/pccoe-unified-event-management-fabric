
import { User, Event, UserRole, EventStatus, ParticipationStatus, ParticipationRecord } from './types.tsx';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex@pccoe.edu', role: UserRole.STUDENT, department: 'Comp Sci', year: 3 },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@pccoe.edu', role: UserRole.ORGANIZER, department: 'Robotics Club' },
  { id: 'u3', name: 'Dr. James Wilson', email: 'wilson@pccoe.edu', role: UserRole.ADMIN, department: 'Dean Academics' },
  { id: 'u4', name: 'Mia Wong', email: 'mia@pccoe.edu', role: UserRole.STUDENT, department: 'Electronics', year: 2 },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Advanced AI Workshop',
    description: 'A hands-on deep dive into generative models and neural networks.',
    date: '2024-05-15T10:00:00Z',
    venue: 'Auditorium A',
    organizerId: 'u2',
    status: EventStatus.LIVE,
    priority: 1,
    capacity: 100
  },
  {
    id: 'e2',
    title: 'Hackathon 2024',
    description: '48 hours of building solutions for local campus challenges.',
    date: '2024-06-01T09:00:00Z',
    venue: 'Innovation Hub',
    organizerId: 'u2',
    status: EventStatus.CREATED,
    priority: 2,
    capacity: 250
  },
  {
    id: 'e3',
    title: 'Soft Skills Seminar',
    description: 'Improving communication and leadership for young engineers.',
    date: '2024-04-10T14:00:00Z',
    venue: 'Room 302',
    organizerId: 'u2',
    status: EventStatus.COMPLETED,
    priority: 3,
    capacity: 50
  }
];

export const MOCK_RECORDS: ParticipationRecord[] = [
  { id: 'r1', studentId: 'u1', eventId: 'e3', status: ParticipationStatus.CERTIFIED, checkInTime: '2024-04-10T14:05:00Z', certificateHash: 'sha256-abcdef123456' },
  { id: 'r2', studentId: 'u1', eventId: 'e1', status: ParticipationStatus.REGISTERED },
  { id: 'r3', studentId: 'u4', eventId: 'e3', status: ParticipationStatus.ATTENDED, checkInTime: '2024-04-10T14:15:00Z' },
];
