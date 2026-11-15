import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import BlogRoutes from './blog-routes';
import Index from './pages/Index';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';
// MODULE_IMPORTS_START
// MODULE_IMPORTS_END

const queryClient = new QueryClient();

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-[color:var(--void)] px-6 text-center text-[color:var(--ink)]">
    <div className="panel w-full max-w-md p-8 space-y-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)]">
        SIGNAL LOST // 404
      </p>
      <h1 className="font-display text-3xl font-semibold text-[color:var(--ink)]">
        Sector Not Found
      </h1>
      <p className="text-sm leading-relaxed text-[color:var(--ink-2)]">
        The requested coordinates do not match any cataloged page in the VESTIGE archive.
      </p>
      <Link to="/" className="btn-primary inline-flex">
        Return to the Atlas
      </Link>
    </div>
  </main>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/index.html" element={<Index />} />
    <Route path="/blog/*" element={<BlogRoutes />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/auth/error" element={<AuthError />} />
    {/* MODULE_ROUTES_START */}
    {/* MODULE_ROUTES_END */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* MODULE_PROVIDERS_START */}
    {/* MODULE_PROVIDERS_END */}
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
    {/* MODULE_PROVIDERS_CLOSE */}
  </QueryClientProvider>
);

export default App;
export { AppRoutes };
