import { Layout } from "@/components/Layout";
import { Hero } from "@/components/home/Hero";
import { Manifesto, Thesis } from "@/components/home/Thesis";
import { CaseStudies } from "@/components/home/CaseStudies";
import { LabsGrid } from "@/components/home/LabsGrid";
import { Principles } from "@/components/home/Principles";
import { ContactSelector } from "@/components/home/ContactSelector";
import { usePageMeta } from "@/hooks/use-page-meta";

// "The Evidence Engine" — one editorial spine, every section pre-rendered.
const Index = () => {
  usePageMeta(
    "Utpal Das — Father, Builder, Problem Solver",
    "Utpal Das, Head of Digital Solutions at CUBONIC, Berlin. 18+ years shipping software that had to work — avionics, robot metrology, Europe's largest car marketplace, autonomous movers — now holding AI to the same bar.",
    "/",
  );

  return (
    <Layout noPadding>
      <Hero />
      <Manifesto />
      <Thesis />
      <CaseStudies />
      <LabsGrid />
      <Principles />
      <ContactSelector />
    </Layout>
  );
};

export default Index;
