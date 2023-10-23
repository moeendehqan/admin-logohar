import { useEffect, useState } from "react"
import { getCookie } from "../functions/Cookie"
import * as hook from '../hook/index' 
import Loader from "../componet/loader"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ToastContainer, toast } from 'react-toastify';
import DelConfirm from "../componet/delConfirm";


const Vector = () =>{

    const id = getCookie('id')
    const [vectorData, setVectorData] = useState({file:null,typeJob:[],keywords:'',logoClass:[]})
    const [delconState,setDelconStatet]=useState({id:id, enable:false, idItem:'',type:'vector'})

    var {data:jobs, isLoading:isLoadingJobs} = hook.useGetJobs()
    var {data:vectorTank, isLoading:isLoadingVectorTank} = hook.useGetVectorTank(id)
    var {data:logoClass, isLoading:isLoadingLogoClass} = hook.useGetClass()


    
    const rowMenu = [
        {
            label: "حذف",
            action: function (e, row) {
                const idItem = row.getData()['_id'];
                setDelconStatet({...delconState,idItem:idItem,enable:true})
            }
        }
    ]


    const handleVectorTank = () =>{
        if (!isLoadingVectorTank){
            var table = new Tabulator("#data-table", {
                data:vectorTank,
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
                    {title:"تصویر", field:"file", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();

                            return ('<div class="cntrcvgTbl">'+value+'</div>')
                        },
                    },
                    {title:"نام فایل", field:"file_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",},
                    {title:"فرمت", field:"file_type", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",},
                    {title:"نسبت تصویر", field:"aspect_ratio_file", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();

                            return ('<p>'+Math.floor(value*100)/100+':1</p>')
                        },
                    },
                    {title:"نسبت محتوا", field:"aspect_ratio_content", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();

                            return ('<p>'+Math.floor(value*100)/100+':1</p>')
                        },
                    },
                    {title:"typeJob", visible:false, field:"typeJob", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"کلیدواژه ها", field:"keywords", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                    {title:"رشته های صنفی", field:"jobs_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                    {title:"نوع لوگو", field:"logo_class_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                    {title:"تاریخ ایجاد", field:"create_date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                ]
            })
        }
    }

    
    const setNewVector = hook.useSetNewVector(id, vectorData.file, vectorData.typeJob, vectorData.keywords, vectorData.logoClass)

    


    const handleTpye = (typ) =>{
        if (vectorData.typeJob.includes(typ)) {
            const typJobNew = vectorData.typeJob.filter(i => i!=typ)
            setVectorData({...vectorData,typeJob:typJobNew})
        }else{
            const typJobNew = vectorData.typeJob.concat([typ])
            setVectorData({...vectorData,typeJob:typJobNew})
        }
    }

    const handleLogoClass = (typ) =>{
        if (vectorData.logoClass.includes(typ)) {
            const logoClassNew = vectorData.logoClass.filter(i => i!=typ)
            setVectorData({...vectorData,logoClass:logoClassNew})
        }else{
            const logoClassNew = vectorData.logoClass.concat([typ])
            setVectorData({...vectorData,logoClass:logoClassNew})
        }
    }

    const submit = () =>{
        if (!vectorData.file) {
            toast.warning('فایلی ضمیمه نشده است')            
        }else if (vectorData.typeJob.length==0) {
            toast.warning('حداقل یک دستبندی صنفی باید انتخاب شود')
        }else if (vectorData.keywords.length==0) {
            toast.warning('کلیدواژه ها نمیتواند خالی باشد')
        }else{
            setNewVector.mutate()
        }
    }


    useEffect(handleVectorTank,[isLoadingVectorTank, setNewVector.isLoading])

    return(
        <div className="pg">
            <ToastContainer autoClose={3000} />
            <Loader loading={setNewVector.isLoading} />
            <DelConfirm delconState={delconState} setDelconStatet={setDelconStatet}/>
            <div className="conteiner">
                <h4>فایل وکتور SVG</h4>
                <input type="file"  accept=".svg" onChange={(e)=>setVectorData({...vectorData,file:e.target.files[0]})} ></input>
            </div>
            <div className="conteiner">
                <h4>دسته صنفی</h4>
                <div className="typeJob">
                    {
                        isLoadingJobs?null:
                        jobs.map(i=>{
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
                <h4>نوع لوگو</h4>
                <div className="typeJob">
                {
                    isLoadingLogoClass?null:
                    logoClass.map(i=>{
                        return(
                            <div className={vectorData.logoClass.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleLogoClass(i.name)}>
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
            <div className="conteiner-table">
                <div id="data-table"></div>
            </div>

        </div>
    )
}

export default Vector