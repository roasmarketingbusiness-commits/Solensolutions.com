import { Contact } from "./_components/Contact";
import { FAQ } from "./_components/FAQ";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Process } from "./_components/Process";
import { Solutions } from "./_components/Solutions";
import { Starfield } from "./_components/Starfield";
import { Work } from "./_components/Work";

export default function Home() {
  return (
    <>
      <Starfield />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Solutions />
          <Process />
          <Work />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
