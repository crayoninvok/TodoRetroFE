import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      ),
      color: "pink",
      href: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
      ),
      color: "blue",
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      ),
      color: "yellow",
      href: "#",
    },
  ];

  // Quick links
  const links = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "About", path: "/about" },
    { name: "Stats", path: "/stats" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Footer background with grid effect */}
      <div className="absolute inset-0 bg-dark-purple bg-opacity-80">
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
        <div className="scanline opacity-10"></div>
      </div>

      {/* Neon line separator at top */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-blue via-pink to-yellow opacity-70"></div>
        <div className="h-px mt-1 bg-gradient-to-r from-yellow via-pink to-blue opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and description */}
          <div className="arcade-screen p-6 animate-fade-in">
            <h3 className="text-2xl font-bold pixel-text mb-4 text-yellow">
              SPEKTRA
              <div className="h-px mt-2 w-full bg-gradient-to-r from-yellow to-pink"></div>
            </h3>
            <p className="text-light-gray retro-text">
              A stylish task management application with a synthwave aesthetic.
              Level up your productivity in an arcade-inspired digital
              environment.
            </p>
            <div className="mt-4 text-sm text-light-gray opacity-70">
              CREDITS: <span className="text-yellow">∞</span>
            </div>
          </div>

          {/* Quick links */}
          <div
            className="p-6 arcade-screen animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="text-xl font-bold pixel-text mb-4 text-pink">
              QUICK LINKS
              <div className="h-px mt-2 w-full bg-gradient-to-r from-pink to-blue"></div>
            </h3>
            <ul className="space-y-3 stagger-animation">
              {links.map((link, index) => (
                <li key={index} className="task-item-hover">
                  <Link
                    href={link.path}
                    className="text-light-gray hover:text-pink transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="inline-block w-3 h-3 bg-pink opacity-50 group-hover:opacity-100 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect section */}
          <div
            className="p-6 arcade-screen animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl font-bold pixel-text mb-4 text-blue">
              CONNECT
              <div className="h-px mt-2 w-full bg-gradient-to-r from-blue to-yellow"></div>
            </h3>

            {/* Newsletter signup */}
            <div className="mb-6">
              <p className="text-light-gray mb-3 retro-text">
                Join our player network:
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input text-sm py-2 flex-1 bg-opacity-20"
                />
                <button className="button button-accent ml-2 py-2 pixel-text">
                  JOIN
                </button>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-light-gray mb-3 retro-text">Follow us:</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-${social.color} bg-opacity-20 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 animate-float`}
                    aria-label={social.name}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: "3s",
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar with arcade aesthetic */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-light-gray text-sm">
              <div className="arcade-display bg-black bg-opacity-30 px-3 py-1 border border-white border-opacity-10 rounded">
                <span className="animate-blink inline-block mr-1">▹</span>©{" "}
                {currentYear} SPEKTRA ARCADE
              </div>
            </div>

            <div className="text-xs text-light-gray opacity-70 flex flex-wrap justify-center">
              <a href="#" className="mx-2 hover:text-pink">
                Privacy
              </a>
              <a href="#" className="mx-2 hover:text-pink">
                Terms
              </a>
              <a href="#" className="mx-2 hover:text-pink">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow via-pink to-blue opacity-30"></div>
    </footer>
  );
}
