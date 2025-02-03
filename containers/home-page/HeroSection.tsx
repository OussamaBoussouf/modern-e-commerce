import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function HeroSection() {
  return (
    <section className="relative w-full h-[400px] lg:h-[500px] 2xl:h-[600px] bg-cover bg-no-repeat bg-[url('../assets/images/headphone-banner-mobile.jpg')] lg:bg-[url('../assets/images/headphone-banner.jpg')]">
      <div className="bg-gradient-to-r from-black from-50% md:from-20% to-transparent h-full w-full"></div>
      <div className="container mx-auto">
        <div className="absolute text-center md:text-left top-1/2 -translate-y-1/2 px-3">
          <h1 className="text-white font-bold text-3xl lg:text-4xl lg:leading-[3rem] mb-2">
            Discover Sound <br /> Like Never Before
          </h1>
          <p className="text-white max-w-[600px] mb-3 drop-shadow-xl">
            Discover premium headphones tailored for you. From immersive sound
            quality to sleek designs, find your perfect match for music, gaming,
            and more
          </p>
          <Link href="/products">
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-none lg:py-6 lg:px-7">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
