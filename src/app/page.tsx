import { Categories } from "./_components/categoriesUser";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default function Home() {
  return (
    <>
      <div className="bg-[#404040]">
        <Header />
        <div className="bg-[url('/BG.png')] w-full h-[900px] bg-cover bg-center  bg-no-repeat "></div>
        <Categories />
        <Footer />
      </div>
    </>
  );
}
