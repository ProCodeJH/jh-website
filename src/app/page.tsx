import { Hero } from "@/components/sections/hero";
import { ProjectJourney } from "@/components/sections/project-journey";
import { EvolvingExperiences } from "@/components/sections/evolving-experiences";
import { Services } from "@/components/sections/services";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Partners } from "@/components/sections/partners";
import { Approach } from "@/components/sections/approach";
import { WhatSetsUsApart } from "@/components/sections/what-sets-us-apart";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectJourney />
      <EvolvingExperiences />
      <Services />
      <FeaturedProjects />
      <Partners />
      <Approach />
      <WhatSetsUsApart />
      <ContactCTA />
    </>
  );
}
