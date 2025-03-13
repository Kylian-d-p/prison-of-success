"use client";
import { useState } from 'react';

export default function FindPass() {
  const [attempts, setAttempts] = useState(5);
  
  function testPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");

    if (typeof password !== "string") {
      return;
    }

    e.currentTarget.reset();
    if (password === "password") {
      return window.location.href = "/play";
    }
    setAttempts(attempts - 1);
    console.log(attempts);
    if (attempts === 0) {
      return window.location.href = "/play";
    }
  }

  return (
    <div className="w-full h-full pr-[20px]">
      <h1 className="text-center text-7xl mt-[100px]">Trouve le mot de passe</h1>
      <form onSubmit={testPassword}>
        <div className="w-[300px] h-[300px] bg-transparent-200 flex flex-col justify-center items-center gap-5 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[150px] bg-transparent flex justify-center items-center">
            <input
              type="text"
              name="password"
              className="w-[550px] h-[100px] border-2 border-black rounded-lg text-center bg-white focus-visible:outline-0 text-black text-7xl"
            />
          </div>
          <button
            type="submit"
            className="w-[400px] h-[70px] bg-black text-white rounded-lg text-5xl"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
