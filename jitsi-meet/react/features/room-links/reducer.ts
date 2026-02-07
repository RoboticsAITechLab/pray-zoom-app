/**
 * Custom feature scaffold – no logic yet.
 *
 * Reducer for the room links management feature.
 */

import { AnyAction } from 'redux';

import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    ROOM_LINKS_ADD_LINK,
    ROOM_LINKS_REMOVE_LINK,
    ROOM_LINKS_SET_ACTIVE,
    ROOM_LINKS_START_MANAGING,
    ROOM_LINKS_STOP_MANAGING,
    ROOM_LINKS_UPDATE_LINK
} from './actionTypes';
import { IRoomLink } from './types';

export interface IRoomLinksState {
    activeLink?: string;
    isManaging: boolean;
    links: IRoomLink[];
}

/**
 * Initial state for the room links feature.
 */
export const DEFAULT_STATE: IRoomLinksState = {
    links: [],
    isManaging: false
};

/**
 * Reduces the redux actions of the feature room-links.
 */
ReducerRegistry.register<IRoomLinksState>('features/roomLinks', (state = DEFAULT_STATE, action: AnyAction): IRoomLinksState => {
    switch (action.type) {
    case ROOM_LINKS_ADD_LINK:
        return {
            ...state,
            links: [ ...state.links, action.link ]
        };

    case ROOM_LINKS_REMOVE_LINK: {
        const links = state.links.filter((link: IRoomLink) => link.id !== action.linkId);

        return {
            ...state,
            links,
            activeLink: state.activeLink === action.linkId ? undefined : state.activeLink
        };
    }

    case ROOM_LINKS_UPDATE_LINK: {
        const links = state.links.map((link: IRoomLink) =>
            link.id === action.linkId
                ? { ...link, ...action.updates }
                : link
        );

        return {
            ...state,
            links
        };
    }

    case ROOM_LINKS_SET_ACTIVE:
        return {
            ...state,
            activeLink: action.linkId
        };

    case ROOM_LINKS_START_MANAGING:
        return {
            ...state,
            isManaging: true
        };

    case ROOM_LINKS_STOP_MANAGING:
        return {
            ...state,
            isManaging: false
        };

    default:
        return state;
    }
});
