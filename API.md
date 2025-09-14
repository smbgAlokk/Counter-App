# API Documentation

## Redux Store API

This document describes the Redux store structure, actions, and selectors available in the Counter App.

## Store Structure

### Root State
```typescript
interface RootState {
  counter: CounterState;
  theme: ThemeState;
}
```

## Counter Slice

### State Interface
```typescript
interface CounterState {
  value: number;        // Current counter value
  history: number[];    // Array of all counter values
}
```

### Initial State
```typescript
const initialState: CounterState = {
  value: 0,
  history: [0],
};
```

### Actions

#### `increment()`
Increases the counter value by 1 and adds the new value to history.

**Type**: `() => void`

**Example**:
```typescript
dispatch(increment());
```

**State Changes**:
- `value`: Incremented by 1
- `history`: New value appended to array

---

#### `decrement()`
Decreases the counter value by 1 and adds the new value to history.

**Type**: `() => void`

**Example**:
```typescript
dispatch(decrement());
```

**State Changes**:
- `value`: Decremented by 1
- `history`: New value appended to array

---

#### `reset()`
Resets the counter value to 0 and adds 0 to history.

**Type**: `() => void`

**Example**:
```typescript
dispatch(reset());
```

**State Changes**:
- `value`: Set to 0
- `history`: 0 appended to array

---

#### `incrementByAmount(amount)`
Increases the counter by a specified amount and adds the new value to history.

**Type**: `(amount: number) => void`

**Parameters**:
- `amount` (number): The amount to add to the counter

**Example**:
```typescript
dispatch(incrementByAmount(5));
```

**State Changes**:
- `value`: Increased by `amount`
- `history`: New value appended to array

---

#### `clearHistory()`
Clears the history array, keeping only the current value.

**Type**: `() => void`

**Example**:
```typescript
dispatch(clearHistory());
```

**State Changes**:
- `value`: Unchanged
- `history`: Reset to `[currentValue]`

---

#### `loadFromStorage(state)`
Loads the complete counter state from localStorage (used internally).

**Type**: `(state: CounterState) => void`

**Parameters**:
- `state` (CounterState): The state to load

**Example**:
```typescript
dispatch(loadFromStorage({ value: 10, history: [0, 5, 10] }));
```

**State Changes**:
- Replaces entire counter state with provided state

## Theme Slice

### State Interface
```typescript
interface ThemeState {
  mode: 'light' | 'dark';
}
```

### Initial State
```typescript
const initialState: ThemeState = {
  mode: 'light',
};
```

### Actions

#### `toggleTheme()`
Switches between light and dark theme modes.

**Type**: `() => void`

**Example**:
```typescript
dispatch(toggleTheme());
```

**State Changes**:
- `mode`: Toggles between 'light' and 'dark'

---

#### `loadThemeFromStorage(mode)`
Loads theme mode from localStorage (used internally).

**Type**: `(mode: 'light' | 'dark') => void`

**Parameters**:
- `mode` (string): The theme mode to set

**Example**:
```typescript
dispatch(loadThemeFromStorage('dark'));
```

**State Changes**:
- `mode`: Set to provided mode

## Selectors

### Counter Selectors

#### `selectCounterValue(state)`
Returns the current counter value.

**Type**: `(state: RootState) => number`

**Example**:
```typescript
const value = useAppSelector(selectCounterValue);
```

**Returns**: Current counter value

---

#### `selectCounterHistory(state)`
Returns the complete counter history array.

**Type**: `(state: RootState) => number[]`

**Example**:
```typescript
const history = useAppSelector(selectCounterHistory);
```

**Returns**: Array of all counter values

---

#### `selectHistoryCount(state)`
Returns the number of entries in the history.

**Type**: `(state: RootState) => number`

**Example**:
```typescript
const count = useAppSelector(selectHistoryCount);
```

**Returns**: Length of history array

---

#### `selectLastChange(state)`
Returns the amount of the last change made to the counter.

**Type**: `(state: RootState) => number`

**Example**:
```typescript
const lastChange = useAppSelector(selectLastChange);
```

**Returns**: 
- Difference between last two history entries
- 0 if history has only one entry

### Theme Selectors

#### `selectThemeMode(state)`
Returns the current theme mode.

**Type**: `(state: RootState) => 'light' | 'dark'`

**Example**:
```typescript
const theme = useAppSelector(selectThemeMode);
```

**Returns**: Current theme mode ('light' or 'dark')

## Custom Hooks

### `useAppDispatch()`
Typed version of useDispatch hook for the app's store.

**Type**: `() => AppDispatch`

**Example**:
```typescript
const dispatch = useAppDispatch();
dispatch(increment());
```

### `useAppSelector(selector)`
Typed version of useSelector hook for the app's store.

**Type**: `<T>(selector: (state: RootState) => T) => T`

**Example**:
```typescript
const value = useAppSelector(selectCounterValue);
```

## Middleware

### localStorage Middleware
Automatically persists state changes to localStorage.

**Storage Keys**:
- `redux-counter-state`: Counter state
- `redux-theme-state`: Theme state

**Features**:
- Automatic persistence after every action
- Error handling for storage failures
- Graceful degradation when localStorage unavailable

## Usage Examples

### Basic Counter Operations
```typescript
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { increment, decrement, reset } from './store/counterSlice';
import { selectCounterValue } from './store/selectors';

function CounterComponent() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectCounterValue);

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

### Custom Step Increment
```typescript
import { incrementByAmount } from './store/counterSlice';

function CustomStepComponent() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(5);

  const handleCustomIncrement = () => {
    dispatch(incrementByAmount(step));
  };

  return (
    <div>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => setStep(Number(e.target.value))} 
      />
      <button onClick={handleCustomIncrement}>+{step}</button>
    </div>
  );
}
```

### History Display
```typescript
import { selectCounterHistory, selectLastChange } from './store/selectors';

function HistoryComponent() {
  const history = useAppSelector(selectCounterHistory);
  const lastChange = useAppSelector(selectLastChange);

  return (
    <div>
      <p>Last change: {lastChange}</p>
      <ul>
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Theme Toggle
```typescript
import { toggleTheme } from './store/themeSlice';
import { selectThemeMode } from './store/selectors';

function ThemeToggleComponent() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectThemeMode);

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```