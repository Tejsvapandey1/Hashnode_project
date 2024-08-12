import Link from "next/link";
import ThemeToggler from "../components/ui/theme-toggler";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { getBlogName } from "@/lib/request";

const GITHUB_URL =
  "https://th.bing.com/th/id/OIP.eoZPB2gfGH-1ckaL_JSZdwAAAA?rs=1&pid=ImgDetMain";

export default async function Navbar() {
  const blogData = await getBlogName();
  // console.log("Blog Data:", blogData); // Log the entire blog data
  // const { displayTitle } = blogData; // Destructure the displayTitle
  // console.log(blogData.displayTitle); // Log displayTitle

  return (
    <div>
      <div className="w-full border-b mb-5">
        <div className="max-w-7xl w-full px-3 xl:p-0 my-5 mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">{blogData.displayTitle || blogData.title}</Link> {/* Fallback title */}
          </div>
          <div className="flex items-center gap-5 justify-center">
            <ThemeToggler />
            <Button variant="secondary">
              <Link
                href={GITHUB_URL}
                target="_blank"
                className="flex items-center"
              >
                <GitHubLogoIcon /> Github
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
