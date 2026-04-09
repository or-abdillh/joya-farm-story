import { motion } from "framer-motion";

const values = [
  {
    emoji: "♻️",
    title: "Sustainable Farming",
    desc: "Proses peternakan ramah lingkungan dan berkelanjutan untuk masa depan yang lebih baik.",
  },
  {
    emoji: "🔍",
    title: "Transparan & Jujur",
    desc: "Kami tunjukkan kondisi peternakan, kesehatan hewan, dan proses pemotongan secara transparan.",
  },
  {
    emoji: "🤝",
    title: "Pelayanan Hangat",
    desc: "Tim kami siap membantu dari konsultasi hingga pengiriman dengan pelayanan yang ramah.",
  },
];

const About = () => (
  <section id="about" className="py-20 md:py-28 bg-cream">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl text-foreground mb-4">
          Dari Peternakan, Dengan Sepenuh Hati
        </h2>
        <p className="text-muted-foreground text-lg">
          Joya Land adalah peternakan kambing & domba yang dikelola dengan penuh
          cinta. Nama "Joya" berasal dari kata "joy" — kebahagiaan. Kami
          memastikan semua merasakan kebahagiaan: peternak, hewan, dan pelanggan.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border"
          >
            <div className="text-4xl mb-4">{v.emoji}</div>
            <h3 className="text-xl text-foreground mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-sm">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
