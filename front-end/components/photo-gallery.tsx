'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X, Grid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface PhotoGalleryProps {
  images: string[]
  title: string
}

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="relative grid gap-2 overflow-hidden rounded-2xl">
        {/* Desktop: 5-image grid */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2">
          {/* Main large image */}
          <button
            onClick={() => openGallery(0)}
            className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-l-2xl"
          >
            <Image
              src={images[0]}
              alt={`${title} - Main photo`}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="50vw"
              priority
            />
          </button>

          {/* Smaller images */}
          {images.slice(1, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => openGallery(index + 1)}
              className={cn(
                'relative aspect-[4/3] overflow-hidden',
                index === 1 && 'rounded-tr-2xl',
                index === 3 && 'rounded-br-2xl'
              )}
            >
              <Image
                src={image}
                alt={`${title} - Photo ${index + 2}`}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="25vw"
              />
            </button>
          ))}
        </div>

        {/* Mobile: Single image with indicator */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:hidden">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-6 bg-background'
                    : 'bg-background/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* Show all photos button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => openGallery(0)}
          className="absolute bottom-4 right-4 gap-2 rounded-xl bg-background/90 backdrop-blur-sm hover:bg-background"
        >
          <Grid className="h-4 w-4" />
          Show all photos
        </Button>
      </div>

      {/* Full-screen gallery modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-black/95 border-none">
          <VisuallyHidden>
            <DialogTitle>{title} - Photo Gallery</DialogTitle>
          </VisuallyHidden>
          
          <div className="relative flex h-full items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-50 h-10 w-10 rounded-full text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 z-50 h-12 w-12 rounded-full text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="relative h-[80vh] w-[90vw] max-w-5xl">
              <Image
                src={images[currentIndex]}
                alt={`${title} - Photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 z-50 h-12 w-12 rounded-full text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'relative h-14 w-14 overflow-hidden rounded-lg transition-all',
                    index === currentIndex
                      ? 'ring-2 ring-white'
                      : 'opacity-50 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
