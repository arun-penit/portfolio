"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5"
    >
      {copied ? <Check className="size-4 text-acid" /> : <Copy className="size-4" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
