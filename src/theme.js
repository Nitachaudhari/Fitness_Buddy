// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set default color mode to light
    useSystemColorMode: false, // Disable system color mode preference
  },
  colors: {
    brand: {
      900: '#1A365D',
      800: '#153E75',
      700: '#2A69AC',
    },
    // You can define custom colors for light and dark modes
    light: {
      bg: 'blue.100',  // Background color for light mode
      text: 'gray.800', // Text color for light mode
    },
    dark: {
      bg: 'gray.800',  // Background color for dark mode
      text: 'white',    // Text color for dark mode
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'blue.100' : 'gray.400',  // Background color for body based on color mode
        color: props.colorMode === 'light' ? 'gray.800' : 'white',    // Text color for body based on color mode
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      sizes: {
        lg: {
          h: 12,
          fontSize: 'lg',
          px: '32px',
        },
      },
      variants: {
        solid: {
          bg: 'brand.700',
          color: 'gray.800',
          _hover: {
            bg: 'brand.800',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'black',
      },
    },
  },
});

export default theme;
