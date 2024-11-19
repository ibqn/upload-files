import axios, { AxiosProgressEvent, AxiosResponse } from 'axios'

export type UploadProgress = {
  file: File
  progress: number
}

export type UploadSuccess = {
  file: File
  response: AxiosResponse
}

export type UploadError = {
  file: File
  error: Error
}

type UploadOptions = {
  files: File[]

  onUploadProgress?: ({ file, progress }: UploadProgress) => void
  onUploadSuccess?: ({ file, response }: UploadSuccess) => void
  onUploadError?: ({ file, error }: UploadError) => void
}

export const uploadFiles = async ({
  files,
  onUploadProgress,
  onUploadSuccess,
  onUploadError,
}: UploadOptions) => {
  const uploadProgressForFile =
    (file: File) => (progressEvent: AxiosProgressEvent) => {
      const { loaded, total } = progressEvent
      const progress = total ? Math.floor((loaded / total) * 100) : 0
      onUploadProgress?.({ file, progress })
    }

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post('/api/upload', formData, {
      ...config,
      onUploadProgress: uploadProgressForFile(file),
    })

    return response
  }

  const responses = await Promise.all(
    files.map(async (file) => {
      try {
        const response = await uploadFile(file)
        onUploadSuccess?.({ file, response })
        return response
      } catch (error) {
        if (error instanceof Error) {
          onUploadError?.({ file, error })
        }
      }
    })
  )

  return responses
}
