import { Check } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '৳ 0',
    period: 'forever',
    desc: 'Perfect for small schools getting started.',
    cta: 'Get started free',
    ctaHref: '/login',
    highlight: false,
    features: [
      'Up to 200 students',
      '5 teacher accounts',
      'Attendance & basic fees',
      'Class & section management',
      'Notice board',
    ],
  },
  {
    name: 'Standard',
    price: '৳ 999',
    period: 'per month',
    desc: 'The complete solution for mid-size schools.',
    cta: 'Start free trial',
    ctaHref: '/login',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Up to 1,000 students',
      'Unlimited teachers',
      'Full fee management + receipts',
      'Exam & report cards',
      'Parent portal access',
      'Monthly reports & analytics',
      'Email & SMS support',
    ],
  },
  {
    name: 'Premium',
    price: '৳ 2,499',
    period: 'per month',
    desc: 'For large schools or multi-campus institutions.',
    cta: 'Contact us',
    ctaHref: '#about',
    highlight: false,
    features: [
      'Unlimited students',
      'Multi-campus management',
      'Custom fee structures',
      'Advanced analytics',
      'Dedicated support',
      'Custom branding',
      'API access',
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="text-center mb-14">
          <span className="badge-navy mb-4 inline-block">Pricing</span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Affordable for every <span className="gradient-text">Bangladeshi school</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Transparent pricing with no hidden fees. Start free and grow at your own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all card-hover ${
                plan.highlight
                  ? 'bg-primary text-primary-foreground border-primary shadow-2xl scale-105'
                  : 'bg-card border-border shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[oklch(0.70_0.15_76)] text-[oklch(0.14_0.05_265)] text-xs font-bold shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className={`font-semibold text-sm mb-1 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`font-playfair font-bold text-4xl ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check size={15} className={plan.highlight ? 'text-[oklch(0.70_0.15_76)]' : 'text-primary'} />
                    <span className={plan.highlight ? 'text-primary-foreground/85' : 'text-foreground'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all ${
                  plan.highlight
                    ? 'bg-[oklch(0.70_0.15_76)] text-[oklch(0.14_0.05_265)] hover:bg-[oklch(0.75_0.14_80)]'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
