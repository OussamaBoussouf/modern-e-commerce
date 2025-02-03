import { Button } from "@/components/ui/button";

function NewsLetter() {
  return (
    <section className="container mx-auto py-10 px-3">
      <div className="bg-[url('../assets/images/new-arrivals-banner.jpg')] bg-no-repeat bg-cover p-10 rounded-lg text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold mb-5">
          Stay Tuned for Exclusive Deals!
        </h2>
        <p className="text-white text-sm md:text-lg mb-5">
          Sign up for our newsletter and never miss a beat on our latest <br /> offers
          and products.
        </p>
        <div className="relative max-w-[500px] mx-auto">
            <input
            type="text"
            className="rounded-sm py-3 ps-6 pe-32 w-full"
            placeholder="Your Email"
          />
          <Button className="absolute px-6 top-1/2 -translate-y-1/2 right-2">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
