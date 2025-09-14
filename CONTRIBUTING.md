# Contributing Guide

Thank you for your interest in contributing to the Redux Counter App! This guide will help you get started with contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different skill levels

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (version 7 or higher)
- Git
- A code editor (VS Code recommended)

### Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/redux-counter-app.git
   cd redux-counter-app
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/redux-counter-app.git
   ```

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

4. **Run linting**:
   ```bash
   npm run lint
   ```

## Project Structure

Understanding the project structure will help you navigate and contribute effectively:

```
src/
├── components/           # React components
│   ├── Counter.tsx      # Main counter component
│   ├── History.tsx      # History display component
│   └── ThemeToggle.tsx  # Theme switcher component
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   ├── counterSlice.ts  # Counter state management
│   ├── themeSlice.ts    # Theme state management
│   ├── selectors.ts     # State selectors
│   └── middleware/      # Custom middleware
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type - use specific types
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries where needed

### Redux
- Use Redux Toolkit for all state management
- Create typed selectors for state access
- Keep actions simple and focused
- Use proper naming conventions for actions

### Styling
- Use Tailwind CSS for styling
- Follow responsive design principles
- Maintain consistent spacing and colors
- Use semantic class names

### Code Style
```typescript
// Good
interface CounterProps {
  initialValue: number;
  onValueChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState(initialValue);
  
  const handleIncrement = useCallback(() => {
    const newValue = value + 1;
    setValue(newValue);
    onValueChange(newValue);
  }, [value, onValueChange]);

  return (
    <button onClick={handleIncrement}>
      Count: {value}
    </button>
  );
};

// Bad
const Counter = (props: any) => {
  const [value, setValue] = useState(props.initialValue);
  
  return (
    <button onClick={() => setValue(value + 1)}>
      Count: {value}
    </button>
  );
};
```

## Commit Guidelines

We follow conventional commit format for clear and consistent commit messages:

### Commit Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(counter): add custom step increment functionality
fix(theme): resolve theme toggle persistence issue
docs(readme): update installation instructions
style(components): improve button hover animations
refactor(store): simplify selector implementations
test(counter): add unit tests for counter slice
chore(deps): update dependencies to latest versions
```

### Scope Guidelines
- `counter`: Counter-related changes
- `theme`: Theme-related changes
- `history`: History-related changes
- `store`: Redux store changes
- `ui`: UI/styling changes
- `docs`: Documentation changes

## Pull Request Process

### Before Submitting
1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Write clean, well-documented code
   - Follow coding standards
   - Add tests if applicable
   - Update documentation if needed

4. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(counter): add new feature"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template
When creating a pull request, please include:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] I have tested these changes locally
- [ ] I have added/updated tests as needed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated documentation as needed
- [ ] My changes generate no new warnings
```

### Review Process
1. **Automated checks**: Ensure all CI checks pass
2. **Code review**: Wait for maintainer review
3. **Address feedback**: Make requested changes
4. **Approval**: Get approval from maintainers
5. **Merge**: Maintainers will merge your PR

## Testing

### Manual Testing
Before submitting, test these scenarios:
- [ ] Counter increment/decrement works
- [ ] Reset functionality works
- [ ] Custom step increment works
- [ ] History displays correctly
- [ ] Clear history works
- [ ] Theme toggle works
- [ ] localStorage persistence works
- [ ] Responsive design works on mobile

### Automated Testing
We encourage adding tests for new features:

```typescript
// Example test
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Counter from '../components/Counter';

test('increments counter when button clicked', () => {
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  
  const incrementButton = screen.getByText('Increase');
  fireEvent.click(incrementButton);
  
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

## Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples for new features

### README Updates
Update README.md when adding:
- New features
- Installation steps
- Usage instructions
- Configuration options

### API Documentation
Update API.md when changing:
- Redux actions
- Selectors
- State structure
- Component interfaces

## Feature Requests

### Proposing New Features
1. **Check existing issues**: Avoid duplicates
2. **Create detailed issue**: Describe the feature clearly
3. **Discuss with maintainers**: Get feedback before implementing
4. **Create implementation plan**: Break down the work

### Feature Implementation
1. **Start small**: Implement MVP first
2. **Follow patterns**: Use existing code patterns
3. **Add tests**: Ensure feature works correctly
4. **Update docs**: Document new functionality

## Bug Reports

### Reporting Bugs
1. **Search existing issues**: Check if already reported
2. **Use bug template**: Provide all requested information
3. **Include reproduction steps**: Clear steps to reproduce
4. **Add screenshots**: Visual evidence helps

### Bug Fix Process
1. **Reproduce locally**: Confirm the bug exists
2. **Identify root cause**: Debug the issue
3. **Implement fix**: Make minimal necessary changes
4. **Test thoroughly**: Ensure fix works and doesn't break other features
5. **Add regression test**: Prevent future occurrences

## Getting Help

### Resources
- **Documentation**: Check README.md and docs/
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions

### Contact
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For security issues or private matters

## Recognition

Contributors will be recognized in:
- **Contributors section** in README.md
- **Release notes** for significant contributions
- **GitHub contributors** page

Thank you for contributing to the Redux Counter App! 🎉