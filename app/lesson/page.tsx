import { redirect } from "next/navigation"

import { getNonce } from "get-nonce"

import Quiz from "@/app/lesson/quiz"
import { getLesson, getUserProgress } from "@/db/queries"
import { userProgress } from "@/db/schema"

const LessonPage = async () => {
  const lessonData = getLesson()
  const userProgressData = getUserProgress()

  const [lesson, useProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ])

  if (!lesson || !userProgress) {
    redirect("/learn")
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <>
      <Quiz
        initialLessonId={lesson.id}
        // initialLessonChallenges={lesson.challenges}
        initialHearts={useProgress?.hearts || 0}
        initialPercentage={initialPercentage}
        userSubscription={null}
      />
    </>
  )
}

export default LessonPage
