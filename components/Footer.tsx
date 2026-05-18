const Footer = () => (
  <footer className="bg-foreground text-background py-10">
    <div className="container text-center">
      <p className="text-sm opacity-80 mb-2">© 2025 Joya Land</p>
      <p className="text-sm opacity-60">
        📸{" "}
        <a
          href="https://instagram.com/joya.land"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          @joya.land
        </a>
      </p>
      <p className="text-xs opacity-40 mt-2">
        #GembalaDariJoya | #HappyWithJoya
      </p>
    </div>
  </footer>
);

export default Footer;
