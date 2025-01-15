import { Categories } from "./(components)/categories";
import { Navigation } from "./(components)/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex bg-[#F4F4F5] gap-6 relative">
      <Navigation />
      <div className="mx-6 mt-6 ">
        <div className="rounded-full absolute right-8  ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Categories />
      </div>
    </div>
  );
}
