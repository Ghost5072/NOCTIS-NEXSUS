import { Link } from 'react-router-dom';
import { Twitter, Youtube, Twitch, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { path: '/', label: 'Home' },
      { path: '/tournaments', label: 'Tournaments' },
      { path: '/leaderboards', label: 'Leaderboards' },
      { path: '/news', label: 'News' },
      { path: '/community', label: 'Community' },
    ],
    social: [
      { icon: Twitter, label: 'Twitter', url: 'https://x.com/NoctisGamingng' },
      { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@noctisgamingng?si=UDsRzXgDrvktoErM' },
      { icon: Twitch, label: 'Twitch', url: 'https://www.twitch.tv/n0ctisng' },
    ],
  };

  return (
    <footer className="w-full bg-gradient-to-b from-background to-background/95 border-t border-off-white/10">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <span className="text-2xl md:text-3xl font-heading font-black text-primary">N</span>
              </div>
              <span className="font-heading text-lg md:text-2xl font-bold text-white break-words">NOCTIS</span>
            </div>
            <p className="font-paragraph text-xs md:text-sm text-off-white/70">
              Nigeria's Premier Student Esports Movement
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-off-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-xs md:text-sm text-off-white/70 hover:text-primary transition-colors break-words"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Games */}
          <div className="space-y-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-white">Featured Games</h3>
            <ul className="space-y-3 font-paragraph text-xs md:text-sm text-off-white/70">
              <li>Blood Strike</li>
              <li>Free Fire</li>
              <li>Call of Duty Mobile</li>
              <li>PUBG Mobile</li>
              <li>eFootball</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-white">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:noctisgamingng@gmail.com"
                className="flex items-center gap-3 font-paragraph text-xs md:text-sm text-off-white/70 hover:text-primary transition-colors break-words"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>noctisgamingng@gmail.com</span>
              </a>
              <p className="font-paragraph text-xs md:text-sm text-off-white/70">
                Join our community and compete in Nigeria's biggest student esports tournaments.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-off-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-paragraph text-xs md:text-sm text-off-white/50 text-center md:text-left break-words">
              © {currentYear} Noctis. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6 font-paragraph text-xs md:text-sm text-off-white/50 flex-wrap justify-center md:justify-end">
              <a href="#privacy" className="hover:text-primary transition-colors break-words">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary transition-colors break-words">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
