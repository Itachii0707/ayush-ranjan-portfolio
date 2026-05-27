import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
        const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
        const city = req.headers.get('x-vercel-ip-city') || 'Unknown';
        
        await supabase.from('resume_downloads').insert({
          ip_address: req.headers.get('x-forwarded-for'),
          user_agent: req.headers.get('user-agent'),
          referrer: req.headers.get('referer'),
          country,
          region,
          city
        });
      } catch { /* non-critical */ }
    }
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: 'Resume Downloaded - Someone just downloaded your resume from the portfolio!' }) });
      } catch { /* non-critical */ }
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
