import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Proyectos from "../components/Proyectos";
import QuienSoy from "../components/QuienSoy";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-transparent overflow-hidden">
      <Navbar />
      <Hero />
      <Proyectos />
      <QuienSoy />
      <Contacto />
      <Footer />
    </main>
  );
}
