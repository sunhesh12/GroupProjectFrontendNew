import React from 'react'
import { getSession } from '@/actions/get-session';
import { redirect } from 'next/navigation';
import { assignments } from '@/utils/backend';

interface AssignmentPageProps {
  params: Promise<{ moduleId: string, assignmentId: string }>;
}

export default async function AssignmentPage({params}: AssignmentPageProps) {
  const session = await getSession();
  
  if (!session) {
    // If not authenticated, redirect to sign-in page
    redirect('/auth/signin');
  }

  const { moduleId } = await params;
  const { assignmentId } = await params;

  if (!moduleId || !assignmentId) {
    // If moduleId or assignmentId is missing, show 404 page
    redirect('/not-found');
  }

  

  return (
    <main>

    </main>
  )
}
