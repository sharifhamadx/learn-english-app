"use client";

import { useState, useEffect, useMemo } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser, useDoc } from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy, deleteDoc, writeBatch } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ArrowLeft, Loader2, Key, ShieldAlert, Copy, Check, UserMinus, Users, Search, ShieldCheck, BarChart3, TrendingUp, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const [newNote, setNewNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'bronze' | 'gold' | 'vip'>('silver');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState('');
  
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  // تأمين صلاحيات المدير
  const adminDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(db, 'adminUsers', user.uid);
  }, [user, db]);
  const { data: adminRecord } = useDoc(adminDocRef);

  useEffect(() => {
    if (user && !adminRecord && localStorage.getItem('moc-co-auth') === 'admin') {
       setDocumentNonBlocking(doc(db, 'adminUsers', user.uid), {
         id: user.uid,
         role: 'admin',
         name: 'شريف حماد عبد الله',
         lastActive: serverTimestamp()
       }, { merge: true });
    }
  }, [user, adminRecord, db]);

  // استعلامات البيانات
  const codesQuery = useMemoFirebase(() => query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc')), [db]);
  const { data: codes, isLoading: isLoadingCodes } = useCollection(codesQuery);

  const usersQuery = useMemoFirebase(() => query(collection(db, 'users')), [db]);
  const { data: allUsers, isLoading: isLoadingUsers } = useCollection(usersQuery);

  // إحصائيات المنصة
  const stats = useMemo(() => {
    const totalUsers = allUsers?.length || 0;
    const activeCodes = codes?.filter(c => c.usedByUid).length || 0;
    const totalXP = allUsers?.reduce((acc, curr) => acc + (curr.xp || 0), 0) || 0;
    return { totalUsers, activeCodes, totalXP };
  }, [allUsers, codes]);

  const generateSecureCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const prefix = selectedPlan.toUpperCase().substring(0, 3);
    let result = `${prefix}-`;
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 3) result += '-';
    }
    return result;
  };

  const handleGenerateCode = async () => {
    if (!user) return;
    setIsGenerating(true);
    const finalCode = generateSecureCode();
    
    try {
      addDocumentNonBlocking(collection(db, 'accessCodes'), {
        code: finalCode,
        plan: selectedPlan,
        note: newNote,
        isActive: true,
        usedByUid: null,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      setNewNote('');
      toast({ title: "تم التوليد بنجاح", description: `الرمز الجديد: ${finalCode}` });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في توليد الرمز." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "تم النسخ", description: "الرمز جاهز للمشاركة." });
  };

  // وظيفة الحذف النووي (تطهير شامل)
  const handleNuclearDelete = async (type: 'user' | 'code', targetId: string, secondaryId?: string | null) => {
    const confirmMsg = '⚠️ تأكيد الحذف النهائي:\n\nسيتم مسح كافة البيانات المرتبطة بهذا السجل فوراً ولن يتمكن المستخدم من العودة.';
    if (!confirm(confirmMsg)) return;

    try {
      if (type === 'code') {
        await deleteDoc(doc(db, 'accessCodes', targetId));
        if (secondaryId) {
          await deleteDoc(doc(db, 'users', secondaryId));
        }
      } else {
        await deleteDoc(doc(db, 'users', targetId));
        if (secondaryId) {
          const codeToFind = codes?.find(c => c.code === secondaryId);
          if (codeToFind) await deleteDoc(doc(db, 'accessCodes', codeToFind.id));
        }
      }
      toast({ title: "تم التطهير بنجاح", description: "تم مسح كافة البيانات المختارة من السحابة." });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ في الصلاحيات", description: "تأكد أنك مسجل دخول كمدير عام." });
    }
  };

  const filteredUsers = allUsers?.filter(u => 
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.accessCode?.toLowerCase().includes(userSearch.toLowerCase()) ||
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
              المدير العام: شريف حماد | تحليلات ورقابة
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-xl bg-primary text-white rounded-[2rem] overflow-hidden">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">إجمالي الطلاب</p>
              <h3 className="text-4xl font-black">{stats.totalUsers}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl"><Users className="h-8 w-8 text-accent" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden border border-slate-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">تراخيص مفعلة</p>
              <h3 className="text-4xl font-black text-primary">{stats.activeCodes}</h3>
            </div>
            <div className="p-3 bg-accent/10 rounded-2xl"><TrendingUp className="h-8 w-8 text-accent" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden border border-slate-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">مجموع XP المنصة</p>
              <h3 className="text-4xl font-black text-primary">{stats.totalXP.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-primary/5 rounded-2xl"><Award className="h-8 w-8 text-primary" /></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Code Generator Side */}
        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[2.5rem] bg-white border border-slate-100 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-black">
              <Key className="h-5 w-5 text-accent" />
              توليد ترخيص
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">نوع الباقة</label>
              <Select value={selectedPlan} onValueChange={(v: any) => setSelectedPlan(v)}>
                <SelectTrigger className="rounded-2xl h-14 border-2 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">⭐ VIP - كامل</SelectItem>
                  <SelectItem value="gold">🥇 ذهبية</SelectItem>
                  <SelectItem value="bronze">🥉 برونزية</SelectItem>
                  <SelectItem value="silver">🥈 فضية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">ملاحظة/اسم</label>
              <Input 
                placeholder="مثلاً: مدرسة مكة..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-2xl h-14 text-right border-2 font-bold"
              />
            </div>

            <Button 
              onClick={handleGenerateCode} 
              className="w-full h-16 rounded-2xl bg-accent text-primary font-black shadow-xl shadow-accent/20 text-lg"
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : "إصدار ترخيص جديد"}
            </Button>
          </CardContent>
        </Card>

        {/* Main Tabs Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="bg-white p-1 rounded-2xl border-2 mb-4 h-14 grid grid-cols-2 shadow-sm">
              <TabsTrigger value="users" className="rounded-xl font-black gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Users className="h-4 w-4" /> إدارة الطلاب ({stats.totalUsers})
              </TabsTrigger>
              <TabsTrigger value="codes" className="rounded-xl font-black gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Key className="h-4 w-4" /> سجل التراخيص ({codes?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="animate-in fade-in duration-500">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
                <CardHeader className="bg-primary/5 p-6 border-b">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="ابحث عن أي طالب (عمر، الكود، المعرف)..." 
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
                        <TableHead className="text-right font-black text-[10px]">الكود المستخدم</TableHead>
                        <TableHead className="text-right font-black text-[10px]">التقدم</TableHead>
                        <TableHead className="text-center font-black text-[10px]">الإجراء</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingUsers ? (
                        <TableRow><TableCell colSpan={4} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
                      ) : filteredUsers?.length === 0 ? (
                        <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-bold">لا يوجد مستخدمون يطابقون البحث.</TableCell></TableRow>
                      ) : filteredUsers?.map((u) => (
                        <TableRow key={u.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-sm text-primary">{u.username || 'طالب جديد'}</span>
                              <span className="text-[8px] font-mono text-muted-foreground opacity-50">{u.id}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono font-bold text-xs text-accent">{u.accessCode || '---'}</TableCell>
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
                              onClick={() => handleNuclearDelete('user', u.id, u.accessCode)} 
                              className="rounded-xl font-black text-[10px] gap-1 h-9 px-4 shadow-lg shadow-destructive/10"
                            >
                              <UserMinus className="h-3 w-3" /> طرد وحذف
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="codes" className="animate-in fade-in duration-500">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="text-right font-black text-[10px]">الرمز</TableHead>
                        <TableHead className="text-right font-black text-[10px]">الباقة</TableHead>
                        <TableHead className="text-right font-black text-[10px]">البيانات</TableHead>
                        <TableHead className="text-right font-black text-[10px]">الحالة</TableHead>
                        <TableHead className="text-center font-black text-[10px]">إجراء</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingCodes ? (
                        <TableRow><TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
                      ) : codes?.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-bold">لا توجد تراخيص حالياً.</TableCell></TableRow>
                      ) : codes?.map((c) => (
                        <TableRow key={c.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="font-mono font-black text-primary">
                            <div className="flex items-center gap-2">
                              <span>{c.code}</span>
                              <button onClick={() => handleCopy(c.code, c.id)} className="text-muted-foreground hover:text-accent">
                                {copiedId === c.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-black text-[8px] uppercase", c.plan === 'vip' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-primary/5 text-primary border-primary/10')}>
                              {c.plan?.toUpperCase() || 'FREE'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold text-[11px] max-w-[100px] truncate">{c.note || '---'}</TableCell>
                          <TableCell>
                            {c.usedByUid ? (
                              <span className="bg-accent text-primary px-2 py-0.5 rounded-full text-[9px] font-black border border-accent/20 shadow-sm">نشط</span>
                            ) : (
                              <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[9px] font-black border border-green-100">متاح</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => handleNuclearDelete('code', c.id, c.usedByUid)} className="text-destructive hover:bg-red-50 rounded-xl">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}