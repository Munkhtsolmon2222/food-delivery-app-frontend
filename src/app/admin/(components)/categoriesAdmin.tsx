"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Category {
	_id: string;
	categoryName: string;
}

export function Categories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [value, setValue] = useState<string>();
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		""
	);

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

	const addCategory = async (value: any) => {
		if (!value) return;

		try {
			const response = await fetch("http://localhost:4000/food-category/", {
				method: "POST",
				body: JSON.stringify({ categoryName: value }),
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

	const handleChanger = (e: any) => {
		setValue(e.target.value);
	};

	const handleBadgeClick = (categoryId: string | "") => {
		if (selectedCategoryId === categoryId) {
			setSelectedCategoryId("");
		} else {
			setSelectedCategoryId(categoryId);
		}
	};

	return (
		<div className="rounded-lg bg-white w-[80vw] mt-6 p-4">
			<h2 className="text-[22px] font-semibold">Dishes category</h2>
			<div className="mt-5">
				<Link href={`/admin/food-category`}>
					<Badge
						variant="outline"
						className={`mr-2 ${
							selectedCategoryId === "" ? "border-red-500" : ""
						}`}
						onClick={() => handleBadgeClick("")}
					>
						<h1 className="p-2 font-medium text-[16px]">All dishes</h1>
					</Badge>
				</Link>

				{categories?.map((category) => (
					<Link
						key={category._id}
						href={`/admin/food-category/${category._id}`}
					>
						<Badge
							variant="outline"
							className={`mr-2 mt-2 ${
								selectedCategoryId === category._id ? "border-red-500" : ""
							}`}
							onClick={() => handleBadgeClick(category._id)}
						>
							<h1 className="p-2 font-medium text-[16px]">
								{category.categoryName}
							</h1>
						</Badge>
					</Link>
				))}

				<Dialog>
					<DialogTrigger>
						<div className="bg-[#EF4444] rounded-full w-[36px] h-[36px] content-center">
							<p className="text-white">+</p>
						</div>
					</DialogTrigger>
					<DialogContent className="w-[460px] h-[300px]">
						<DialogHeader>
							<DialogTitle>Add new category</DialogTitle>
							<div className="pt-12">
								<p>Category name</p>
								<Input
									className="border-1px rounded-md h-[40px] w-[400px]"
									onChange={handleChanger}
									placeholder="Type category name..."
								/>
							</div>
						</DialogHeader>
						<DialogClose asChild>
							<Button
								onClick={() => {
									addCategory(value);
								}}
								className="w-[40%] ml-[55%]"
							>
								Add category
							</Button>
						</DialogClose>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
