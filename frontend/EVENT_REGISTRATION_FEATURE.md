# Event Registration Feature - Implementation Guide

## Overview
This feature adds event cards with external registration links (e.g., Google Forms) to the Events page. Users can click on event cards to register via an external form that opens in a new tab.

## Files Created/Modified

### 1. **New Component: EventCardWithCTA.tsx**
Location: `f:/Projects/HackerEarth/frontend/src/components/EventCardWithCTA.tsx`

**Purpose**: A reusable event card component with registration CTA button.

**Key Features**:
- Poster-style card with gradient border
- Prominent "Register Now" button with external link icon
- Opens registration link in new tab with security attributes
- Fully accessible (keyboard navigation, ARIA labels)
- Theme-aware styling (dark/light mode)
- Smooth Framer Motion animations
- Analytics tracking attribute (`data-analytics="event-register"`)

### 2. **Updated: Events.tsx**
Location: `f:/Projects/HackerEarth/frontend/src/pages/Events_Updated.tsx`

**Note**: Due to technical limitations, the updated file was created as `Events_Updated.tsx`. You need to manually replace the original file.

## Installation Steps

### Step 1: Replace the Events.tsx file

```powershell
# Backup the original file
Copy-Item "f:\Projects\HackerEarth\frontend\src\pages\Events.tsx" "f:\Projects\HackerEarth\frontend\src\pages\Events.tsx.backup"

# Replace with the updated version
Move-Item -Force "f:\Projects\HackerEarth\frontend\src\pages\Events_Updated.tsx" "f:\Projects\HackerEarth\frontend\src\pages\Events.tsx"
```

### Step 2: Verify the component exists
The `EventCardWithCTA.tsx` component should already be created at:
`f:/Projects/HackerEarth/frontend/src/components/EventCardWithCTA.tsx`

## Usage Guide

### Adding Upcoming Events with Registration

Edit `Events.tsx` and add events to the `upcomingEvents` array:

```typescript
const upcomingEvents: EventWithRegistration[] = [
  {
    id: 101,
    title: "AI & Machine Learning Workshop",
    date: "2025-11-15",
    tags: ["AI", "ML", "Python"],
    image: "/images/ai-workshop.jpg",
    gradient: "from-blue-500 to-purple-600",
    description: "Dive deep into AI fundamentals and build your first ML model",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfYourFormID/viewform"
  },
  {
    id: 102,
    title: "Web Development Bootcamp",
    date: "2025-12-01",
    tags: ["React", "Node.js", "Full Stack"],
    image: "/images/web-bootcamp.jpg",
    gradient: "from-green-500 to-teal-500",
    description: "Master modern web development with React and Node.js",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfAnotherFormID/viewform"
  }
];
```

### Event Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | number | ✅ | Unique identifier for the event |
| `title` | string | ✅ | Event title |
| `date` | string | ✅ | Event date (ISO format: "YYYY-MM-DD") |
| `tags` | string[] | ✅ | Array of tags/topics |
| `image` | string | ✅ | Path to event image |
| `gradient` | string | ✅ | Tailwind gradient classes (e.g., "from-blue-500 to-purple-600") |
| `description` | string | ❌ | Optional short description |
| `registrationLink` | string | ❌ | Optional Google Form or registration URL |

### Configuring Default Registration Link

Update the `DEFAULT_REGISTRATION_LINK` constant in `Events.tsx`:

```typescript
const DEFAULT_REGISTRATION_LINK = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";
```

This link is used for the persistent CTA card when no upcoming events are scheduled.

## Features Implemented

### 1. **Event Cards with Registration CTA**
- Cards display event information with a prominent "Register Now" button
- Clicking opens the registration link in a new tab
- Smooth hover animations and scale effects

### 2. **Empty State Handling**
When no upcoming events exist (`upcomingEvents.length === 0`):
- **"Stay Tuned!" card**: Informs users that events are coming soon
- **Persistent CTA card**: Large, prominent card with generic registration link
  - Title: "Register For Upcoming Events"
  - Description with call-to-action
  - "Register Now" button linking to `DEFAULT_REGISTRATION_LINK`

