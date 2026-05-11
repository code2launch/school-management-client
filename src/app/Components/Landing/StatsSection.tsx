'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 500, suffix: '+', label: 'Schools Onboarded', desc: 'Across Bangladesh' },
  { value: 125000, suffix: '+', label: 'Students Managed', desc: 'Active enrollments' },
  { value: 98, suffix: '%', label: 'Uptime Guaranteed', desc: 'Rock-solid reliability' },
  { value: 4.9, suffix: '/5', label: 'Satisfaction Score', desc: 'From school admins' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : count >= 1000 ? count.toLocaleString() : count;
  return <span ref={ref}>{display}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`text-center animate-count-up delay-${i * 100 + 100}`}>
              <div className="font-playfair font-bold text-4xl lg:text-5xl gradient-text mb-1">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-foreground text-sm mb-0.5">{stat.label}</div>
              <div className="text-muted-foreground text-xs">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
