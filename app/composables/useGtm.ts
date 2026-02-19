// ─── GTM Event Types ─────────────────────────────────────────────────────────

type AuthMethod = "email" | "google";
type SubscriptionPlan = "free" | "standard" | "business";
type SortBy = "title-asc" | "title-desc" | "date-newest" | "date-oldest";
type SharePlatform = "twitter" | "linkedin" | "copy_link";
type PricingSource =
  | "nav"
  | "hero"
  | "upgrade_button"
  | "limit_banner"
  | "direct";
type AnalyticsFilterType = "flipbook" | "date_range";
type CoverOption = "default" | "first-page" | "first-last-page";

interface GtmEventMap {
  // Auth
  sign_up: { method: AuthMethod };
  login: { method: AuthMethod };
  login_failed: { method: AuthMethod; error_reason?: string };
  password_reset_requested: Record<string, never>;
  sign_out: Record<string, never>;

  // Flipbook creation
  flipbook_create_started: Record<string, never>;
  flipbook_step_completed: { step: 1 | 2 | 3; step_name: string };
  flipbook_file_uploaded: { file_size_mb: number; plan: SubscriptionPlan };
  flipbook_created: {
    cover_option: CoverOption;
    background: string;
    has_company: boolean;
    has_description: boolean;
  };
  flipbook_create_abandoned: { last_step: 1 | 2 | 3 };
  flipbook_limit_reached: { plan: SubscriptionPlan; limit: number };
  premium_feature_blocked: { feature_name: string; plan: SubscriptionPlan };

  // Dashboard & flipbook management
  flipbook_previewed: { flipbook_id: string };
  flipbook_edited: { flipbook_id: string; fields_changed: string[] };
  flipbook_deleted: { flipbook_id: string };
  flipbook_searched: Record<string, never>;
  flipbook_sorted: { sort_by: SortBy };

  // Sharing
  flipbook_shared: { flipbook_id: string; platform: SharePlatform };

  // Pricing & Stripe
  pricing_page_viewed: { source: PricingSource };
  subscribe_clicked: { plan: SubscriptionPlan; price: number };
  checkout_started: { plan: SubscriptionPlan; price: number };
  subscription_managed: Record<string, never>;
  upgrade_clicked: { current_plan: SubscriptionPlan };

  // Analytics page
  analytics_page_viewed: { plan: SubscriptionPlan };
  analytics_filtered: { filter_type: AnalyticsFilterType; range_days?: number };

  // General / Landing page
  hero_cta_clicked: Record<string, never>;
  faq_opened: { question_index: number };
}

type GtmEventName = keyof GtmEventMap;

// ─── DataLayer Declaration ────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// ─── Composable ───────────────────────────────────────────────────────────────

