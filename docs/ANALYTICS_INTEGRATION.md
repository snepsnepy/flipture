# 📊 Analytics Integration Guide

## Overview

Acest document explică cum să integrezi tracking-ul de analytics în aplicația **flipture-view** (aplicația separată care afișează flipbook-urile).

---

## 🏗️ Arhitectura

```
┌─────────────────────┐         ┌──────────────────────┐
│   Flipture          │         │  Flipture-View       │
│   (Dashboard App)   │         │  (Reader App)        │
│                     │         │                      │
│  • Management       │         │  • 3D Flipbook       │
│  • Upload PDFs      │         │  • Public viewing    │
│  • View Analytics ✅│◄────────┤  • Send tracking ⚡  │
└─────────────────────┘         └──────────────────────┘
         ▲                                │
         │                                │
         │        POST /api/analytics/track-view
         │                                │
         └────────────────────────────────┘
                    Supabase DB
```

---

## 🚀 Implementare în Flipture-View

### 1. Tracking Script

Creează fișierul `utils/analytics.ts` în flipture-view:

```typescript
// utils/analytics.ts
interface TrackingData {
  flipbook_id: string;
  session_id: string;
  device_type: "mobile" | "tablet" | "desktop";
  referrer: string | null;
}

/**
 * Get or create a session ID for anonymous tracking
 */
function getSessionId(): string {
  const SESSION_KEY = "flipture_session_id";

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Detect device type based on user agent
 */
function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }

  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }

  return "desktop";
}

/**
 * Track a flipbook view
 * Call this when a user opens a flipbook
 */
export async function trackFlipbookView(flipbookId: string): Promise<boolean> {
  try {
    const trackingData: TrackingData = {
      flipbook_id: flipbookId,
      session_id: getSessionId(),
      device_type: getDeviceType(),
      referrer: document.referrer || null,
    };

    const response = await fetch(
      "https://YOUR_FLIPTURE_DOMAIN.com/api/analytics/track-view",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingData),
      }
    );

    if (!response.ok) {
      console.error("Failed to track view:", response.statusText);
      return false;
    }

    console.log("✅ View tracked successfully");
    return true;
  } catch (error) {
    console.error("Error tracking view:", error);
    return false;
  }
}
```

---

### 2. Integrare în Viewer

În componenta principală a flipture-view (unde se încarcă flipbook-ul):

```typescript
// Example: App.vue sau FlipbookViewer.vue în flipture-view

import { trackFlipbookView } from "./utils/analytics";

// Get flipbook ID from URL query params
const urlParams = new URLSearchParams(window.location.search);
const flipbookId = urlParams.get("id");

// Track view when flipbook loads
if (flipbookId) {
  // Track immediately when page loads
  trackFlipbookView(flipbookId);
}
```

---

### 3. Exemplu Complet (React/Vue)

#### Pentru Vue 3:

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { trackFlipbookView } from "@/utils/analytics";

const props = defineProps<{
  flipbookId: string;
}>();

onMounted(() => {
  // Track view when component mounts
  trackFlipbookView(props.flipbookId);
});
</script>

<template>
  <div class="flipbook-viewer">
    <!-- Your 3D flipbook rendering here -->
  </div>
</template>
```

#### Pentru React:

```tsx
import { useEffect } from "react";
import { trackFlipbookView } from "./utils/analytics";

interface FlipbookViewerProps {
  flipbookId: string;
}

export function FlipbookViewer({ flipbookId }: FlipbookViewerProps) {
  useEffect(() => {
    // Track view when component mounts
    trackFlipbookView(flipbookId);
  }, [flipbookId]);

  return (
    <div className="flipbook-viewer">
      {/* Your 3D flipbook rendering here */}
    </div>
  );
}
```

---

## 🔧 Configurare

### 1. Update Domain

În `utils/analytics.ts`, înlocuiește:

```typescript
const ANALYTICS_API_URL =
  "https://YOUR_FLIPTURE_DOMAIN.com/api/analytics/track-view";
