import { Hero } from "@/components/sections/hero";
import { ProjectJourney } from "@/components/sections/project-journey";
import { EvolvingExperiences } from "@/components/sections/evolving-experiences";
import { Services } from "@/components/sections/services";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Partners } from "@/components/sections/partners";
import { Approach } from "@/components/sections/approach";
import { HiddenNeeds } from "@/components/sections/hidden-needs";
import { Backoffice } from "@/components/sections/backoffice";
import { Testing } from "@/components/sections/testing";
import { Maintenance } from "@/components/sections/maintenance";
import { TextDesign } from "@/components/sections/text-design";
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
      <HiddenNeeds />
      <Backoffice />
      <Testing />
      <Maintenance />
      <TextDesign />
      <WhatSetsUsApart />
      <ContactCTA />
    </>
  );
}
