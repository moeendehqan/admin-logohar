
import * as hook from '../hook/index' 


const DelConfirm = (props) =>{
    const delPallet = hook.useDelPallet(props.delconState.id, props.delconState.idItem)
    const delVector = hook.useDelVector(props.delconState.id, props.delconState.idItem)
    const delFont = hook.useDelFont(props.delconState.id, props.delconState.idItem)

    const Cancel = () =>{
        props.setDelconStatet({...props.delconState, enable:false})
        
    }
    


    const delHandler = () =>{
        if (props.delconState.type == 'pallet') {
            delPallet.mutate()
        }else if (props.delconState.type == 'vector') {
            delVector.mutate()
        }else if (props.delconState.type == 'font') {
            delFont.mutate()
        }
        Cancel()

    }


    if (props.delconState.enable) {
        return(
            <div className="del-con">
                <h1>ایا از حذف این ایتم اطمینان دارید؟</h1>
                <button onClick={delHandler}>بله</button>
                <button onClick={Cancel}>لغو</button>
            </div>
        )
    }
}

export default DelConfirm