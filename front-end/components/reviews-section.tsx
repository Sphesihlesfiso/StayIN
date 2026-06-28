"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Comment } from "@/types/Property/comment"


interface ReviewsSectionProps {
  reviews: Comment[]
}

function ReviewCard({ review }: { review: Comment }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {review.User.username}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{review.User.username}</p>
          <p className="text-xs text-muted-foreground">{review.User.createdAt}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {review.content}
      </p>
    </div>
  )
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            What previous tenants say
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Show first 2 reviews */}
      <div className="space-y-3">
        {/* {reviews.slice(0, 2).map((review,index) => (
          <ReviewCard key={index} review={review} />
        ))} */}
      </div>

      {/* Read all reviews button */}
      {reviews.length > 2 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Read all {reviews.length} reviews
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                {averageRating.toFixed(1)} · {reviews.length} reviews
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="mt-6 h-[calc(100vh-8rem)] pr-4">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
