import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card with default styles', () => {
      render(<Card data-testid="card">Card content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card')
    })

    it('applies custom className', () => {
      render(<Card className="custom-card">Card content</Card>)
      expect(screen.getByText('Card content')).toHaveClass('custom-card')
    })

    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<Card ref={ref}>Card content</Card>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardHeader', () => {
    it('renders card header with correct styles', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>)
      
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })
  })

  describe('CardTitle', () => {
    it('renders card title with correct styles', () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>)
      
      const title = screen.getByTestId('title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none')
    })

    it('renders as h3 by default', () => {
      render(<CardTitle>Card Title</CardTitle>)
      
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
    })
  })

  describe('CardDescription', () => {
    it('renders card description with correct styles', () => {
      render(<CardDescription data-testid="description">Card description</CardDescription>)
      
      const description = screen.getByTestId('description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    it('renders card content with correct styles', () => {
      render(<CardContent data-testid="content">Content here</CardContent>)
      
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    it('renders card footer with correct styles', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>)
      
      const footer = screen.getByTestId('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card Title</CardTitle>
            <CardDescription>Test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByTestId('complete-card')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Test Card Title' })).toBeInTheDocument()
      expect(screen.getByText('Test card description')).toBeInTheDocument()
      expect(screen.getByText('This is the card content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
    })

    it('supports custom props on all components', () => {
      render(
        <Card data-custom="card">
          <CardHeader data-custom="header" className="custom-header">
            <CardTitle data-custom="title" className="custom-title">Title</CardTitle>
            <CardDescription data-custom="desc" className="custom-desc">Description</CardDescription>
          </CardHeader>
          <CardContent data-custom="content" className="custom-content">
            Content
          </CardContent>
          <CardFooter data-custom="footer" className="custom-footer">
            Footer
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Title')).toHaveClass('custom-title')
      expect(screen.getByText('Description')).toHaveClass('custom-desc')
      expect(screen.getByText('Content')).toHaveClass('custom-content')
      expect(screen.getByText('Footer')).toHaveClass('custom-footer')
    })
  })
})