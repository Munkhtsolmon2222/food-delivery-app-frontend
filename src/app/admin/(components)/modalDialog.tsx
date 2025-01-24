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
import { useState } from "react";
import Dropzone from "react-dropzone";

export const ModalDialog = ({ category, setDishData, paramsId, dish }: any) => {
	const [imagePreview, setImagePreview] = useState(null);
	const [foodName, setFoodName] = useState<String>();
	const [foodPrice, setFoodPrice] = useState<Number>();
	const [foodIMG, setFoodIMG] = useState<any>(null);
	const [foodIngredients, setFoodIngredients] = useState<String>();
	const [loading, setLoading] = useState<Boolean>(false);

	const handleUpload = async (file: any) => {
		setLoading(true);
		try {
			if (file) {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "FD-app-images");
				const response = await fetch(
					`https://api.cloudinary.com/v1_1/dv7ytfkgc/upload`,
					{
						method: "POST",
						body: data,
					}
				);
				const dataJson = await response.json();
				setFoodIMG(dataJson.secure_url);
			}
		} catch (error) {
			console.error("Upload failed", error);
		} finally {
			setLoading(false);
		}
	};

	const addCategory = async (
		foodName: any,
		foodPrice: any,
		foodIMG: any,
		foodIngredients: any
	) => {
		try {
			const response = await fetch("http://localhost:4000/food/", {
				method: "POST",
				body: JSON.stringify({
					foodName,
					foodPrice,
					foodIMG,
					foodIngredients,
					paramsId,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) throw new Error("Failed to add dish");

			const data = await response.json();

			setDishData((prevCategories: any) => [
				...prevCategories,
				{ _id: data._id, data: data.foodName, image: data.foodIMG },
			]);
		} catch (error) {
			console.error(error);
		}
		setImagePreview(null);
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

	return (
		<Dialog>
			<DialogTrigger>
				<div className="w-[300px] h-[250px] m-4 rounded-lg border-dashed border-[1px] border-[#EF4444] block content-center text-center">
					<div className="content-center text-center">
						<div className="bg-[#EF4444] rounded-full w-[36px] h-[36px] content-center m-auto">
							<p className="text-white">+</p>
						</div>
						<h1 className="max-w-[160px] mt-2 m-auto">
							Add new Dish to {category?.categoryName}
						</h1>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="w-[500px] h-[600px]">
				<DialogHeader>
					<DialogTitle className="p-2">
						Add new Dish to {category?.categoryName}
					</DialogTitle>
				</DialogHeader>
				<div className="flex p-4 justify-between mt-[-20px] ">
					<div>
						<h1>Food name</h1>
						<Input
							className="border-1px rounded-md h-[40px] w-[200px]"
							onChange={handleChangerFoodName}
							placeholder="Type food name..."
						/>
					</div>
					<div>
						<h1>Food price</h1>
						<Input
							className="border-1px rounded-md h-[40px] w-[200px]"
							onChange={handleChangerFoodPrice}
							placeholder="Food price..."
						/>
					</div>
				</div>
				<div className=" mt-[-10px] px-4">
					<p>Ingredients</p>
					<Input
						className="border-1px rounded-md h-[70px] w-[400px]"
						onChange={handleChangerFoodIngredients}
						placeholder="List ingredients..."
					/>
				</div>
				<div className="p-4">
					<p>Food image</p>
					<Dropzone onDrop={handleDrop}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div
									{...getRootProps()}
									className="w-[416px] h-[180px] bg-[#7F7F800D] flex justify-center items-center flex-col gap-[10px] rounded-md mt-[0.2rem]"
								>
									<input {...getInputProps()} id="img" />
									{loading ? (
										<div className="flex flex-col items-center">
											<div className="w-[28px] h-[28px] bg-white flex justify-center items-center rounded-full">
												<svg
													className="animate-spin"
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
											<p>Uploading...</p>
										</div>
									) : imagePreview ? (
										<img
											src={imagePreview}
											alt="Preview"
											className="w-full h-full object-cover rounded-md"
										/>
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
				<DialogClose asChild>
					<Button
						onClick={() =>
							addCategory(foodName, foodPrice, foodIMG, foodIngredients)
						}
						className="w-[40%] ml-[55%]"
					>
						Save Changes
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
