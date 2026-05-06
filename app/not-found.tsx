import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card-zed max-w-md w-full text-center space-y-4">
        <div className="font-mono text-[3rem] text-ink leading-none">404</div>
        <div className="label-zed">Not found</div>
        <p className="text-muted leading-relaxed">
          That route doesn&rsquo;t exist yet. Some things you build for yourself
          don&rsquo;t need to.
        </p>
        <Link
          href="/"
          className="inline-block font-mono text-[0.85rem] text-accent hover:underline pt-2"
        >
          ← back to dashboard
        </Link>
      </div>
    </div>
  );
}
