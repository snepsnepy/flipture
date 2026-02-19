<template>
  <main class="container mx-auto">
    <section class="font-poppins flex flex-col gap-8">
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
        Privacy Policy
      </h1>

      <!-- Company Details -->
      <section class="flex flex-col gap-2 md:gap-4">
        <p class="text-base leading-4 text-base-content">
          Effective date: <span class="font-medium">February 19, 2026</span>
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
          <p class="font-semibold">About This Policy</p>
          <p class="mt-1 text-base-content/80">
            This Privacy Policy explains how Flipture ("we," "us," or "our") collects, uses, stores, shares, and protects information about you when you use our website and services at flipture.io (the "Service").
          </p>
          <p class="mt-2 text-base-content/80">
            By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">1) Information We Collect</h2>
          <p class="mt-2 text-base-content/80">
            We collect information you provide directly, information generated automatically by your use of the Service, and information from third-party services we use to operate the Service.
          </p>

          <p class="mt-4 font-medium text-base-content">a) Information You Provide</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Account information:</span> when you register, we collect your email address and any profile details you choose to provide.</li>
            <li><span class="font-medium">User content:</span> PDF files, images, and any other materials you upload to create flipbooks.</li>
            <li><span class="font-medium">Communications:</span> messages you send us (e.g., support requests or feedback).</li>
          </ul>

          <p class="mt-4 font-medium text-base-content">b) Information Collected Automatically</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Usage data:</span> pages visited, features used, flipbooks created and viewed, timestamps, and interaction events.</li>
            <li><span class="font-medium">Device and technical data:</span> IP address, browser type and version, operating system, referring URLs, and device identifiers.</li>
            <li><span class="font-medium">Log data:</span> server logs including error reports, access times, and request details.</li>
            <li><span class="font-medium">Cookies and similar technologies:</span> session tokens, authentication cookies, and analytics identifiers. See Section 5 for details.</li>
          </ul>

          <p class="mt-4 font-medium text-base-content">c) Information from Third Parties</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Payment processors:</span> Stripe provides us with transaction status and limited billing details (e.g., last four digits of a card, billing country). We do not receive or store your full card number.</li>
            <li><span class="font-medium">Authentication providers:</span> if you sign in via a third-party OAuth provider (e.g., Google), we may receive your name, email address, and profile picture as permitted by that provider.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">2) How We Use Your Information</h2>
          <p class="mt-2 text-base-content/80">We use the information we collect to:</p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>create and manage your account and authenticate you</li>
            <li>provide, operate, and improve the Service (including rendering and hosting your flipbooks)</li>
            <li>process payments and manage subscriptions</li>
            <li>send transactional emails (e.g., account confirmation, password reset, billing receipts)</li>
            <li>send service-related announcements or policy updates (you may not opt out of these while you have an active account)</li>
            <li>send optional marketing communications (only with your consent where required by law)</li>
            <li>analyze usage trends and measure the performance of the Service</li>
            <li>detect, investigate, and prevent fraud, abuse, or security incidents</li>
            <li>comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">3) Legal Bases for Processing (EEA / UK / Switzerland)</h2>
          <p class="mt-2 text-base-content/80">
            If you are located in the European Economic Area, the United Kingdom, or Switzerland, we process your personal data under the following legal bases:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Contract:</span> processing necessary to perform our agreement with you (e.g., providing the Service, billing).</li>
            <li><span class="font-medium">Legitimate interests:</span> operating and improving the Service, preventing fraud and abuse, and communicating with you about the Service, where our interests are not overridden by your rights.</li>
            <li><span class="font-medium">Consent:</span> where we ask for your permission (e.g., optional marketing emails or non-essential cookies). You may withdraw consent at any time.</li>
            <li><span class="font-medium">Legal obligation:</span> processing required to comply with applicable law.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">4) How We Share Your Information</h2>
          <p class="mt-2 text-base-content/80">
            We do not sell your personal information. We share information only as described below:
          </p>

          <p class="mt-4 font-medium text-base-content">Service Providers (sub-processors)</p>
          <p class="mt-1 text-base-content/80">
            We share information with trusted third-party vendors who process it on our behalf, bound by confidentiality obligations. These include:
          </p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Supabase</span> — database, file storage, and authentication infrastructure.</li>
            <li><span class="font-medium">Stripe</span> — payment processing and subscription management.</li>
            <li><span class="font-medium">Google Analytics</span> — aggregated, anonymized usage analytics. We do not send personally identifiable information (such as your email address) to Google Analytics.</li>
            <li><span class="font-medium">Resend</span> — transactional and notification email delivery.</li>
            <li><span class="font-medium">Netlify</span> — web hosting and deployment infrastructure.</li>
          </ul>

          <p class="mt-4 font-medium text-base-content">Legal Requirements</p>
          <p class="mt-1 text-base-content/80">
            We may disclose your information if required by law, court order, or governmental authority, or if we believe in good faith that disclosure is necessary to protect rights, property, or the safety of Flipture, our users, or the public.
          </p>

          <p class="mt-4 font-medium text-base-content">Business Transfers</p>
          <p class="mt-1 text-base-content/80">
            If Flipture is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you before your data becomes subject to a materially different privacy policy.
          </p>

          <p class="mt-4 font-medium text-base-content">With Your Consent</p>
          <p class="mt-1 text-base-content/80">
            We may share your information for any other purpose with your explicit consent.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">5) Cookies and Tracking Technologies</h2>
          <p class="mt-2 text-base-content/80">
            We and our service providers use cookies and similar technologies (e.g., local storage, session tokens) to:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Essential cookies:</span> keep you logged in and maintain session state. These are required for the Service to function and cannot be disabled.</li>
            <li><span class="font-medium">Analytics cookies:</span> Google Analytics uses cookies to collect aggregated data about how users interact with our site. This data is anonymized and does not identify you personally.</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            You can control cookies through your browser settings. Disabling essential cookies will affect your ability to use the Service. For Google Analytics specifically, you can opt out using the
            <a class="link" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </p>
          <p class="mt-3 text-base-content/80">
            Where required by law (e.g., ePrivacy Directive, PECR), we will obtain your consent before setting non-essential cookies.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">6) Your Content and Flipbook Visibility</h2>
          <p class="mt-2 text-base-content/80">
            Files you upload (PDFs and related assets) are stored securely on our infrastructure (Supabase). Flipbooks you publish are accessible to anyone who has the link. You control who you share your links with.
          </p>
          <p class="mt-3 text-base-content/80">
            <span class="font-medium">Important:</span> Do not upload content containing sensitive personal data (such as medical records, financial data, or government ID numbers) unless you have a lawful basis to share that data with us and with anyone who may access your flipbook link.
          </p>
          <p class="mt-3 text-base-content/80">
            We process your uploaded content solely to provide the Service (render, store, and deliver your flipbooks) and do not use it to train AI/ML models or for any other purpose.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">7) Data Retention</h2>
          <p class="mt-2 text-base-content/80">
            We retain your personal information for as long as your account is active or as needed to provide the Service. Specifically:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Account data:</span> retained while your account is active and for a reasonable period after deletion to comply with legal obligations.</li>
            <li><span class="font-medium">User content:</span> deleted within a reasonable period after account termination or upon your request, unless retention is required by law.</li>
            <li><span class="font-medium">Billing records:</span> retained as required by applicable accounting and tax law (typically 5–7 years).</li>
            <li><span class="font-medium">Analytics data:</span> aggregated and anonymized data may be retained indefinitely.</li>
            <li><span class="font-medium">Log data:</span> typically retained for up to 12 months for security and operational purposes.</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            You are responsible for maintaining your own backups of your content. We do not guarantee recovery after deletion.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">8) Your Rights and Choices</h2>
          <p class="mt-2 text-base-content/80">
            Depending on where you live, you may have the following rights regarding your personal information:
          </p>

          <p class="mt-4 font-medium text-base-content">For all users</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Access and correction:</span> you can view and update your account information through your account settings.</li>
            <li><span class="font-medium">Deletion:</span> you can delete your account and associated content by contacting us at <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.</li>
            <li><span class="font-medium">Opt-out of marketing:</span> you can unsubscribe from marketing emails at any time via the unsubscribe link in those emails.</li>
          </ul>

          <p class="mt-4 font-medium text-base-content">For EEA, UK, and Swiss residents (GDPR / UK GDPR)</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Right of access:</span> request a copy of your personal data we hold.</li>
            <li><span class="font-medium">Right to rectification:</span> request correction of inaccurate data.</li>
            <li><span class="font-medium">Right to erasure ("right to be forgotten"):</span> request deletion of your personal data, subject to legal retention obligations.</li>
            <li><span class="font-medium">Right to restriction:</span> request that we restrict processing in certain circumstances.</li>
            <li><span class="font-medium">Right to data portability:</span> receive your personal data in a structured, machine-readable format.</li>
            <li><span class="font-medium">Right to object:</span> object to processing based on legitimate interests or for direct marketing.</li>
            <li><span class="font-medium">Right to withdraw consent:</span> where processing is based on consent, withdraw it at any time without affecting prior processing.</li>
            <li><span class="font-medium">Right to lodge a complaint:</span> you have the right to complain to your local data protection authority.</li>
          </ul>

          <p class="mt-4 font-medium text-base-content">For California residents (CCPA / CPRA)</p>
          <ul class="mt-2 list-disc pl-6 text-base-content/80 space-y-1">
            <li><span class="font-medium">Right to know:</span> request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
            <li><span class="font-medium">Right to delete:</span> request deletion of personal information we have collected, subject to certain exceptions.</li>
            <li><span class="font-medium">Right to correct:</span> request correction of inaccurate personal information.</li>
            <li><span class="font-medium">Right to opt out of sale or sharing:</span> we do not sell or share personal information as defined under CCPA/CPRA.</li>
            <li><span class="font-medium">Right to non-discrimination:</span> we will not discriminate against you for exercising your CCPA rights.</li>
          </ul>

          <p class="mt-3 text-base-content/80">
            To exercise any of these rights, contact us at <a class="link" :href="`mailto:${privacyEmail}`">{{ privacyEmail }}</a>. We will respond within the timeframe required by applicable law (generally 30 days). We may need to verify your identity before fulfilling a request.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">9) International Data Transfers</h2>
          <p class="mt-2 text-base-content/80">
            Flipture operates globally. Your personal information may be transferred to and processed in countries other than your country of residence, including the United States, where our service providers operate. These countries may have different data protection laws than your own.
          </p>
          <p class="mt-3 text-base-content/80">
            Where required by law (e.g., GDPR), we ensure appropriate safeguards are in place for such transfers, such as Standard Contractual Clauses (SCCs) approved by the European Commission, or we rely on providers that participate in approved adequacy frameworks.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">10) Data Security</h2>
          <p class="mt-2 text-base-content/80">
            We implement industry-standard security measures to protect your personal information, including:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>HTTPS/TLS encryption in transit</li>
            <li>encrypted storage at rest via our infrastructure providers</li>
            <li>access controls limiting who can access your data</li>
            <li>use of Supabase Row Level Security (RLS) to isolate user data</li>
          </ul>
          <p class="mt-3 text-base-content/80">
            Despite our efforts, no method of transmission over the Internet or electronic storage is 100% secure. You use the Service at your own risk. If you become aware of a security breach, please notify us immediately at <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">11) Children's Privacy</h2>
          <p class="mt-2 text-base-content/80">
            The Service is not directed to children under the age of 18 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without verifiable parental consent, we will take steps to delete that information. If you believe we may have collected information from a child, please contact us at <a class="link" :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">12) Third-Party Links and Services</h2>
          <p class="mt-2 text-base-content/80">
            The Service may contain links to third-party websites or services. This Privacy Policy does not apply to those third parties, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">13) Changes to This Policy</h2>
          <p class="mt-2 text-base-content/80">
            We may update this Privacy Policy from time to time. When we make material changes, we will update the Effective date at the top of this page and, where required by law, notify you by email or through the Service. Your continued use of the Service after the changes take effect constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 class="text-2xl leading-6 font-semibold">14) Contact Us</h2>
          <p class="mt-2 text-base-content/80">
            If you have any questions, concerns, or requests about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul class="mt-3 list-disc pl-6 text-base-content/80 space-y-1">
            <li>
              Email: <a class="link" :href="`mailto:${privacyEmail}`">{{ privacyEmail }}</a>
            </li>
            <li>Company: Flipture</li>
          </ul>
          <div class="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">
            <p class="font-semibold">EU/UK Representative</p>
            <p class="mt-1 text-base-content/80">
              If you are located in the EEA or UK and wish to exercise your data protection rights or have a concern about our data practices, you may also contact your local data protection authority. A list of EEA authorities is available at
              <a class="link" href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">edpb.europa.eu</a>.
            </p>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "base",
});
useHead({
  title: "Privacy Policy",
  meta: [
    {
      name: "description",
      content:
        "Privacy Policy for Flipture — learn how we collect, use, and protect your personal information when you use our flipbook creation service.",
    },
  ],
});

const supportEmail = "contact@flipture.io";
const privacyEmail = "contact@flipture.io";

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};
</script>

<style scoped>
/* Intentionally empty: page uses utility classes */
</style>
