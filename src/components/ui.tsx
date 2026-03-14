import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>{children}</div>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
