"use client";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// Navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Job Search", href: "/search" },
  { name: "Saved Jobs", href: "/my-jobs" },
  { name: "Profile", href: "/profile" },
]

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  console.log(user?.role);
  const router = useRouter();
  const handleLogout = () => {
	logout();
	router.push("/login");
  };
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = React.useState(false);

  const toggleMobileMenu = () => {
	setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">Job Board</span>
        </div>
        {/* Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex gap-6 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-blue-50"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}
        {/* User/Login section */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
           <>
		   </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">
                {user?.username ?? ""}
              </span>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors font-semibold shadow-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
		  	className="p-2 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
			onClick={toggleMobileMenu}
			aria-label="Open Menu"
			>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
	  {/* Mobile Menu */}
	  {isMobileMenuOpen && isAuthenticated && (
		<nav className="flex flex-col md:hidden gap-2 p-4 bg-white shadow-md">
			<ul className="flex flex-col gap-2">
				 {navLinks.map((link) => (
					<li key={link.name}>
							<a
							key={link.name}
							href={link.href}
							className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
							onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.name}
							</a>
					</li>
				))};
				<li>
					<button
						className="w-full bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors font-semibold shadow-sm"
						onClick={() => {
							handleLogout();
							setIsMobileMenuOpen(false);
						}}
					>
						Logout
					</button>
				</li>
			</ul>
		 
		</nav>
	  )}
    </header>
  );
}