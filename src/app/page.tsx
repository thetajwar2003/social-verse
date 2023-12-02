"use client";
import { useState } from "react";

import Link from "next/link";
import AuthLayout from "./authLayout";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    console.log(openModal);
    setOpenModal(!openModal);
  };

  return (
    <AuthLayout>
      <Link href={"/login"}>login rq</Link>
    </AuthLayout>
  );
}
