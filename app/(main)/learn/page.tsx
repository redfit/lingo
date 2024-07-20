import { redirect } from "next/navigation"

import Header from "@/app/(main)/learn/header"
import Unit from "@/app/(main)/learn/unit"
import {
  getCourseProgress,
  getCourses,
  getUnits,
  getUserProgress,
} from "@/db/queries"
import { lessons, units } from "@/db/schema"

import FeedWrapper from "@/components/feed-wrapper"
import StickyWrapper from "@/components/sticky-wrapper"
import UserProgress from "@/components/user-progress"

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getUnits()
  const unitsData = getUnits()

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  if (!courseProgress) {
    redirect("/courses")
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={unit.order}
            description={unit.description}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={
              courseProgress.activeLesson as
                | (typeof lessons.$inferSelect & {
                    unit: typeof unitsSchema.$inferSelect
                  })
                | undefined
            }
            activeLessonPercentage={lessonPercentage}
          />
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
