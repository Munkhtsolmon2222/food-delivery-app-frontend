"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DishCards } from "./card";
import { ModalDialog } from "./modalDialog";

export const Section = ({ category }: any) => {
  const [dishData, setDishData] = useState<any>();
  const params = useParams();
  const fetchDishData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const resJson = await res.json();
      setDishData(resJson?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDishData();
  }, []);

  return (
    <div className="bg-white mt-6 pb-4 ">
      <h1 className="p-3 text-[20px] font-semibold mx-2">
        {category?.categoryName}
      </h1>
      <div className="flex">
        <ModalDialog />
        {dishData?.map((dish: any) => (
          <div
            key={dish._id}
            className="w-[300px] h-[250px] m-4 rounded-lg content-center text-center"
          >
            <DishCards dish={dish} />
          </div>
        ))}
      </div>
    </div>
  );
};
