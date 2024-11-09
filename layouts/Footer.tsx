function Footer() {
  return (
    <footer className="bg-black">
      <div className="container mx-auto py-8 px-3 flex flex-col md:flex-row gap-10">
        <div className="max-w-96">
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
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            eaque harum dolor cum incidunt corrupti laborum, aut voluptates
            vitae nihil.
          </p>
        </div>
        <div>
          <p className="text-white mb-3">Customer Care</p>
          <ul className="text-gray-400 space-y-2">
            <li>FAQ</li>
            <li>Shopping</li>
            <li>Order Status</li>
            <li>Return & Exchange</li>
          </ul>
        </div>
        <div>
          <p className="text-white mb-3">Company</p>
          <ul className="text-slate-400 space-y-2">
            <li>Privacy</li>
            <li>Guides</li>
            <li>Term of Conditions</li>
          </ul>
        </div>
      </div>
      <p className="text-slate-400 text-center text-sm py-5">&copy;2024 - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
