import type { AssetType } from '@/theme/assets/getAssetsContext';

jest.mock('@/theme/assets/getAssetsContext', () =>
  jest.fn((type: AssetType) => {
    const context = (key: string) => {
      if (type === 'images') {
        return jest.mock('@/theme/assets/images/tick.png');
      }
      if (type === 'icons') {
        return jest.mock('@/theme/assets/icons/send.svg');
      }
      return key;
    };

    context.keys = () => {
      if (type === 'images') {
        return ['images/tick.png'];
      }
      if (type === 'icons') {
        return ['icons/send.svg'];
      }
      return [];
    };

    return context;
  }),
);
