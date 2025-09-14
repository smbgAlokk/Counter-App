# Redux Counter App with History

A modern, feature-rich counter application built with React, Redux Toolkit, and TypeScript. This project demonstrates advanced state management patterns, persistent storage, and beautiful UI design.

![Redux Counter App](https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Features
- **Increment/Decrement**: Basic counter operations with smooth animations
- **Reset Functionality**: Reset counter to zero with history tracking
- **Complete History**: Track every counter change with timestamps
- **Clear History**: Remove all historical data while preserving current value

### Advanced Features
- **Custom Step Increment**: Add custom values (e.g., +5, +10, +25)
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Persistent Storage**: Counter state and theme preferences saved to localStorage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **Redux Toolkit**: Modern Redux with simplified syntax
- **Custom Selectors**: Optimized state access patterns
- **Middleware**: Custom localStorage persistence middleware
- **Component Architecture**: Modular, reusable components

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd redux-counter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Counter.tsx      # Main counter component
│   ├── History.tsx      # History display component
│   └── ThemeToggle.tsx  # Theme switcher component
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup and configuration
│   ├── counterSlice.ts  # Counter state management
│   ├── themeSlice.ts    # Theme state management
│   ├── selectors.ts     # Reusable state selectors
│   └── middleware/      # Custom middleware
│       └── localStorageMiddleware.ts
├── hooks/               # Custom React hooks
│   └── redux.ts         # Typed Redux hooks
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage Guide

### Basic Operations
1. **Increment**: Click the "Increase" button or use the `+` icon
2. **Decrement**: Click the "Decrease" button or use the `-` icon
3. **Reset**: Click "Reset" to return counter to zero
4. **Custom Step**: Enter a number and click the custom step button

### History Management
- View all counter changes in the History panel
- Each entry shows the value and change amount
- Current value is highlighted in blue
- Clear all history with the "Clear History" button

### Theme Switching
- Click the sun/moon icon in the top-right corner
- Theme preference is automatically saved
- Smooth transitions between light and dark modes

## 🏛️ Architecture

### State Management
The application uses Redux Toolkit with two main slices:

#### Counter Slice
```typescript
interface CounterState {
  value: number;
  history: number[];
}
```

**Actions:**
- `increment()` - Increase by 1
- `decrement()` - Decrease by 1
- `reset()` - Set to 0
- `incrementByAmount(amount)` - Add custom amount
- `clearHistory()` - Clear history array
- `loadFromStorage(state)` - Load from localStorage

#### Theme Slice
```typescript
interface ThemeState {
  mode: 'light' | 'dark';
}
```

**Actions:**
- `toggleTheme()` - Switch between light/dark
- `loadThemeFromStorage(mode)` - Load theme from localStorage

### Selectors
Optimized selectors for efficient state access:
- `selectCounterValue` - Current counter value
- `selectCounterHistory` - Complete history array
- `selectThemeMode` - Current theme mode
- `selectHistoryCount` - Number of history entries
- `selectLastChange` - Most recent change amount

### Middleware
Custom localStorage middleware automatically persists:
- Counter state (value and history)
- Theme preferences
- Handles storage errors gracefully

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Purple (#8B5CF6)
- **Neutral**: Gray scale

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Medium weight, readable spacing
- **Code**: Monospace font for technical elements

### Animations
- **Hover Effects**: Scale transforms and color transitions
- **Theme Transitions**: Smooth background and text color changes
- **Button Interactions**: Active states with scale feedback

## 🔒 Data Persistence

The application automatically saves:
- **Counter Value**: Current number
- **History Array**: All previous values
- **Theme Preference**: Light or dark mode

Data is stored in `localStorage` and restored on page load.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (flexible layout)
- **Desktop**: > 1024px (side-by-side layout)

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized spacing and typography
- Simplified navigation
- Gesture-friendly interactions

## 🧪 Testing

### Manual Testing Checklist
- [ ] Counter increment/decrement works
- [ ] Reset functionality clears to zero
- [ ] Custom step input accepts numbers
- [ ] History displays all changes
- [ ] Clear history removes entries
- [ ] Theme toggle switches modes
- [ ] localStorage persistence works
- [ ] Responsive design on all devices

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect GitHub repository
2. Vercel auto-detects Vite configuration
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write clean, readable code
- Test functionality before submitting
- Follow existing code style and patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Redux Team** - For Redux Toolkit and excellent documentation
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For beautiful, consistent icons
- **Vite** - For lightning-fast development experience

## 📞 Support

If you have questions or need help:
- Create an issue in the repository
- Check existing documentation
- Review the code examples

---

**Built with ❤️ using React, Redux Toolkit, and TypeScript**