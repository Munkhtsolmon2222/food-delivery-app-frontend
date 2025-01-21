import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { EditDialog } from "./editDialog";

export const DishCards = ({ category, dish, setDishData, paramsId }: any) => {
  return (
    <Card className="w-[300px] h-[250px]">
      <CardHeader>
        <CardDescription>
          <div
            style={{
              backgroundImage: `url(${dish?.image})`,
              height: "120px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[240px] relative rounded-lg"
          >
            <EditDialog
              setDishData={setDishData}
              paramsId={paramsId}
              dish={dish}
              category={category}
            />
          </div>

          <div className="flex justify-between mt-[20px]">
            <h1 className="text-[#EF4444] text-[20px]">{dish?.foodName}</h1>
            <h3 className="text-[#09090B] font-normal text-[16px]">
              ${dish?.price}
            </h3>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-[-5px]">{dish?.ingredients}</p>
      </CardContent>
    </Card>
  );
};
