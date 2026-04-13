"""
Hanuman — TrainTrack Marketing Website — Locust Load Test
Simulates visitors browsing the marketing site and submitting the audit form.
"""

import random
import time
from locust import HttpUser, task, between, tag


class MarketingVisitor(HttpUser):
    """Simulates a visitor browsing the marketing site."""

    wait_time = between(2, 8)
    weight = 8

    @tag("browse")
    @task(5)
    def view_homepage(self):
        self.client.get("/", verify=False, name="/")

    @tag("browse")
    @task(2)
    def view_static_assets(self):
        self.client.get("/assets/index.css", verify=False, name="/assets/[static]")

    @tag("api")
    @task(1)
    def track_pageview(self):
        self.client.post(
            "/api/analytics/pageview",
            json={"path": "/", "referrer": "https://google.com.au"},
            verify=False,
            name="/api/analytics/pageview",
        )


class LeadSubmitter(HttpUser):
    """Simulates a visitor filling out the audit booking form."""

    wait_time = between(5, 15)
    weight = 2

    RTO_NAMES = [
        "Gladstone Training Group",
        "NSW Skills Academy",
        "Brisbane Career College",
        "Melbourne Training Institute",
        "Perth Vocational Services",
        "Adelaide RTO Group",
        "Sydney Business Academy",
        "Gold Coast Training Co",
    ]

    PAIN_POINTS = [
        "AVETMISS exports and errors",
        "Trainer currency tracking",
        "USI compliance",
        "ASQA audit preparation",
        "Double data entry / system silos",
        "Certificate issuance delays",
    ]

    STUDENT_COUNTS = ["Under 50", "50–150", "150–400", "400–1,000", "1,000+"]

    def _unique_email(self):
        ts = int(time.time() * 1000)
        return f"loadtest_{ts}_{random.randint(1000,9999)}@testrto.edu.au"

    @tag("form")
    @task(3)
    def submit_audit_booking(self):
        payload = {
            "name": f"Load Test User {random.randint(1, 999)}",
            "email": self._unique_email(),
            "rto_name": random.choice(self.RTO_NAMES),
            "student_count": random.choice(self.STUDENT_COUNTS),
            "pain_point": random.choice(self.PAIN_POINTS),
            "utm_source": "locust",
            "utm_medium": "loadtest",
        }
        self.client.post(
            "/api/leads/audit-booking",
            json=payload,
            verify=False,
            name="/api/leads/audit-booking",
        )

    @tag("form")
    @task(1)
    def submit_contact(self):
        payload = {
            "name": f"Contact User {random.randint(1, 999)}",
            "email": self._unique_email(),
            "subject": "Load test inquiry",
            "message": "This is a load test contact submission.",
        }
        self.client.post(
            "/api/contact",
            json=payload,
            verify=False,
            name="/api/contact",
        )

    @tag("form")
    @task(1)
    def subscribe_newsletter(self):
        self.client.post(
            "/api/subscribe",
            json={"email": self._unique_email(), "source": "locust"},
            verify=False,
            name="/api/subscribe",
        )


class AdminUser(HttpUser):
    """Simulates an admin checking leads."""

    wait_time = between(10, 30)
    weight = 1

    @tag("admin")
    @task(3)
    def list_leads(self):
        self.client.get(
            "/api/leads",
            params={"page": 1, "per_page": 20},
            verify=False,
            name="/api/leads",
        )

    @tag("admin")
    @task(1)
    def list_leads_filtered(self):
        self.client.get(
            "/api/leads",
            params={"status": "new", "page": 1, "per_page": 10},
            verify=False,
            name="/api/leads?status=new",
        )

    @tag("api")
    @task(1)
    def health_check(self):
        self.client.get("/health", verify=False, name="/health")


class GatewayUser(HttpUser):
    """Simulates traffic to the gateway-service — tenant portal and proxy login."""

    wait_time = between(3, 10)
    weight = 3

    RTO_CODES = [
        "RTO-40125", "RTO-41032", "RTO-40876",
        "RTO-41200", "RTO-40998", "RTO-41345",
    ]

    @tag("gateway")
    @task(5)
    def list_tenants(self):
        """Portal page: fetch all active tenants with branding."""
        self.client.get("/api/gateway/tenants", verify=False, name="/api/gateway/tenants")

    @tag("gateway")
    @task(4)
    def tenant_detail(self):
        """Fetch single tenant branding by RTO code."""
        rto = random.choice(self.RTO_CODES)
        self.client.get(
            f"/api/gateway/tenants/{rto}",
            verify=False,
            name="/api/gateway/tenants/[rto_code]",
        )

    @tag("gateway", "auth")
    @task(2)
    def proxy_login(self):
        """Gateway login proxy — forwards to TrainTrack auth and returns branding."""
        rto = random.choice(self.RTO_CODES)
        self.client.post(
            "/api/gateway/login",
            json={
                "email": f"admin@{rto.lower().replace('-', '')}.edu.au",
                "password": "Password1!",
                "rto_code": rto,
            },
            verify=False,
            name="/api/gateway/login",
        )

    @tag("gateway")
    @task(2)
    def browse_then_select_tenant(self):
        """User journey: browse portal → pick a tenant → view branding."""
        self.client.get("/api/gateway/tenants", verify=False, name="/api/gateway/tenants")
        rto = random.choice(self.RTO_CODES)
        self.client.get(
            f"/api/gateway/tenants/{rto}",
            verify=False,
            name="/api/gateway/tenants/[rto_code]",
        )
