

const Loader = (props) =>{
    if (props.loading) {
        return(
            <div className="loader">
                <div>
    
                </div>
                <h1>درحال پردازش</h1>
                <p>لطفا صبر کنید</p>
            </div>
        )
    }
}

export default Loader