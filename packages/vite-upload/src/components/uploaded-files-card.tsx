import type { UploadedFile } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { EmptyCard } from '@/components/empty-card'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[]
  onRemove?: (index: number) => void
}

export function UploadedFilesCard({
  uploadedFiles,
  onRemove,
}: UploadedFilesCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative aspect-video w-64">
                  <div className="absolute right-1.5 top-1.5 bg-transparent">
                    <Button
                      variant="outline"
                      className="h-auto border-transparent/20 bg-transparent/20 p-1"
                      onClick={() => onRemove?.(index)}
                    >
                      <X className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                  <img
                    src={file.url}
                    alt={file.name}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full shadow-sm"
          />
        )}
      </CardContent>
    </Card>
  )
}
