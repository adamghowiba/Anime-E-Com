import type { Asset } from '@chec/commerce.js/types/asset';
import type { SelectedVariant } from '@chec/commerce.js/types/selected-variant';

export type ContentAlign = 'center' | 'left' | 'btm-center';
export type AlertType = 'danger' | 'warning' | 'success';

/* Alert Location */
export type VerticalLocation = 'top' | 'bottom';
export type HorizontalLocation = 'left' | 'right' | 'center';

export type SelectedOption = SelectedVariant & { assets: Asset[] };