export const useGtm = () => {
  const push = <T extends GtmEventName>(
    event: T,
    params: GtmEventMap[T],
  ): void => {
    if (!import.meta.client) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  };

  // ── Auth ────────────────────────────────────────────────────────────────────
  const trackSignUp = (method: AuthMethod) => push("sign_up", { method });

  const trackLogin = (method: AuthMethod) => push("login", { method });

  const trackLoginFailed = (method: AuthMethod, error_reason?: string) =>
    push("login_failed", { method, error_reason });

  const trackPasswordResetRequested = () =>
    push("password_reset_requested", {});

  const trackSignOut = () => push("sign_out", {});

  // ── Flipbook Creation ────────────────────────────────────────────────────────
  const trackFlipbookCreateStarted = () => push("flipbook_create_started", {});

  const trackFlipbookStepCompleted = (step: 1 | 2 | 3) => {
    const stepNames: Record<1 | 2 | 3, string> = {
      1: "file_upload",
      2: "flipbook_details",
      3: "design_options",
    };
    push("flipbook_step_completed", { step, step_name: stepNames[step] });
  };

  const trackFlipbookFileUploaded = (
    fileSizeMb: number,
    plan: SubscriptionPlan,
  ) => push("flipbook_file_uploaded", { file_size_mb: fileSizeMb, plan });

  const trackFlipbookCreated = (params: GtmEventMap["flipbook_created"]) =>
    push("flipbook_created", params);

  const trackFlipbookCreateAbandoned = (lastStep: 1 | 2 | 3) =>
    push("flipbook_create_abandoned", { last_step: lastStep });

  const trackFlipbookLimitReached = (plan: SubscriptionPlan, limit: number) =>
    push("flipbook_limit_reached", { plan, limit });

  const trackPremiumFeatureBlocked = (
    featureName: string,
    plan: SubscriptionPlan,
  ) => push("premium_feature_blocked", { feature_name: featureName, plan });

  // ── Dashboard & Management ───────────────────────────────────────────────────
  const trackFlipbookPreviewed = (flipbookId: string) =>
    push("flipbook_previewed", { flipbook_id: flipbookId });

  const trackFlipbookEdited = (flipbookId: string, fieldsChanged: string[]) =>
    push("flipbook_edited", {
      flipbook_id: flipbookId,
      fields_changed: fieldsChanged,
    });

  const trackFlipbookDeleted = (flipbookId: string) =>
    push("flipbook_deleted", { flipbook_id: flipbookId });

  const trackFlipbookSearched = () => push("flipbook_searched", {});

  const trackFlipbookSorted = (sortBy: SortBy) =>
    push("flipbook_sorted", { sort_by: sortBy });

  // ── Sharing ──────────────────────────────────────────────────────────────────
  const trackFlipbookShared = (flipbookId: string, platform: SharePlatform) =>
    push("flipbook_shared", { flipbook_id: flipbookId, platform });

  // ── Pricing & Stripe ─────────────────────────────────────────────────────────
  const trackPricingPageViewed = (source: PricingSource = "direct") =>
    push("pricing_page_viewed", { source });

  const trackSubscribeClicked = (plan: SubscriptionPlan, price: number) =>
    push("subscribe_clicked", { plan, price });

  const trackCheckoutStarted = (plan: SubscriptionPlan, price: number) =>
    push("checkout_started", { plan, price });

  const trackSubscriptionManaged = () => push("subscription_managed", {});

  const trackUpgradeClicked = (currentPlan: SubscriptionPlan) =>
    push("upgrade_clicked", { current_plan: currentPlan });

  // ── Analytics Page ───────────────────────────────────────────────────────────
  const trackAnalyticsPageViewed = (plan: SubscriptionPlan) =>
    push("analytics_page_viewed", { plan });

  const trackAnalyticsFiltered = (
    filterType: AnalyticsFilterType,
    rangeDays?: number,
  ) =>
    push("analytics_filtered", {
      filter_type: filterType,
      range_days: rangeDays,
    });

  // ── General / Landing ────────────────────────────────────────────────────────
  const trackHeroCtaClicked = () => push("hero_cta_clicked", {});

  const trackFaqOpened = (questionIndex: number) =>
    push("faq_opened", { question_index: questionIndex });

  // ── Return ───────────────────────────────────────────────────────────────────

  return {
    // Auth
    trackSignUp,
    trackLogin,
    trackLoginFailed,
    trackPasswordResetRequested,
    trackSignOut,

    // Flipbook creation
    trackFlipbookCreateStarted,
    trackFlipbookStepCompleted,
    trackFlipbookFileUploaded,
    trackFlipbookCreated,
    trackFlipbookCreateAbandoned,
    trackFlipbookLimitReached,
    trackPremiumFeatureBlocked,

    // Dashboard & management
    trackFlipbookPreviewed,
    trackFlipbookEdited,
    trackFlipbookDeleted,
    trackFlipbookSearched,
    trackFlipbookSorted,

    // Sharing
    trackFlipbookShared,

    // Pricing & Stripe
    trackPricingPageViewed,
    trackSubscribeClicked,
    trackCheckoutStarted,
    trackSubscriptionManaged,
    trackUpgradeClicked,

    // Analytics
    trackAnalyticsPageViewed,
    trackAnalyticsFiltered,

    // General
    trackHeroCtaClicked,
    trackFaqOpened,
  };
};
