import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../functions/Cookie"
import Loader from "../componet/loader"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import * as hook from '../hook/index' 
const Pallet = () =>{
    const id = getCookie('id')

    const [palletData,setPalletData] = useState({firstColor:'#000',secondColor:'#000',thirdColor:'#000',typeColor:'warm',typeJob:[],keywords:''})

    var {data:statics, isLoading:isLoadingStatics} = hook.useGetStaticPallet(id)
    var {data:bankPallet, isLoading:isLoadingBankPallet} = hook.useGetBankPalet(id)
    var {data:Category, isLoading:isLoadingCategory} = hook.useGetCategory()

    const setNewPallet = hook.useSetNewPallet(id, palletData);

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




    const rowMenu = [
        {
            label:"کپی",
            action:function(e, row){

                const rowValue  = row.getData()
                setPalletData(rowValue)
            }
        }
    ]

    

    const handleBankPallet = () =>{
        if (!isLoadingBankPallet){
            var table = new Tabulator("#data-table", {
                data:bankPallet.df,
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
                    {title:"id", visible:false, field:"id", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"رنگ نخست", field:"firstColor", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"رنگ دوم", field:"secondColor", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"رنگ سوم", field:"thirdColor", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<div class='cntnrClr'><p>"+value+"</p><span style='background-color:" + value+ "'></span><div>")
                        },
                    },
                    {title:"typeColor", visible:false, field:"typeColor", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"typeJob", visible:false, field:"typeJob", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"کلیدواژه ها", field:"keywords", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"idCreator", visible:false, field:"idCreator", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"نوع رنگ", field:"typeColorName", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"رشته های صنفی", field:"typeJobName", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                    {title:"تاریخ ایجاد", field:"createDate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"edith", visible:false, field:"edith", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"edithFrom", visible:false, field:"edithFrom", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"idEdithor", visible:false, field:"idEdithor", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                ]
            })
        }
    }


    useEffect(handleBankPallet,[isLoadingBankPallet, setNewPallet.isLoading])

    return(
        <div className="pg">
            <Loader loading={setNewPallet.isLoading} />
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
                        isLoadingCategory ? null :
                        Category.colorType.map(i => {
                            return(
                                <div className={palletData.typeColor==i.name?'typslc':''} key={i.name} onClick={()=>setPalletData({...palletData,typeColor:i.name})}>
                                    <p>{i.title}</p>
                                    <div className="count">
                                        {isLoadingStatics?null:<p>{Object.keys(statics.typeColor).includes(i.name)?statics.typeColor[i.name]:0}</p>}
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
                        isLoadingCategory ? null :
                        Category.jobType.map(i => {
                            return(
                                <div className={palletData.typeJob.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleTpye(i.name)}>
                                    <p>{i.title}</p>
                                    <div className="count">
                                        {isLoadingStatics?null:<p>{Object.keys(statics.typeJob).includes(i.name)?statics.typeJob[i.name]:0}</p>}
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
            <div className="conteiner-table">
                <div id="data-table"></div>
            </div>
        </div>
    )
}

export default Pallet