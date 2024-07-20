import Link from "next/link"

import { NotebookText } from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
}
const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="bg-green-500 w-full rounded-xl text-white flex items-center justify-between p-5">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="textlg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active-border-2"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  )
}

export default UnitBanner
