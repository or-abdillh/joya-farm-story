import { motion } from "framer-motion";
import aqiqahImg from "@/assets/aqiqah-goat.jpg";
import qurbanImg from "@/assets/qurban-goat.jpg";
import nabungImg from "@/assets/nabung-kurban.jpg";

const WA_LINK = "https://wa.me/6289608563499";

const products = [
  {
    img: aqiqahImg,
    title: "Aqiqah Kambing",
    desc: "Untuk syukuran kelahiran buah hati. Sesuai syariat, tersedia dokumentasi proses.",
    featured: false,
  },
  {
    img: qurbanImg,
    title: "Kambing & Domba Qurban",
    desc: "Untuk Idul Adha, hewan sehat dan terawat. Tersedia layanan pengiriman ke lokasi.",
    featured: true,
  },
  {
    img: nabungImg,
    title: "Nabung Kurban",
    desc: "Program cicilan kurban. Harga terkunci sejak hari pertama, pantau hewan pilihanmu.",
    featured: false,
  },
];

const Products = () => (
  <section id="products" className="py-20 md:py-28 bg-primary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block bg-lime text-lime-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          Produk Kami
        </span>
        <h2 className="text-3xl md:text-4xl text-primary-foreground">
          Pilih Sesuai Kebutuhanmu
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl overflow-hidden flex flex-col group ${
              p.featured
                ? "bg-orange ring-4 ring-lime scale-105"
                : "bg-background"
            }`}
          >
            {/* Product image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {p.featured && (
                <span className="absolute top-4 right-4 bg-lime text-lime-foreground text-xs font-bold px-3 py-1 rounded-full">
                  POPULER
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className={`text-xl font-display mb-2 ${p.featured ? "text-orange-foreground" : "text-foreground"}`}>
                {p.title}
              </h3>
              <p className={`text-sm mb-6 flex-1 ${p.featured ? "text-orange-foreground/80" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:brightness-110 ${
                  p.featured
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                💬 Pesan via WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
