
"use client";

import { useState, useEffect } from 'react';
import { useFirestore, useMemoFirebase, useCollection, useUser } from '@/firebase';
import { collection, serverTimestamp, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, UserPlus, ShieldCheck, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminDashboard() {
  const [newCode, setNewCode] = useState('');
  const [newNote, setNewNote] = useState('');
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const codesQuery = useMemoFirebase(() => {
    return collection(db, 'accessCodes');
  }, [db]);

  const { data: codes, isLoading } = useCollection(codesQuery);

  useEffect(() => {
    const authFlag = localStorage.getItem('moc-co-auth');
    if (!isUserLoading && (!user || authFlag !== 'admin')) {
      window.location.href = '/login';
    }
  }, [user, isUserLoading]);

  const handleAddCode = () => {
    if (!user) {
      toast({ variant: "destructive", title: "خطأ", description: "لم يتم التحقق من هويتك كمسؤول بعد. انتظر لحظة." });
      return;
    }

    if (!newCode.trim()) {
      toast({ variant: "destructive", title: "تنبيه", description: "يرجى إدخال الكود أولاً." });
      return;
    }

    const codesRef = collection(db, 'accessCodes');
    const data = {
      code: newCode.trim(),
      note: newNote,
      isActive: true,
      createdAt: serverTimestamp(),
      createdBy: user.uid
    };

    addDocumentNonBlocking(codesRef, data);
    
    setNewCode('');
    setNewNote('');
    toast({ title: "جاري المعالجة", description: "يتم الآن إضافة الكود لقاعدة البيانات..." });
  };

  const handleDeleteCode = (id: string) => {
    const docRef = doc(db, 'accessCodes', id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "جاري الحذف", description: "سيتم إزالة الكود من القائمة فوراً." });
  };

  if (isUserLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-3xl font-bold font-headline text-primary">لوحة إدارة المشتركين</h1>
        </div>
      </div>

      {!user && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>تنبيه</AlertTitle>
          <AlertDescription>
            جلسة العمل غير مفعلة برمجياً. يرجى إعادة تسجيل الدخول لتتمكن من إجراء التعديلات.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-accent" />
            إضافة مشترك جديد
          </CardTitle>
          <CardDescription>قم بتوليد كود وصول وربطه باسم المشترك ليتمكن من الدخول.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="كود الوصول (مثلاً: STUD-123)" 
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="text-right"
            disabled={!user}
          />
          <Input 
            placeholder="ملاحظة (اسم المشترك)" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="text-right"
            disabled={!user}
          />
          <Button onClick={handleAddCode} className="bg-primary px-8" disabled={!user}>حفظ الكود</Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">الأكواد النشطة</CardTitle>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
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
            {!codes || codes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  {isLoading ? 'جاري تحميل البيانات...' : 'لا يوجد مشتركين مسجلين بعد.'}
                </TableCell>
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
