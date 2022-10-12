import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary1: {
      50: "#FFE1E1", // 35% lighten
      100: "#FFC8C8", // 25% lighten
      500: "#425F57", // original
      600: "#DE6F6F", // 10% darker
    },
    primary2: {
      50: "#FFFFA9", // 35% lighten
      100: "#FFFF90", // 25% lighten
      500: "#749F82", // original
      600: "#DAB937", // 10% darker
    },
    primary3: {
      50: "#F9F9F9", // 5% lighten
      500: "#A8E890", // original
      600: "#D3D3D3", // 10% darker
    },
    primary4: {
      50: "#E9FFFF", // 35% lighten
      100: "#D0FFFF", // 25% lighten
      500: "#CFFF8D", // original
      600: "#77B3DB", // 10% darker
    },
    primary5: {
      50: "#FFE1E1", // 35% lighten
      100: "#FFC8C8", // 25% lighten
      500: "#747474", // original
      600: "#DE6F6F", // 10% darker
    },
  },
});

export default theme;
