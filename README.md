# DesignHub - Fashion Design Showcase Platform

A modern, interactive web application demonstrating React and Three.js integration for fashion design presentation. Built with Vite and featuring advanced 3D visualization capabilities.

This project showcases React + Three.js skills through a comprehensive fashion design platform. The application is built using Vite with 3D libraries including React Three Drei and React Three Fiber.

**Note:** 3D models and components are sourced from the BlenderKit community collection. Credits and sources for all models are included below for reference.

Feel free to fork this project and adapt it for your own needs. The application includes email functionality using EmailJS - you'll need to create an environment file (.env) with the required variables as outlined in the setup instructions.

## Technical Stack

- React 19 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Three Fiber for 3D graphics
- EmailJS for email functionality
- Environment Variables for configuration

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
# Create .env file with EmailJS credentials

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CollectionCard.tsx      # Collection display cards
│   ├── Collections.tsx         # Collection showcase
│   ├── GalleryCard.tsx         # Product display cards
│   ├── ImageModal.tsx          # Modal image viewer
│   ├── InfoPathCard.tsx        # Journey step cards
│   ├── JourneyAndContact.tsx   # Contact form
│   ├── PartsCollectionShowcase.tsx # Product showcase
│   ├── Product3DViewer.tsx     # 3D model viewer
│   └── SignatureCollections.tsx # Signature collections
├── pages/              # Page components
│   └── HomePage.tsx    # Main landing page
├── data/               # Product data
│   └── products.json   # Product information
├── models/             # 3D model components
│   ├── Backpack.tsx    # Backpack 3D model
│   └── Scene.tsx       # 3D scene setup
└── main.tsx            # Application entry point
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Build Configuration

- Vite with React plugin
- Tailwind CSS integration
- TypeScript compilation
- Manual chunk splitting for optimization
- Service worker for caching

## Assets

### 3D Models

- Located in `public/models/`
- GLB format for web compatibility
- Organized by product categories (Jackets, Backpacks, Pants)

### Images

- Located in `public/images/`
- Collection images for each product category
- Optimized for web delivery

### Icons

- Located in `public/icons/`
- WebIcon.png for favicon

## License

This project is licensed under the MIT License.
