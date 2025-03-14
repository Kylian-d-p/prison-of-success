"use client";

import { useRouter } from "next/navigation";

export default function ResetButton() {
  const router = useRouter();
  const clickHandler = () => {
    if (confirm("Êtes-vous sûr de vouloir recommencer ?")) {
      localStorage.removeItem("choicesHistory");
      router.push("/");
    }
    document.documentElement.requestFullscreen();
  };

  return (
    <button className="z-50 fixed top-4 right-16 p-2 rounded-md bg-gray-800 text-white" onClick={clickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>
  );
}
