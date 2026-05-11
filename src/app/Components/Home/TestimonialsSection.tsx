import SectionTitle from "../Shared/SectionTitle";

const testimonials = [
  {
    name: "Mrs. Farhana Islam",
    role: "Parent",
    text: "Greenfield High School has been a wonderful experience for my child.",
  },
  {
    name: "Rifat Ahmed",
    role: "Student (Class 10)",
    text: "I love studying at Greenfield. There are many opportunities to learn.",
  },
  {
    name: "Mr. Mahmudul Hasan",
    role: "Parent",
    text: "The school focuses on overall development which helped my child.",
  },
  {
    name: "Nusrat Jahan",
    role: "Student (Class 9)",
    text: "The teachers encourage us to think independently.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-0">
        <SectionTitle mini="What Parents & Students Say" title="Testimonials" />

        <div className="grid gap-6 lg:grid-cols-4">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="mb-8 leading-6 text-slate-500">{item.text}</p>

              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-slate-300" />

                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}