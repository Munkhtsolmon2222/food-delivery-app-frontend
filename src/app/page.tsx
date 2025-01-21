"use client";
import { useEffect, useState } from "react";
import { Categories } from "./_components/categoriesUser";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Section } from "./_components/sectionUser";
import { useParams } from "next/navigation";

interface selectedCategory {
  _id: String;
}

export default function Home() {
  const [categoryData, setcategoryData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<selectedCategory>();
  const params = useParams();
  const fetchCategoryData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food-category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const resJson = await res.json();
      setcategoryData(resJson?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);
  console.log(categoryData);
  console.log(selectedCategory);
  console.log(
    categoryData.filter((category: any) => category._id == selectedCategory)
  );
  return (
    <>
      <div className="bg-[#404040]">
        <Header />
        <div className="bg-[url('/BG.png')] w-full h-[900px] bg-[length:100vw_50vw] bg-center  bg-no-repeat "></div>
        <Categories setSelectedCategory={setSelectedCategory} />
        {selectedCategory
          ? categoryData
              .filter((category: any) => category._id == selectedCategory)
              ?.map((category: any) => (
                <Section key={category._id} category={category} />
              ))
          : categoryData.map((category: any) => (
              <Section key={category._id} category={category} />
            ))}
        <Footer />
      </div>
    </>
  );
}
