export enum Permissions {
  READ_USERS = 'READ_USERS',
  UPDATE_USERS = 'UPDATE_USERS',
  DELETE_USERS = 'DELETE_USERS',
}

export type Permission = keyof typeof Permissions;

export const permissionsList = Object.values(Permissions);
