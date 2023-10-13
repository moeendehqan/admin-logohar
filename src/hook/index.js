import { useQueryClient, useMutation, useQuery } from "react-query";
import * as api from '../api/index'


export const useGetStaticPallet = (id) =>{
    return useQuery(['staticPallet',id], api.getStaticPallet)
}


export const useGetCategory = () =>{
    return useQuery('category', ()=>api.getCategory())
}

export const useGetBankPalet = (id) =>{
    return useQuery(['bankPallet',id], api.getBankPallet)
}

export const useSetNewPallet = (id, pallet) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.setNewPallet(id, pallet),{
        onSuccess: async () => {
            await queryClient.refetchQueries(['bankPallet', id]);
            await queryClient.refetchQueries(['staticPallet', id]);
        },
    })
}

export const useSetNewVector = (id, vector) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.setNewVector(id, vector),{
        onSuccess: async () => {
            /* این ریفتچ باید تغییر کند */
            await queryClient.refetchQueries(['bankPallet', id]);
        },
    })
}