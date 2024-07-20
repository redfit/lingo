import LessonButton from "@/app/(main)/learn/lesson"
import UnitBanner from "@/app/(main)/learn/unit-banner"
import { lessons, units } from "@/db/schema"

type Props = {
  id: number
  order: number
  description: string
  title: string
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[]
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
      })
    | undefined
  activeLessonPercentage: number
}
const Unit = ({
  id,
  order,
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <div>
        <UnitBanner title={title} description={description} />
        <div className="flex items-center flex-col relative">
          {lessons.map((lesson, index) => {
            const isCurrent = lesson.id === activeLesson?.id
            const isLocked = !lesson.completed && !isCurrent
            return (
              <LessonButton
                key={lesson.id}
                id={lesson.id}
                index={index}
                totalCount={lessons.length - 1}
                current={true || isCurrent}
                locked={isLocked}
                percentage={activeLessonPercentage}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Unit
