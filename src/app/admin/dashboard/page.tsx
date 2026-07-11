
"use client";

import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, query, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ArrowLeft, Loader2, Users, Search, ShieldCheck, TrendingUp, Award, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [userSearch, setUserSearch] = useState('');
  
  const db = useFirestore();
  const { isUserLoading } = useUser();
  const { toast } = useToast();

  // استعلام المستخدمين
  const usersQuery = useMemoFirebase(() => query(collection(db, 'users'), orderBy('registrationDate', 'desc')), [db]);
  const { data: allUsers, isLoading: isLoadingUsers } = useCollection(usersQuery);

  // إحصائيات المنصة
  const stats = useMemo(() => {
    const totalUsers = allUsers?.length || 0;
    const totalXP = allUsers?.reduce((acc, curr) => acc + (curr.xp || 0), 0) || 0;
    return { totalUsers, totalXP };
  }, [allUsers]);

  const handleNuclearDelete = async (targetId: string) => {
    const confirmMsg = '⚠️ تأكيد الحذف النهائي:\n\nسيتم مسح كافة البيانات المرتبطة بهذا المستخدم فوراً ولن يتمكن من الدخول ثانية.';
    if (!confirm(confirmMsg)) return;

    try {
      await deleteDoc(doc(db, 'users', targetId));
      toast({ title: "تم التطهير بنجاح", description: "تم مسح كافة البيانات من السحابة." });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في عملية الحذف." });
    }
  };

  const filteredUsers = allUsers?.filter(u => 
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (isUserLoading) return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full bg-white shadow-sm border">
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline text-primary tracking-tighter">القيادة المركزية | Moko</h1>
            <p className="text-muted-foreground text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              المدير العام: شريف حماد | الرقابة والتحليلات
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl bg-primary text-white rounded-[2rem] overflow-hidden">
          <CardContent className="p-10 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">إجمالي المسجلين</p>
              <h3 className="text-6xl font-black">{stats.totalUsers}</h3>
            </div>
            <div className="p-5 bg-white/10 rounded-3xl"><Users className="h-12 w-12 text-accent" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden border border-slate-100">
          <CardContent className="p-10 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">مجموع XP المنصة</p>
              <h3 className="text-6xl font-black text-primary">{stats.totalXP.toLocaleString()}</h3>
            </div>
            <div className="p-5 bg-primary/5 rounded-3xl"><Award className="h-12 w-12 text-primary" /></div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
        <CardHeader className="bg-primary/5 p-8 border-b flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black text-primary shrink-0">إدارة الطلاب</CardTitle>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن طالب بالاسم أو الإيميل..." 
              className="pr-12 h-12 rounded-xl border-none bg-white font-bold text-right shadow-inner"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-right font-black text-[10px]">المستخدم</TableHead>
                <TableHead className="text-right font-black text-[10px]">البريد الإلكتروني</TableHead>
                <TableHead className="text-right font-black text-[10px]">التقدم</TableHead>
                <TableHead className="text-center font-black text-[10px]">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : filteredUsers?.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-bold">لا يوجد مستخدمون حالياً.</TableCell></TableRow>
              ) : filteredUsers?.map((u) => (
                <TableRow key={u.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-primary">{u.username || 'طالب جديد'}</span>
                      <span className="text-[8px] font-mono text-muted-foreground opacity-50">{u.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 opacity-30" />
                      {u.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Badge className="bg-primary/10 text-primary border-none text-[8px]">{u.xp || 0} XP</Badge>
                      <Badge className="bg-accent/10 text-accent border-none text-[8px]">{u.streak || 0} 🔥</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleNuclearDelete(u.id)} 
                      className="rounded-xl font-black text-[10px] gap-2 h-9 px-4"
                    >
                      <Trash2 className="h-3 w-3" /> طرد فوري
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
