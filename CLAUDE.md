# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Viking Raids is a modular Single Page Application (SPA) browser game featuring Viking-themed adventure challenges. The architecture is designed for extensibility with dynamic component loading and state management.

## Architecture & Structure

### Core Systems
- **SPA Navigation**: All sections managed dynamically via `showSection()` without page reloads
- **Component Loading**: Dynamic HTML component loading system via `ComponentLoader` class
- **Game State**: Persistent state management using localStorage with auto-save functionality
- **Audio Management**: Continuous background music through `AudioManager` class

### Module Organization
```
js/modules/
├── core/           # Core functionality (audio, state, components)
├── games/          # Individual challenge game classes  
└── ui/             # UI interaction handlers
```

Each function is isolated in its own file for maximum modularity. All modules expose their functionality via window globals.

## Key Technical Details

### Adding New Challenges
1. Create game class in `js/modules/games/`
2. Add configuration to `data/challenges.js`
3. Create HTML component in `components/challenge-*.html`
4. Update `startChallenge()` to handle new type

### Adding New Cutscenes
1. Add cutscene data to `data/cutscenes.js` with slides array
2. System automatically handles navigation and transitions

### Component System
- Components are HTML fragments loaded from `components/` directory
- Preloaded on initialization for performance
- Inserted dynamically when needed via `componentLoader.loadComponent()`

### State Management
- Game state stored in `gameData` global object
- Auto-saved to localStorage on changes
- Import/export functionality available

## Development Commands

This is a static HTML/CSS/JavaScript project with no build process. To run:
1. Open `index.html` directly in a browser
2. Or serve with any static file server (e.g., `python -m http.server`)

## Testing & Debug

When running on localhost, debug functions are exposed:
```javascript
vikingRaidsTestMode.startCutscene('intro_cutscene');
vikingRaidsTestMode.startChallenge('scasso_challenge');
vikingRaidsTestMode.debugState();
vikingRaidsTestMode.resetGame();
```

## Important Conventions

- All JavaScript modules use global window variables for cross-module communication
- CSS uses BEM-like naming with descriptive class names
- Components use `.spa-section` class with `.active` for visibility
- Game challenges extend base patterns from existing game classes
- Audio files referenced but not included (uses placeholder.mp3)