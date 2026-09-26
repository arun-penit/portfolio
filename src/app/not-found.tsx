import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404</div>
        <h1 className="mt-4 text-5xl font-medium tracking-tight md:text-7xl">
          This page <span className="font-serif italic text-acid">hallucinated.</span>
        </h1>
        <Link href="/" className="mt-10 inline-block rounded-full bg-acid px-6 py-3 text-sm font-medium text-ink">
          Back to reality
        </Link>
      </div>
    </main>
  );
}
