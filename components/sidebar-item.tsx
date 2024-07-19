"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

interface SidebarItem {
  label: string
  iconSrc: string
  href: string
}

const SidebarItem = ({ label, iconSrc, href }: SidebarItem) => {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={label}
          className="mr-5"
        />
        {label}
      </Link>
    </Button>
  )
}

export default SidebarItem
