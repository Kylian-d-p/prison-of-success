"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FindPass() {
  const [attempts, setAttempts] = useState(5);
  const router = useRouter();

  function testPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");

    if (typeof password !== "string") {
      return;
    }

    e.currentTarget.reset();
    if (password.toLowerCase() === "rouge") {
      return router.push("/minigames/find-pass/congratulation");
    }
    setAttempts(attempts - 1);

    if (attempts <= 1) {
      return router.push("/minigames/find-pass/fail");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-center text-7xl mt-[100px] text-bordered">Trouve le mot de passe</h1>
      <p className="text-center text-2xl text-bordered">
        Afin de mener votre enquête à bien, il vous faut deviner le mot de passe grâce aux indices disposés dans le bureau.
      </p>
      <form onSubmit={testPassword} autoComplete="off" className="flex flex-col gap-2 items-center">
        <div className="bg-transparent flex justify-center items-center">
          <input
            autoComplete="off"
            type="text"
            name="password"
            className="w-[550px] h-[100px] border-2 border-black rounded-lg text-center bg-white focus-visible:outline-0 text-black text-7xl"
          />
        </div>
        <button type="submit" className="w-full h-[70px] bg-black text-white rounded-lg text-5xl">
          Valider
        </button>
      </form>
      <div className="fixed top-2.5 left-5 text-2xl text-bordered">nombre d&apos;essais restant: {attempts}</div>
    </div>
  );
}
