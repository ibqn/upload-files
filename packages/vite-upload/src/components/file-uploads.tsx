import { uploadFiles, UploadSuccess } from '@/lib/upload-files'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Layout } from '@/components/layout'
import { UploadedFile } from '@/types'
import { UploadedFilesCard } from '@/components/uploaded-files-card'
import { Button } from '@/components/ui/button'

export const FileUploads = () => {
  const [files, setFiles] = useState<File[] | null>()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFiles(() => (event.target.files ? Array.from(event.target.files) : null))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (!files) {
      return
    }

    const onUploadSuccess = ({ file }: UploadSuccess) => {
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        {
          url: `/api/file/${file.name}`,
          name: file.name,
        },
      ])
      console.log('Uploaded file:', file.name)
    }

    await uploadFiles({ files, onUploadSuccess })
  }

  return (
    <Layout>
      <div className="container mx-auto flex flex-col justify-center gap-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-3"
        >
          <h1 className="text-2xl font-semibold">React File Upload</h1>
          <input type="file" multiple onChange={handleChange} />
          {files &&
            [...files]?.map((file, index) => (
              <ul key={index}>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            ))}
          <Button type="submit">Upload</Button>
        </form>

        <UploadedFilesCard uploadedFiles={uploadedFiles} />
      </div>
    </Layout>
  )
}
