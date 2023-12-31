import {OnRun} from '../config/OnRun'
import axios from 'axios'

const client = axios.create({baseURL:OnRun})

export const getStaticPallet = async (payload) =>{
    const {data} = await client.post('/admin/getstaticspallet',{id:payload.queryKey[1]})
    return data
}

export const getColorType = async (payload) =>{
    const {data} = await client.get('/admin/colortypes')
    return data
}

export const getLogoClass = async (payload) =>{

    const {data} = await client.get('/admin/class')
    return data
}

export const getJobs = async (payload) =>{
    const {data} = await client.get('/admin/jobs')
    return data
}

export const getPalletTank = async (payload) =>{
    const {data} = await client.post('/admin/pallettank',{id:payload.queryKey[1]})
    return data
}


export const setNewPallet = async (id, firstColor, secondColor, thirdColor, typeColor, typeJob, keywords,logoClass) =>{
    const {data} = await client.post('/admin/pallet',{
        id:id,
        first_color:firstColor,
        secend_color:secondColor,
        third_color:thirdColor,
        type_color:typeColor,
        jobs:typeJob,
        keywords:keywords,
        logo_class:logoClass
    })
    return data
}

export const setNewVector = async (id, file, jobs, keywords, logoClass) =>{
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file);
    formData.append('jobs', jobs);
    formData.append('keywords', keywords);
    formData.append('logo_class', logoClass);
    const {data} = await client.post('/admin/vector',formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return data
}


export const getVectorTank = async (payload) =>{
    const {data} = await client.post('/admin/vectortank',{id:payload.queryKey[1]})
    return data
}


export const setNewFont = async (id, file, name, weight, typeJob, logoClass) =>{
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file);
    formData.append('jobs', typeJob);
    formData.append('weight', weight);
    formData.append('name', name);
    formData.append('logo_class', logoClass);
    const {data} = await client.post('/admin/font',formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return data
}


export const getFontTank = async (payload) =>{
    const {data} = await client.post('/admin/fonttank',{id:payload.queryKey[1]})
    return data
}


export const delPallet = async (id, idPallet) =>{
    const {data} = await client.delete('/admin/pallet',{data:{id:id, id_pallet:idPallet}})
    return data
}


export const delVector = async (id, idVector) =>{
    const {data} = await client.delete('/admin/vector',{data:{id:id, id_vector:idVector}})
    return data
}

export const delFont = async (id, idFont) =>{
    const {data} = await client.delete('/admin/font',{data:{id:id, id_font:idFont}})
    return data
}