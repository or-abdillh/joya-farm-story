import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Apakah kambing/domba sudah memenuhi syarat qurban/aqiqah?",
    a: "Ya, semua hewan kami sudah memenuhi syarat syariat Islam untuk qurban maupun aqiqah. Kami memastikan hewan dalam kondisi sehat, cukup umur, dan tidak cacat.",
  },
  {
    q: "Apakah bisa pesan online dari luar kota?",
    a: "Tentu! Kami menerima pesanan dari seluruh Indonesia. Hubungi kami via WhatsApp untuk informasi pengiriman ke daerah Anda.",
  },
  {
    q: "Bagaimana cara bayar dan berapa DP-nya?",
    a: "Pembayaran bisa melalui transfer bank. DP minimal 50% dari harga hewan. Sisanya dilunasi sebelum hari H.",
  },
  {
    q: "Bisa lihat kondisi hewan sebelum dipotong?",
    a: "Bisa! Kami akan mengirimkan foto dan video hewan pilihan Anda. Anda juga bisa berkunjung langsung ke peternakan.",
  },
  {
    q: "Berapa lama lead time pemesanan?",
    a: "Kami sarankan pesan minimal 2 minggu sebelumnya. Untuk program Nabung Kurban, bisa dimulai kapan saja.",
  },
  {
    q: "Apakah ada layanan antar ke lokasi?",
    a: "Ya, kami menyediakan layanan antar ke lokasi Anda. Biaya pengiriman tergantung jarak dan area tujuan.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-20 md:py-28 bg-primary">
    <div className="container max-w-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl text-primary-foreground text-center mb-16"
      >
        Pertanyaan Umum
      </motion.h2>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-primary-foreground/10 border-none rounded-xl px-6 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-primary-foreground text-left hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-primary-foreground/80 pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
