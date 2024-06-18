export function Input(props) {
    return (
        <label className={`flex flex-col`}>
            <span className={props.classlabel}>{props.label}</span>
            <input {...props} className={`${props.className}`} />
        </label>
    )
}