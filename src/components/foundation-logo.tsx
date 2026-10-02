import Image from "next/image";

export function FoundationLogo({ className }: { className?: string }) {
  return <Image className={className} src="/img/logo.png" alt="Tanglaw Touch Care Foundation logo" width={300} height={300} priority />;
}
