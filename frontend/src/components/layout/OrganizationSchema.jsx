import { Helmet } from 'react-helmet-async'

/**
 * Homepage-only JSON-LD: Organization + SoftwareApplication. Helps Google
 * understand what TrainTrack is and who makes it, and is a prerequisite for
 * rich results (sitelinks search box, knowledge panel eligibility).
 */
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://traintrack.work/#organization',
        name: 'TrainTrack',
        url: 'https://traintrack.work',
        logo: 'https://traintrack.work/traintrack-logo.svg',
        description: "Australia's RTO management system — merges SMS and LMS into one ASQA-aligned platform.",
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TrainTrack',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://traintrack.work',
        description: "Cloud-based Student Management and Learning Management platform built for Australian RTOs — AVETMISS reporting, USI verification, trainer currency, and compliance dashboards in one place.",
        offers: {
          '@type': 'Offer',
          price: '299',
          priceCurrency: 'AUD',
          priceValidUntil: '2027-12-31',
          url: 'https://traintrack.work/company/pricing',
        },
        provider: { '@id': 'https://traintrack.work/#organization' },
      },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
