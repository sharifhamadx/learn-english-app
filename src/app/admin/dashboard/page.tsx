
"use client";

import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, query, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Trash2, 
  ArrowLeft, 
  Loader2, 
  Users, 
  Search, 
  ShieldCheck, 
  Award, 
  Mail, 
  BarChart3, 
  TrendingUp,
  BookOpenCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboard() {
  const [userSearch, setUserSearch] = useState('');
  
  const db = useFirestore();
  const { isUserLoading } = useUser();
  const { toast } = useToast();

  // استعلام المستخدمين
  const usersQuery = useMemoFirebase(() => query(collection(db, 'users'), orderBy('registrationDate', 'desc')), [db]);
  const { data: allUsers, isLoading: isLoadingUsers } = useCollection(usersQuery);

  // إحصائيات المنصة الشاملة
  const stats = useMemo(() => {
    const totalUsers = allUsers?.length || 0;
    const totalXP = allUsers?.reduce((acc, curr) => acc + (curr.xp || 0), 0) || 0;
    
    // توزيع المستويات (بناءً على الـ XP أو مجرد بيانات افتراضية للتحليل)
    const levelDistribution = [
      { name: 'مبتدئ', value: allUsers?.filter(u => (u.xp || 0) < 1000).length || 0 },
      { name: 'متوسط', value: allUsers?.filter(u => (u.xp || 0) >= 1000 && (u.xp || 0) < 5000).length || 0 },
      { name: 'متقدم', value: allUsers?.filter(u => (u.xp || 0) >= 5000).length || 0 },
    ];

    const today = new Date().toISOString().split('T')[0];
    const activeToday = allUsers?.filter(u => u.lastActiveDate === today).length || 0;

    return { totalUsers, totalXP, levelDistribution, activeToday };
  }, [allUsers]);

  const COLORS = ['#c4a24d', '#1a3c34', '#456b5a'];

  const handleNuclearDelete = async (targetId: string) => {
    if (!confirm('⚠️ تأكيد الحذف النهائي:\n\nسيتم مسح كافة البيانات المرتبطة بهذا الطالب فوراً.')) return;

    try {
      await deleteDoc(doc(db, 'users', targetId));
      toast({ title: "تم التطهير بنجاح", description: "تم مسح بيانات الطالب نهائياً." });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في عملية الحذف." });
    }
  };

  const filteredUsers = allUsers?.filter(u => 
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (isUserLoading) return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-24 px-4" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="rounded-3xl bg-white shadow-xl border-2 border-primary/5 h-14 w-14">
            <Link href="/"><ArrowLeft className="h-6 w-6 text-primary" /></Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-4xl font-black font-headline text-primary tracking-tighter">القيادة المركزية | المُقرن</h1>
            <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              المدير العام: شريف حماد | صدقة جارية لعائشة
            </p>
          </div>
        </div>
        <div className="bg-accent/10 px-6 py-3 rounded-2xl border border-accent/20">
          <p className="text-[10px] font-black text-accent uppercase tracking-widest text-center">نشط اليوم</p>
          <p className="text-2xl font-black text-primary text-center">{stats.activeToday} طلاب</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-none shadow-2xl bg-primary text-white rounded-[2.5rem] overflow-hidden group">
          <CardContent className="p-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex items-center justify-between">
              <div className="p-4 bg-white/10 rounded-3xl"><Users className="h-10 w-10 text-accent" /></div>
              <TrendingUp className="h-8 w-8 text-white/20 group-hover:text-accent transition-colors" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">إجمالي الطلاب المسجلين</p>
              <h3 className="text-7xl font-black tracking-tighter">{stats.totalUsers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden border border-slate-100">
          <CardHeader className="pb-0 pt-8 px-10">
            <CardTitle className="text-lg font-black text-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              تحليل مستويات الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.levelDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#64748b'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#c4a24d" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] p-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">إجمالي نقاط الـ XP</p>
            <h3 className="text-5xl font-black text-primary">{stats.totalXP.toLocaleString()}</h3>
          </div>
          <div className="h-20 w-20 bg-accent/10 rounded-3xl flex items-center justify-center">
            <Award className="h-10 w-10 text-accent" />
          </div>
        </Card>
        
        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] p-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">القصص المكتملة</p>
            <h3 className="text-5xl font-black text-primary">{allUsers?.reduce((acc, curr) => acc + (curr.completedCount || 0), 0) || 0}</h3>
          </div>
          <div className="h-20 w-20 bg-primary/5 rounded-3xl flex items-center justify-center">
            <BookOpenCheck className="h-10 w-10 text-primary" />
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white border border-slate-100">
        <CardHeader className="bg-primary/5 p-10 border-b flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black text-primary">إدارة شؤون الطلاب</CardTitle>
            <p className="text-xs font-bold text-muted-foreground italic">"كل طالب هنا هو قصة نجاح جديدة"</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن طالب بالاسم أو الإيميل..." 
              className="pr-14 h-14 rounded-2xl border-none bg-white font-bold text-right shadow-inner text-lg"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-none">
                <TableHead className="text-right font-black text-[10px] py-6 px-10">الطالب</TableHead>
                <TableHead className="text-right font-black text-[10px] py-6">البريد الإلكتروني</TableHead>
                <TableHead className="text-right font-black text-[10px] py-6">التقدم الدراسي</TableHead>
                <TableHead className="text-center font-black text-[10px] py-6 px-10">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                <TableRow><TableCell colSpan={4} className="text-center py-24"><Loader2 className="animate-spin mx-auto text-primary h-10 w-10" /></TableCell></TableRow>
              ) : filteredUsers?.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-24 text-muted-foreground font-bold">لا يوجد طلاب مسجلون حالياً.</TableCell></TableRow>
              ) : filteredUsers?.map((u) => (
                <TableRow key={u.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                  <TableCell className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary text-xl shadow-inner">
                        {u.username?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-lg text-primary">{u.username || 'طالب جديد'}</span>
                        <span className="text-[9px] font-mono text-muted-foreground opacity-50">{u.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 opacity-30" />
                      {u.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <Badge className="bg-primary text-white border-none text-[10px] px-3 py-1 font-black">{u.xp || 0} XP</Badge>
                      <Badge className="bg-accent/10 text-accent border-none text-[10px] px-3 py-1 font-black">{u.streak || 0} 🔥</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-10 py-6">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleNuclearDelete(u.id)} 
                      className="rounded-2xl font-black text-xs gap-3 h-12 px-6 shadow-lg shadow-destructive/10 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Trash2 className="h-4 w-4" /> طرد فوري
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
