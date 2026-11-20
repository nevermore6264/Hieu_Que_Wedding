import { wedding } from "@/lib/wedding";
import { shareCard, shareSize } from "@/lib/share-card";

export const alt = `Thiệp mời lễ cưới của ${wedding.groom.name} và ${wedding.bride.name}`;
export const size = shareSize;
export const contentType = "image/png";

export default function Image() {
  return shareCard();
}
