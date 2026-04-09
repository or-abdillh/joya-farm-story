import { motion } from "framer-motion";

const WA_LINK = "https://wa.me/6289608563499";

const products = [
  {
    emoji: "🐐",
    title: "Aqiqah Kambing",
    desc: "Untuk syukuran kelahiran buah hati. Sesuai syariat, tersedia dokumentasi proses.",
    featured: false,
  },
  {
    emoji: "🐑",
    title: "Kambing & Domba Qurban",
    desc: "Untuk Idul Adha, hewan sehat dan terawat. Tersedia layanan pengiriman ke lokasi.",
    featured: true,
  },
  {
    emoji: "💰",
    title: "Nabung Kurban",
    desc: "Program cicilan kurban. Harga terkunci sejak hari pertama, pantau hewan pilihanmu.",
    featured: false,
  },
];

const Products = () => (
  <section id="products" className="py-20 md:py-28 bg-primary">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl text-primary-foreground text-center mb-16"
      >
        Produk Kami
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-8 flex flex-col ${
              p.featured
                ? "bg-orange text-orange-foreground ring-4 ring-lime scale-105"
                : "bg-background text-foreground"
            }`}
          >
            <div className="text-5xl mb-4">{p.emoji}</div>
            <h3 className="text-2xl mb-3">{p.title}</h3>
            {p.featured && (
              <span className="inline-block bg-lime text-lime-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                POPULER
              </span>
            )}
            <p className={`text-sm mb-6 flex-1 ${p.featured ? "text-orange-foreground/80" : "text-muted-foreground"}`}>
              {p.desc}
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 ${
                p.featured
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              💬 Pesan via WhatsApp
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
