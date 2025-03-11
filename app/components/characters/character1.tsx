import Image from "next/image";
import Character from "./character";

export default function Character1({ ...props }: Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  return <Character width={550} height={1280} src={"/characters/1/idle.png"} {...props} />;
}
