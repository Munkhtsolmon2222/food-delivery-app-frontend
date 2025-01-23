"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";

const TableCard = () => {
	return (
		<TableRow className="border border-border bg-background">
			<TableCell>
				<div className="p-4">
					<input type="checkbox" />
				</div>
			</TableCell>
			<TableCell>1</TableCell>
			<TableCell>Amgalan</TableCell>
			<TableCell>2 foods</TableCell>
			<TableCell>2024/12/20</TableCell>
			<TableCell>45000</TableCell>
			<TableCell>
				<div className="truncate w-40">
					2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг+ Sbd negdsen emneleg |
					100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД
					нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд
					талд 4д ногоон20
				</div>
			</TableCell>
			<TableCell>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a state" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>State</SelectLabel>
							<SelectItem value="PENDING">PENDING</SelectItem>
							<SelectItem value="DELIVERED">DELIVERED</SelectItem>
							<SelectItem value="CANCELLED">CANCELLED</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</TableCell>
		</TableRow>
	);
};
type Props = {
	page: string;
	category: string;
};
export type Dish = {
	categoryName: string;
	_id: string;
};
export type Food = {
	_id: string;
	foodName: string;
	price: number;
	image: string;
	ingredients: string;
	category: string;
	createdAt: string;
	updatedAt: string;
};
export default function Page() {
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
		<div className="h-screen rounded-lg ">
			<div className="top-[45vh] w-[85vw] absolute left-[55%] transform -translate-x-1/2 -translate-y-1/2">
				<div className="h-19 flex bg-background justify-between">
					<div className="w-1/2 p-3">
						<h1 className="font-bold text-[20px]">Orders</h1>
						<h4 className="text-muted-foreground">32 items</h4>
					</div>
					<div className="w-1/2">
						<div className="flex gap-6 p-3 justify-end">
							<div className="border border-border  text-sm bg-background text-foreground rounded-full py-2 px-4">
								13 June 2023 - 14 July 2023
							</div>
							<div className="border border-border text-sm bg-muted text-foreground rounded-full py-2 px-4">
								Change delivery state
							</div>
						</div>
					</div>
				</div>
				<Table>
					<TableHeader className="bg-secondary">
						<TableRow className="border border-border">
							<TableHead>
								<div className="p-4 w-[4%]">
									<input type="checkbox" />
								</div>
							</TableHead>
							<TableHead>№</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Food</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Delivery Address</TableHead>
							<TableHead>Delivery State</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableCard />
						<TableCard />
						<TableCard />
						<TableCard />
						<TableCard />
						<TableCard />
						<TableCard />
						<TableCard />
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
