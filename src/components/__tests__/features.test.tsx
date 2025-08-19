import { render, screen } from '@testing-library/react'
import { Features } from '../features'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}))

describe('Features Component', () => {
  it('renders without crashing', () => {
    render(<Features />)
    expect(document.body).toBeInTheDocument()
  })

  it('contains features content', () => {
    render(<Features />)
    const textContent = document.body.textContent
    expect(textContent).toBeTruthy()
    expect(textContent!.length).toBeGreaterThan(0)
  })

  it('has proper structure', () => {
    render(<Features />)
    const sections = document.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('displays headings', () => {
    render(<Features />)
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
})