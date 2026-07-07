"use client";

import { useState, useEffect } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser, useDoc } from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ArrowLeft, Loader2, Key, ShieldAlert, Copy, Check, UserMinus, Users, Search, ShieldCheck } from 'lucide-react';
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

  // التحقق من صلاحيات المدير في قاعدة البيانات وإصلاحها إذا لزم الأمر
  const adminDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(db, 'adminUsers', user.uid);
  }, [user, db]);
  const { data: adminRecord } = useDoc(adminDocRef);

  useEffect(() => {
    if (user && !adminRecord && localStorage.getItem('moc-co-auth') === 'admin') {
       // إصلاح سجل المدير إذا فقد لضمان عمل الحذف
       setDocumentNonBlocking(doc(db, 'adminUsers', user.uid), {
         id: user.uid,
         role: 'admin',
         name: 'شريف حماد عبد الله',
         lastActive: serverTimestamp()
       }, { merge: true });
    }
  }, [user, adminRecord, db]);

  // استعلام الأكواد
  const codesQuery = useMemoFirebase(() => {
    return query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'));
  }, [db]);
  const { data: codes, isLoading: isLoadingCodes } = useCollection(codesQuery);

  // استعلام المستخدمين المسجلين
  const usersQuery = useMemoFirebase(() => {
    return query(collection(db, 'users'));
  }, [db]);
  const { data: allUsers, isLoading: isLoadingUsers } = useCollection(usersQuery);

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

    try {
      const finalCode = generateSecureCode();
      const codesRef = collection(db, 'accessCodes');
      const data = {
        code: finalCode,
        plan: selectedPlan,
        note: newNote,
        isActive: true,
        usedByUid: null,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      };

      addDocumentNonBlocking(codesRef, data);
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

  const handleDeleteCode = (id: string, usedByUid: string | null) => {
    if (!confirm('هل تريد حذف هذا الترخيص نهائياً؟ سيتم منعه من الدخول فوراً ومسح ملفه.')) return;

    // 1. حذف رمز التفعيل
    deleteDocumentNonBlocking(doc(db, 'accessCodes', id));

    // 2. إذا كان مرتبط بمستخدم يتم حذف ملف المستخدم لقطع الوصول فوراً
    if (usedByUid) {
      deleteDocumentNonBlocking(doc(db, 'users', usedByUid));
    }

    toast({ title: "تم التطهير بنجاح", description: "تم مسح كافة البيانات المرتبطة بهذا الرمز." });
  };

  const handleForceDeleteUser = (userId: string, accessCode: string) => {
    if (!confirm(`هل أنت متأكد من حذف هذا المستخدم نهائياً؟ سيتم مسح ملفه وإبطال كود التفعيل (${accessCode || 'مجهول'}) فوراً.`)) return;

    // 1. حذف ملف المستخدم
    deleteDocumentNonBlocking(doc(db, 'users', userId));

    // 2. البحث عن الكود وحذفه لتنظيف المجموعة
    if (accessCode) {
      const codeToFind = codes?.find(c => c.code === accessCode);
      if (codeToFind) {
        deleteDocumentNonBlocking(doc(db, 'accessCodes', codeToFind.id));
      }
    }

    toast({ title: "تم الطرد الفوري", description: "تم حذف المستخدم وإلغاء صلاحية جهازه." });
  };

  const filteredUsers = allUsers?.filter(u => 
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.accessCode?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (isUserLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4" dir="rtl">
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline text-primary tracking-tighter">القيادة المركزية | Moko</h1>
            <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              المدير العام: شريف حماد | الرقابة والأمان
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[2.5rem] bg-white/80 backdrop-blur-md border border-white h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-black">
              <ShieldAlert className="h-5 w-5 text-accent" />
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
                placeholder="مثلاً: عمر، مدرسة..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-2xl h-14 text-right border-2 font-bold"
              />
            </div>

            <Button 
              onClick={handleGenerateCode} 
              className="w-full h-16 rounded-2xl bg-primary text-lg font-black shadow-xl"
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : "إصدار ترخيص جديد"}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="codes" className="w-full">
            <TabsList className="bg-white/50 p-1 rounded-2xl border-2 mb-4 h-14 grid grid-cols-2">
              <TabsTrigger value="codes" className="rounded-xl font-black gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Key className="h-4 w-4" /> سجل التراخيص
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-xl font-black gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Users className="h-4 w-4" /> إدارة الطلاب
              </TabsTrigger>
            </TabsList>

            <TabsContent value="codes" className="animate-in fade-in duration-500">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
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
                        <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-bold">لا توجد تراخيص مصدرة حالياً.</TableCell></TableRow>
                      ) : codes?.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-mono font-black text-primary">
                            <div className="flex items-center gap-2">
                              <span>{c.code}</span>
                              <button onClick={() => handleCopy(c.code, c.id)} className="text-muted-foreground hover:text-primary">
                                {copiedId === c.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-black text-[8px] uppercase", c.plan === 'vip' ? 'bg-amber-100 text-amber-700 border-amber-200' : '')}>
                              {c.plan?.toUpperCase() || 'FREE'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold text-[11px] max-w-[100px] truncate">{c.note || '---'}</TableCell>
                          <TableCell>
                            {c.usedByUid ? (
                              <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-black border border-red-100">نشط</span>
                            ) : (
                              <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[9px] font-black border border-green-100">متاح</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCode(c.id, c.usedByUid)} className="text-destructive hover:bg-red-50 rounded-xl">
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

            <TabsContent value="users" className="animate-in fade-in duration-500">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80">
                <CardHeader className="bg-primary/5 p-6 border-b">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="ابحث عن اسم المستخدم أو الكود (مثل عمر أو 123)..." 
                      className="pr-12 h-12 rounded-xl border-none bg-white font-bold text-right"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
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
                        <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-bold">لا يوجد مستخدمون مطابقون لبحثك.</TableCell></TableRow>
                      ) : filteredUsers?.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-sm text-primary">{u.username || 'طالب مجهول'}</span>
                              <span className="text-[9px] font-mono text-muted-foreground">{u.id}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono font-bold text-xs text-blue-600">{u.accessCode || '---'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 items-center">
                              <Badge className="bg-blue-500 text-white text-[8px]">{u.xp || 0} XP</Badge>
                              <Badge className="bg-orange-500 text-white text-[8px]">{u.streak || 0} 🔥</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="destructive" size="sm" onClick={() => handleForceDeleteUser(u.id, u.accessCode)} className="rounded-xl font-black text-[10px] gap-1 h-9 px-4">
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}