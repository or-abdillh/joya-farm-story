import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const WA_LINK = "https://wa.me/6285291822522";

const FinalCTA = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <img
      src={heroBg}
      alt=""
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-primary/85" />

    <div className="container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl text-primary-foreground mb-4">
          Siap Pesan? Yuk Ngobrol Dulu! 🐑
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          Hubungi kami sekarang untuk konsultasi gratis dan dapatkan hewan qurban terbaik.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-lime text-lime-foreground px-10 py-5 rounded-full text-xl font-semibold hover:brightness-110 transition-all shadow-xl mb-8"
        >
          💬 Chat WhatsApp Sekarang
        </a>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-primary-foreground/70 text-sm">
          <span>📞 0852-9182-2522</span>
          <span>📸 @joya.land</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
