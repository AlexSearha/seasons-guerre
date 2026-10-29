'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  nom: z.string().min(2, 'Dites-nous qui vous êtes.'),
  email: z.email('Adresse email invalide.'),
  sujet: z.string().optional(),
  message: z.string().min(10, 'Quelques mots de plus, 10 caractères au moins.'),
});
type Values = z.infer<typeof schema>;

type FieldProps = { label: string; error?: string; multiline?: boolean } & React.ComponentPropsWithRef<'input'>;

function Field({ label, error, multiline, id, ref, ...rest }: FieldProps) {
  const base =
    'peer w-full border-b border-lo bg-transparent pt-7 pb-2 font-txt text-2xl text-hi placeholder-transparent outline-none transition focus:border-ember aria-[invalid=true]:border-red-400';
  return (
    <div className="relative">
      {multiline ? (
        <textarea id={id} rows={4} placeholder=" " aria-invalid={!!error} className={`${base} resize-none`} ref={ref as React.Ref<HTMLTextAreaElement>} {...(rest as React.ComponentPropsWithRef<'textarea'>)} />
      ) : (
        <input id={id} placeholder=" " aria-invalid={!!error} className={base} ref={ref} {...rest} />
      )}
      <label htmlFor={id} className="pointer-events-none absolute top-1 left-0 font-ui text-sm text-lo transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xl peer-focus:top-1 peer-focus:text-sm peer-focus:text-ember2">
        {label}
      </label>
      {error && <p role="alert" className="mt-1 font-ui text-sm text-red-300">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="relative px-[clamp(1.1rem,5vw,3rem)] py-[14vh]">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-fat text-[clamp(2.8rem,7vw,6.5rem)] leading-[.95] text-hi">Nul tambour ne résonne pour l’instant</h2>
          <p className="mt-6 text-[clamp(1.4rem,3vw,2rem)] text-sepia italic">Ferez-vous appel à notre escouade ?</p>
        </div>

        <div className="rounded-3xl border border-sepia/20 bg-bg/60 p-6 backdrop-blur-xl sm:p-10">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} className="flex min-h-96 flex-col items-center justify-center gap-5 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-ember text-bg"><Check size={32} /></span>
                <p className="font-fat text-4xl text-hi">Dépêche envoyée</p>
                <p className="text-xl text-lo italic">Nous vous répondrons au plus vite.</p>
                <button type="button" onClick={() => setStatus('idle')} className="font-ui text-sm text-sepia underline underline-offset-4 hover:text-hi">Écrire un autre message</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate exit={{ opacity: 0 }} className="grid gap-8 sm:grid-cols-2">
                <Field id="nom" label="Nom" autoComplete="name" error={errors.nom?.message} {...register('nom')} />
                <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
                <div className="sm:col-span-2"><Field id="sujet" label="Sujet" error={errors.sujet?.message} {...register('sujet')} /></div>
                <div className="sm:col-span-2"><Field id="message" label="Message" multiline error={errors.message?.message} {...register('message')} /></div>
                {status === 'error' && <p role="alert" className="font-ui text-red-300 sm:col-span-2">L’envoi a échoué. Réessayez dans un instant.</p>}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-sepia py-3 pr-4 pl-7 font-ui font-semibold text-ink transition hover:bg-hi disabled:opacity-60">
                    {isSubmitting ? 'Envoi…' : 'Envoyer'}
                    <span className="grid size-9 place-items-center rounded-full bg-ink text-sepia transition group-hover:translate-x-1"><Send size={16} /></span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
