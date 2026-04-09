import { motion } from "framer-motion";

const WA_LINK = "https://wa.me/6289608563499";

const FinalCTA = () => (
  <section className="py-20 md:py-28 bg-lime">
    <div className="container text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl text-lime-foreground mb-6">
          Siap Pesan? Yuk Ngobrol Dulu! 🐑
        </h2>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full text-xl font-semibold hover:opacity-90 transition-opacity shadow-xl mb-8"
        >
          💬 Chat WhatsApp Sekarang
        </a>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-lime-foreground/80 text-sm">
          <span>📞 0896 0856 3499</span>
          <span>📸 @joya.land</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
