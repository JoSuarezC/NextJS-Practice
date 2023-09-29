import '@styles/globals.css'
import '@styles/reset.css'
import { Inter } from 'next/font/google'
import { NotificationContextProvider } from '@context/notification';
import { Layout } from '@components/layout/layout';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Josue NextJS App',
  description: 'Training web app using NextJS and developed by Josue Suarez',
  keywords: 'NextJS, React, Javascript, Node',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NotificationContextProvider>
        <body className={inter.className}>
          <>
            <Layout>
              {children}
            </Layout>
            <div id='notificationPortal'></div>
          </>
        </body>
      </NotificationContextProvider>
    </html>
  )
}
