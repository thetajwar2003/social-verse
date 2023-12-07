"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
