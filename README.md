# Flipture

**Transform your PDFs into stunning 3D flipbooks with just one upload.**

Flipture is a modern web application that converts PDF documents into interactive, shareable 3D flipbooks. Upload your PDF and instantly transform it into a sleek, interactive experience ready to share with a simple link.

## ✨ Features

- **3D Flip Animation**: Realistic page-turning with smooth transitions
- **Shareable Links**: One-click link to share with anyone, anywhere
- **Mobile Friendly**: Works perfectly on all devices and screen sizes
- **Ad-Free Viewing**: No branding, no ads — just your content
- **Easy Upload**: Simple PDF upload process with drag-and-drop support
- **Customizable Covers**: Choose from default covers or use your PDF's first/last pages
- **Embed Support**: Ready-to-use embed codes for websites and blogs
- **Private by Default**: Secure hosting with unique, unlisted links

## 🚀 Live Demo

Experience Flipture in action: [View Live Example](https://flipture-view.netlify.app/?id=c01cea85-f49c-456a-ada2-30111e867ff0)

## 💰 Pricing

- **Standard Plan**: €5.99/month - Flexible, pay-as-you-go
- **Premium Plan**: €59.99/year - Best value for regular publishers (Save 2 months)

Both plans include:

- All features included
- No ads or hidden fees
- Cancel anytime
- Friendly email support

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Language**: TypeScript
- **Styling**: TailwindCSS with DaisyUI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Validation**: VeeValidate with Yup
- **State Management**: Pinia
- **PDF Processing**: PDF.js
- **3D Graphics**: OGL (WebGL library)
- **Animations**: GSAP
- **Fonts**: Custom Delight font family

## 📁 Project Structure

```
flipture/
├── app/
│   ├── components/           # Vue components
│   │   ├── CreateFlipbookModal/  # Flipbook creation modal
│   │   ├── Dashboard/        # Dashboard components
│   │   ├── Toast/           # Toast notification system
│   │   └── VueBits/         # Custom Vue components
│   ├── composables/         # Vue composables
│   ├── layouts/             # Page layouts
│   ├── middleware/          # Route middleware
│   ├── pages/              # Application pages
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── database/               # Database schemas
├── public/                 # Static assets
├── server/                 # Server-side API routes
└── schema/                 # Form validation schemas
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flipture
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   Set up your Supabase database with the following tables:

   ```sql
   -- Users table (handled by Supabase Auth)
   -- Flipbooks table
   CREATE TABLE flipbooks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     company_name VARCHAR(255),
     description TEXT,
     pdf_file_url TEXT,
     pdf_file_name VARCHAR(255),
     pdf_file_size INTEGER,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE flipbooks ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view their own flipbooks" ON flipbooks
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own flipbooks" ON flipbooks
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update their own flipbooks" ON flipbooks
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete their own flipbooks" ON flipbooks
     FOR DELETE USING (auth.uid() = user_id);
   ```

### Development

Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

## 🔧 Key Components

### Flipbook Creation Process

The flipbook creation follows a 3-step process:

1. **File Upload** (`FileUploadStep.vue`)

   - PDF file upload with drag-and-drop
   - File validation and size checking (50MB limit)
   - Upload progress indication

2. **Flipbook Details** (`FlipbookDetailsStep.vue`)

   - Title (required)
   - Company name (optional)
   - Description (optional)
   - Form validation with VeeValidate

3. **Cover Options** (`CoverOptionsStep.vue`)
   - Default Flipture cover
   - First page as cover
   - First and last page as covers

### State Management

The application uses Pinia for state management with the following stores:

- `useFlipbookStore`: Manages flipbook creation form data and modal state
- Supabase client for database operations

### Authentication

- Supabase Auth integration
- Protected routes with middleware
- User session management

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Row Level Security (RLS) enabled on all database tables
- User-specific data access policies
- Secure file upload handling
- Environment variable protection

## 🎨 Customization

### Styling

- TailwindCSS for utility-first styling
- DaisyUI for component library
- Custom CSS in `app/assets/css/main.css`
- Custom Delight font family

### Components

- Modular Vue 3 components
- TypeScript for type safety
- Composition API throughout

## 📊 File Size Limits

- **PDF Upload**: Up to 50MB
- **Supported Formats**: PDF only
- **Compression**: Recommended for larger files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

---

**Flipture** - A better way to present, share and impress.
