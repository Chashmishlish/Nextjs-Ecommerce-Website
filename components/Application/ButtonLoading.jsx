import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import cn from "classnames"


const ButtonLoading = ({ type, text, loading, className, onClick, ...props }) => {
    return (
    <Button 
        type={type} 
        disabled = {loading} 
        className={cn("", className)}
        onClick={onClick} 
        {...props} >
        {loading && 
            <Loader2 className="animate-spin" />
        }
        {text}
    </Button>
  )
}


export default ButtonLoading