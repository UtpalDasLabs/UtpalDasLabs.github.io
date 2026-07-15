import type { Company } from "@/data/projects";

interface CompanyChipProps {
  company: Company;
  linked?: boolean;
}

export function CompanyChip({ company, linked = false }: CompanyChipProps) {
  const content = (
    <>
      {company.logo ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/90 p-[2px]">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-sm border border-border text-[10px] font-semibold text-muted-foreground"
        >
          {company.name.charAt(0)}
        </span>
      )}
      <span className="text-xs text-muted-foreground">{company.name}</span>
    </>
  );

  if (linked && company.url) {
    return (
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 py-1 hover:opacity-70 transition-opacity"
        aria-label={`${company.name} website`}
      >
        {content}
      </a>
    );
  }
  return <span className="inline-flex items-center gap-2 py-1">{content}</span>;
}
