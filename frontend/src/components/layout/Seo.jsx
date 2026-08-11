import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://traintrack.work'
const SITE_NAME = 'TrainTrack'
// TODO: swap for a proper 1200x630 PNG/JPG social card once designed — SVG
// has inconsistent support in Facebook/LinkedIn/Slack link-preview crawlers.
const DEFAULT_OG_IMAGE = `${SITE_URL}/traintrack-logo.svg`

/**
 * Per-page <head> tags — title, description, canonical, Open Graph, Twitter
 * Card. `path` is the route's path (e.g. "/product/student-management"),
 * used to build the canonical/OG URL. Pages that shouldn't show up in
 * search (login, password reset, unsubscribe) pass noindex.
 */
export default function Seo({ title, description, path, noindex = false, image = DEFAULT_OG_IMAGE, rawTitle = false }) {
  // rawTitle: the homepage's title already reads as a complete "Brand —
  // tagline" string, so it skips the "| TrainTrack" suffix every other page gets.
  const fullTitle = !title
    ? `${SITE_NAME} — Australia's RTO Management System`
    : rawTitle ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path || ''}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
