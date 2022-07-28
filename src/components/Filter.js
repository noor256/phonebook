

const Filter = (props) =>{
    return(

        <div><h3>Filter Show with <input value={props.value}  onChange={props.onChange} placeholder={props.placeholder}/></h3></div>
    )
}

export default Filter