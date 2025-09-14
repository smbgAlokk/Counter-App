# Architecture Documentation

## Overview
This document provides a detailed technical overview of the Redux Counter App architecture, including design patterns, data flow, and implementation details.

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Redux Store   │    │  localStorage   │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Counter   │ │◄──►│ │ counterSlice│ │◄──►│ │ Persistence │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │   History   │ │◄──►│ │ themeSlice  │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │ThemeToggle  │ │◄──►│ │ Middleware  │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Data Flow

### Redux Data Flow
1. **Action Dispatch**: Components dispatch actions to Redux store
2. **Reducer Processing**: Reducers update state based on action type
3. **State Update**: Store notifies all subscribers of state changes
4. **Component Re-render**: Components re-render with new state
5. **Persistence**: Middleware saves state to localStorage

### State Structure
```typescript
interface RootState {
  counter: {
    value: number;
    history: number[];
  };
  theme: {
    mode: 'light' | 'dark';
  };
}
```

## Component Architecture

### Component Hierarchy
```
App
├── ThemeToggle
├── Counter
└── History
```

### Component Responsibilities

#### App Component
- **Purpose**: Root component and provider setup
- **Responsibilities**:
  - Redux Provider configuration
  - Theme application to DOM
  - Layout and global styling
  - Initial state loading from localStorage

#### Counter Component
- **Purpose**: Main counter interface
- **Responsibilities**:
  - Counter value display
  - Increment/decrement controls
  - Custom step input
  - Reset functionality
  - Clear history action

#### History Component
- **Purpose**: Display counter history
- **Responsibilities**:
  - History list rendering
  - Change calculation and display
  - Current value highlighting
  - Empty state handling

#### ThemeToggle Component
- **Purpose**: Theme switching interface
- **Responsibilities**:
  - Theme toggle button
  - Icon switching (sun/moon)
  - Theme state management

## State Management

### Counter Slice
```typescript
// State Shape
interface CounterState {
  value: number;
  history: number[];
}

// Actions
- increment(): void
- decrement(): void
- reset(): void
- incrementByAmount(amount: number): void
- clearHistory(): void
- loadFromStorage(state: CounterState): void
```

**Design Decisions:**
- History array stores all values for complete audit trail
- Immutable updates using Redux Toolkit's Immer integration
- Separate actions for different operations for clarity

### Theme Slice
```typescript
// State Shape
interface ThemeState {
  mode: 'light' | 'dark';
}

// Actions
- toggleTheme(): void
- loadThemeFromStorage(mode: string): void
```

**Design Decisions:**
- Simple boolean-like state for theme switching
- Separate loading action for initialization
- Theme applied to DOM via useEffect in App component

## Selectors

### Selector Pattern
```typescript
// Basic selectors
export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterHistory = (state: RootState) => state.counter.history;

// Computed selectors
export const selectHistoryCount = (state: RootState) => 
  state.counter.history.length;

export const selectLastChange = (state: RootState) => {
  const history = state.counter.history;
  return history.length > 1 
    ? history[history.length - 1] - history[history.length - 2] 
    : 0;
};
```

**Benefits:**
- Encapsulation of state access logic
- Reusability across components
- Performance optimization through memoization
- Type safety with TypeScript

## Middleware

### localStorage Middleware
```typescript
export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save state after each action
  const state = store.getState();
  
  try {
    localStorage.setItem(COUNTER_KEY, JSON.stringify(state.counter));
    localStorage.setItem(THEME_KEY, JSON.stringify(state.theme.mode));
  } catch (error) {
    console.warn('Could not save state to localStorage:', error);
  }
  
  return result;
};
```

**Features:**
- Automatic persistence after every action
- Error handling for storage failures
- Separate keys for different state slices
- Graceful degradation when localStorage unavailable

## Hooks

### Custom Redux Hooks
```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Benefits:**
- Type safety for dispatch and selector hooks
- Consistent typing across the application
- Simplified component code
- Better developer experience with IntelliSense

## Performance Considerations

### Optimization Strategies
1. **Selector Memoization**: Selectors prevent unnecessary re-renders
2. **Component Splitting**: Separate components for different concerns
3. **Efficient Updates**: Redux Toolkit's Immer for immutable updates
4. **Lazy Loading**: Components loaded only when needed

### Memory Management
- History array could grow large over time
- Consider implementing history size limits for production
- localStorage has size limitations (~5-10MB)

## Error Handling

### localStorage Errors
- Graceful fallback when storage unavailable
- Console warnings for debugging
- Application continues without persistence

### Type Safety
- Full TypeScript coverage
- Runtime type checking where needed
- Proper error boundaries for component failures

## Security Considerations

### Data Storage
- localStorage is domain-specific
- No sensitive data stored
- Client-side only storage

### XSS Prevention
- React's built-in XSS protection
- No dangerouslySetInnerHTML usage
- Sanitized user inputs

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Redux slice testing with mock store
- Selector testing with sample state
- Middleware testing with mock actions

### Integration Testing
- Full user flow testing
- localStorage integration testing
- Theme switching testing
- State persistence testing

## Deployment Architecture

### Build Process
1. TypeScript compilation
2. Vite bundling and optimization
3. Asset optimization and minification
4. Static file generation

### Production Considerations
- Environment variable configuration
- Error monitoring integration
- Performance monitoring
- CDN deployment for assets

## Future Enhancements

### Potential Improvements
1. **Undo/Redo Functionality**: Navigate through history
2. **Export/Import**: Save/load counter state
3. **Multiple Counters**: Manage multiple counter instances
4. **Analytics**: Track usage patterns
5. **PWA Features**: Offline functionality
6. **Keyboard Shortcuts**: Power user features

### Scalability Considerations
- State normalization for complex data
- Code splitting for larger applications
- Lazy loading for performance
- Micro-frontend architecture for teams