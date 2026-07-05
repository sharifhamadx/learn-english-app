
"use client";

import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, UserPlus, ShieldCheck, ArrowLeft, Loader2, Key, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminDashboard() {
  const [newNote, setNewNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'bronze' | 'gold'>('silver');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const codesQuery = useMemoFirebase(() => {
    return query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: codes, isLoading } = useCollection(codesQuery);

  // البادئات المطلوبة من الأستاذ شريف
  const prefixes = {
    silver: '771020261',
    bronze: '771020262',
    gold: '771020263'
  };

  const handleGenerateCode = async () => {
    if (!user) return;
    setIsGenerating(true);

    try {
      // البحث عن آخر رقم تسلسلي لهذه الباقة لتوليد الرقم التالي
      const prefix = prefixes[selectedPlan];
      const q = query(
        collection(db, 'accessCodes'),
        orderBy('code', 'desc'),
        limit(50) // فحص آخر 50 كود للبحث عن التسلسل الصحيح
      );
      const snapshot = await getDocs(q);
      
      let nextNumber = 1;
      const existingCodes = snapshot.docs
        .map(d => d.data().code as string)
        .filter(c => c.startsWith(prefix));

      if (existingCodes.length > 0) {
        // استخراج الجزء المتغير (ما بعد البادئة) وتحويله لرقم
        const numbers = existingCodes.map(c => parseInt(c.replace(prefix, ''))).filter(n => !isNaN(n));
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
        usedByUid: null, // لم يتم استخدامه بعد
        createdAt: serverTimestamp(),
        createdBy: user.uid
      };

      addDocumentNonBlocking(codesRef, data);
      
      setNewNote('');
      toast({ title: "تم توليد الكود", description: `الكود الجديد هو: ${finalCode}` });
    } catch (e) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في توليد الكود التسلسلي." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteCode = (id: string) => {
    const docRef = doc(db, 'accessCodes', id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "تم الحذف", description: "تم إبطال الكود بنجاح." });
  };

  if (isUserLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-3xl font-bold font-headline text-primary">إدارة الملحمة (شريف حماد)</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-xl rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-accent" />
              توليد كود جديد
            </CardTitle>
            <CardDescription>اختر الباقة وسيتم توليد كود متسلسل آلياً.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-70">نوع الباقة</label>
              <Select value={selectedPlan} onValueChange={(v: any) => setSelectedPlan(v)}>
                <SelectTrigger className="rounded-2xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">الباقة الفضية (15,000)</SelectItem>
                  <SelectItem value="bronze">الباقة البرونزية (20,000)</SelectItem>
                  <SelectItem value="gold">الباقة الذهبية (25,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-70">ملاحظة (اسم الطالب)</label>
              <Input 
                placeholder="مثال: أحمد محمد" 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-2xl h-12 text-right"
              />
            </div>

            <Button 
              onClick={handleGenerateCode} 
              className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20"
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : "توليد الكود التسلسلي"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              سجل الأكواد المصدرة
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-right">الكود</TableHead>
                  <TableHead className="text-right">الباقة</TableHead>
                  <TableHead className="text-right">الطالب</TableHead>
                  <TableHead className="text-right">حالة الجهاز</TableHead>
                  <TableHead className="text-center">إجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes?.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono font-bold text-primary">{c.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold">{c.plan === 'silver' ? 'فضية' : c.plan === 'bronze' ? 'برونزية' : 'ذهبية'}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{c.note || '-'}</TableCell>
                    <TableCell>
                      {c.usedByUid ? (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">مقيد بجهاز</span>
                      ) : (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">جاهز للتفعيل</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCode(c.id)} className="text-destructive">
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
