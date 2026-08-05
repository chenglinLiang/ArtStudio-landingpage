import { Instagram, Twitter, Mail } from "lucide-react";
import { site } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-sm">
            <a
              href="#top"
              className="font-serif text-xl tracking-tight text-ink"
            >
              {site.name}
            </a>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold">
              {site.launchNote}
            </p>
          </div>

          {/* links */}
          <nav
            aria-label="Footer"
            className="flex flex-col gap-3 font-sans text-sm"
          >
            <FooterLink href="#">Privacy</FooterLink>
            {/* TODO: replace with a real Privacy route / document when available. */}
            <FooterLink href={`mailto:${site.contactEmail}`}>
              Contact
            </FooterLink>
            <FooterLink href="#early-access">Early Access</FooterLink>
          </nav>

          {/* social */}
          <div className="flex gap-3">
            <SocialIcon
              href={site.social.instagram}
              label="Artfolio on Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </SocialIcon>
            <SocialIcon href={site.social.twitter} label="Artfolio on X / Twitter">
              <Twitter size={18} strokeWidth={1.5} />
            </SocialIcon>
            <SocialIcon
              href={`mailto:${site.contactEmail}`}
              label="Email Artfolio"
            >
              <Mail size={18} strokeWidth={1.5} />
            </SocialIcon>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="font-sans text-xs text-ink-muted">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      {children}
    </a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-ink/30 hover:text-ink"
    >
      {children}
    </a>
  );
}
