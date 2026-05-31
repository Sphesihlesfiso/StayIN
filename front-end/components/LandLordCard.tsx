import {  CheckCircle } from "lucide-react"
import { Card } from "./ui/card"
export const LandLordCard =()=>{
    return (
        <Card className="border-r-2 p-1.5">
            <div className="flex flex-row">
                <p>S</p> 
                <h1 className="font-black">Hosted by Thabo  <CheckCircle/></h1>
                <p>
                    4.7 Landlord Trust Score Member since 2022
                </p>
            </div>
        </Card>
    )
}