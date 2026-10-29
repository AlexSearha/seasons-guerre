import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().optional(),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
});

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { nom, email, message, sujet } = parsed.data;

  const resend = new Resend(process.env.MAILER_RESEND_SECRET_KEY);

  const { data, error } = await resend.emails.send({
    from: "CONTACT | Seasons Novel <contact@seasonsnovel.com>",
    to: "seasons_project@hotmail.com",
    subject: "Hello world",
    html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nouveau message de contact</h2>
          <p><strong>De :</strong> ${nom} (${email})</p>
          <p><strong>Sujet :</strong> ${sujet || "Aucun"}</p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
  });

  if (error) {
    return Response.json({ error });
  }

  return Response.json(data);
}
