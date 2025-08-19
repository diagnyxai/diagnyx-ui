import { Suspense } from 'react';
import { EmailVerification } from '@/components/auth/email-verification';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerification />
    </Suspense>
  );
}