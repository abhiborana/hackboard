import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-dashed border-t py-6 md:py-0">
      <div className="container-wrapper lg:border-x">
        <div className="container md:px-6 py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="https://abhiborana.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              abhiborana
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/abhiborana/hackboard"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
