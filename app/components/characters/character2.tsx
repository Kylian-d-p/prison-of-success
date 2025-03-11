import Image from "next/image";
import Character from "./character";

export default function Character2({ ...props }: Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  return <Character width={505} height={1280} src={"/characters/2/idle.png"} {...props} />;
}
