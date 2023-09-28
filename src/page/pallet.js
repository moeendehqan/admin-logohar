import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../functions/Cookie"
import Loader from "../componet/loader"

const Pallet = () =>{
    const [palletData,setPalletData] = useState({firstColor:'#000',secondColor:'#000',thirdColor:'#000',typeColor:'warm',typeJob:[],keywords:'',id:''})
    const [category,setCategory] = useState(null)
    const [statics,setSetstatics] = useState({create:0,edith:0,typeColor:{},typeJob:{}})
    const [loading,setLoading] = useState(false)
    const [df,setDf] = useState(null)
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

    const getStatics = () =>{
        if (category) {
            axios.post(OnRun+'/admin/getstaticspallet',{id:id})
            .then(response=>{
                if(response.data.reply){
                    setSetstatics(response.data.dic)
                }
            })
            
        }
    }

    const getBank = () =>{
        axios.post(OnRun+'/admin/getbankpallet',{id:id})
        .then(response=>{
            if(response.data.reply){
                setDf(response.data.df)
            }else{
                alert(response.data.msg)
            }
        })
    }

    const submit = () =>{
        setLoading(true)
        if (palletData.firstColor == palletData.secondColor && palletData.thirdColor == palletData.secondColor) {
            setLoading(false)
            alert('تمام رنگ ها یکسان است')            
        }else if (palletData.typeColor.length==0) {
            setLoading(false)
            alert('نوع پالت خالی است')
        }else if (palletData.typeJob.length==0) {
            setLoading(false)
            alert('حداقل یک دستبندی صنفی باید انتخاب شود')
        }else if (palletData.keywords.length==0) {
            setLoading(false)
            alert('کلیدواژه ها نمیتواند خالی باشد')
        }else{
            axios.post(OnRun+'/admin/setpallet',{id:id,pallet:palletData})
            .then(response=>{
                setLoading(false)
                if(response.data.reply){
                    alert('افزوده شد')
                }else{
                    alert(response.data.msg)
                }
            })
        }
    }

    useEffect(getCategory,[])
    useEffect(getStatics,[category])
    useEffect(getBank,[category])
    return(
        <div className="pg">
            <Loader loading={loading} />
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
                                    <div className="count">
                                        <p>{Object.keys(statics.typeColor).includes(i.name)?statics.typeColor[i.name]:0}</p>
                                    </div>
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
                                    <div className="count">
                                        <p>{Object.keys(statics.typeJob).includes(i.name)?statics.typeJob[i.name]:0}</p>
                                    </div>
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