"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DishCards } from "./card";
import { ModalDialog } from "./modalDialog";

export const Section = ({ category }: any) => {
  const [dishData, setDishData] = useState<any[]>([]);
  const params = useParams();

  const fetchDishData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food`);
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
  console.log(category._id);
  console.log(dishData);

  return (
    <div className="bg-white  mt-6 pb-4 rounded-lg ">
      <h1 className="p-3 text-[20px] font-semibold mx-2">
        {category?.categoryName}
      </h1>
      <div className="grid grid-cols-4">
        <ModalDialog
          dish={dishData}
          setDishData={setDishData}
          paramsId={category?._id}
        />
        {dishData
          ?.filter((dish) => dish.category == category._id)
          .map((dish: any) => (
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
