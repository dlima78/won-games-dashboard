import React from 'react'
import { FormLink, FormWrapper } from '@/presentation/components/form'
import { renderWithTheme } from '@/utils/helper'
import { RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const makeSut = (): RenderResult => {
  return renderWithTheme(
    <BrowserRouter>
      <FormWrapper>
        <FormLink to="/mypage">My nice link</FormLink>
      </FormWrapper>
    </BrowserRouter>
  )
}

describe('<Form />', () => {
  test('Should render heading', () => {
    const { container } = makeSut()

    expect(container.parentElement).toMatchInlineSnapshot(`
      .c0 a {
        border-bottom: 0.1rem solid #5886FF;
        color: #5886FF;
        font-size: 1.2rem;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: color,border,0.1s ease-in-out;
        transition: color,border,0.1s ease-in-out;
      }

      .c0 a:hover {
        border-bottom: 0.1rem solid #2561ff;
        color: #2561ff;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <a
              class=""
              href="/mypage"
            >
              My nice link
            </a>
          </div>
        </div>
      </body>
    `)
  })
})
