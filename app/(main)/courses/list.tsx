import Card from "@/app/(main)/courses/card"
import { courses, userProgress } from "@/db/schema"

interface Props {
  courses: (typeof courses.$inferSelect)[]
  activeCourses?: typeof userProgress.$inferSelect.activeCourseId
}
const List = ({ courses, activeCourses }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeCourses}
        />
      ))}
    </div>
  )
}

export default List
