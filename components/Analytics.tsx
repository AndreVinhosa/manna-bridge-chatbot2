import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview, GA_TRACKING_ID } from '../lib/analytics'

const Analytics = () => {
  const router = useRouter()

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Only render in production
  if (process.env.NODE_ENV !== 'production' || !GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  )
}

export default Analytics
