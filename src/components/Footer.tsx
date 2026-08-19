interface FooterDict {
  name: string;
  tagline: string;
  area: string;
  rights: string;
}

export function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand-name">{dict.name}</p>
          <p className="footer__tagline">{dict.tagline}</p>
        </div>

        <div className="footer__links">
          <span>{dict.area}</span>
          <a
            href="https://www.instagram.com/makeupbygocke/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @makeupbygocke
          </a>
        </div>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Gökçe Dila Çağlayan. All rights reserved {" "}
          <a
            href="https://www.instagram.com/bucakyazilim/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            @bucakyazilim
          </a>
        </p>
      </div>
    </footer>
  );
}
