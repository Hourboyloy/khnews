"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import AuthForm from "@/components/Auth";
import SearchComponent from "./SearchComponent";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notification from "./Notifications";
import { FaUser } from "react-icons/fa6";
import { useGlobalContext } from "../context/GlobalContext";

export const navLinks = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "កម្សាន្ត", href: "/entertainment" },
  { label: "កីឡា", href: "/sport" },
  { label: "ជីវិតនិងសង្គម", href: "/life" },
];

const Header = () => {
  const { isLogin, handleClearStorage } = useGlobalContext();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [account, setAccount] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleNotifications = () => {
    setNotifications(!notifications);
    setAccount(false);
  };
  const toggleAccount = () => {
    setAccount(!account);
    setNotifications(false);
  };

  return (
    <header className="sticky bg-slate-100 top-0 z-10 w-full shadow-md select-none">
      <div className="py-4">
        <Container>
          <nav className="flex justify-between items-center">
            <div className="flex gap-20">
              <Link
                href="/"
                className="flex items-center text-3xl text-red-500"
                aria-label="Home"
              >
                <h2 className="bayon">News</h2>
              </Link>
              <ul className="text-blue-800 hidden md:flex items-center gap-4">
                {navLinks.map((link) => (
                  <li className="text-base cursor-pointer" key={link.label}>
                    <Link
                      className="bayon text-xs sm:text-[0.8rem] lg:text-xl hover:text-blue-600 transition-colors"
                      href={link.href}
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <SearchComponent />
              {/* <Button
                onClick={openAuthModal}
                className="bayon"
                aria-label="Account"
              >
                គណនី
              </Button> */}

              <button
                onClick={toggleNotifications}
                className="relative h-[41px] w-[41px] bg-[#E2E5E9] rounded-full transition-all duration-300 hover:bg-[#d6d9dd] flex items-center justify-center outline-none focus:outline-none"
              >
                <IoMdNotificationsOutline className="text-2xl text-gray-700" />
                <p className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center p-1.5">
                  99+
                </p>
              </button>

              <div
                onClick={toggleAccount}
                aria-label="Account"
                className="relative h-[41px] w-[41px] bg-[#E2E5E9] cursor-pointer rounded-full transition-all duration-300 hover:bg-[#d6d9dd] flex items-center justify-center outline-none focus:outline-none"
              >
                <FaUser className="text-lg text-gray-600" />
                {account ? (
                  isLogin === "1" ? (
                    <div className=" absolute z-10 -right-6/12 top-16 w-40 bg-white flex flex-col border shadow rounded">
                      <button className="py-2 w-full hover:bg-[#F1F5F9]">
                        ប្រវត្តិរូប
                      </button>
                      <button
                        onClick={handleClearStorage}
                        className="py-2 w-full hover:bg-[#F1F5F9]"
                      >
                        ចេញ
                      </button>
                    </div>
                  ) : (
                    <div className=" absolute z-10 -right-6/12 top-16 w-40 bg-white flex flex-col border shadow rounded">
                      <button
                        onClick={openAuthModal}
                        className="py-2 w-full hover:bg-[#F1F5F9]"
                      >
                        ចូលគណនី
                      </button>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>

              {notifications && (
                <div className=" absolute z-10 right-2 top-14">
                  <Notification />
                </div>
              )}

              <button
                className="md:hidden text-red-500"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                ☰
              </button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <ul className="md:hidden text-blue-800 flex flex-col items-center gap-4 mt-4">
              {navLinks.map((link) => (
                <li className="text-base cursor-pointer" key={link.label}>
                  <Link
                    className="bayon text-xs sm:text-[0.8rem] lg:text-xl hover:text-blue-600 transition-colors"
                    href={link.href}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>

      <Dialog open={isAuthModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogTitle className="hidden"></DialogTitle>
          <AuthForm closeModal={closeAuthModal} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
