import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const WA_LINK = "https://wa.me/6285291822522";

const badges = [
  { emoji: "✅", text: "Standar Perawatan Higienis" },
  { emoji: "🩺", text: "Kesehatan Hewan 100% Terjamin" },
  { emoji: "🕌", text: "Memenuhi Syarat Syariat" },
];

const stats = [
  { value: "500+", label: "Pesanan Selesai" },
  { value: "100%", label: "Kambing Sehat" },
  { value: "⭐ 4.9", label: "Rating" },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Full-bleed background image */}
    <img
      src={heroBg}
      alt="Peternakan kambing Joya Land"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    {/* Dark overlay for text readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />

    <div className="container relative z-10 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <span className="inline-block bg-lime text-lime-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          #GembalaDariJoya
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-background mb-6">
          Penyedia Domba & Kambing Qurban,{" "}
          <span className="text-lime">Higienis & 100% Sehat</span>
        </h1>
        <p className="text-lg md:text-xl text-background/80 max-w-xl mb-8">
          Kami menjamin setiap hewan qurban dirawat dengan standar kebersihan
          tertinggi — sehat, layak syariat, dan siap untuk momen ibadah
          terbaikmu.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {badges.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-2 bg-background/15 backdrop-blur-sm text-background px-4 py-2 rounded-full text-sm font-medium border border-background/20"
            >
              {b.emoji} {b.text}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-lime text-lime-foreground px-8 py-4 rounded-full text-lg font-semibold hover:brightness-110 transition-all shadow-lg"
          >
            💬 Chat WhatsApp Sekarang
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 border-2 border-background/60 text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-background/10 transition-colors"
          >
            Lihat Produk
          </a>
        </div>

        <div className="flex flex-wrap gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display text-lime">
                {s.value}
              </div>
              <div className="text-sm text-background/70">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
