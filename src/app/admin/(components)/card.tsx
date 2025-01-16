import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DishCards = ({ dish }: any) => {
  return (
    <Card className="w-[300px] h-[250px]">
      <div className="w-[240px] h-[140px]"></div>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>
          <div className="flex justify-between mt-[-30px]">
            <h1 className="text-[#EF4444] text-[20px]">{dish.foodName}</h1>
            <h3 className="text-[#09090B] font-normal text-[16px]">
              ${dish.price}
            </h3>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-[-5px]">{dish.ingredients}</p>
      </CardContent>
    </Card>
  );
};
