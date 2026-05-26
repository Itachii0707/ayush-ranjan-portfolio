import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  type: z.enum(['general', 'recruiter', 'project']).default('general'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const results: Record<string, string> = {};

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        const { error } = await supabase.from('contacts').insert({ ...data, ip_address: req.headers.get('x-forwarded-for'), user_agent: req.headers.get('user-agent') });
        results.supabase = error ? `error: ${error.message}` : 'ok';
      } catch (e) { results.supabase = `exception: ${e}`; }
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Portfolio <noreply@ayushranjan.dev>',
          to: process.env.RESEND_TO_EMAIL || 'ayush25252@flash.co',
          subject: `[Portfolio] ${data.type.toUpperCase()}: ${data.subject}`,
          html: `<div style="font-family:monospace;background:#030305;color:#E8E8F0;padding:24px;border-radius:12px"><h2 style="color:#00E5FF">New Contact Submission</h2><p><strong>Type:</strong> ${data.type}</p><p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p>${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}<p><strong>Subject:</strong> ${data.subject}</p><p><strong>Message:</strong></p><pre style="background:#111;padding:12px;border-radius:8px;white-space:pre-wrap">${data.message}</pre></div>`,
        });
        results.resend = error ? `error: ${error.message}` : 'ok';
      } catch (e) { results.resend = `exception: ${e}`; }
    }

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const message = `New Portfolio Contact\n\nType: ${data.type}\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message.slice(0, 200)}`;
        const tgRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message }) });
        results.telegram = tgRes.ok ? 'ok' : 'error';
      } catch (e) { results.telegram = `exception: ${e}`; }
    }

    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [{ title: `Portfolio Contact: ${data.type}`, color: 0x00E5FF, fields: [{ name: 'Name', value: data.name, inline: true }, { name: 'Email', value: data.email, inline: true }, { name: 'Subject', value: data.subject }, { name: 'Message', value: data.message.slice(0, 1000) }], timestamp: new Date().toISOString() }] }) });
        results.discord = discordRes.ok ? 'ok' : 'error';
      } catch (e) { results.discord = `exception: ${e}`; }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
