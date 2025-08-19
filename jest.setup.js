import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return React.createElement('img', props)
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('div', props, children),
    section: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('section', props, children),
    h1: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('h1', props, children),
    h2: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('h2', props, children),
    p: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('p', props, children),
    span: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('span', props, children),
    button: ({ children, whileInView, initial, transition, viewport, ...props }) => 
      React.createElement('button', props, children),
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Radix UI components that might cause issues in tests
jest.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }) => children,
  Trigger: ({ children, ...props }) => React.createElement('button', props, children),
  Content: ({ children, ...props }) => React.createElement('div', props, children),
  Overlay: ({ children, ...props }) => React.createElement('div', props, children),
  Close: ({ children, ...props }) => React.createElement('button', props, children),
  Title: ({ children, ...props }) => React.createElement('h2', props, children),
  Description: ({ children, ...props }) => React.createElement('p', props, children),
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Canvas API for Chart.js
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => ({ data: new Array(4) })),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}))

// React import for JSX
import React from 'react'
global.React = React