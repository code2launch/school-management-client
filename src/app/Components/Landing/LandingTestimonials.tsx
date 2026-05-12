import LandingSectionHeading from "./LandingSectionHeading";

const testimonials = [
  {
    name: "Md. Abu Hossain",
    role: "Principal, Greenfield High School",
    quote:
      "EduCore has transformed how we manage our school. It's user-friendly, efficient, and the support team is always responsive.",
  },
  {
    name: "Nusrat Jahan",
    role: "Administrator, Ideal School",
    quote:
      "The best investment we made for our school. Attendance tracking and fee management have become so much easier.",
  },
  {
    name: "Rafiq Islam",
    role: "Chairman, Unity School & College",
    quote:
      "Finally, a software that understands the needs of Bangladeshi schools. Highly recommended!",
  },
];

export default function LandingTestimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <LandingSectionHeading
        badge="Testimonials"
        title="Trusted by school leaders across"
        highlight="Bangladesh"
        desc="Schools across Bangladesh rely on EduCore to simplify operations."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-[28px] border border-slate-200 bg-white p-8 transition-all hover:shadow-xl"
          >
            <div className="mb-6 text-5xl font-black text-green-600">“</div>

            <p className="mb-8 leading-8 text-slate-500">{item.quote}</p>

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-300" />

              <div>
                <h4 className="font-bold text-slate-900">{item.name}</h4>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}