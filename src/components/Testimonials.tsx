import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Pak Ahmad Fauzi",
    location: "Jakarta Selatan",
    type: "Aqiqah",
    text: "Kambingnya gemuk dan sehat banget! Prosesnya transparan, dikirim foto dan video.",
  },
  {
    name: "Bu Sari Dewi",
    location: "Bekasi",
    type: "Kurban",
    text: "Pertama beli online, awalnya ragu. Tapi Joya Land responsenya cepat dan kambingnya beneran bagus!",
  },
  {
    name: "Bro Rizal M.",
    location: "Depok",
    type: "Nabung Kurban",
    text: "Program nabung kurbannya keren! Cicil dari jauh-jauh hari, harga terkunci, nggak pusing mepet Idul Adha.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 md:py-28 bg-cream">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl text-center text-foreground mb-16"
      >
        Kata Mereka
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-background rounded-2xl p-8 shadow-sm border border-border"
          >
            <div className="text-yellow-500 mb-3">★★★★★</div>
            <p className="text-foreground mb-6 italic">"{t.text}"</p>
            <div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">
                {t.location} — {t.type}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
