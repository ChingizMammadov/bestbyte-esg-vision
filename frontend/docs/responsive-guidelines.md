# BestByte Frontend Responsive Design Guidelines

This document provides comprehensive guidelines for ensuring consistent responsive behavior across the BestByte application.

## Breakpoints

The application follows these standard breakpoints:

- **xs**: 480px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Core Principles

1. **Mobile-First Approach**: Always design for mobile first, then enhance for larger screens.
2. **Flexible Layouts**: Use flex and grid layouts that adapt to different screen sizes.
3. **Appropriate Typography**: Text should be readable on all devices - smaller on mobile, larger on desktop.
4. **Touch-Friendly Controls**: Ensure interactive elements are large enough for touch interactions.
5. **Avoid Fixed Widths**: Use relative units (%, rem, em) instead of fixed pixel widths.

## Implementation Patterns

### 1. Grid Layouts

For most content sections, use this responsive grid pattern:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

For dashboards, use:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Dashboard cards */}
</div>
```

### 2. Typography

Use responsive text sizing:

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Heading</h1>
<h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Subheading</h2>
<p className="text-sm sm:text-base">Body text</p>
```

### 3. Spacing

Apply responsive padding and margins:

```tsx
<section className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 xl:px-16">
  {/* Content */}
</section>
```

### 4. Responsive Images

Make images responsive:

```tsx
<img 
  src="image.jpg" 
  alt="Description"
  className="w-full h-auto object-cover" 
/>
```

### 5. Responsive Charts

For chart components:

- Set the chart width to 100%
- Use responsive containers
- Limit data points on mobile views
- Use legends that can be toggled on small screens

```tsx
<div className="w-full h-[300px] sm:h-[400px]">
  <ResponsiveContainer width="100%" height="100%">
    {/* Chart component */}
  </ResponsiveContainer>
</div>
```

### 6. Navigation

For navigation elements:

- Use hamburger menus on mobile
- Show full navigation on larger screens
- Ensure dropdown menus are usable on touch devices

### 7. Forms

Make forms adapt to screen size:

```tsx
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Form fields */}
</form>
```

## Utility Helper Functions

The application includes a `responsiveUtils.ts` utility with helper functions for consistent responsive design:

- `responsive()`: Generates responsive class names
- `responsiveGridLayouts`: Pre-defined grid layouts
- `responsivePadding`: Padding configurations
- `responsiveText`: Text size configurations

Example usage:

```tsx
import { responsive, responsiveGridLayouts, responsiveText } from '@/utils/responsiveUtils';

<div className={responsiveGridLayouts.dashboard}>
  {/* Dashboard content */}
</div>

<h1 className={responsiveText.heading1}>Page Title</h1>
```

## Testing Responsiveness

Always test your components at these key breakpoints:

1. Small mobile (320px - 479px)
2. Large mobile (480px - 639px)
3. Small tablets (640px - 767px)
4. Large tablets (768px - 1023px)
5. Laptops (1024px - 1279px)
6. Desktop (1280px and above)

Use browser developer tools to simulate different screen sizes and device types.

## Common Issues and Solutions

### Issue: Overflowing Content
**Solution**: Use `overflow-auto` or `overflow-hidden` on containers.

### Issue: Text Too Small on Mobile
**Solution**: Use responsive text classes from `responsiveText`.

### Issue: Touch Targets Too Small
**Solution**: Ensure all clickable elements are at least 44×44px on mobile.

### Issue: Content Squished on Small Screens
**Solution**: Use more vertical layouts on mobile with `flex-col` switching to `md:flex-row`.
