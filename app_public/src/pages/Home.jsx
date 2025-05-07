import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Proyectos from "../components/Proyectos";
import QuienSoy from "../components/QuienSoy";
import Contacto from "../components/Contacto";

export default function Home() {
  return (
    <main className="bg-dark overflow-hidden">
      <Navbar />
      <Hero />
      <Proyectos />
      <QuienSoy />
      <Contacto />
    </main>
  );
}
