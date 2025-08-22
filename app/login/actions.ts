'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(prevState: unknown, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const data = Object.fromEntries(formData);

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email as string,
    password: data.password as string,
  });

  if (error) {
    console.error('Login error:', error.message);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/admin');
}
