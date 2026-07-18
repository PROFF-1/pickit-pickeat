import { Kitchen } from "@/types/type";
import {useQuery} from "@tanstack/react-query";
import { getAllKitchens } from "@/services/kitchen.service";
import { useKitchenStore } from "@/stores/kitchenStore";



export function useKitchen() {
    return useQuery<Kitchen[]>({
        queryKey: ['kitchens'],
        queryFn: async () => {
            const kitchens = await getAllKitchens();
            useKitchenStore.getState().setKitchenItems(kitchens);
            return kitchens;
        },
    });
}