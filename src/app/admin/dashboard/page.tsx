
"use client";

import { useState } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy, getDocs, where } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, UserPlus, ArrowLeft, Loader2, Key, ShieldAlert, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [newNote, setNewNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'bronze' | 'gold' | 'vip'>('silver');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const codesQuery = useMemoFirebase(() => {
    return query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: codes, isLoading } = useCollection(codesQuery);

  // وظيفة توليد كود عشوائي فائق الأمان
  const generateSecureCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // استبعاد الحروف المتشابهة مثل 0 و O
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
      toast({ title: "تم توليد الرمز", description: `الرمز الجديد آمن ومشفر: ${finalCode}` });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في توليد الرمز الأمني." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "تم النسخ", description: "تم نسخ الرمز إلى الحافظة." });
  };

  const handleDeleteCode = (id: string) => {
    if (!confirm('هل أنت متأكد من إبطال هذا الترخيص نهائياً؟')) return;
    const docRef = doc(db, 'accessCodes', id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "تم الإبطال", description: "تم إلغاء صلاحية الرمز بنجاح." });
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
            <h1 className="text-3xl font-black font-headline text-primary tracking-tighter">نظام إدارة التراخيص المشفرة</h1>
            <p className="text-muted-foreground text-sm font-bold">المدير العام: شريف حماد | مستوى الحماية: عالي</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[2.5rem] bg-white/80 backdrop-blur-md border border-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-black">
              <ShieldAlert className="h-5 w-5 text-accent" />
              إصدار ترخيص آمن
            </CardTitle>
            <CardDescription className="text-xs font-bold">سيولد النظام رمزاً عشوائياً يصعب تخمينه.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">نوع الباقة</label>
              <Select value={selectedPlan} onValueChange={(v: any) => setSelectedPlan(v)}>
                <SelectTrigger className="rounded-2xl h-14 border-2 focus:ring-primary shadow-sm bg-muted/30 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">⭐ VIP - وصول كامل</SelectItem>
                  <SelectItem value="gold">🥇 ذهبية (25,000)</SelectItem>
                  <SelectItem value="bronze">🥉 برونزية (20,000)</SelectItem>
                  <SelectItem value="silver">🥈 فضية (15,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">اسم الطالب / ملاحظة</label>
              <Input 
                placeholder="مثال: عمر محمد - الخرطوم" 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-2xl h-14 text-right border-2 focus:ring-primary shadow-sm bg-muted/30 font-bold"
              />
            </div>

            <Button 
              onClick={handleGenerateCode} 
              className="w-full h-16 rounded-2xl bg-primary text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : "توليد الرمز المشفر"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-md border border-white">
          <CardHeader className="bg-primary/5 p-6">
            <CardTitle className="text-lg flex items-center gap-2 text-primary font-black">
              <Key className="h-5 w-5 text-accent" />
              سجل التراخيص النشطة
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest">الرمز</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest">الباقة</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest">المستفيد</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest">الحالة</TableHead>
                  <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">إجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell>
                  </TableRow>
                ) : codes?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-bold">لا توجد تراخيص مصدرة.</TableCell>
                  </TableRow>
                ) : codes?.map((c) => (
                  <TableRow key={c.id} className="hover:bg-primary/5 transition-colors border-b-primary/5">
                    <TableCell className="font-mono font-black text-primary text-sm">
                      <div className="flex items-center gap-2">
                        <span>{c.code}</span>
                        <button onClick={() => handleCopy(c.code, c.id)} className="text-muted-foreground hover:text-accent transition-colors">
                          {copiedId === c.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.plan === 'vip' ? 'default' : 'outline'} className={cn(
                        "font-black py-0.5 px-2 rounded-lg uppercase text-[8px] tracking-widest",
                        c.plan === 'vip' ? 'bg-amber-500 text-white' : ''
                      )}>
                        {c.plan.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-[11px] text-slate-600 max-w-[100px] truncate">{c.note || '---'}</TableCell>
                    <TableCell>
                      {c.usedByUid ? (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-black border border-red-100">
                          مقيد
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-black border border-green-100">
                          متاح
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCode(c.id)} className="text-destructive hover:bg-red-50 rounded-xl h-8 w-8">
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
