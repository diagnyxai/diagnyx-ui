import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input Component', () => {
  it('renders input with default props', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex', 'h-10', 'w-full')
  })

  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello World')
    
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Hello World')
  })

  it('respects disabled state', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed')
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="text" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('spreads additional props', () => {
    render(<Input data-testid="custom-input" maxLength={10} />)
    
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('maxLength', '10')
  })

  it('has focus styles', async () => {
    const user = userEvent.setup()
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    await user.click(input)
    
    expect(input).toHaveFocus()
    expect(input).toHaveClass('focus-visible:ring-2')
  })

  it('handles controlled input', async () => {
    const user = userEvent.setup()
    let value = ''
    const handleChange = jest.fn((e) => {
      value = e.target.value
    })
    
    const { rerender } = render(<Input value={value} onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
    
    await user.type(input, 'test')
    
    // Simulate re-render with new value
    rerender(<Input value="test" onChange={handleChange} />)
    expect(screen.getByRole('textbox')).toHaveValue('test')
  })

  it('supports required attribute', () => {
    render(<Input required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('supports readonly attribute', () => {
    render(<Input readOnly value="readonly text" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveValue('readonly text')
  })
})