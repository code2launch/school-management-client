import SectionTitle from "../Shared/SectionTitle";

const partners = [
  "British Council",
  "Cambridge",
  "Edexcel",
  "Pearson",
  "ICT Division",
  "Bangladesh Olympic Association",
];

export default function PartnersSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <SectionTitle mini="Our Partners" title="Trusted Collaborations" />

      <div className="grid gap-6 rounded-3xl border border-slate-200 p-10 lg:grid-cols-6">
        {partners.map((partner) => (
          <div
            key={partner}
            className="flex items-center justify-center rounded-2xl border border-slate-100 px-4 py-10 text-center font-bold"
          >
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
}