
"use client";

import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, UserPlus, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminDashboard() {
  const [codes, setCodes] = useState<any[]>([]);
  const [newCode, setNewCode] = useState('');
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'accessCodes'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCodes(data);
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في تحميل الأكواد." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('moc-co-auth');
    if (auth !== 'admin') {
      window.location.href = '/login';
    } else {
      fetchCodes();
    }
  }, []);

  const handleAddCode = async () => {
    if (!newCode) return;
    try {
      await addDoc(collection(db, 'accessCodes'), {
        code: newCode.trim(),
        note: newNote,
        isActive: true,
        createdAt: serverTimestamp(),
      });
      setNewCode('');
      setNewNote('');
      toast({ title: "تم إنشاء الكود", description: "يمكن للمشترك الآن استخدامه." });
      fetchCodes();
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في إنشاء الكود." });
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'accessCodes', id));
      toast({ title: "تم الحذف", description: "تم إلغاء تفعيل الكود بنجاح." });
      fetchCodes();
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل الحذف." });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-3xl font-bold font-headline text-primary">لوحة إدارة المشتركين</h1>
        </div>
        <Button onClick={fetchCodes} variant="outline" size="icon" disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-accent" />
            إضافة مشترك جديد
          </CardTitle>
          <CardDescription>قم بتوليد كود وصول وربطه باسم المشترك.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="كود الوصول (مثلاً: STUD-123)" 
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
          <Input 
            placeholder="ملاحظة (اسم المشترك)" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button onClick={handleAddCode} className="bg-primary px-8">حفظ الكود</Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">الأكواد النشطة</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="text-right">الكود</TableHead>
              <TableHead className="text-right">الملاحظة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">لا يوجد مشتركين مسجلين بعد.</TableCell>
              </TableRow>
            ) : (
              codes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono font-bold text-primary">{c.code}</TableCell>
                  <TableCell>{c.note || '-'}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                      <ShieldCheck className="h-3 w-3" /> نشط
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteCode(c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
