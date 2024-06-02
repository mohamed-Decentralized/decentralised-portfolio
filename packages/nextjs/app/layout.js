import "@rainbow-me/rainbowkit/styles.css"
import { EthAppWithProviders } from "~~/components/EthAppWithProviders"
import { ThemeProvider } from "~~/components/ThemeProvider"
import "~~/styles/globals.css"

const baseUrl = `http://localhost:${process.env.PORT || 3000}`
const imageUrl = `${baseUrl}/thumbnail.jpg`

const title = ""
const titleTemplate = "%s | "
const description = ""

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
}

const EthApp = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <EthAppWithProviders>{children}</EthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default EthApp
