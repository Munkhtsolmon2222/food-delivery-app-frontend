"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import Link from "next/link";

interface Category {
  _id: string;
  categoryName: string;
}

export function Categories({ setSelectedCategory }: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4000/food-category/");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const resJson = await res.json();
      setCategories(resJson?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="rounded-lg w-[90vw] mx-auto mt-6">
      <h2 className="text-[22px] text-white font-semibold">Categories</h2>
      <div className="mt-5">
        {categories?.map((category) => (
          <Badge
            key={category._id}
            variant="outline"
            className="mr-2 mt-2 bg-white"
            onClick={() => {
              setSelectedCategory(category._id);
            }}
          >
            <h1 className="p-2 font-medium text-[16px]">
              {category.categoryName}
            </h1>
          </Badge>
        ))}
      </div>
    </div>
  );
}
