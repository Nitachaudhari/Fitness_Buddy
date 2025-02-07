// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1A365D',
      800: '#153E75',
      700: '#2A69AC',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'blue.100',  // Set background color for the body
        color: 'gray.800',  // Default text color for body
      },
    },
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
