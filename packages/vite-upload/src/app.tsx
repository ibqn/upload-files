import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { uploadFiles, UploadSuccess } from '@/libs/upload-files'

export const App = () => {
  const [files, setFiles] = useState<File[] | null>()
  const [uploadedFilePaths, setUploadedPaths] = useState<string[]>([])
  // const [errors, setErrors] = useState()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFiles(() => (event.target.files ? Array.from(event.target.files) : null))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    if (!files) return

    const onUploadSuccess = ({ file }: UploadSuccess) => {
      setUploadedPaths((prevUploadedPaths) => [...prevUploadedPaths, file.name])
      console.log('Uploaded file:', file.name)
    }

    await uploadFiles({ files, onUploadSuccess })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-3">
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
        <button className="flex rounded-md border px-3 py-1" type="submit">
          Upload
        </button>
      </form>
      {uploadedFilePaths.length > 0 && (
        <div className="inline-flex flex-wrap gap-3 p-4">
          {uploadedFilePaths.map((uploadedFilePath, index) => (
            <div key={index}>
              <div className="rounded-md border p-1">
                <img
                  src={`/api/file/${uploadedFilePath}`}
                  alt="Uploaded content"
                  className="h-auto max-w-[400px] rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {error && <p>Error uploading file: {error.message}</p>} */}
    </div>
  )
}
