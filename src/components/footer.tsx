"use client";

import { Github, Linkedin, Mail, Twitter ,Facebook,Instagram} from "lucide-react";

export function Footer({ siteInfoData }: { siteInfoData: any }) {
  return (
    <footer className="relative py-10 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Crafted by{" "}
            <span className="font-medium text-foreground">
              {siteInfoData?.data?.f_name} {siteInfoData?.data?.l_name}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with <span className="font-semibold">Next.js</span> · Deployed
            on <span className="font-semibold">Vercel</span>
          </p>
        </div>

        {/* Right Section (Socials) */}
        <div className="flex items-center space-x-5">
          {/* <a
            href={siteInfoData?.data?.github_url || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={siteInfoData?.data?.linkedin_url || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={siteInfoData?.data?.twitter_link || "https://twitter.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href={`mailto:${siteInfoData?.data?.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a> */}
          {[
            {
              icon: Github,
              href: siteInfoData?.data?.githup_link,
              label: "GitHub",
            },
            {
              icon: Linkedin,
              href: siteInfoData?.data?.linkedin_link,
              label: "LinkedIn",
            },
            {
              icon: Twitter,
              href: siteInfoData?.data?.twitter_link,
              label: "Twitter",
            },
            {
              icon: Facebook,
              href: siteInfoData?.data?.fb_link,
              label: "Facebook",
            },
            {
              icon: Instagram,
              href: siteInfoData?.data?.instagram_link,
              label: "Instagram",
            },
            {
              icon: Mail,
              href: `mailto:${siteInfoData?.data?.email}`,
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }, index) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className={`text-muted-foreground hover:text-primary transition-all duration-300 hover-glow animate-stagger-${
                index + 1
              }`}
            >
              <Icon className="h-6 w-6 hover:scale-125 transition-transform duration-300" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </footer>
  );
}
