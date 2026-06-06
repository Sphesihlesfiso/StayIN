import React from "react"
import { Card } from "./ui/card"

export const CommentCard = () => {
  return (
    <Card>
      <div className="grid grid-rows-3 border-r-2 p-2.5">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="m-3">S</div>
            <div className="flex flex-col">
              <h1>Naledi</h1>
              <h1>January 2026</h1>
            </div>
          </div>
          <div>
            <p>ratings</p>
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat in
          asperiores temporibus amet, laudantium minima reprehenderit delectus
          ullam porro culpa eligendi, molestias omnis ex cumque nostrum esse
          obcaecati deleniti ratione.
        </div>
      </div>
    </Card>
  )
}
