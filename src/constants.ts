// var __static;

export class LocalPermissions {
    static CAN_VIEW =             0b00000001;
    static CAN_USE_CONSOLE =      0b00000010;
    static CAN_EDIT_PROPERTIES =  0b00000100;
    static CAN_CREATE_WORLDS =    0b00001000;
    static CAN_DELETE_WORLDS =    0b00010000;
    static CAN_SET_STATUS =       0b00100000;
    static CAN_EDIT_PERMISSIONS = 0b01000000;
    static IS_CREATOR_OF_SERVER = 0b10000000;
}
export class GlobalPermissions {
    static readonly CAN_CREATE_SERVER =      0b00000001;
    static readonly CAN_DELETE_SERVER =      0b00000010;
    // static readonly CAN_GRANT_PERMISSIONS =  0b00000100;
    static readonly CAN_OVERRIDE_LOCAL =     0b00001000;
    static readonly CAN_REFRESH_DB =         0b00010000;
    static readonly CAN_MANAGE_OTHER_USERS = 0b00100000;
    static readonly CAN_MANAGE_SCRIPTS =     0b01000000;
    // static readonly CAN_X =   0b00010000;
}