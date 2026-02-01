<template>
  <main class="container mx-auto py-12 md:py-16">
    <section class="max-w-4xl">
      <h1 class="font-delight text-4xl md:text-5xl text-base-content">
        Terms of Service
      </h1>
      <p class="mt-3 text-base md:text-lg text-base-content/80">
        Effective date: <span class="font-medium">[Month Day, Year]</span>
      </p>
      <p class="mt-1 text-base md:text-lg text-base-content/80">
        Company: <span class="font-medium">[Legal company name]</span>,
        <span class="font-medium">[Address]</span> (“Company”, “we”, “us”)
      </p>
      <p class="mt-1 text-base md:text-lg text-base-content/80">
        Contact:
        <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
      </p>

      <div class="mt-10 space-y-8 text-base-content">
        <section>
          <h2 class="text-2xl font-semibold">1) Acceptance of these Terms</h2>
          <p class="mt-2 text-base-content/80">
            By accessing or using the Service, you agree to these Terms. If you
            use the Service on behalf of a business, you represent you have
            authority to bind that business, and “you” includes the business.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">2) Eligibility</h2>
          <p class="mt-2 text-base-content/80">
            You must be at least <span class="font-medium">18 years old</span>
            (or the age of majority where you live) to use the Service. You are
            responsible for ensuring your use is legal where you are located.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">3) Accounts and Security</h2>
          <p class="mt-2 text-base-content/80">
            You may need an account to use parts of the Service. You agree to:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>provide accurate information</li>
            <li>keep credentials secure</li>
            <li>promptly notify us of unauthorized access</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            You are responsible for all activity under your account.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">4) The Service (what we provide)</h2>
          <p class="mt-2 text-base-content/80">
            The Service allows you to upload content (including PDFs and related
            assets), generate and publish flipbooks, and view usage/analytics. We
            may add, remove, or modify features at any time.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">5) Subscriptions, Billing, and Taxes</h2>
          <p class="mt-2 text-base-content/80">
            Some features require a paid subscription. By purchasing a
            subscription you agree:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>
              Billing is handled by our payment processor(s) (e.g., Stripe), and
              their terms apply to payment processing.
            </li>
            <li>
              Subscription fees are billed in advance on a recurring basis unless
              cancelled.
            </li>
            <li>
              You are responsible for any taxes, duties, or similar governmental
              assessments.
            </li>
          </ul>
          <div class="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">
            <p class="font-semibold">Refunds</p>
            <p class="mt-1 text-base-content/80">
              Except where required by law, fees are non-refundable and we do not
              provide prorated refunds for partial periods. (Replace this with
              your actual refund policy.)
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">6) Cancellation and Plan Changes</h2>
          <p class="mt-2 text-base-content/80">
            You can cancel at any time via your account settings or billing portal
            (if available). Cancellation stops future renewals; you may retain
            access until the end of the current billing period (unless terminated
            earlier under these Terms).
          </p>
          <p class="mt-3 text-base-content/80">
            We may change pricing or plans with prior notice as required by law.
            Changes apply at the next renewal unless stated otherwise.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">
            7) User Content (your uploads) and Our License to Host It
          </h2>
          <p class="mt-2 text-base-content/80">
            “Your Content” means any files, text, images, PDFs, logos, links, and
            other materials you upload, submit, or publish through the Service.
          </p>
          <p class="mt-3 text-base-content/80">
            You retain ownership of Your Content. You grant us a worldwide,
            non-exclusive, royalty-free license to host, store, process, reproduce,
            distribute, display, and transmit Your Content solely to:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>
              operate and provide the Service (including rendering flipbooks and
              delivering them to viewers)
            </li>
            <li>perform analytics/measurement necessary to provide the Service</li>
            <li>prevent abuse, enforce these Terms, and comply with law</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            You represent you have all rights needed to upload and use Your Content
            and that it does not violate law or third-party rights.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">
            8) Prohibited Content and Acceptable Use
          </h2>
          <p class="mt-2 text-base-content/80">You agree not to:</p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>
              upload content that is illegal, defamatory, harassing, obscene, or
              otherwise harmful
            </li>
            <li>infringe intellectual property, privacy, publicity, or other rights</li>
            <li>
              upload malware, attempt to bypass security, scrape without permission,
              or overload the Service
            </li>
            <li>
              reverse engineer or attempt to extract source code (except where
              prohibited by law)
            </li>
            <li>use the Service to send spam or to track users unlawfully</li>
            <li>use the Service in violation of export/sanctions laws</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            We may remove content or restrict accounts we believe violate these Terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">9) Copyright / Takedowns</h2>
          <p class="mt-2 text-base-content/80">
            If you believe content on the Service infringes your copyright, contact
            us at
            <a class="link" :href="`mailto:${copyrightEmail}`">{{
              copyrightEmail
            }}</a>
            with:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>identification of the copyrighted work</li>
            <li>the URL/location of the allegedly infringing content</li>
            <li>your contact information</li>
            <li>a statement of good faith belief and accuracy under penalty of perjury</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">10) Third-Party Services and Links</h2>
          <p class="mt-2 text-base-content/80">
            The Service may integrate with third parties (for example, payment
            processing, email delivery, analytics, or hosting providers). We are not
            responsible for third-party services, content, or policies. Your use of
            third-party services is governed by their terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">11) Intellectual Property (our stuff)</h2>
          <p class="mt-2 text-base-content/80">
            We and our licensors own the Service, including software, design,
            branding, and all related intellectual property. Except for the limited
            right to use the Service, no rights are granted to you.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">
            12) Service Availability, Changes, and Suspension
          </h2>
          <p class="mt-2 text-base-content/80">
            We do not guarantee the Service will be uninterrupted or error-free. We
            may suspend or terminate access:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>to protect the Service or users</li>
            <li>to investigate suspected abuse</li>
            <li>to comply with law</li>
            <li>for non-payment or breach of these Terms</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">13) Data Retention After Termination</h2>
          <p class="mt-2 text-base-content/80">
            If your account is terminated or you cancel, we may delete Your Content
            after a reasonable period. We may retain certain information as required
            for legal, security, fraud-prevention, and accounting purposes.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">14) Disclaimer of Warranties</h2>
          <p class="mt-2 text-base-content/80">
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM
            EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
            INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p class="mt-3 text-base-content/80">
            We do not warrant that flipbooks, analytics, or delivery will be accurate,
            complete, or available at all times.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">15) Limitation of Liability</h2>
          <p class="mt-2 text-base-content/80">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL.
          </p>
          <p class="mt-3 text-base-content/80">
            OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE
            SERVICE WILL NOT EXCEED THE AMOUNT YOU PAID US FOR THE SERVICE IN THE
            <span class="font-medium">[3 / 6 / 12]</span> MONTHS BEFORE THE EVENT
            GIVING RISE TO THE CLAIM (OR <span class="font-medium">$100</span> IF YOU
            HAVE PAID NOTHING), WHICHEVER IS GREATER.
          </p>
          <p class="mt-3 text-base-content/80">
            Some jurisdictions don’t allow certain limitations; this applies only to
            the extent permitted.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">16) Indemnification</h2>
          <p class="mt-2 text-base-content/80">
            You agree to defend, indemnify, and hold harmless the Company and its
            officers, directors, employees, and agents from claims arising out of:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>Your Content</li>
            <li>your use of the Service</li>
            <li>your violation of these Terms</li>
            <li>your violation of laws or third-party rights</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">17) Governing Law and Venue</h2>
          <p class="mt-2 text-base-content/80">
            These Terms are governed by the laws of
            <span class="font-medium">[State/Country]</span>, excluding
            conflict-of-law rules. Any dispute will be brought exclusively in the
            courts located in <span class="font-medium">[County/State/Country]</span>,
            unless otherwise required by law.
          </p>
          <p class="mt-3 text-base-content/80">
            (If you prefer arbitration instead of court, replace this section with
            an arbitration clause.)
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">18) Changes to these Terms</h2>
          <p class="mt-2 text-base-content/80">
            We may update these Terms from time to time. We will post the updated
            Terms and update the Effective date. Continued use of the Service after
            changes means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold">19) Contact</h2>
          <p class="mt-2 text-base-content/80">
            Questions about these Terms:
            <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </section>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "base",
})
useHead({
  title: "Terms of Service",
  meta: [
    {
      name: "description",
      content:
        "Terms of Service for Flipture, including accounts, subscriptions, acceptable use, and limitations of liability.",
    },
  ],
});

const supportEmail = "support@yourdomain.com";
const copyrightEmail = "copyright@yourdomain.com";
</script>

<style scoped>
/* Intentionally empty: page uses utility classes */
</style>