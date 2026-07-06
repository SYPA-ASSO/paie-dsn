import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pourquoi from "@/components/Pourquoi";
import Prestations from "@/components/Prestations";
import Etapes from "@/components/Etapes";
import PourQui from "@/components/PourQui";
import Tarifs from "@/components/Tarifs";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SchemaOrg from "@/components/SchemaOrg";

export default function Home() {
  return (
    <>
      <SchemaOrg />
      <Header />
      <main>
        <Hero />
        <Pourquoi />
        <Prestations />
        <Etapes />
        <PourQui />
        <Tarifs />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
