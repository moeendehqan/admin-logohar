import { useEffect, useState } from "react"
import * as hook from '../hook/index' 
import { getCookie } from "../functions/Cookie"
import Loader from "../componet/loader"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ToastContainer, toast } from 'react-toastify';
import DelConfirm from "../componet/delConfirm";
const Font = () =>{
    const id = getCookie('id')
    const [delconState,setDelconStatet]=useState({id:id, enable:false, idItem:'',type:'font'})
    const [font, setFont] = useState({file:null, name:'', weight:'Regular', typeJob:[],id:'',logoClass:[]})
    const [distancNameFontTank , setDistancNameFontTank] = useState([])
    var {data:jobs, isLoading:isLoadingJobs} = hook.useGetJobs()
    var {data:fontTank, isLoading:isLoadingFontTank} = hook.useGetFontTank(id)
    var {data:logoClass, isLoading:isLoadingLogoClass} = hook.useGetClass()
    const setNewFont = hook.useSetNewFont(id, font.file, font.name, font.weight, font.typeJob, font.logoClass)
    


    const handleTpye = (typ) =>{
        if (font.typeJob.includes(typ)) {
            const typJobNew = font.typeJob.filter(i => i!=typ)
            setFont({...font,typeJob:typJobNew})
        }else{
            const typJobNew = font.typeJob.concat([typ])
            setFont({...font,typeJob:typJobNew})
        }
    }

    const handleLogoClass = (typ) =>{
        if (font.logoClass.includes(typ)) {
            const logoClassNew = font.logoClass.filter(i => i!=typ)
            setFont({...font,logoClass:logoClassNew})
        }else{
            const logoClassNew = font.logoClass.concat([typ])
            setFont({...font,logoClass:logoClassNew})
        }
    }


    const submit = () =>{
        if (font.name.length==0) {alert('نام فونت خالی است')
        }else if (font.typeJob.length==0) {alert('دسته بندی خالی است')
        }else{
            setNewFont.mutate()
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


    
    const handleTable = () =>{
        if (!isLoadingFontTank){
            var nameFont = fontTank.map(i=>{return i['name']})
            setDistancNameFontTank(nameFont.filter((item, index) => nameFont.indexOf(item) === index))
            var table = new Tabulator("#data-table", {
                data:fontTank,
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
                    {title:"نام", field:"name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",,topCalc:"count"},
                    {title:"وزن", field:"weight", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",,topCalc:"count"},
                    {title:"نام فایل", field:"file_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                    {title:"رشته های صنفی", field:"jobs_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc:"count"},
                    {title:"نوع لوگو", field:"logo_class_name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc:"count"},
                    {title:"تاریخ ایجاد", field:"create_date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"count"},
                ]
            })
        }
    }




    useEffect(handleTable,[isLoadingFontTank, setNewFont.isLoading])


    return(
        <div className="pg">
            <ToastContainer autoClose={3000} />
            <Loader loading={setNewFont.isLoading} />
            <DelConfirm delconState={delconState} setDelconStatet={setDelconStatet}/>
            <div className="conteiner">
                <h4>نام فونت</h4>
                <input list="font-name" value={font.name} onChange={(e)=>setFont({...font, name:e.target.value})} ></input>
                <datalist id='font-name'>
                    {
                        isLoadingFontTank?null:
                        distancNameFontTank.map(i=>{
                            return(
                                <option key={i} value={i}>{i}</option>
                            )
                        })
                        
                    }
                </datalist>
            </div>
            <div className="conteiner">
                <h4>وزن</h4>
                <select value={font.weight} onChange={(e)=>setFont({...font,weight:e.target.value})}>
                    <option value="Thin">Thin (نازک)</option>
                    <option value="Light">Light (سبک)</option>
                    <option value="Regular">Regular (معمولی)</option>
                    <option value="Medium">Medium (متوسط)</option>
                    <option value="Bold">Bold (بولد)</option>
                    <option value="Black">Black (سیاه)</option>
                </select>
            </div>
            <div className="conteiner">
                <input type="file"  accept=".ttf" onChange={(e)=>setFont({...font,file:e.target.files[0]})} ></input>
            </div>
            <div className="conteiner">
                <h4>دسته صنفی</h4>
                <div className="typeJob">
                    {
                        isLoadingJobs?null:
                        jobs.map(i=>{
                            return(
                                <div className={font.typeJob.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleTpye(i.name)}>
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
                            <div className={font.logoClass.includes(i.name)?'typslc':''} key={i.name} onClick={()=>handleLogoClass(i.name)}>
                                <p>{i.title}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <button onClick={submit} className="submit">ثبت</button>
            <div className="conteiner-table">
                <div id="data-table"></div>
            </div>
        </div>
    )
}


export default Font