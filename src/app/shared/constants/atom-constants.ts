import { ButtonSize, ButtonState, ButtonType, InputSize, InputState, InputType } from "@customTypes/enums";

export const EMPTY_STRING: string = '';
export const DISABLED_STATE: string = 'disabled';

// Buttons
export const BUTTON_DEFAULT_SIZE: ButtonSize = 'm';
export const BUTTON_DEFAULT_TYPE: ButtonType = 'main';
export const BUTTON_DEFAULT_STATE: ButtonState = 'active';
export const BUTTON_SIZE_PREFIX = 'btn-size-'
export const BUTTON_TYPE_PREFIX = 'btn-type-'
export const BUTTON_STATE_PREFIX = 'btn-state-'


// Inputs
export const INPUT_DEFAULT_SIZE: InputSize = 'm';
export const INPUT_DEFAULT_STATE: InputState = 'active';
export const INPUT_DEFAULT_TYPE: InputType = '';
export const INPUT_SIZE_PREFIX = 'input-size-'
export const INPUT_STATE_PREFIX = 'input-state-'
export const INPUT_LABEL_SIZE_PREFIX = 'label-size-'

// Notifications
export const NOTIFICATION_DEFAULT_TYPE: 'Error' | 'Warning' | 'Success' | 'Inform' = 'Inform';
export const NOTIFICATION_DEFAULT_MESSAGE: string = '';
export const NOTIFICATION_DEFAULT_WIDTH: string = '368px';
export const NOTIFICATION_DEFAULT_HEIGHT: string = '52px';
export const NOTIFICATION_DEFAULT_OPACITY: string = '1';
export const NOTIFICATION_DEFAULT_TOP: string = '227px';
export const NOTIFICATION_DEFAULT_LEFT: string = '246px';
export const NOTIFICATION_DEFAULT_SHOW: boolean = true;
export const NOTIFICATION_TYPE_PREFIX = 'notification-'; 
