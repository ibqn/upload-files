import { Layout } from '@/components/layout'
import { UploadedFilesCard } from '@/components/uploaded-files-card'
import { useUploadFile } from '@/hooks/use-upload-file'
import { FileUploader } from '@/components/file-uploader'

export const FileUploads = () => {
  const { onUpload, onRemove, progresses, uploadedFiles, isUploading } =
    useUploadFile({
      defaultUploadedFiles: [],
    })

  return (
    <Layout>
      <div className="container mx-auto flex flex-col justify-center gap-8">
        <FileUploader
          maxFileCount={4}
          maxSize={10 * 1024 * 1024}
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
        />

        <UploadedFilesCard uploadedFiles={uploadedFiles} onRemove={onRemove} />
      </div>
    </Layout>
  )
}
