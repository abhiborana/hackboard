import HackboardIcon from "@/svgs/hackboardIcon";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

const Header = () => {
  return (
    <header className="border-dashed sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper lg:border-x flex items-center justify-center">
        <div className="container md:px-6 flex h-14 items-center gap-2 md:gap-4">
          <div className="mr-4 flex">
            <Link className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
              <HackboardIcon />
              <span className="font-bold inline-block">Hackboard</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/80"
                href="/"
              >
                Home
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none"></div>
            <nav className="flex items-center gap-0.5">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
