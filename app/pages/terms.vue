<template>
  <main class="container mx-auto">
    <section class=" font-poppins flex flex-col gap-8">
      <div class="flex flex-row items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#0046ff"
            fill-rule="evenodd"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
            clip-rule="evenodd"
          />
        </svg>
        <button
          @click="navigateToDashboard"
          class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
        >
          Back
        </button>
      </div>

      <!-- Header -->
      <h1 class="font-poppins font-medium text-4xl md:text-5xl tracking-tight text-base-content">
        Terms of Service
      </h1>

      <!-- Company Details -->
      <section class="flex flex-col gap-2 md:gap-4">
        <p class="text-base leading-4 text-base-content">
          Effective date: <span class="font-medium">February 2, 2026</span>
        </p>
        <p class="text-base leading-4 text-base-content">
          Company: <span class="font-medium">Flipture</span>
        </p>
        <p class="text-base leading-4 text-base-content">
          Contact:
          <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
        </p>
      </section>

      <!-- Content -->
      <div class="text-base-content flex flex-col gap-4 md:gap-6">
        <section class="rounded-xl border border-base-300 bg-base-100 p-4">
          <p class="font-semibold">About Flipture</p>
          <p class="mt-1 text-base-content/80">
            Flipture is a web application that helps you upload PDF documents and
            publish them as interactive flipbooks with shareable links.
          </p>
          <p class="mt-2 text-base-content/80">
            “Private by default” / “unlisted” means we do not intend to list your
            flipbooks publicly, but anyone with the link may be able to view it.
            You are responsible for how and with whom you share your links.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">1) Acceptance of these Terms</h2>
          <p class="mt-2 text-base-content/80">
            By accessing or using the Service, you agree to these Terms. If you
            use the Service on behalf of a business, you represent you have
            authority to bind that business, and “you” includes the business.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">2) Eligibility</h2>
          <p class="mt-2 text-base-content/80">
            You must be at least <span class="font-medium">18 years old</span>
            (or the age of majority where you live) to use the Service. You are
            responsible for ensuring your use is legal where you are located.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">3) Accounts and Security</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">4) The Service (what we provide)</h2>
          <p class="mt-2 text-base-content/80">
            The Service allows you to upload content (including PDFs and related
            assets), generate and publish flipbooks, and view usage/analytics. We
            may add, remove, or modify features at any time.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">5) Subscriptions, Billing, and Taxes</h2>
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
              Except where required by law, all fees are non-refundable. We do not provide refunds or credits for partial billing periods, unused services, downgrades, or unused time.
            </p>
            <p class="mt-2 text-base-content/80">
              If you are a consumer in the EU/EEA/UK, you may have a statutory
              right to withdraw within 14 days for certain online purchases,
              unless an exception applies (for example, when you expressly
              request immediate performance and acknowledge you lose the right of
              withdrawal for digital content/services). Where required, we may
              ask for your express consent at checkout.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">6) Cancellation and Plan Changes</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">
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
          <p class="mt-3 text-base-content/80">
            <span class="font-medium">Sharing and visibility:</span> If you
            publish or share a flipbook link, you understand that the flipbook may
            be accessible to anyone who obtains the link. We do not guarantee that
            “unlisted” content will remain private.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">
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
          <h2 class="text-2xl leading-6 font-semibold">9) Copyright / Takedowns</h2>
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
          <p class="mt-3 text-base-content/80">
            We may terminate accounts of repeat infringers, when appropriate.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">10) Third-Party Services and Links</h2>
          <p class="mt-2 text-base-content/80">
            The Service may integrate with third parties (for example, payment
            processing, email delivery, analytics, or hosting providers). We are not
            responsible for third-party services, content, or policies. Your use of
            third-party services is governed by their terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">11) Intellectual Property (our stuff)</h2>
          <p class="mt-2 text-base-content/80">
            We and our licensors own the Service, including software, design,
            branding, and all related intellectual property. Except for the limited
            right to use the Service, no rights are granted to you.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">
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
          <h2 class="text-2xl leading-6 font-semibold">13) Data Retention After Termination</h2>
          <p class="mt-2 text-base-content/80">
            If your account is terminated or you cancel, we may delete Your Content
            after a reasonable period. We may retain certain information as required
            for legal, security, fraud-prevention, and accounting purposes.
          </p>
          <p class="mt-3 text-base-content/80">
            You are responsible for maintaining your own backups of Your Content.
            We do not guarantee that Your Content will be recoverable after deletion
            or termination.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">14) Disclaimer of Warranties</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">15) Limitation of Liability</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">16) Indemnification</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">17) Governing Law and Venue</h2>
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
          <h2 class="text-2xl leading-6 font-semibold">18) Changes to these Terms</h2>
          <p class="mt-2 text-base-content/80">
            We may update these Terms from time to time. We will post the updated
            Terms and update the Effective date. Continued use of the Service after
            changes means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">19) Contact</h2>
          <p class="mt-2 text-base-content/80">
            Questions about these Terms:
            <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">20) Privacy, Cookies, and Analytics</h2>
          <p class="mt-2 text-base-content/80">
            We process personal data (for example, account information and usage
            data) to operate the Service. Authentication and sessions may use
            cookies or similar technologies.
          </p>
          <p class="mt-3 text-base-content/80">
            The Service may use analytics to measure performance and usage. You
            agree not to upload or transmit personal data to analytics systems in
            a way that violates applicable law or third-party policies (for
            example, Google Analytics policies prohibit sending personally
            identifiable information like email addresses).
          </p>
          <p class="mt-3 text-base-content/80">
            If you embed or share flipbooks on your own website or to your own
            audience, you are responsible for providing any notices and obtaining
            any consents required by law for your collection and use of analytics
            or cookies in that context.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">21) Notices</h2>
          <p class="mt-2 text-base-content/80">
            We may provide notices to you by email, through the Service, or by
            posting updated Terms on this page. You may send notices to us at
            <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">22) Feedback</h2>
          <p class="mt-2 text-base-content/80">
            If you submit feedback, ideas, or suggestions, you grant us a
            non-exclusive, worldwide, royalty-free license to use them for any
            purpose without compensation to you.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">23) Force Majeure</h2>
          <p class="mt-2 text-base-content/80">
            We are not responsible for delays or failures caused by events beyond
            our reasonable control (for example, outages, third-party provider
            failures, network failures, or natural disasters).
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">24) Miscellaneous</h2>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>
              <span class="font-medium">Severability:</span> If any provision is
              held unenforceable, the rest remains in effect.
            </li>
            <li>
              <span class="font-medium">No waiver:</span> Failure to enforce a
              provision is not a waiver.
            </li>
            <li>
              <span class="font-medium">Assignment:</span> You may not assign these
              Terms without our consent; we may assign these Terms in connection
              with a merger, acquisition, or sale of assets.
            </li>
            <li>
              <span class="font-medium">Entire agreement:</span> These Terms are
              the entire agreement about the Service and supersede prior
              agreements on the same subject.
            </li>
          </ul>
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

const supportEmail = "contact@flipture.io";
const copyrightEmail = "contact@flipture.io";

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};
</script>

<style scoped>
/* Intentionally empty: page uses utility classes */
</style>