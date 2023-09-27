import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../functions/Cookie"


const Vector = () =>{
    const [vectorData, setVectorData] = useState({id:'',file:null,typeJob:[],keywords:''})
    const [category,setCategory] = useState(null)
    const id = getCookie('id')
    
    const getCategory = () =>{
        axios.post(OnRun+'/public/getallcategory')
        .then(response=>{
            setCategory(response.data)
        })
    }

    const handleTpye = (typ) =>{
        if (vectorData.typeJob.includes(typ)) {
            const typJobNew = vectorData.typeJob.filter(i => i!=typ)
            setVectorData({...vectorData,typeJob:typJobNew})
        }else{
            const typJobNew = vectorData.typeJob.concat([typ])
            setVectorData({...vectorData,typeJob:typJobNew})
        }
    }

    const submit = () =>{
        if (!vectorData.file) {
            alert('فایلی ضمیمه نشده است')            
        }else if (vectorData.typeJob.length==0) {
            alert('حداقل یک دستبندی صنفی باید انتخاب شود')
        }else if (vectorData.keywords.length==0) {
            alert('کلیدواژه ها نمیتواند خالی باشد')
        }else{
            axios.post(OnRun+'/admin/setvector',{id:id,vector:vectorData})
            .then(response=>{
                console.log(response.data)
            })
        }
    }

    useEffect(getCategory,[])

    return(
        <div className="pg">
            <div className="conteiner">
                <h4>فایل وکتور SVG</h4>
                <input type="file" value={vectorData.file} accept=".svg" onChange={(e)=>setVectorData({...vectorData,file:e.target.files[0]})} ></input>
            </div>
            <div className="conteiner">
                <h4>دسته صنفی</h4>
                <div className="typeJob">
                    {
                        category==null?null:
                        category.jobType.map(i=>{
                            return(
                                <div className={vectorData.typeJob.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleTpye(i.name)}>
                                    <p>{i.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="conteiner">
                <h4>کلیدواژه ها</h4>
                <div className="keywords">
                    <input placeholder="کلیدواژه" onChange={(e)=>setVectorData({...vectorData,keywords:e.target.value})} value={vectorData.keywords} />
                </div>
                <p>هر کلید واژه را با - از هم جدا کنید</p>
            </div>
            <button onClick={submit} className="submit">ثبت</button>


        </div>
    )
}

export default Vector