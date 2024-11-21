import { useState } from 'react'
import type { UploadedFile } from '@/types'
import { toast } from 'sonner'

import { getErrorMessage } from '@/lib/handle-error'
import { uploadFiles } from '@/lib/upload-files'

export type UseUploadFileOptions = {
  defaultUploadedFiles?: UploadedFile[]
}

export function useUploadFile({
  defaultUploadedFiles = [],
}: UseUploadFileOptions) {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(defaultUploadedFiles)
  const [progresses, setProgresses] = useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = useState(false)

  async function onUpload(files: File[]) {
    setIsUploading(true)
    try {
      await uploadFiles({
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            }
          })
        },
        onUploadSuccess: ({ file }) => {
          setUploadedFiles((prev) => [
            ...prev,
            {
              url: `/api/file/${file.name}`,
              name: file.name,
            },
          ])
        },
        onUploadError({ file, error }) {
          toast.error(
            `Failed to upload ${file.name}: ${getErrorMessage(error)}`
          )
        },
      })
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  function onRemove(index: number) {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
  }

  return {
    onUpload,
    onRemove,
    uploadedFiles,
    progresses,
    isUploading,
  }
}
