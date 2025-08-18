import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Users2,
  TrendingUp,
  Bot,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import NavIcon from "./NavIcon";
import MegaNav from "../navigation/MegaNav";
import MobileDrawer from "../navigation/MobileDrawer";

export default function PremiumHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] isolation-isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className="h-16 mt-3 flex items-center justify-between
                        rounded-2xl bg-[#0b1220]/70 backdrop-blur-xl border border-white/10 px-3"
        >
          {/* Brand */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/assets/BLUEYELOGO.png"
              alt="BlueEye Homes"
              className="w-9 h-9 object-contain"
            />
            <div className="leading-none">
              <div className="text-white/90 font-semibold">BlueEye Homes</div>
              <div className="text-[10px] text-white/50">
                Real Estate Metaverse
              </div>
            </div>
          </a>

          {/* Nav con iconos premium */}
          <div className="relative hidden lg:flex items-center gap-2">
            <MegaNav />
            <a href="/metaverse">
              <NavIcon
                icon={<Globe className="w-5 h-5 text-violet-300" />}
                label="Metaverso"
              />
            </a>
            <a href="/community">
              <NavIcon
                icon={<Users2 className="w-5 h-5 text-emerald-300" />}
                label="Comunidad"
              />
            </a>
            <a href="/investors">
              <NavIcon
                icon={<TrendingUp className="w-5 h-5 text-amber-300" />}
                label="Inversión"
              />
            </a>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("blueeye:assistant"))
              }
            >
              <NavIcon
                icon={<Bot className="w-5 h-5 text-sky-300" />}
                label="Concierge IA"
              />
            </button>
          </div>

          {/* CTA */}
          <div className="hidden sm:flex">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/invite"
              className="px-4 py-2 rounded-xl bg-gradient-to-tr from-cyan-400/25 to-violet-400/25
                         text-white border border-white/15 hover:from-cyan-400/35 hover:to-violet-400/35
                         backdrop-blur-md font-semibold"
            >
              Solicitar invitación
            </motion.a>
          </div>

          {/* Mobile Menu */}
          <MobileDrawer />
        </nav>
      </div>
    </header>
  );
}
