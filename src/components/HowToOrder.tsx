import { motion } from "framer-motion";

const steps = [
  { emoji: "💬", title: "Chat WhatsApp", desc: "Hubungi kami untuk konsultasi" },
  { emoji: "🐑", title: "Pilih Hewan", desc: "Kami bantu pilihkan yang terbaik" },
  { emoji: "✅", title: "Konfirmasi & DP", desc: "Bayar DP untuk mengunci pesanan" },
  { emoji: "🎉", title: "Selesai!", desc: "Hewan dikirim ke lokasi kamu" },
];

const HowToOrder = () => (
  <section id="how-to-order" className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          Cara Pesan
        </span>
        <h2 className="text-3xl md:text-4xl text-foreground">
          4 Langkah Mudah
        </h2>
      </motion.div>

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
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                {s.emoji}
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {s.title}
            </h3>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToOrder;