```

Cu domeniul real al aplicației Flipture:

```typescript
const ANALYTICS_API_URL = "https://flipture.com/api/analytics/track-view";
// SAU pentru development:
const ANALYTICS_API_URL = "http://localhost:3000/api/analytics/track-view";
```

### 2. Environment Variables (Recomandat)

```bash
# .env în flipture-view
VITE_ANALYTICS_API_URL=https://flipture.com/api/analytics/track-view
```

Apoi în cod:

```typescript
const ANALYTICS_API_URL = import.meta.env.VITE_ANALYTICS_API_URL;
```

---

## 🧪 Testare

### 1. Test Local

```bash
# În browser console (flipture-view app)
localStorage.clear(); // Reset session
window.location.reload(); // Reîncarcă pagina

# Ar trebui să vezi în Network tab:
# POST https://flipture.com/api/analytics/track-view
# Status: 200 OK
```

### 2. Verificare în Dashboard

1. Deschide un flipbook în flipture-view
2. Navighează la Flipture dashboard
3. Click pe butonul "Analytics" pentru acel flipbook
4. Ar trebui să vezi: **Total Views: 1**

---

## 📊 Date Trackuite

| Field         | Type      | Descriere                                   |
| ------------- | --------- | ------------------------------------------- |
| `flipbook_id` | UUID      | ID-ul flipbook-ului vizualizat              |
| `session_id`  | String    | ID unic pentru visitor (localStorage)       |
| `device_type` | String    | 'mobile', 'tablet' sau 'desktop'            |
| `referrer`    | String    | De unde a venit user-ul (document.referrer) |
| `viewed_at`   | Timestamp | Când a fost vizualizat (server timestamp)   |

---

## 🔒 Privacy & GDPR

### Compliance:

✅ **Anonymous tracking** - Nu stocăm date personale  
✅ **No cookies** - Folosim doar localStorage  
✅ **No IP tracking** - Nu stocăm IP-uri  
✅ **90-day retention** - Views mai vechi de 90 zile sunt șterse automat

### Optional: Privacy Notice

Adaugă în flipture-view un mic text:

```html
<div class="privacy-notice">
  This flipbook uses anonymous analytics to track views.
  <a href="/privacy">Privacy Policy</a>
</div>
```

---

## 🚨 Troubleshooting

### Problem: Tracking nu funcționează

**Verificări:**

1. **Check URL API:**

   ```javascript
   console.log("Analytics API:", ANALYTICS_API_URL);
   ```

2. **Check CORS:**

   ```bash
   # În Flipture nuxt.config.ts, adaugă:
   nitro: {
     routeRules: {
       '/api/analytics/**': {
         cors: true,
         headers: {
           'Access-Control-Allow-Origin': 'https://flipture-view.netlify.app',
           'Access-Control-Allow-Methods': 'POST',
         }
       }
     }
   }
   ```

3. **Check Network Tab:**

   - Deschide DevTools → Network
   - Filtrează "track-view"
   - Verifică status code (ar trebui 200)

4. **Check Console Errors:**
   - Deschide DevTools → Console
   - Verifică erori JavaScript

---

## 📈 Next Steps (Viitor)

După ce basic tracking funcționează, poți adăuga:

- [ ] **Time spent tracking** - Cât timp stau userii pe pagină
- [ ] **Page views tracking** - Ce pagini din PDF citesc
- [ ] **Engagement tracking** - Au ajuns la ultima pagină?
- [ ] **Heatmaps** - Ce zone ale flipbook-ului sunt cele mai vizualizate

---

## ✅ Checklist Implementare

- [ ] Am copiat `utils/analytics.ts` în flipture-view
- [ ] Am setat corect domeniul API (`ANALYTICS_API_URL`)
- [ ] Am adăugat `trackFlipbookView()` în viewer component
- [ ] Am testat că tracking-ul funcționează (Network tab)
- [ ] Am verificat în Flipture dashboard că analytics apar
- [ ] Am configurat CORS dacă e necesar
- [ ] Am adăugat privacy notice (optional)

---

## 💬 Support

Dacă ai probleme cu integrarea, verifică:

1. Supabase logs (pentru erori server-side)
2. Browser console (pentru erori client-side)
3. Network tab (pentru request failures)

**Status Codes:**

- `200` ✅ Success
- `400` ❌ Missing flipbook_id sau session_id
- `404` ❌ Flipbook nu există
- `500` ❌ Server error (check Supabase logs)
