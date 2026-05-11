interface SectionTitleProps {
  mini: string;
  title: string;
}

export default function SectionTitle({ mini, title }: SectionTitleProps) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-green-700">
        {mini}
      </p>
      <h2 className="text-4xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}