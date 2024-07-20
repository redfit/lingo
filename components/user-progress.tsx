import Image from "next/image"
import Link from "next/link"

import { InfinityIcon } from "lucide-react"

import { courses } from "@/db/schema"

import { Button } from "@/components/ui/button"

interface Props {
  activeCourse: typeof courses.$inferSelect
  hearts: number
  points: number
  hasActiveSubscription: boolean
}
const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            height={32}
            width={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={28}
            width={28}
            alt="heart"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-3" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  )
}

export default UserProgress
