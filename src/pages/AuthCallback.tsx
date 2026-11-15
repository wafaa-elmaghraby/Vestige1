import { useEffect } from 'react';
import { client } from '../lib/api';

export default function AuthCallback() {
  useEffect(() => {
    client.auth.login();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--void)] px-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 flex h-12 w-12 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-[color:var(--line-strong)]" />
          <span className="absolute inset-0 animate-spin rounded-full border-t border-[color:var(--cyan)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
        </div>
        <p className="font-display text-base text-[color:var(--ink)]">Establishing uplink</p>
        <p className="mono-label mt-2">Processing authentication credentials</p>
      </div>
    </div>
  );
}