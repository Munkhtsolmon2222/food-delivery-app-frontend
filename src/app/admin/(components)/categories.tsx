"use client";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  categoryName: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  console.log(categories);

  const addCategory = async () => {
    const newName = prompt("Enter new category name");
    if (!newName) return;

    try {
      const response = await fetch("http://localhost:4000/food-category/", {
        method: "POST",
        body: JSON.stringify({ categoryName: newName }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to add category");

      const data = await response.json();
      setCategories((prevCategories) => [
        ...prevCategories,
        { _id: data._id, categoryName: data.categoryName },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories?.map((category) => (
        <div key={category._id}>{category.categoryName}</div>
      ))}
      <button onClick={addCategory}>Add Category</button>
    </div>
  );
}
