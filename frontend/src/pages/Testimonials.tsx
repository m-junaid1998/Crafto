import { Star } from "lucide-react";

const reviews = [
  { name: "Ayesha Khan", text: "The quality is even better than expected! The finish is so clean and looks really classy." },
  { name: "Bilal Ahmed", text: "Super fast delivery to Lahore. Received everything safely packed without a single scratch." },
  { name: "Sera Sheikh", text: "Love the minimalist design. Totally transformed my room layout. Will definitely order again!" },
  { name: "Hamza Malik", text: "Very sturdy build and solid quality. Value for money item for sure." },
  { name: "Zainab Raza", text: "Exceeded my expectations! Color and material are exactly as shown on the website." },
  { name: "Omer Farooq", text: "Customer support was very helpful in tracking my parcel. Very happy with the overall service." },
  { name: "Mahnoor Tariq", text: "Beautiful craftsmanship. Got so many compliments from guests over the weekend!" },
  { name: "Daniyal Siddiqui", text: "Clean design and premium feel. Worth every rupee spent." },
  { name: "Fatima Noor", text: "Simple, practical, and elegant. Safe delivery and great packaging." },
];

export const Testimonials = () => (
  <section className="py-14 sm:py-20 bg-bg-light text-text-dark font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Client Reviews</span>
        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase tracking-wide">What Our Customers Say</h2>
        <div className="w-10 h-0.5 bg-accent mx-auto mt-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
        {reviews.map(({ name, text }, i) => (
          <div key={i} className="bg-card-bg border border-border p-5 sm:p-7 rounded-2xl shadow-sm hover:border-accent/60 transition-all space-y-3.5">
            <div className="flex items-center gap-3 border-b border-border/80 pb-3.5">
              <div className="w-10 h-10 rounded-full bg-primary text-accent font-serif font-bold text-xs flex items-center justify-center border border-accent/40 shrink-0">
                {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-text-dark uppercase tracking-wider truncate">{name}</h3>
            </div>
            <div className="flex gap-1">{[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-accent text-accent" />)}</div>
            <p className="text-xs sm:text-sm text-text-dark/85 leading-relaxed font-normal">"{text}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;