### 3. **Accessibility Features**
- ✅ Keyboard accessible (Tab navigation, Enter/Space to activate)
- ✅ ARIA labels: `aria-label="Register for [Event Name] (opens in new tab)"`
- ✅ Focus indicators with ring styles
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

### 4. **Security**
- All external links use `target="_blank" rel="noopener noreferrer"`
- Prevents security vulnerabilities from external navigation

### 5. **Analytics Tracking**
- CTA buttons have `data-analytics` attributes:
  - Event-specific: `data-analytics="event-register"`
  - General CTA: `data-analytics="event-register-general"`
- Easy integration with analytics tools (Google Analytics, Mixpanel, etc.)

### 6. **Responsive Design**
- **Mobile**: 1 column grid
- **Tablet**: 2 columns grid
- **Desktop**: 3 columns grid
- All cards maintain aspect ratio and proper spacing

### 7. **Theme Support**
- Fully compatible with dark/light theme toggle
- Dynamic color adjustments using `isDark` prop
- Maintains readability in both modes

### 8. **Animations**
- Framer Motion for smooth transitions
- Staggered card reveals (100ms delay between cards)
- Hover effects: scale, shadow, and overlay
- Respects `prefers-reduced-motion` for accessibility

## Customization Options

### Changing Card Behavior

The `onRegisterClick` handler can be customized to open a modal instead of external link:

```typescript
const handleRegisterClick = (event: EventWithRegistration) => {
  // Option 1: Open external link (default)
  if (event.registrationLink) {
    window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
  }
  
  // Option 2: Open internal modal (future enhancement)
  // setSelectedEvent(event);
  // setModalOpen(true);
};
```

### Styling Customization

Gradient options for event cards:
```typescript
// Blue to Purple
gradient: "from-blue-500 to-purple-600"

// Green to Teal
gradient: "from-green-500 to-teal-500"

// Orange to Red
gradient: "from-orange-500 to-red-500"

// Pink to Purple
gradient: "from-pink-500 to-purple-500"
```

## Testing Checklist

- [ ] Event cards render correctly with all data
- [ ] Registration links open in new tab
- [ ] Empty state shows both "Stay Tuned" and CTA cards
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators are visible
- [ ] Dark/light theme toggle works correctly
- [ ] Responsive layout on mobile, tablet, desktop
- [ ] Hover animations are smooth
- [ ] Analytics attributes are present
- [ ] ARIA labels are descriptive

## Future Enhancements

1. **Embedded Form Modal**: Instead of external link, open Google Form in modal
2. **Event Filtering**: Filter by tags, date, or type
3. **Calendar Integration**: Add to Google Calendar button
4. **RSVP Tracking**: Show registration count
5. **Past Event Details**: Link to event recap/photos
6. **Search Functionality**: Search events by keyword
7. **Notification System**: Email reminders for registered events

## Troubleshooting

### Issue: Cards not displaying
- Verify `upcomingEvents` array has valid data
- Check image paths exist in `/public/images/`
- Ensure `EventCardWithCTA` component is imported correctly

### Issue: Registration link not working
- Verify `registrationLink` is a valid URL
- Check browser console for errors
- Ensure link starts with `https://`

### Issue: Theme colors not updating
- Verify `useTheme()` hook is working
- Check `ThemeContext` is properly wrapped around app
- Inspect `isDark` prop is being passed correctly

### Issue: TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check `framer-motion` and `lucide-react` versions
- Verify TypeScript version compatibility

## Support

For questions or issues:
1. Check this documentation
2. Review the component code comments
3. Test in browser DevTools
4. Check console for errors

## Version History

- **v1.0.0** (2025-10-14): Initial implementation
  - EventCardWithCTA component
  - Empty state with persistent CTA
  - Full accessibility support
  - Theme-aware styling
  - Analytics tracking
