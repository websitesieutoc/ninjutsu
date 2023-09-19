import { redirect } from 'next/navigation';
import { getSession } from '@/utils/auth';

export default async function SettingsPage() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
