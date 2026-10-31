import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Method from "@/components/sections/Method";
import Insights from "@/components/sections/Insights";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Method />
        <Insights />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
