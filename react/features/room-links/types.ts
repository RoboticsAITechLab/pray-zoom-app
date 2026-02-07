/**
 * Custom feature scaffold – no logic yet.
 *
 * Types for the room links management feature.
 */

/**
 * Room link entry.
 */
export interface IRoomLink {
    accessLevel?: 'public' | 'private' | 'restricted';
    createdAt: number;
    description?: string;
    displayName?: string;
    expiresAt?: number;
    id: string;
    isActive: boolean;
    roomName: string;
    url: string;
}

/**
 * Room links state interface.
 */
export interface IRoomLinksState {
    activeLink?: string;
    isManaging: boolean;
    links: IRoomLink[];
}
