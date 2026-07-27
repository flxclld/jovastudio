import Link from "next/link";
import { notFound } from "next/navigation";

const projects = [
  { slug: "tepotzlan", title: "Tepotzlan", image: "https://framerusercontent.com/images/XikFZSP2z3K6hiqJjPIRdUCVux4.jpeg?width=1290&height=1797" },
  { slug: "condesa", title: "Condesa", image: "https://framerusercontent.com/images/kLOPBNpgsgCYiUYis3EaiVHPI.png?width=1402&height=1122" },
  { slug: "polanco", title: "Polanco", image: "https://framerusercontent.com/images/4DSQRsjCaeG3Td105XzixmFNUw.png?width=1000&height=802" },
  { slug: "casita-uma", title: "Casita Uma", image: "https://framerusercontent.com/images/EJzVTCJlMtAwmTQLtoQdVHXH5BA.png?width=1000&height=800" },
  { slug: "altenera-restaurant", title: "Altanera Restaurant", image: "https://framerusercontent.com/images/7ozEQqROgQkCO26Lhbw9yzj6TE.jpg?width=1290&height=1469" },
  { slug: "casa-x", title: "Casa X", image: "https://framerusercontent.com/images/8Of9s0x2otdeeCYSU4SMChRWXw.png?width=1000&height=802" },
  { slug: "meteora", title: "Meteora", image: "https://framerusercontent.com/images/HT1mRam3UFpHLIxhv1hME4ZgM.png?width=1402&height=1122" },
  { slug: "aeromaan", title: "Aeromaan", image: "https://framerusercontent.com/images/oILmXaRN0G3wi00DnqAsQB4Y8HI.png?width=1000&height=800" },
];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="project-detail">
      <header className="site-header" aria-label="Project navigation">
        <Link className="brand-mark" href="/" aria-label="Jova Studio home">JOVA</Link>
        <nav><Link href="/#interior-design">Interior Design</Link><Link href="/#about">About</Link><a href="mailto:hello@jovastudio.co">Get in touch</a></nav>
      </header>
      <section className="project-hero">
        <div>
          <p className="eyebrow">Interior Design</p>
          <h1>{project.title}</h1>
          <p>A curated Jova Studio interior project shaped through texture, storytelling, found objects, and a layered material sensibility.</p>
          <Link className="back-link" href="/#interior-design">Back to work</Link>
        </div>
        <div className="project-hero-image"><img src={project.image} alt={`${project.title} interior project`} /></div>
      </section>
    </main>
  );
}
