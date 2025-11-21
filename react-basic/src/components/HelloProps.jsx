const HelloProps = ({name, color})=>{
    // props => name / color
    // props.name / props.color
    // 구조분해 {name, color} = props;
    // const {name, color} = props;
    return (
        <div className="helloProps">
            <div>HelloProps.jsx area props = {name} / props = {color}</div>
        </div>
    )
}

export default HelloProps;