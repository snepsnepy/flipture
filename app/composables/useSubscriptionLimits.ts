export const useSubscriptionLimits = () => {
  const { currentPlan } = useSubscriptionPlan();

  // Definiții limite per plan
  const PLAN_LIMITS = {
    free: {
      maxFlipbooks: 3,
      maxFileSize: 5 * 1024 * 1024, // 5MB în bytes
      hasWatermark: true,
      hasAnalytics: false,
      autoRemoveDays: 30,
      displayName: "Free",
    },
    standard: {
      maxFlipbooks: 100,
      maxFileSize: 30 * 1024 * 1024, // 30MB
      hasWatermark: false,
      hasAnalytics: true,
      autoRemoveDays: null,
      displayName: "Standard",
    },
    premium: {
      maxFlipbooks: 100,
      maxFileSize: 50 * 1024 * 1024, // 50MB
      hasWatermark: false,
      hasAnalytics: true,
      autoRemoveDays: null,
      displayName: "Premium",
    },
  };

  // Obține limitele curente
  const currentLimits = computed(() => {
    const plan = currentPlan.value as keyof typeof PLAN_LIMITS;
    return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  });

  // Verifică dacă utilizatorul poate crea flipbook
  const canCreateFlipbook = (currentFlipbookCount: number) => {
    return currentFlipbookCount < currentLimits.value.maxFlipbooks;
  };

  // Verifică dimensiunea fișierului
  const isFileSizeValid = (fileSize: number) => {
    return fileSize <= currentLimits.value.maxFileSize;
  };

  // Formatează dimensiunea maximă pentru display
  const maxFileSizeFormatted = computed(() => {
    const sizeInMB = currentLimits.value.maxFileSize / (1024 * 1024);
    return `${sizeInMB}MB`;
  });

  // Calculează câte flipbook-uri mai pot fi create
  const remainingFlipbooks = (currentFlipbookCount: number) => {
    return Math.max(0, currentLimits.value.maxFlipbooks - currentFlipbookCount);
  };

  // Verifică dacă utilizatorul se apropie de limită (>= 80%)
  const isApproachingLimit = (currentFlipbookCount: number) => {
    const threshold = currentLimits.value.maxFlipbooks * 0.8;
    return currentFlipbookCount >= threshold;
  };

  // Mesaj pentru limită atinsă
  const getLimitReachedMessage = (currentFlipbookCount: number) => {
    const remaining = remainingFlipbooks(currentFlipbookCount);

    if (remaining === 0) {
      return `You've reached the maximum of ${currentLimits.value.maxFlipbooks} flipbooks on your ${currentLimits.value.displayName} plan.`;
    }

    if (isApproachingLimit(currentFlipbookCount)) {
      return `You have ${remaining} flipbook${
        remaining === 1 ? "" : "s"
      } remaining on your ${currentLimits.value.displayName} plan.`;
    }

    return "";
  };

  // Mesaj pentru dimensiune fișier invalidă
  const getFileSizeErrorMessage = (fileSize: number) => {
    const fileSizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
    return `Your file (${fileSizeInMB}MB) exceeds the ${maxFileSizeFormatted.value} limit for your ${currentLimits.value.displayName} plan.`;
  };

  return {
    currentLimits,
    canCreateFlipbook,
    isFileSizeValid,
    maxFileSizeFormatted,
    remainingFlipbooks,
    isApproachingLimit,
    getLimitReachedMessage,
    getFileSizeErrorMessage,
    PLAN_LIMITS,
  };
};
