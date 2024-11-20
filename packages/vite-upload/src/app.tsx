import { FileUploads } from './components/file-uploads'
import { ThemeProvider } from './components/theme-provider'

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <FileUploads />
    </ThemeProvider>
  )
}
