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
    <section id="pricing" className="py-24 text-black">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="text-center mb-14">
          <span className="badge-navy mb-4 inline-block">Pricing</span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl  mb-4">
            Affordable for every <span className="gradient-text">Bangladeshi school</span>
          </h2>
          <p className=" max-w-md mx-auto text-muted-foreground">
            Transparent pricing with no hidden fees. Start free and grow at your own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border border-gray-300 transition-all card-hover ${plan.highlight
                ? 'bg-green-500/20  shadow-2xl scale-105 '
                : ' shadow-sm'
                }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-green-600  text-xs font-bold shadow-md text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className={`font-semibold text-sm mb-1 ${plan.highlight ? '' : ''}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`font-playfair font-bold text-4xl ${plan.highlight ? '' : ''}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? '' : ''}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.highlight ? '' : ''}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check size={15} className={plan.highlight ? 'text-green-500' : 'text-primary'} />
                    <span className={plan.highlight ? '' : ''}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all text-white ${plan.highlight
                  ? 'bg-green-600  hover:bg-green-500'
                  : 'bg-green-600  hover:bg-green-500'
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
