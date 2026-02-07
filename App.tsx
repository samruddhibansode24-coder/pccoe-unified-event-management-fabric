
import React, { useState, useMemo } from 'react';
import { User, UserRole, Event, EventStatus, ParticipationRecord, ParticipationStatus } from './types.tsx';
import { MOCK_USERS, MOCK_EVENTS, MOCK_RECORDS } from './constants.tsx';
import { 
  Layout, 
  Calendar, 
  Users, 
  Shield, 
  Award, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle,
  QrCode,
  LineChart,
  BrainCircuit,
  LogOut,
  Fingerprint,
  Mail,
  UserCircle
} from 'lucide-react';
import { ParticipationIntelligence } from './services/geminiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';

// --- Sub-components (Defined outside App to prevent focus loss) ---

const DashboardCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: EventStatus | ParticipationStatus }) => {
  const styles: Record<string, string> = {
    [EventStatus.LIVE]: 'bg-green-100 text-green-700 border-green-200',
    [EventStatus.CREATED]: 'bg-blue-100 text-blue-700 border-blue-200',
    [EventStatus.COMPLETED]: 'bg-slate-100 text-slate-700 border-slate-200',
    [ParticipationStatus.CERTIFIED]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [ParticipationStatus.REGISTERED]: 'bg-blue-50 text-blue-600 border-blue-100',
    [ParticipationStatus.ATTENDED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-50'}`}>
      {status}
    </span>
  );
};

const LoginView = ({ onLogin, onCustomLogin, emailInput, setEmailInput, nameInput, setNameInput, roleInput, setRoleInput }: any) => (
  <div className="min-h-screen flex items-center justify-center fabric-bg p-6 overflow-y-auto">
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 my-8 college-shadow">
      <div className="text-center mb-8">
        <div className="bg-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <Layout className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold gradient-text-animated">UCEF System</h1>
        <p className="text-slate-500 mt-2">Unified Campus Events Fabric</p>
      </div>

      <form onSubmit={onCustomLogin} className="space-y-4 mb-8">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Official Portal Login</p>
        <div className="space-y-3">
          <div className="relative">
            <UserCircle className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 transition-all text-sm"
              autoComplete="name"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder="College Email (@pccoe.edu)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 transition-all text-sm"
              autoComplete="email"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.values(UserRole)).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleInput(role)}
                className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${roleInput === role ? 'bg-blue-700 text-white border-blue-700 shadow-sm shadow-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:border-yellow-400'}`}
              >
                {role}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            Access Participation Fabric
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or Select Account</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {MOCK_USERS.map(user => (
            <button
              key={user.id}
              onClick={() => onLogin(user)}
              className="w-full flex items-center justify-between p-3 bg-white hover:bg-yellow-50 border border-slate-200 hover:border-yellow-400 rounded-2xl transition-all group"
            >
              <div className="text-left">
                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                <p className="text-[10px] text-slate-500">{user.role} • {user.department}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-yellow-600 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400 font-medium">© UCEF PCCOE • Participation Intelligence Layer</p>
      </div>
    </div>
  </div>
);

const DashboardView = ({ currentUser, records, events, generateAIStory, loadingAi, aiInsight }: any) => {
  const studentRecords = records.filter((r: any) => r.studentId === currentUser?.id);
  const stats = {
    registered: studentRecords.length,
    attended: studentRecords.filter((r: any) => r.status === ParticipationStatus.ATTENDED || r.status === ParticipationStatus.CERTIFIED).length,
    certificates: studentRecords.filter((r: any) => r.status === ParticipationStatus.CERTIFIED).length
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            Welcome back, {currentUser?.name} <span className="text-yellow-500 animate-pulse">✨</span>
          </h2>
          <p className="text-slate-500">Your campus participation story is being recorded.</p>
        </div>
        <button 
          onClick={generateAIStory}
          disabled={loadingAi}
          className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
        >
          <BrainCircuit className="w-5 h-5" />
          {loadingAi ? 'Synthesizing...' : 'Synthesize Journey (AI)'}
        </button>
      </header>

      {aiInsight && (
        <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BrainCircuit className="w-24 h-24 text-blue-900" />
          </div>
          <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-yellow-600" />
            Intelligence Summary
          </h4>
          <p className="text-blue-900 italic leading-relaxed relative z-10 text-sm">"{aiInsight}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Registrations" value={stats.registered} icon={Calendar} color="bg-blue-600" />
        <DashboardCard title="Events Attended" value={stats.attended} icon={CheckCircle2} color="bg-yellow-500" />
        <DashboardCard title="Verified Certificates" value={stats.certificates} icon={Award} color="bg-blue-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-700" />
            Activity Metrics
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Registrations', val: stats.registered },
                { name: 'Attendances', val: stats.attended },
                { name: 'Certificates', val: stats.certificates }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: '#fefce8' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="val" radius={[6, 6, 0, 0]} barSize={40}>
                  <Cell fill="#1d4ed8" />
                  <Cell fill="#facc15" />
                  <Cell fill="#1e3a8a" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-700" />
            Timeline History
          </h3>
          <div className="space-y-6">
            {studentRecords.length > 0 ? studentRecords.slice(0, 5).map((r: any) => {
              const ev = events.find((e: any) => e.id === r.eventId);
              return (
                <div key={r.id} className="flex gap-4 items-start group">
                  <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 ${
                    r.status === ParticipationStatus.CERTIFIED ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'bg-blue-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-slate-700 text-sm">{ev?.title}</p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(ev?.date || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">No recent activities. Discover events to start!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsView = ({ events, records, currentUser, handleCheckIn, handleRegister }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">Engagement Catalog</h2>
      <div className="flex bg-slate-100 p-1 rounded-lg">
        <button className="px-4 py-1.5 text-xs font-bold bg-white rounded-md shadow-sm text-blue-700 border border-blue-100">Upcoming</button>
        <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Past</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event: any) => {
        const isRegistered = records.some((r: any) => r.studentId === currentUser?.id && r.eventId === event.id);
        const userRecord = records.find((r: any) => r.studentId === currentUser?.id && r.eventId === event.id);
        
        return (
          <div key={event.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:border-yellow-400 transition-colors college-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <StatusBadge status={event.status} />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  event.priority === 1 ? 'bg-blue-50 text-blue-700' : 
                  event.priority === 2 ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-50 text-slate-600'
                }`}>
                  {event.priority === 1 ? 'Academic' : event.priority === 2 ? 'Club' : 'Student'}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{event.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">{event.description}</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {new Date(event.date).toLocaleDateString()} • {event.venue}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  {event.capacity} Attendees Limit
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
              {isRegistered ? (
                event.status === EventStatus.LIVE && userRecord?.status === ParticipationStatus.REGISTERED ? (
                  <button 
                    onClick={() => handleCheckIn(event.id)}
                    className="w-full py-2.5 bg-yellow-500 text-blue-900 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-sm"
                  >
                    <QrCode className="w-4 h-4" />
                    Verify Attendance
                  </button>
                ) : (
                  <div className="w-full py-2.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold text-center">
                    {userRecord?.status === ParticipationStatus.REGISTERED ? 'Successfully Registered' : 'Attendance Verified'}
                  </div>
                )
              ) : (
                <button 
                  onClick={() => handleRegister(event.id)}
                  className="w-full py-2.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Confirm Registration
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'profile' | 'admin'>('dashboard');
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [records, setRecords] = useState<ParticipationRecord[]>(MOCK_RECORDS);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Form states for login (Managed in App to maintain across views if needed, but LoginView is refactored)
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState<UserRole>(UserRole.STUDENT);

  const intelligence = useMemo(() => new ParticipationIntelligence(), []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.ADMIN) setActiveTab('admin');
    else setActiveTab('dashboard');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !nameInput) {
      alert("Official identification requires both name and email.");
      return;
    }
    const newUser: User = {
      id: `u-custom-${Date.now()}`,
      name: nameInput,
      email: emailInput,
      role: roleInput,
      department: 'General Engineering',
      year: roleInput === UserRole.STUDENT ? 1 : undefined
    };
    handleLogin(newUser);
  };

  const handleRegister = (eventId: string) => {
    if (!currentUser) return;
    const existing = records.find(r => r.studentId === currentUser.id && r.eventId === eventId);
    if (existing) return;

    const newRecord: ParticipationRecord = {
      id: `r-${Math.random().toString(36).substr(2, 9)}`,
      studentId: currentUser.id,
      eventId: eventId,
      status: ParticipationStatus.REGISTERED
    };
    setRecords([...records, newRecord]);
  };

  const handleCheckIn = (eventId: string) => {
    if (!currentUser) return;
    setRecords(prev => prev.map(r => 
      r.studentId === currentUser.id && r.eventId === eventId 
        ? { ...r, status: ParticipationStatus.ATTENDED, checkInTime: new Date().toISOString() } 
        : r
    ));
    alert("Real-time check-in complete. Status updated to 'Attended'.");
  };

  const generateAIStory = async () => {
    if (!currentUser) return;
    setLoadingAi(true);
    const insight = await intelligence.analyzeStudentJourney(currentUser, events, records);
    setAiInsight(insight || '');
    setLoadingAi(false);
  };

  if (!currentUser) {
    return (
      <LoginView 
        onLogin={handleLogin}
        onCustomLogin={handleCustomLogin}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        nameInput={nameInput}
        setNameInput={setNameInput}
        roleInput={roleInput}
        setRoleInput={setRoleInput}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row fabric-bg">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col z-20 sticky top-0 h-auto md:h-screen college-shadow">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-blue-700 rounded-lg shadow-md shadow-blue-100">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-blue-900 gradient-text-animated">UCEF</h1>
        </div>

        <div className="space-y-1 flex-1">
          {currentUser.role !== UserRole.ADMIN && (
            <>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-700 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-yellow-50'}`}
              >
                <Layout className="w-5 h-5" />
                Hub
              </button>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-blue-700 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-yellow-50'}`}
              >
                <Calendar className="w-5 h-5" />
                Engagements
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-blue-700 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-yellow-50'}`}
              >
                <Award className="w-5 h-5" />
                Credentials
              </button>
            </>
          )}

          {currentUser.role === UserRole.ADMIN && (
            <button 
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin' ? 'bg-blue-900 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-yellow-50'}`}
            >
              <Shield className="w-5 h-5" />
              Oversight
            </button>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button 
            onClick={() => {
              setCurrentUser(null);
              setEmailInput('');
              setNameInput('');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Terminate
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardView 
            currentUser={currentUser} 
            records={records} 
            events={events} 
            generateAIStory={generateAIStory} 
            loadingAi={loadingAi} 
            aiInsight={aiInsight} 
        />}
        {activeTab === 'events' && <EventsView 
            events={events} 
            records={records} 
            currentUser={currentUser} 
            handleCheckIn={handleCheckIn} 
            handleRegister={handleRegister} 
        />}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl flex items-center justify-center shadow-xl text-white text-3xl font-bold">
                {currentUser?.name[0]}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">{currentUser?.name}</h2>
                <p className="text-slate-500 font-medium">{currentUser?.department} • Academic Portfolio</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100 uppercase">Identity Verified</span>
                  <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold rounded border border-yellow-100 uppercase">Fabric Member</span>
                </div>
              </div>
            </header>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden college-shadow">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Verified Participation Credentials
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.filter(r => r.status === ParticipationStatus.CERTIFIED).length > 0 ? 
                  records.filter(r => r.status === ParticipationStatus.CERTIFIED).map(cert => {
                    const ev = events.find(e => e.id === cert.eventId);
                    return (
                      <div key={cert.id} className="p-4 rounded-xl border border-blue-50 bg-blue-50/10 flex gap-4 group hover:border-blue-700 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <Award className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-800 leading-tight text-sm">{ev?.title}</h5>
                          <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-tighter opacity-60">ID: {cert.certificateHash?.substr(0, 16)}</p>
                          <button className="mt-3 text-[10px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1">
                            <QrCode className="w-3 h-3" /> View Verified Record
                          </button>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="col-span-full py-16 text-center">
                      <p className="text-slate-400 text-sm font-medium italic">No verified credentials recorded. Complete assigned engagements to earn status.</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'admin' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header>
              <h2 className="text-2xl font-bold text-slate-800">Governance Intelligence</h2>
              <p className="text-slate-500 font-medium">Monitoring the institutional engagement fabric.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Active Flux" value={events.length} icon={Calendar} color="bg-blue-900" />
              <DashboardCard title="Engagement Rate" value="74%" icon={Users} color="bg-blue-700" />
              <DashboardCard title="Verified Logs" value={records.length} icon={Shield} color="bg-yellow-500" />
              <DashboardCard title="Risk Indicators" value="0" icon={AlertTriangle} color="bg-slate-800" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden college-shadow">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-900">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  Audit Compliance Layer
                </h3>
              </div>
              <div className="p-12 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                  <CheckCircle2 className="w-8 h-8 text-blue-700" />
                </div>
                <h4 className="font-bold text-slate-800">All Systems Operational</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">No resource conflicts or integrity breaches detected across the 2024 academic cycle.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
