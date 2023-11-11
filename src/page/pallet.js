import { useEffect, useState } from "react"
import { getCookie } from "../functions/Cookie"
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../componet/loader"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import * as hook from '../hook/index' 
import DelConfirm from "../componet/delConfirm";

const Pallet = () =>{
    const id = getCookie('id')
    const [delconState,setDelconStatet]=useState({id:id, enable:false, idItem:'',type:'pallet'})
    const [palletData,setPalletData] = useState({firstColor:'#000000',secondColor:'#000000',thirdColor:'#000000',typeColor:'warm',typeJob:[],keywords:'',logoClass:[]})
    var {data:palletTank, isLoading:isLoadingPalletTank} = hook.useGetPalletTank(id)
    var {data:colorType, isLoading:isLoadingColorType} = hook.useGetColorType()
    var {data:jobs, isLoading:isLoadingJobs} = hook.useGetJobs()
    var {data:logoClass, isLoading:isLoadingLogoClass} = hook.useGetClass()
    const setNewPallet = hook.useSetNewPallet(id, palletData.firstColor, palletData.secondColor, palletData.thirdColor, palletData.typeColor, palletData.typeJob, palletData.keywords, palletData.logoClass);

    const submit = (newPallet) =>{
        if (newPallet.firstColor == newPallet.secondColor && newPallet.thirdColor == newPallet.secondColor) {
            toast.warning('تمام رنگ ها یکسان است')            
        }else if (newPallet.typeColor.length==0) {
            toast.warning('نوع پالت خالی است')
        }else if (newPallet.typeJob.length==0) {
            toast.warning('حداقل یک دستبندی صنفی باید انتخاب شود')
        }else if (newPallet.keywords.length==0) {
            toast.warning('کلیدواژه ها نمیتواند خالی باشد')
        }else{
            setNewPallet.mutate()
        }
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


    const handleLogoClass = (typ) =>{
        if (palletData.logoClass.includes(typ)) {
            const logoClassNew = palletData.logoClass.filter(i => i!=typ)
            setPalletData({...palletData,logoClass:logoClassNew})
        }else{
            const logoClassNew = palletData.logoClass.concat([typ])
            setPalletData({...palletData,logoClass:logoClassNew})
        }
    }

    const rowMenu = [
        {
            label: "حذف",
            action: function (e, row) {
                const idItem = row.getData()['_id'];
                setDelconStatet({...delconState,idItem:idItem,enable:true})
            }
        }
    ]

    

    const handlePalletTank = () =>{
        if (!isLoadingPalletTank){
            var table = new Tabulator("#data-table", {
                data:palletTank,
                layout:"fitColumns",
                responsiveLayout:true,
                columnHeaderSortMulti:true,
                pagination:"local",
                paginationSize:50,
                paginationSizeSelector:[10, 20, 50, 100, 200,500],
                movableColumns:true,
                layoutColumnsOnNewData:false,
                textDirection:"rtl",
                autoResize:false,
                dataTree:true,
                dataTreeStartExpanded:false,
                rowContextMenu: rowMenu,
                columns:[
                    {title:"_id", visible:false, field:"_id", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"رنگ نخست", field:"first_color", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"رنگ دوم", field:"secend_color", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"رنگ سوم", field:"third_color", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"type_color", visible:false, field:"type_color", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                    {title:"jobs", visible:false, field:"jobs", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                    {title:"کلیدواژه ها", field:"keywords", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                    {title:"نوع رنگ", field:"type_color_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                    {title:"رشته های صنفی", field:"jobs_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc:"count"},
                    {title:"نوع لوگو", field:"logo_class_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc:"count"},
                    {title:"تاریخ ایجاد", field:"create_date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                ]
            })
        }
    }


    useEffect(handlePalletTank,[isLoadingPalletTank, setNewPallet.isLoading])

    return(
        <div className="pg">
            <ToastContainer autoClose={3000} />
            <Loader loading={setNewPallet.isLoading} />
            <DelConfirm delconState={delconState} setDelconStatet={setDelconStatet}/>
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
                        isLoadingColorType ? null :
                        colorType.map(i => {
                            return(
                                <div className={palletData.typeColor==i.name?'typslc':''} key={i.name} onClick={()=>setPalletData({...palletData,typeColor:i.name})}>
                                    <p>{i.title}</p>
                                    <div className="count">
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
                        isLoadingJobs ? null :
                        jobs.map(i => {
                            return(
                                <div className={palletData.typeJob.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleTpye(i.name)}>
                                    <p>{i.title}</p>
                                    <div className="count">
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="conteiner">
                <h4>نوع لوگو</h4>
                <div className="typeJob">
                {
                    isLoadingLogoClass?null:
                    logoClass.map(i=>{
                        return(
                            <div className={palletData.logoClass.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleLogoClass(i.name)}>
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
            <button onClick={()=>submit(palletData)} className="submit">ثبت</button>
            <div className="conteiner-table">
                <div id="data-table"></div>
            </div>
        </div>
    )
}

export default Pallet