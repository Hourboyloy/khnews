import React from "react";
import Container from "./Container";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white select-none text-xl flex justify-center items-center">
      <Container>
        <div className="h-[20vh] justify-center flex flex-col space-y-6">
          <ul className="flex gap-4 justify-center">
            <p>No navigation links available</p>
          </ul>
          <div className="flex gap-9 justify-center items-center">
            <Link href="/">
              <FaFacebook />
            </Link>
            <Link href="/">
              <FaInstagram />
            </Link>
            <Link href="/">
              <FaTelegram />
            </Link>
            <Link href="/">
              <FaX />
            </Link>
            <Link href="/">
              <FaYoutube />
            </Link>
            <Link href="/">
              <FaTiktok />
            </Link>
          </div>

          <p className="flex justify-center text-sm opacity-50">
            &copy;{new Date().getFullYear()} Khmer News, Inc. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
