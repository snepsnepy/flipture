# 📊 Setup Analytics în Flipture

## Pași de Instalare

### 1. Rulează Migrația Bazei de Date

Deschide **Supabase SQL Editor** și rulează:

```bash
# Navighează la: https://app.supabase.com/project/YOUR_PROJECT/sql
```

Copiază și execută conținutul fișierului:

```
database/migrations/001_analytics_tables.sql
```

Acest script creează:

- ✅ Tabelul `flipbook_views` (view-uri individuale)
- ✅ Tabelul `flipbook_analytics` (aggregate data)
- ✅ Indexes pentru performanță
- ✅ RLS policies (security)
- ✅ Triggers pentru auto-update

---

### 2. Verifică Tabelele

În Supabase Dashboard → **Table Editor**, ar trebui să vezi:

```
📁 Tables
  ├─ flipbooks (existent)
  ├─ flipbook_views (nou ✨)
  └─ flipbook_analytics (nou ✨)
```

---

### 3. (Optional) Adaugă Service Role Key

Pentru ca API endpoint-ul să funcționeze, asigură-te că ai în `.env`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Optional, pentru write access
```

💡 **Note:** Dacă nu ai `SERVICE_ROLE_KEY`, API-ul va folosi `SUPABASE_KEY` (funcționează și așa).

---

### 4. Testare

#### A. Test API Endpoint

```bash
# Test că API endpoint-ul funcționează
curl -X POST https://YOUR_DOMAIN.com/api/analytics/track-view \
  -H "Content-Type: application/json" \
  -d '{
    "flipbook_id": "YOUR_FLIPBOOK_ID",
    "session_id": "test_session_123",
    "device_type": "desktop",
    "referrer": null
  }'

# Răspuns așteptat:
# {"success":true,"message":"View tracked successfully"}
```

#### B. Test în Dashboard

1. Deschide dashboard-ul Flipture
2. Click pe butonul **"Analytics"** pentru un flipbook
3. Ar trebui să vezi:
   - Total Views: 0 (dacă nu ai views)
   - Unique Visitors: 0
   - "No analytics yet" message

---

### 5. Integrare în Flipture-View

Urmează pașii din `docs/ANALYTICS_INTEGRATION.md` pentru a implementa tracking în aplicația separată flipture-view.

---

## 🔧 Configurare Avansată

### A. CORS Configuration (dacă tracking din flipture-view nu funcționează)

În `nuxt.config.ts`, adaugă:

```typescript
export default defineNuxtConfig({
  // ... existing config

  nitro: {
    routeRules: {
      "/api/analytics/**": {
        cors: true,
        headers: {
          "Access-Control-Allow-Origin": "https://flipture-view.netlify.app",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    },
  },
});
```

### B. Cleanup Job (Optional - pentru GDPR)

Programează un cron job în Supabase pentru a șterge view-uri mai vechi de 90 zile:

```sql
-- Supabase Dashboard → Database → Functions → Create a new function
SELECT cron.schedule(
  'cleanup-old-views',
  '0 3 * * *',  -- Rulează zilnic la 3 AM
  $$
  SELECT cleanup_old_views();
  $$
);
```

---

## 📊 Structura Datelor

### Tabelul `flipbook_views`

Fiecare view individual:

| Column      | Type      | Descriere              |
| ----------- | --------- | ---------------------- |
| id          | UUID      | Primary key            |
| flipbook_id | UUID      | FK → flipbooks         |
| session_id  | TEXT      | Visitor session ID     |
| viewed_at   | TIMESTAMP | Când a fost vizualizat |
| device_type | TEXT      | mobile/tablet/desktop  |
| referrer    | TEXT      | De unde a venit        |
| created_at  | TIMESTAMP | Row creation time      |

### Tabelul `flipbook_analytics`

Aggregate data (cache pentru performanță):

| Column          | Type      | Descriere               |
| --------------- | --------- | ----------------------- |
| id              | UUID      | Primary key             |
| flipbook_id     | UUID      | FK → flipbooks (UNIQUE) |
| total_views     | INTEGER   | Total number of views   |
| unique_visitors | INTEGER   | Unique session IDs      |
| last_viewed_at  | TIMESTAMP | Last view timestamp     |
| updated_at      | TIMESTAMP | Last update             |
| created_at      | TIMESTAMP | Row creation time       |

---

## 🔒 Security (RLS Policies)

### Ce poate face fiecare rol:

#### 👤 **Authenticated Users (Flipbook Owners)**

✅ Pot citi analytics pentru propriile flipbooks  
❌ NU pot modifica sau șterge analytics

#### 🌐 **Anonymous Users (Public API)**

✅ NU pot citi analytics  
❌ NU pot accesa direct tabelele  
⚡ POT trimite tracking via API endpoint (server-side validation)

#### 🔐 **Service Role (API Endpoint)**

✅ Poate insera views  
✅ Poate updata analytics aggregate

---

## 🧪 Query Examples

### Verifică analytics pentru un flipbook:

```sql
-- Total views
SELECT total_views, unique_visitors, last_viewed_at
FROM flipbook_analytics
WHERE flipbook_id = 'YOUR_FLIPBOOK_ID';

-- View-uri individuale (ultimele 10)
SELECT
  viewed_at,
  device_type,
  referrer,
  session_id
FROM flipbook_views
WHERE flipbook_id = 'YOUR_FLIPBOOK_ID'
ORDER BY viewed_at DESC
LIMIT 10;

-- Top flipbooks by views
SELECT
  f.title,
  fa.total_views,
  fa.unique_visitors
FROM flipbook_analytics fa
JOIN flipbooks f ON f.id = fa.flipbook_id
WHERE f.user_id = 'YOUR_USER_ID'
ORDER BY fa.total_views DESC
LIMIT 10;
```

---

## ✅ Checklist Post-Setup

- [ ] Tabelele `flipbook_views` și `flipbook_analytics` există în Supabase
- [ ] RLS policies sunt active
- [ ] API endpoint `/api/analytics/track-view` răspunde cu 200
- [ ] Butonul "Analytics" apare în dashboard pentru fiecare flipbook
- [ ] Analytics modal se deschide și arată datele
- [ ] Tracking-ul din flipture-view funcționează (după integrare)

---

## 🐛 Debugging

### Check dacă view-urile sunt salvate:

```sql
SELECT COUNT(*) as total_views
FROM flipbook_views
WHERE flipbook_id = 'YOUR_FLIPBOOK_ID';
```

### Check dacă aggregate este actualizat:

```sql
SELECT *
FROM flipbook_analytics
WHERE flipbook_id = 'YOUR_FLIPBOOK_ID';
```

### Check RLS policies:

```sql
SELECT * FROM pg_policies
WHERE tablename IN ('flipbook_views', 'flipbook_analytics');
```

---

## 📞 Support

Dacă întâmpini probleme:

1. Verifică Supabase logs (Dashboard → Logs)
2. Verifică console.log în browser (Network tab)
3. Testează API endpoint manual cu curl
4. Verifică că RLS policies permit access

---

Gata! Analytics-ul este configurat și funcțional. 🎉

Următorul pas: Implementează tracking-ul în **flipture-view** (vezi `ANALYTICS_INTEGRATION.md`).
