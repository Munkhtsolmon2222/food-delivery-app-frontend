"use client";
import { useEffect, useState } from "react";
import { Section } from "../(components)/section";

export default function Page() {
  const [categoryData, setcategoryData] = useState<any>([]);
  const [dishData, setDishData] = useState<any>();
  const fetchCategoryData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food-category/`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const resJson = await res.json();
      setcategoryData(resJson?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDishData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food/`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const resJson = await res.json();
      setDishData(resJson?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategoryData();
    fetchDishData();
  }, []);
  console.log(categoryData);
  return (
    <div className="">
      {categoryData.map((category: any) => (
        <Section key={category._id} category={category} />
      ))}
    </div>
  );
}
