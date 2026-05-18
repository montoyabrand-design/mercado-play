const footerLinks = [
  "Trabaja con nosotros",
  "Terminos y condiciones",
  "Privacidad",
  "Ayuda",
  "Accesibilidad",
];

export function Footer() {
  return (
    <footer
      className="w-full"
      style={{ borderTop: "1px solid rgba(247,248,248,0.07)" }}
    >
      <div
        className="max-w-[1280px] mx-auto px-10 flex items-center justify-between"
        style={{ height: 124 }}
      >
        {/* Meli Play logo */}
        <img src="/img/logo-meli-play.svg" alt="Meli Play" height={28} style={{ height: 28, width: "auto" }} />

        {/* Links */}
        <nav className="flex items-center gap-6 flex-wrap justify-end">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-ui text-[14px] font-medium text-[#f7f8f8] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom micro line */}
      <div
        className="max-w-[1280px] mx-auto px-10 pb-5"
        style={{ borderTop: "1px solid rgba(247,248,248,0.04)" }}
      >
        <p className="font-ui text-[14px] font-medium pt-4" style={{ color: "rgba(247,248,248,0.40)" }}>
          Copyright © Meli Uruguay S.R.L.
        </p>
      </div>
    </footer>
  );
}
