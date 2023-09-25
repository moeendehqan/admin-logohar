import { useState } from "react"




const Pallet = () =>{
    const [palletData,setPalletData] = useState({firstColor:'#000',secondColor:'#000',thirdColor:'#000',typeColor:[]})
    console.log(palletData)
    const typeColor = [{name:'warm',title:'گرم'},{name:'cold',title:'سرد'},{name:'fancy',title:'فانتزی'},{name:'pastel',title:'پاستیلی'}]
    
    const handleTpye = (typ) =>{
        if (palletData.typeColor.includes(typ)) {
            const typColerNew = palletData.typeColor.filter(i => i!=typ)
            setPalletData({...palletData,typeColor:typColerNew})
        }else{
            const typColerNew = palletData.typeColor.concat([typ])
            setPalletData({...palletData,typeColor:typColerNew})
        }
    }

    return(
        <div className="pg">
            <div className="pallet">
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
            <div className="typeColor">
                {
                    typeColor.map(i=>{
                        return(
                            <div key={i.name} onClick={()=>handleTpye(i.name)}>
                                <p>{i.title}</p>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Pallet