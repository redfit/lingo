"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { auth, currentUser } from "@clerk/nextjs/server"

import db from "@/db/drizzle"
import { getCourseById, getUserProgress } from "@/db/queries"
import { courses, userProgress } from "@/db/schema"

export const upsertUseProgress = async (courseId: number) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error("Unauthorized")
  }

  const course = await getCourseById(courseId)

  if (!course) {
    throw new Error("Course not found")
  }

  // if(!course.units.length || !course.unit[0].lessons.length) {
  //   throw new Error("Course is empty")
  // }

  const existingUserProgress = await getUserProgress()

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    })
  } else {
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    })
  }

  revalidatePath("/courses")
  revalidatePath("/learn")
  redirect("/learn")
}
