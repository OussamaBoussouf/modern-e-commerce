import { Button } from "@/components/ui/button";
import React from "react";

function HeroSection() {
  return (
    <section className="relative ps-4 md:ps-5 lg:ps-10 w-full h-[400px] lg:h-[500px] bg-cover bg-no-repeat bg-[url('../assets/images/hero-section-mobile.jpg')] lg:bg-[url('../assets/images/hero-section-desktop.jpg')]">
      <div className="absolute top-1/2 -translate-y-1/2 w-[300px] md:w-[400px] lg:w-[700px]">
        <h1 className="text-white font-bold text-xl md:text-3xl lg:text-5xl lg:leading-[3.5rem] mb-5">Grab Up to 50% Off On Selected Headphone</h1>
        <Button className="bg-orange-400 hover:bg-orange-500 lg:text-lg lg:py-6 lg:px-7">Buy Now</Button>
      </div>
    </section>
  );
}

export default HeroSection;
