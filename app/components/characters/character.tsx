"use client";
import Image from "next/image";

export default function Character({ className, ...props }: Omit<React.ComponentProps<typeof Image>, "alt">) {
  return <Image alt="Personnage" {...props} className={`object-contain ${className}`} />;
}
