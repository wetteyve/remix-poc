export const Colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  WARNING: '#ff9500',
  ERROR: '#f1434a',
  GREY_d2d2d2: '#d2d2d2',
  GREY_aaaaaa: '#aaaaaa',
  GREY_969696: '#969696',
  GREY_6a6a6a: '#6a6a6a',
  GREY_595959: '#595959',
  GREY_515151: '#515151',
  GREY_454545: '#454545',
  GREY_4a4a4a: '#4a4a4a',
  GREY_3a3a3a: '#3a3a3a',
  GREY_2a2a2a: '#2a2a2a',
  GREY_222222: '#222222',
  GREY_232323: '#232323',
  GREY_1a1a1a: '#1a1a1a',
  GREY_e1e1e1: '#e1e1e1',
  GREY_2c2c2c: '#2c2c2c',
  RED_a36d77: '#a36d77',
  RED_af001e: '#af001e',
  RED_b10017: '#b10017',
  RED_cc001a: '#cc001a',
  RED_e31f2b: '#e31f2b',
  RED_e71f2c: '#e71f2c',
  RED_d50000: '#d50000',
  RED_8b0019: '#8b0019',
  YELLOW_eba60d: '#eba60d',
  BLUE_0F5ACB: '#0f5acb',
  BLUE_0567FF: '#0567ff',
  BLUE_84b5cb: '#84b5cb',
  BLUE_02D4ff: '#02d4ff',
  BLUE_2b8eeb: '#2b8eeb',
  BLUE_66bbff: '#66bbff',
  BLUE_6199E3: '#6199e3',
  CYAN_45b39c: '#45b39c',
  CYAN_439695: '#439695',
  CYAN_266f6e: '#266f6e',
  GREEN_2ACF63: '#2acf63',
  GREEN_096C3D: '#096C3D',
  CYAN_347368: '#347368',
  DARK_202020: '#202020',
  ORANGE_df5200: '#DF5200',

  // SRF colors
  SRF_22211d: '#22211d',
  SRF_fefefd: '#fefefd',
  SRF_6b6960: '#6b6960',
  SRF_4e4d47: '#4e4d47',
  SRF_eaeae9: '#eaeae9',
  SRF_f6f5f3: '#f6f5f3',
  SRF_eeedea: '#eeedea',
  SRF_ededea: '#ededea',
  SRF_e31f2b: '#e31f2b',
  SRF_c91024: '#c91024',
  SRF_f5f5f2: '#f5f5f2',
  SRF_fafaf8: '#fafaf8',
  SRF_b9b7ac: '#b9b7ac',
  SRF_111111: '#111111',
  SRF_2E2D29: '#2E2D29',
  SRF_ebebe5: '#ebebe5',
  SRF_cac8bf: '#cac8bf',
  SRF_373633: '#373633',
  SRF_383732: '#383732',
  SRF_f4f4f3: '#f4f4f3',
  SRF_484848: '#484848',
  SRF_33322e: '#33322e',
};

const getAlpha = (opacity: number) => {
  if (opacity < 1) {
    return '00';
  } else if (opacity < 100) {
    const alpha = Math.round((opacity * 255) / 100).toString(16);
    // Add leading zero if needed
    return alpha.length < 2 ? '0' + alpha : alpha;
  } else {
    return '';
  }
};

export const hexWithOpacity = (hex: string, opacity: number) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hex.match(hexRegex)) return hex;
  const alpha = getAlpha(opacity);
  return hex + alpha;
};

export const hexToRGB = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (typeof alpha === 'number') {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};
