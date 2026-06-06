import React from 'react'
import { Badge } from './ui/badge'
import { Wifi } from 'lucide-react'
import { BadgeCardProps } from '@/types/property'

export const BadgeCard = ({title,variant}:BadgeCardProps) => {

  return (
    <div>
        <h1 className='font-bold'>{title}</h1>
      <Badge variant={variant}>
        <Wifi /> Wifi
      </Badge>
    </div>
  )
}

