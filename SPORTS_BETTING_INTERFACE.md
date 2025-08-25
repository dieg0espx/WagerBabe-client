# Sports Betting Interface

This document describes the comprehensive sports betting interface that has been implemented to match the design shown in the reference images.

## Overview

The sports betting interface is now integrated into the main application layout and includes:

- **Main Layout**: Uses the existing UnifiedLayout with sidebar navigation and header
- **Main Content Area**: MLB betting table with detailed odds and betting options
- **Right Panel**: Bet slip for reviewing and confirming wagers

## Component Structure

### 1. SportsBettingContent (`src/components/composite/sports/sports-betting-content.tsx`)

**Main Content Component:**
- Contains the MLB betting table and bet slip panel
- Manages bet slip state and interactions
- Handles bet addition, removal, and placement
- Designed to work within the existing UnifiedLayout

**Features:**
- Two-column layout (betting table + bet slip)
- Real-time bet slip management
- Interactive betting functionality
- Responsive design within the main layout

### 2. MLBBettingTable (`src/components/composite/sports/mlb-betting-table.tsx`)

**Features:**
- MLB header banner with red background
- Information text about betting rules
- Odds table header with maximum bet amounts
- Detailed game listings including:
  - Date, time, and channel information
  - Team names with records and logos
  - Spread, Moneyline, Total, and Team Total odds
  - Input fields for bet amounts
  - Pitcher information with checkboxes
  - Blue "BET" buttons

**Key Elements:**
- Grid layout for organized data display
- Color-coded odds (positive/negative)
- Input fields for stake amounts
- Team logos using placeholder images
- Responsive design for different screen sizes

### 3. BetSlipPanel (`src/components/composite/sports/bet-slip-panel.tsx`)

**Features:**
- "Review and Confirm" header with wager count
- MLB section with red background
- Individual bet slip items showing:
  - Team selection with delete option
  - Stake and potential win input fields
  - Odds display
  - Game information
- Summary section with totals
- Action buttons (Clear All, Place Wager)

**Key Elements:**
- Compact design for sidebar integration
- Real-time calculation of potential wins
- Delete functionality for individual bets
- Disabled states for empty bet slips

## Integration with Main Layout

### Page Implementation (`src/app/page.tsx`)

The sports betting interface is implemented as the home page using the UnifiedLayout:

```tsx
export default function SportsbookPage() {
  return (
    <UnifiedLayout 
      title="Sports Betting"
      subtitle="Place your bets on MLB games and more"
      fullWidth={true}
      className="p-0"
    >
      <SportsBettingContent className="h-[calc(100vh-8rem)]" />
    </UnifiedLayout>
  )
}
```

**Layout Features:**
- Uses existing sidebar navigation (Home, Live, Casino, My Bets, Promotions)
- Uses existing header with profile menu and theme toggle
- Full-width content area for the betting interface
- Proper height calculation to fit within the layout

## Data Structure

### Mock Data (`src/lib/mock-data.ts`)

The interface uses comprehensive mock data including:

**MLB_BETTING_GAMES**: Array of MLB games with:
- Game information (date, time, channel)
- Team details (names, records, logos)
- Pitcher information
- Detailed odds for all betting types
- Bet button labels

**BetSlipItem Interface**: Structure for bet slip items including:
- Unique identifiers
- Game and bet information
- Stake and potential win amounts
- Odds and descriptions

## Key Features

### 1. Interactive Betting
- Click on odds to add bets to slip
- Real-time stake calculation
- Automatic potential win calculation
- Multiple bet types support

### 2. Layout Integration
- Seamless integration with existing navigation
- Consistent styling with the rest of the application
- Proper responsive behavior
- Maintains existing user experience

### 3. State Management
- Centralized bet slip state
- Real-time updates across components
- Proper data flow between sections

### 4. User Experience
- Clear visual hierarchy
- Intuitive navigation within the main layout
- Immediate feedback on actions
- Professional appearance

## Usage

The interface is implemented as the main page (`src/app/page.tsx`) and integrates seamlessly with the existing application layout. Users can:

1. Navigate using the existing sidebar
2. Access the sports betting interface from the home page
3. Use all existing layout features (theme toggle, profile menu, etc.)
4. Interact with the betting interface while maintaining navigation context

## Styling

The interface uses:
- Tailwind CSS for styling
- Consistent color scheme (red, blue, green, gray)
- Professional typography
- Proper spacing and alignment
- Responsive design principles
- Integration with existing theme system

## Scalability

The component structure is designed for easy maintenance and scalability:
- Modular component architecture
- Centralized data management
- Reusable components
- Clear separation of concerns
- TypeScript for type safety
- Integration with existing layout system

## Future Enhancements

Potential improvements include:
- Real-time odds updates
- Live betting functionality
- Additional sports and leagues
- Advanced betting options
- User authentication integration
- Payment processing
- Live streaming integration
- Mobile-specific optimizations
