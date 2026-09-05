import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Impact from "@/components/Impact";
import Journey from "@/components/Journey";
import Research from "@/components/Research";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-[#04150f]"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Impact />
        <Journey />
        <Research />
        <Portfolio />
        <Capabilities />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
