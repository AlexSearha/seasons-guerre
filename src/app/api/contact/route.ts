import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  nom: z.string().min(2),
  email: z.email(),
  sujet: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  // TODO : brancher l'envoi réel (Resend, Nodemailer…) ici.
  console.log('[contact]', parsed.data);
  return NextResponse.json({ ok: true });
}
