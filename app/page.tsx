import { Vault } from "@/components/Vault";
import { VaultBalance } from "@/components/VaultBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-4 font-[family-name:var(--font-geist-sans)]">
      <ConnectButton />
      <VaultBalance />
      <Vault />
    </div>
  );
}
