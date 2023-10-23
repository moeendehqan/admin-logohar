import { useQueryClient, useMutation, useQuery } from "react-query";
import * as api from '../api/index'
import { ToastContainer, toast } from 'react-toastify';


export const useGetStaticPallet = (id) =>{
    return useQuery(['staticPallet',id], api.getStaticPallet)
}


export const useGetColorType = () =>{
    return useQuery('colorType', api.getColorType)
}

export const useGetJobs = () =>{
    return useQuery('jobs', api.getJobs)
}

export const useGetClass = () =>{
    return useQuery('logoClas', api.getLogoClass)
}

export const useGetPalletTank = (id) =>{
    return useQuery(['palletTank',id], api.getPalletTank,{
        onError: (error=>{
            if (error.response.status==403) {
                toast.warning(error.response.data.message)
            }
        })
    })
}

export const useSetNewPallet = (id, firstColor, secondColor, thirdColor, typeColor, jobs, keywords, logoClass) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.setNewPallet(id, firstColor, secondColor, thirdColor, typeColor, jobs, keywords, logoClass),{
        onSuccess: async () => {
            await queryClient.refetchQueries(['palletTank', id]);
            await queryClient.refetchQueries(['staticPallet', id]);
            toast.success('ثبت شد')

        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}

export const useGetVectorTank = (id) =>{
    return useQuery(['vectorTank',id], api.getVectorTank)
}

export const useSetNewVector = (id, file, jobs, keywords, logoClass) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.setNewVector(id, file, jobs, keywords, logoClass),{
        onSuccess: async () => {
            await queryClient.refetchQueries(['vectorTank', id]);
            toast.success('ثبت شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })

    })
}

export const useGetFontTank = (id) =>{
    return useQuery(['fontTank',id],api.getFontTank,{
        onSuccess: async () => {
            toast.success('مخزن بروز شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}


export const useSetNewFont = (id, file, name, weight, typeJob, logoClass) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.setNewFont(id, file, name, weight, typeJob, logoClass),{
        onSuccess: async () => {
            await queryClient.refetchQueries(['fontsName', id]);
            await queryClient.refetchQueries(['fontTank', id]);
            toast.success('ثبت شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}


export const useDelPallet = (id, idPallet) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.delPallet(id, idPallet),{
        onSuccess: async () =>{
            await queryClient.refetchQueries(['palletTank', id]);
            toast.success('حذف شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}

export const useDelVector = (id, idVector) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.delVector(id, idVector),{
        onSuccess: async () =>{
            await queryClient.refetchQueries(['vectorTank', id]);
            toast.success('حذف شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}

export const useDelFont = (id, idFont) =>{
    const queryClient = useQueryClient();
    return useMutation(()=>api.delFont(id, idFont),{
        onSuccess: async () =>{
            await queryClient.refetchQueries(['fontTank', id]);
            toast.success('حذف شد')
        },
        onError: (error=>{
            toast.warning(error.response.data.message)
        })
    })
}