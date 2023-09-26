import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../functions/Cookie"

const Pallet = () =>{
    const [palletData,setPalletData] = useState({firstColor:'#000',secondColor:'#000',thirdColor:'#000',typeColor:'warm',typeJob:[],keywords:'',id:''})
    const [category,setCategory] = useState(null)
    const id = getCookie('id')
    
    const getCategory = () =>{
        axios.post(OnRun+'/public/getallcategory')
        .then(response=>{
            setCategory(response.data)
        })
    }

    const handleTpye = (typ) =>{
        if (palletData.typeJob.includes(typ)) {
            const typJobNew = palletData.typeJob.filter(i => i!=typ)
            setPalletData({...palletData,typeJob:typJobNew})
        }else{
            const typJobNew = palletData.typeJob.concat([typ])
            setPalletData({...palletData,typeJob:typJobNew})
        }
    }

    const submit = () =>{
        if (palletData.firstColor == palletData.secondColor && palletData.thirdColor == palletData.secondColor) {
            alert('تمام رنگ ها یکسان است')            
        }else if (palletData.typeColor.length==0) {
            alert('نوع پالت خالی است')
        }else if (palletData.typeJob.length==0) {
            alert('حداقل یک دستبندی صنفی باید انتخاب شود')
        }else if (palletData.keywords.length==0) {
            alert('کلیدواژه ها نمیتواند خالی باشد')
        }else{
            axios.post(OnRun+'/admin/setpallet',{id:id,pallet:palletData})
            .then(response=>{
                console.log(response.data)
            })
        }
        
    }

    useEffect(getCategory,[])
    return(
        <div className="pg">
            <div className="pallet">
                <h4>انتخاب رنگ ها</h4>
                <div className="bxs">
                    <div className="bx">
                        <p>رنگ نخست</p>
                        <p>{palletData.firstColor}</p>
                        <input type="color" value={palletData.firstColor} onChange={(e)=>setPalletData({...palletData,firstColor:e.target.value})}></input>
                    </div>
                    <div className="bx">
                        <p>رنگ دوم</p>
                        <p>{palletData.secondColor}</p>
                        <input type="color" value={palletData.secondColor} onChange={(e)=>setPalletData({...palletData,secondColor:e.target.value})}></input>
                    </div>
                    <div className="bx">
                        <p>رنگ سوم</p>
                        <p>{palletData.thirdColor}</p>
                        <input type="color" value={palletData.thirdColor} onChange={(e)=>setPalletData({...palletData,thirdColor:e.target.value})}></input>
                    </div>
                </div>
            </div>
            <div className="conteiner">
                <h4>نوع پالت</h4>
                <div className="typeColor">
                    {
                        category==null?null:
                        category.colorType.map(i=>{
                            return(
                                <div className={palletData.typeColor==i.name?'typslc':''} key={i.name} onClick={()=>setPalletData({...palletData,typeColor:i.name})}>
                                    <p>{i.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="conteiner">
                <h4>دسته صنفی</h4>
                <div className="typeJob">
                    {
                        category==null?null:
                        category.jobType.map(i=>{
                            return(
                                <div className={palletData.typeJob.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleTpye(i.name)}>
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
                    <input placeholder="کلیدواژه" onChange={(e)=>setPalletData({...palletData,keywords:e.target.value})} value={palletData.keywords} />
                </div>
                <p>هر کلید واژه را با - از هم جدا کنید</p>
            </div>
            <button onClick={submit} className="submit">ثبت</button>
        </div>
    )
}

export default Pallet