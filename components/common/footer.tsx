function Footer() {
  return (
    <footer className="bg-black mt-auto">
      <div className="container mx-auto py-8 px-3 flex flex-col md:flex-row md:justify-between gap-10 text-white">
        <div className="max-w-[500px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Lucide Store logo"
            viewBox="0 0 35 35"
            height="30"
            width="30"
            className="fill-white h-[30px] w-[30px] mb-6"
          >
            <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
            <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
          </svg>
          <p className="text-gray-200">
            Experience premium sound with the best headphones. Shop the latest
            wired and wireless models, enjoy exclusive deals, and immerse
            yourself in high-quality audio.
          </p>
        </div>
        <div>
          <ul className="flex items-center gap-5 text-sm">
            <li>Home</li>
            <li>Privacy</li>
            <li>Guides</li>
            <li>Term of Conditions</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-white text-sm py-5">
        &copy;2024 - All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
