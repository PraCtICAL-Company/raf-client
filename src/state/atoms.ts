import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const localeAtom = atomWithStorage('locale', 'de', undefined, { getOnInit: true });

export const supportedLocalesAtom = atom([
    {
        name: 'en',
        iconFilename: 'png/uk_flag.png'
    },
    {
        name: 'de',
        iconFilename: 'svg/flags/germany.svg'
    },
])
