"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export const EditDialog = ({ setDishData, paramsId, dish }: any) => {
  const [imagePreview, setImagePreview] = useState(true);
  const [foodName, setFoodName] = useState<String>();
  const [foodPrice, setFoodPrice] = useState<Number>();
  const [foodIMG, setFoodIMG] = useState<any>(dish.image);
  const [foodIngredients, setFoodIngredients] = useState<String>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [categories, setCategories] = useState<any>([]);
  const [category, setcategory] = useState<any>();
  const [isDeleting, setIsDeleting] = useState(false);
  console.log(dish);
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

  const handleUpload = async (file: any) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "FD-app-images");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dv7ytfkgc/upload`,
        {
          method: "PUT",
          body: data,
        }
      );
      const dataJson = await response.json();
      if (dataJson.secure_url) {
        setFoodIMG(dataJson.secure_url);
        setLoading(false);
      } else {
        console.error("Upload failed", dataJson);
      }
    }
  };

  const editCategory = async () => {
    try {
      const newCategory = categories?.find(
        (item: any) => item?.categoryName === category
      )?._id;
      console.log(newCategory);
      const response = await fetch(`http://localhost:4000/food/${dish._id}`, {
        method: "PUT",
        body: JSON.stringify({
          foodName,
          foodPrice,
          foodIMG,
          foodIngredients,
          newCategory,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to update dish");

      const data = await response.json();
      setDishData((prevState: any) =>
        prevState.map((item: any) =>
          item._id === dish._id
            ? {
                ...item,
                foodName: foodName || item.foodName,
                price: foodPrice || item.price,
                image: foodIMG || item.image,
                ingredients: foodIngredients || item.ingredients,
                category: newCategory || item.category,
              }
            : item
        )
      );
      console.log(dish);
    } catch (error) {
      console.error(error);
    }
    setImagePreview(false);
  };

  const deleteDish = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:4000/food/${dish._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete dish");

      setDishData((prevState: any) =>
        prevState.filter((d: any) => d._id !== dish._id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete dish");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file && file.type.startsWith("image/")) {
      const previewUrl: any = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      handleUpload(file);
    }
  };

  const handleChangerFoodName = (e: any) => {
    setFoodName(e.target.value);
  };
  const handleChangerFoodPrice = (e: any) => {
    setFoodPrice(e.target.value);
  };
  const handleChangerFoodIngredients = (e: any) => {
    setFoodIngredients(e.target.value);
  };
  const handleChangerFoodCategory = (e: any) => {
    setcategory(e);
  };

  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-4 right-4">
        <img src="/editBtn.png" className="w-[38px] h-[38px]" />
      </DialogTrigger>
      <DialogContent className="w-[500px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="p-2">Dishes info</DialogTitle>
        </DialogHeader>
        <div className="p-4 mt-[-20px]">
          <div className="flex justify-between mt-2">
            <h1 className="text-[12px] text-[#71717A]">Dish name</h1>
            <Input
              className="border-1px rounded-md h-[30px] w-[300px]"
              onChange={handleChangerFoodName}
              placeholder={dish?.foodName}
            />
          </div>
          <div className="flex justify-between mt-8">
            <h1 className="text-[12px] text-[#71717A]">Dish category</h1>
            <Select onValueChange={handleChangerFoodCategory}>
              <SelectTrigger className="border-1px rounded-md h-[30px] w-[300px]">
                <SelectValue
                  placeholder={
                    categories?.find((item: any) => item._id === dish.category)
                      ?.categoryName
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories?.map((item: any) => (
                    <SelectItem key={item._id} value={item.categoryName}>
                      {item.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between mt-8">
            <p className="text-[12px] text-[#71717A]">Ingredients</p>
            <Input
              className="border-1px rounded-md h-[50px] w-[300px]"
              onChange={handleChangerFoodIngredients}
              placeholder={dish.ingredients}
            />
          </div>
          <div className="flex justify-between mt-8">
            <h1 className="text-[12px] text-[#71717A]">Food price</h1>
            <Input
              className="border-1px rounded-md h-[30px] w-[300px]"
              onChange={handleChangerFoodPrice}
              placeholder={`$${dish.price}`}
            />
          </div>
          <div className="flex justify-between mt-8">
            <p className="text-[12px] text-[#71717A]">Food image</p>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="w-[300px] h-[150px] bg-[#7F7F800D] flex justify-center items-center flex-col gap-[10px] rounded-md mt-[0.2rem]"
                  >
                    <input {...getInputProps()} id="img" />
                    {imagePreview ? (
                      <button
                        style={{ backgroundImage: `url(${foodIMG})` }}
                        className="w-full h-full object-cover rounded-md relative"
                        onClick={() => {
                          setImagePreview(false);
                        }}
                      >
                        <img
                          className="w-[36px] h-[36px] absolute top-2 right-2"
                          src="/imageDeletebtn.png"
                        />
                      </button>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-[28px] h-[28px] bg-white flex justify-center items-center rounded-full">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.5 1.5V8.5H1.5V1.5H8.5ZM8.5 0.5H1.5C0.95 0.5 0.5 0.95 0.5 1.5V8.5C0.5 9.05 0.95 9.5 1.5 9.5H8.5C9.05 9.5 9.5 9.05 9.5 8.5V1.5C9.5 0.95 9.05 0.5 8.5 0.5ZM6.07 4.93L4.57 6.865L3.5 5.57L2 7.5H8L6.07 4.93Z"
                              fill="#202124"
                            />
                          </svg>
                        </div>
                        <p>Add Image</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <div className="flex justify-between">
          <DialogClose asChild>
            {isDeleting ? (
              "Deleting..."
            ) : (
              <button onClick={deleteDish}>
                <img className="w-[48px] h-[40px]" src="/deleteBtn.png" />
              </button>
            )}
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={editCategory} className="w-[40%]">
              Save Changes
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
