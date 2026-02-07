/**
 * Temporary Role System – UI Layer Only.
 *
 * Types for the roles management feature.
 */

/**
 * Role enum.
 */
export enum Role {
    CO_HOST = 'CO_HOST',
    FOUNDER = 'FOUNDER',
    HOST = 'HOST',
    LEADER = 'LEADER',
    PARTICIPANT = 'PARTICIPANT'
}

/**
 * Roles state interface.
 */
export interface IRolesState {
    coHosts: string[];
    founderId: string | null;
    hosts: string[];
    leaders: string[];
}
