import { render, screen } from '@testing-library/react'
import { Hero } from '../hero'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

describe('Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders with section element', () => {
    render(<Hero />)
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('contains text content', () => {
    render(<Hero />)
    const textContent = document.body.textContent
    expect(textContent).toBeTruthy()
    expect(textContent!.length).toBeGreaterThan(0)
  })

  it('has responsive styling classes', () => {
    render(<Hero />)
    const section = document.querySelector('section')
    expect(section).toHaveClass('relative')
  })
})