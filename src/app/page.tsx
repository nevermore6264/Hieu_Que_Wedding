import { Couple } from "@/components/Couple";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Gift } from "@/components/Gift";
import { Hero } from "@/components/Hero";
import { Invitation } from "@/components/Invitation";
import { Moments } from "@/components/Moments";
import { Nav } from "@/components/Nav";
import { Photobook } from "@/components/Photobook";
import { QuoteBand } from "@/components/QuoteBand";
import { Rsvp } from "@/components/Rsvp";
import { weddingJsonLd } from "@/lib/wedding";

export default function HomePage() {
  const jsonLd = weddingJsonLd();

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <Nav />
      <main>
        <Hero />
        <Invitation />
        <Couple />
        <Moments />
        <Events />
        <Gallery />
        <Photobook />
        <QuoteBand />
        <Gift />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
