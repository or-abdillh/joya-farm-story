import { motion } from "framer-motion";

const steps = [
  { emoji: "💬", title: "Chat WhatsApp" },
  { emoji: "🐑", title: "Pilih Hewan" },
  { emoji: "✅", title: "Konfirmasi & DP" },
  { emoji: "🎉", title: "Selesai & Bahagia!" },
];

const HowToOrder = () => (
  <section id="how-to-order" className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl text-center text-foreground mb-16"
      >
        Cara Pesan
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-4">
              {s.emoji}
            </div>
            <div className="text-xs font-bold text-primary mb-1">
              {i + 1}.
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground">
              {s.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToOrder;
