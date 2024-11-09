import { Button } from "@/components/ui/button";

function NewsLetter() {
    return (
        <section className="container mx-auto py-10 px-3">
            <div className="black-gradient p-10 rounded-lg">
            <h2 className="text-3xl sm:text-4xl md:text-left md:text-5xl text-white font-semibold md:leading-[4rem] md:w-96 mb-10">Ready to Get Our New Stuff?</h2>
             <div className="relative max-w-[300px]">
                <input type="text" className="rounded-full py-3 ps-6 pe-24 w-full" placeholder="Your Email" />
                <Button className="absolute px-6 top-1/2 -translate-y-1/2 right-3 rounded-full">Send</Button>
             </div>
            </div>
        </section>
    );
}

export default NewsLetter;