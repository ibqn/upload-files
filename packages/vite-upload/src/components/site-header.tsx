import { File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <a href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <File className="size-4" aria-hidden="true" />
          <span className="hidden font-bold md:inline-block">upload files</span>
        </a>

        <nav className="flex flex-1 items-center md:justify-end">
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <a
              aria-label="GitHub repo"
              href="https://github.com/ibqn/upload-files"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.gitHub className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
