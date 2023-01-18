import {CSSProperties} from "react";

export type PlacementType = 'top' | 'bottom' | 'left' | 'right';

export const PLACEMENT_MAP = {
    top: {
        bottom: '120%',
        left: '50%',
        top: undefined,
        right: undefined,
        transform: 'translateX(-50%) scale(0)',
        transformOrigin: 'bottom',
        '--arrow-offset-left': '50%',
        '--arrow-offset-top': '100%'
    },
    bottom: {
        top: '120%',
        left: '50%',
        bottom: undefined,
        right: undefined,
        transform: 'translateX(-50%) scale(0)',
        transformOrigin: 'top',
        '--arrow-offset-left': '50%',
        '--arrow-offset-top': '0'
    },
    left: {
        top: '50%',
        right: '150%',
        left: undefined,
        bottom: undefined,
        transform: 'translateY(-50%) scale(0)',
        transformOrigin: 'left',
        '--arrow-offset-left': '100%',
        '--arrow-offset-top': '50%'
    },
    right: {
        top: '50%',
        left: '150%',
        right: undefined,
        bottom: undefined,
        transform: 'translateY(-50%) scale(0)',
        transformOrigin: 'right',
        '--arrow-offset-left': '0',
        '--arrow-offset-top': '50%'
    }
} satisfies Readonly<Record<PlacementType, CSSProperties>>
