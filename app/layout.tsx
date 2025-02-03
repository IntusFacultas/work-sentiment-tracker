import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/server/Footer';
import { Header } from '@/components/server/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Work Sentiment Tracker',
  description:
    'Small app to track your work sentiment. Built with Next.js, TypeScript, and Tailwind CSS.',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
          <Header />
          <main className="mx-auto w-full max-w-[1200px] flex-auto px-4 py-4 sm:px-6 md:py-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
