import { FileUploads } from '@/components/file-uploads'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <FileUploads />
      <Toaster />
    </ThemeProvider>
  )
}
