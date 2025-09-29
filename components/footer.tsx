import {} from "lucide-react"

/* ============================================
   FOOTER COMPONENT
   Site footer with links and information
   ============================================ */

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Axius Vault</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A comprehensive collection of Open Source Intelligence tools and resources for security researchers,
              investigators, and OSINT practitioners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-white hover:text-white/80 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="text-white hover:text-white/80 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-white hover:text-white/80 transition-colors">
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Disclaimer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This directory is for educational and research purposes only. Always ensure you have proper authorization
              before conducting any investigations or accessing resources.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © 2025 Axius Vault. Built for security researchers.
          </p>
        </div>
      </div>
    </footer>
  )
}
