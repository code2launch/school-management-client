import { Medal } from "lucide-react";
import SectionTitle from "../Shared/SectionTitle";

const achievements = [
  "National Award 2023",
  "Champions 2024",
  "Science Fair 2024",
  "Debate Champions",
];

export default function AchievementsSection() {
  return (
    <section className="mx-auto max-w-7xl pb-24 px-6 md:px-0">
      <SectionTitle mini="Our Achievements" title="Recognition & Success" />

      <div className="grid gap-6 lg:grid-cols-4">
        {achievements.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
              <Medal className="text-yellow-600" />
            </div>

            <h3 className="text-xl font-bold">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}