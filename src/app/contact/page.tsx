"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary">Contact Us</h1>
        <p className="text-muted-foreground">We are here to answer your questions and support your educational journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-bold">WhatsApp / Phone</span>
              <span className="font-mono text-primary font-bold">+44 7342 322206</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-bold">Email</span>
              <span className="font-mono text-primary font-bold">sharifhamadmoko@gmail.com</span>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 gap-2 h-12 rounded-xl" asChild>
              <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Talk to us on WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md rounded-3xl bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xl">Support Hours</CardTitle>
            <CardDescription className="text-primary-foreground/70">We aim to respond to all inquiries within 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              If you are facing issues with your activation code or want to subscribe to the full package (300 chapters), please send a message with your name and the code you used.
            </p>
            <div className="pt-4 flex items-center gap-2 opacity-70">
              <MapPin className="h-4 w-4" />
              <span>Official Sharif Saga Website</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
