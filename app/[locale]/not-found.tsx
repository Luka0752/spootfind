import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  
  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-6 text-center">
      {/* 404图标 */}
      <div className="text-9xl font-bold text-[#1f2933] mb-4">404</div>
      <h2 className="text-3xl font-bold text-white/90 mb-2">Page Not Found</h2>
      <p className="text-white/50 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href={`/${locale}`}
        className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/80 text-white rounded-full transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
