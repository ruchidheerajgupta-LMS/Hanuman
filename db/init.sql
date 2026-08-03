-- =============================================================================
-- Hanuman — TrainTrack Marketing Website Database Schema
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- LEADS — Compliance Audit Bookings
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  rto_name      VARCHAR(255) NOT NULL,
  student_count VARCHAR(30)  DEFAULT 'Under 50',
  pain_point    VARCHAR(255) DEFAULT 'AVETMISS exports and errors',
  source        VARCHAR(50)  DEFAULT 'website',
  status        VARCHAR(20)  DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','converted','lost')),
  notes         TEXT,
  ip_address    VARCHAR(45),
  user_agent    TEXT,
  utm_source    VARCHAR(100),
  utm_medium    VARCHAR(100),
  utm_campaign  VARCHAR(100),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- CONTACT SUBMISSIONS — General enquiries
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(255),
  message    TEXT NOT NULL,
  status     VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread','read','replied')),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- ─────────────────────────────────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  subscribed    BOOLEAN DEFAULT TRUE,
  source        VARCHAR(50) DEFAULT 'website',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- ─────────────────────────────────────────────────────────────────────────────
-- PAGE ANALYTICS (lightweight, no external deps)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  id         SERIAL PRIMARY KEY,
  path       VARCHAR(500) NOT NULL,
  referrer   VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  session_id VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- EMAIL OPEN TRACKING (cold-email campaigns)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_opens (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL,
  campaign   VARCHAR(100) DEFAULT 'default',
  user_agent TEXT,
  ip_address VARCHAR(45),
  opened_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_opens_email ON email_opens(email);
CREATE INDEX IF NOT EXISTS idx_email_opens_campaign ON email_opens(campaign);

-- =============================================================================
-- VERIFICATION
-- =============================================================================
SELECT 'leads' AS table_name, COUNT(*) AS row_count FROM leads
UNION ALL
SELECT 'contacts', COUNT(*) FROM contacts
UNION ALL
SELECT 'subscribers', COUNT(*) FROM subscribers
UNION ALL
SELECT 'page_views', COUNT(*) FROM page_views
UNION ALL
SELECT 'email_opens', COUNT(*) FROM email_opens;
