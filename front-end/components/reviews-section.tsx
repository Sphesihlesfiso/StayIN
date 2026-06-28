"use client"

import { Star } from "lucide-react"

import type { Comment } from "@/types/Property/comment"
import { extractDate } from '../lib/utils';





export const CommentCard =({rating,content,User}:Comment) =>{
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {User.username.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{User.username}</p>
          <p className="text-xs text-muted-foreground">{extractDate(User.createdAt)}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {content}
      </p>
    </div>
  )
}


