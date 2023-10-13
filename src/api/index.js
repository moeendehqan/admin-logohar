import {OnRun} from '../config/OnRun'
import axios from 'axios'

const client = axios.create({baseURL:OnRun})

export const getStaticPallet = async (payload) =>{
    const {data} = await client.post('/admin/getstaticspallet',{id:payload.queryKey[1]})
    return data
}

export const getCategory = async (payload) =>{
    const {data} = await client.get('/public/getallcategory')
    return data
}

export const getBankPallet = async (payload) =>{
    const {data} = await client.post('/admin/getbankpallet',{id:payload.queryKey[1]})
    return data
}


export const setNewPallet = async (id,pallet) =>{
    const {data} = await client.post('/admin/setpallet',{id:id,pallet:pallet})
    return data
}

export const setNewVector = async (id,vector) =>{
    const formData = new FormData();
    formData.append('id', id);
    formData.append('idVector', vector.id);
    formData.append('fileVector', vector.file);
    formData.append('typeJobVector', vector.typeJob);
    formData.append('keywords', vector.keywords);
    const {data} = await client.post('/admin/setvector',formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return data
}