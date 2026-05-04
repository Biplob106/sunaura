import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            Sunaura
          </span>
          <p className="mt-3 text-sm leading-relaxed">
            Your premium summer shopping destination. Quality products, unbeatable deals.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: <FaFacebookF />, href: "#", label: "Facebook" },
              { icon: <FaInstagram />, href: "#", label: "Instagram" },
              { icon: <FaTwitter />, href: "#", label: "Twitter" },
              { icon: <FaYoutube />, href: "#", label: "YouTube" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-sky-500 hover:to-teal-500 hover:text-white flex items-center justify-center transition-all text-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "My Profile", href: "/profile" },
              { label: "Sign In", href: "/signin" },
              { label: "Register", href: "/signup" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-sky-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MdLocationOn className="text-sky-400 text-lg shrink-0 mt-0.5" />
              <span>123 Summer Street, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MdPhone className="text-sky-400 text-lg shrink-0" />
              <a href="tel:+8801700000000" className="hover:text-sky-400 transition-colors">+880 1700-000000</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MdEmail className="text-sky-400 text-lg shrink-0" />
              <a href="mailto:support@sunaura.com" className="hover:text-sky-400 transition-colors">support@sunaura.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Refund Policy", href: "/refunds" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-sky-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sunaura. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
