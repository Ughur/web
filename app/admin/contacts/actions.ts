'use server';

import { supabase } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';

export async function deleteMultipleContactsAction(ids: string[]) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .in('id', ids);

  if (error) {
    console.error('Error deleting contacts:', error);
    return { error: `Failed to delete contacts: ${error.message}` };
  }

  revalidatePath('/admin/contacts');
}
