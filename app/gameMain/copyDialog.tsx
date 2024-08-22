export default function CopyDialog(props:{message:string}){
    return(
        <div className="flex absolute right-0 bg-black p-4 opacity-70">
            <p className="text-white text-sm">{props.message}</p>
        </div>
    )
}