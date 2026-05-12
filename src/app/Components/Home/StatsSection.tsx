const stats = [
  { number: "1200+", label: "Happy Students" },
  { number: "80+", label: "Qualified Teachers" },
  { number: "25+", label: "Years of Excellence" },
  { number: "98%", label: "Pass Rate" },
  { number: "50+", label: "Awards Won" },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-0">
      <div className="grid gap-6 rounded-3xl bg-[#06184f] px-10 py-10 text-white lg:grid-cols-5">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <h3 className="mb-2 text-5xl font-black">{item.number}</h3>
            <p className="text-slate-300">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}