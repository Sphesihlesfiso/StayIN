// import {
//   FaFacebook,
//   FaGithub,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter,
// } from "react-icons/fa";
//
// import {
//   Logo,
//   LogoImageDesktop,
//   LogoImageMobile,
// } from "@/components/shadcnblocks/logo";

import { cn } from "cn"
const year = new Date().getFullYear()
import { HeartIcon } from "lucide-react"
interface FooterLink {
  name: string
  href: string
}
interface FooterSection {
  title: string
  links: FooterLink[]
}
interface FooterLogo {
  url: string
  src: string
  alt: string
  title: string
}

interface FooterBasicProps {
  logo?: FooterLogo
  description?: string
  sections?: FooterSection[]
  copyright?: React.ReactNode // <-- Changed from 'string' to 'React.ReactNode'
  legalLinks?: FooterLink[]
  className?: string
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string
}
type Props = Partial<Footer2Props>

const defaultProps: Footer2Props = {
  description: "Find your next home or teenant with us.",
  sections: [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Features", href: "#" },
        { name: "Integrations", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help center", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Status", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Guides", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Sales", href: "#" },
        { name: "Advertise", href: "#" },
      ],
    },
  ],
  copyright: (
    <>
      Made with{" "}
      <HeartIcon className="inline h-3.5 w-3.5 fill-red-600 text-red-600" /> in
      South Africa © {year} StayIn.
    </>
  ),
  legalLinks: [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
}

const MAX_SECTIONS = 4

const Footer2 = (props: Props) => {
  const { description, sections, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  }

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS)

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="w-full px-6 md:px-8">
        <footer>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
            <div className="col-span-2 mb-8 md:col-span-3 xl:col-span-2 xl:mb-0">
              <div className="flex items-center lg:justify-start">
                <div>
                  <h1 className="p-0.5 text-2xl font-bold text-primary">
                    StayIn.
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {description}
              </p>
            </div>
            {visibleSections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="min-w-0">
                <h3 className="mb-4 text-sm font-semibold tracking-tight">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground">
            <p>{copyright}</p>
            <ul className="flex flex-wrap gap-4">
              {legalLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer2 }
