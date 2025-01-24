"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export const AddDialog = ({ dish }: any) => {
	const [categories, setCategories] = useState<any>([]);
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
		<div className="w-[800px]">
			<Dialog>
				<DialogTrigger className="absolute bottom-4 right-4">
					<img src="/addButton.png" className="w-[38px] h-[38px]" />
				</DialogTrigger>
				<DialogPortal>
					<DialogContent className="w-[800px] bg-white rounded-lg shadow-lg p-6">
						<DialogHeader>
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<div className="flex gap-6 justify-between w-[800px]">
							<img
								className="w-[380px] h-[300px] rounded-xl"
								src={dish.image}
							/>
							<div className="w-[380px] h-[300px]">
								<h1 className="text-[#EF4444] text-[24px]">
									Sunshine Stackers
								</h1>
								<p>{dish.ingredients}</p>
								<div className="flex">
									<h1>
										Total price
										<p className="text-[20px] font-semibold">${dish.price}</p>
									</h1>
								</div>
							</div>
						</div>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</div>
	);
};
