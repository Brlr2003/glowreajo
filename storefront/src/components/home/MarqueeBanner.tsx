import { Sparkles } from "lucide-react"

const items = [
  "Free Shipping in Amman",
  "100% Authentic K-Beauty",
  "Cash on Delivery",
  "New Arrivals Weekly",
  "Trusted by 5000+ Customers",
]

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-primary to-secondary py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-2 text-sm font-medium text-white">
            <Sparkles className="h-3 w-3" />
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
