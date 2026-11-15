import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function AuthErrorPage() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const errorMessage =
    searchParams.get('msg') || 'Your authentication credentials are invalid or have expired.';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--void)] px-6">
      <div className="panel w-full max-w-md p-8 text-center">
        <AlertCircle className="mx-auto h-9 w-9 text-[color:var(--indigo)]" strokeWidth={1.5} />

        <h1 className="font-display mt-5 text-xl text-[color:var(--ink)]">Uplink rejected</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-2)]">{errorMessage}</p>

        <p className="mono-label mt-6">
          {countdown > 0 ? (
            <>
              Returning to the atlas in{' '}
              <span className="font-mono-tabular text-[color:var(--cyan)]">{countdown}</span>s
            </>
          ) : (
            'Redirecting…'
          )}
        </p>

        <button onClick={() => (window.location.href = '/')} className="btn-ghost mt-6 w-full">
          Return to the atlas
        </button>
      </div>
    </div>
  );
}