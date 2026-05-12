interface LandingSectionHeadingProps {
  badge: string;
  title: string;
  highlight?: string;
  desc: string;
}

export default function LandingSectionHeading({
  badge,
  title,
  highlight,
  desc,
}: LandingSectionHeadingProps) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-green-600">
        {badge}
      </p>

      <h2 className="mb-3 text-4xl font-black leading-tight text-slate-900">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      <p className="text-muted-foreground text-lg max-w-xl mx-auto">{desc}</p>
    </div>
  );
}