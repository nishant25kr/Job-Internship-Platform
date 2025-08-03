import { useState } from "react"

export default function Navbar(){
    const [mobileOpen,setmobileOpen] = useState(false)
    
    return (
        <div>
            <h1>This is navbar</h1>
        </div>
    )
}