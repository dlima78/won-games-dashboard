import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    type: string
    grid: {
      container: string
    }
    border: {
      radius: string
      radiusButton: string
    }
    font: {
      family: string
      light: number
      normal: number
      bold: number
      sizes: {
        xsmall: string
        small: string
        medium: string
        large: string
        xlarge: string
        xxlarge: string
        huge: string
      }
    }
    colors: {
      primary: string
      secondary: string
      darkBg: string
      lightBg: string
      white: string
      black: string
      lightGray: string
      gray: string
      darkGray: string
      red: string
    }
    spacings: {
      xxsmall: string
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
      xxlarge: string
    }
    layers: {
      base: number
      menu: number
      overlay: number
      modal: number
      alwaysOnTop: number
    }
    transition: {
      default: string
      fast: string
    }
  }
}
