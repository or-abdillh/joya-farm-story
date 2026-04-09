import { motion } from "framer-motion";

const WA_LINK = "https://wa.me/6289608563499";

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
  <section className="relative min-h-screen flex items-center bg-cream pt-20 overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-20 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-60" />
    <div className="absolute bottom-10 left-0 w-96 h-96 bg-lime/30 rounded-full blur-3xl opacity-40" />

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center md:text-left md:mx-0"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
          Penyedia Domba & Kambing Qurban,{" "}
          <span className="text-primary">Higienis & 100% Sehat</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Kami menjamin setiap hewan qurban dirawat dengan standar kebersihan
          tertinggi — sehat, layak syariat, dan siap untuk momen ibadah
          terbaikmu.
        </p>

        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
          {badges.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-2 bg-secondary/60 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
            >
              {b.emoji} {b.text}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            💬 Chat WhatsApp Sekarang
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Lihat Produk
          </a>
        </div>

        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display text-primary">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
