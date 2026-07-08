import { getAllfoods } from "@/services/food.service";
import { useFoodStore } from "@/stores/foodStore";
import { Food } from "@/types/type";
import { useQuery } from "@tanstack/react-query";


export function useFood() {
    return useQuery<Food[]>({
        queryKey: ['foods'],
        queryFn: async () => {
            const foods = await getAllfoods();
            useFoodStore.getState().setFoodItems(foods);
            return foods;
        },
    });
}