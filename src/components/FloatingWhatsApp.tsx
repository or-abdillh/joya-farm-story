const WA_LINK =
  "https://wa.me/6285291822522?text=Halo%20Joya%20Land!%20Saya%20mau%20tanya%20soal%20qurban%20domba%20dan%20kambing.";

const FloatingWhatsApp = () => (
  <a
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl shadow-xl animate-pulse-wa hover:scale-110 transition-transform"
  >
    💬
  </a>
);

export default FloatingWhatsApp;
