
"use client";

import { useState } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, UserPlus, ArrowLeft, Loader2, Key, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [newNote, setNewNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'bronze' | 'gold' | 'vip'>('silver');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const codesQuery = useMemoFirebase(() => {
    return query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: codes, isLoading } = useCollection(codesQuery);

  // البادئات الجديدة بناءً على كود المدير العام الجديد: 09136091280
  const prefixes = {
    vip: '09136091280',    // كبار الشخصيات
    silver: '09136091281', // فضية
    bronze: '09136091282', // برونزية
    gold: '09136091283'    // ذهبية
  };

  const handleGenerateCode = async () => {
    if (!user) return;
    setIsGenerating(true);

    try {
      const prefix = prefixes[selectedPlan];
      const q = query(
        collection(db, 'accessCodes'),
        orderBy('code', 'desc'),
        limit(100)
      );
      const snapshot = await getDocs(q);
      
      let nextNumber = 1;
      const existingCodes = snapshot.docs
        .map(d => d.data().code as string)
        .filter(c => c.startsWith(prefix));

      if (existingCodes.length > 0) {
        const numbers = existingCodes
          .map(c => parseInt(c.replace(prefix, '')))
          .filter(n => !isNaN(n));
        if (numbers.length > 0) {
          nextNumber = Math.max(...numbers) + 1;
        }
      }

      const finalCode = `${prefix}${nextNumber}`;
      
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
      toast({ title: "تم التوليد بنجاح", description: `الكود الجديد (${selectedPlan}): ${finalCode}` });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في توليد الكود التسلسلي." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteCode = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف وإبطال هذا الكود؟')) return;
    const docRef = doc(db, 'accessCodes', id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "تم الحذف", description: "تم إبطال الكود بنجاح." });
  };

  if (isUserLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4" dir="rtl">
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline text-primary">لوحة المدير العام شريف حماد</h1>
            <p className="text-muted-foreground text-sm">إدارة تراخيص الوصول والحماية للأجهزة.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[2.5rem] bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <UserPlus className="h-5 w-5 text-accent" />
              توليد ترخيص جديد
            </CardTitle>
            <CardDescription>اختر نوع الباقة وسيولد النظام كوداً متسلسلاً.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-primary uppercase tracking-widest opacity-60">نوع الباقة المختارة</label>
              <Select value={selectedPlan} onValueChange={(v: any) => setSelectedPlan(v)}>
                <SelectTrigger className="rounded-2xl h-14 border-2 focus:ring-primary shadow-sm bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">⭐ باقة كبار الشخصيات (VIP)</SelectItem>
                  <SelectItem value="silver">🥈 الباقة الفضية (15,000)</SelectItem>
                  <SelectItem value="bronze">🥉 الباقة البرونزية (20,000)</SelectItem>
                  <SelectItem value="gold">🥇 الباقة الذهبية (25,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-primary uppercase tracking-widest opacity-60">ملاحظة (اسم الطالب أو الجهة)</label>
              <Input 
                placeholder="مثال: الطالب عمر محمد" 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-2xl h-14 text-right border-2 focus:ring-primary shadow-sm bg-muted/30 font-bold"
              />
            </div>

            <Button 
              onClick={handleGenerateCode} 
              className="w-full h-16 rounded-2xl bg-primary text-xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : "إصدار الكود التسلسلي"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-md">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg flex items-center gap-2 text-primary font-black">
              <Key className="h-5 w-5 text-accent" />
              سجل التراخيص والأجهزة المرتبطة
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-right font-black">كود الوصول</TableHead>
                  <TableHead className="text-right font-black">الباقة</TableHead>
                  <TableHead className="text-right font-black">المستفيد</TableHead>
                  <TableHead className="text-right font-black">حالة الربط</TableHead>
                  <TableHead className="text-center font-black">الإجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell>
                  </TableRow>
                ) : codes?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">لا توجد أكواد مصدرة بعد.</TableCell>
                  </TableRow>
                ) : codes?.map((c) => (
                  <TableRow key={c.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-mono font-black text-primary text-lg">{c.code}</TableCell>
                    <TableCell>
                      <Badge variant={c.plan === 'vip' ? 'default' : 'outline'} className={cn(
                        "font-black py-1 px-3 rounded-full uppercase text-[10px] tracking-widest",
                        c.plan === 'vip' ? 'bg-amber-500 text-white' : ''
                      )}>
                        {c.plan === 'vip' ? 'VIP' : c.plan === 'silver' ? 'فضية' : c.plan === 'bronze' ? 'برونزية' : 'ذهبية'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-sm text-slate-600">{c.note || '---'}</TableCell>
                    <TableCell>
                      {c.usedByUid ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] bg-red-50 text-red-600 px-3 py-1 rounded-full font-black border border-red-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                          مقيد بجهاز
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-black border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                          متاح للتفعيل
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCode(c.id)} className="text-destructive hover:bg-red-50 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
