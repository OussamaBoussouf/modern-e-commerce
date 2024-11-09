import HeadPhonesSection from "@/containers/home-page/HeadPhonesSection";
import HeroSection from "@/containers/home-page/HeroSection";
import NewArrivals from "@/containers/home-page/NewArrivals";
import NewsLetter from "@/containers/home-page/NewsLetter";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeadPhonesSection/>
      <NewArrivals/>
      <NewsLetter/>
      <Footer/>
    </>
  );
}
