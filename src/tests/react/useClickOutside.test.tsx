import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useClickOutside } from '../../problems/react/useClickOutside'

function Demo({ onOutsideClick }: { onOutsideClick: (event: MouseEvent) => void }) {
  const ref = createRef<HTMLDivElement>()
  useClickOutside(ref, onOutsideClick)

  return (
    <div>
      <div ref={ref}>inside</div>
      <button type="button">outside</button>
    </div>
  )
}

describe('useClickOutside', () => {
  it('点击外部区域时触发回调', () => {
    const handler = vi.fn()
    const { getByText } = render(<Demo onOutsideClick={handler} />)

    fireEvent.mouseDown(getByText('inside'))
    expect(handler).not.toHaveBeenCalled()

    fireEvent.mouseDown(getByText('outside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

