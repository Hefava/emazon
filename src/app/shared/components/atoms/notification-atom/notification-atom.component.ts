import { Component, Input, OnInit } from '@angular/core';
import {
  NOTIFICATION_DEFAULT_TYPE,
  NOTIFICATION_DEFAULT_MESSAGE,
  NOTIFICATION_DEFAULT_WIDTH,
  NOTIFICATION_DEFAULT_HEIGHT,
  NOTIFICATION_DEFAULT_OPACITY,
  NOTIFICATION_DEFAULT_TOP,
  NOTIFICATION_DEFAULT_LEFT,
  NOTIFICATION_DEFAULT_SHOW,
  NOTIFICATION_TYPE_PREFIX
} from '@constants/atom-constants';

@Component({
  selector: 'notification-atom',
  templateUrl: './notification-atom.component.html',
  styleUrls: ['./notification-atom.component.scss']
})
export class NotificationAtomComponent implements OnInit {

  @Input() type: 'Error' | 'Warning' | 'Success' | 'Inform' = NOTIFICATION_DEFAULT_TYPE; 
  @Input() message: string = NOTIFICATION_DEFAULT_MESSAGE; 
  @Input() width: string = NOTIFICATION_DEFAULT_WIDTH; 
  @Input() height: string = NOTIFICATION_DEFAULT_HEIGHT;  
  @Input() opacity: string = NOTIFICATION_DEFAULT_OPACITY;    
  @Input() top: string = NOTIFICATION_DEFAULT_TOP;    
  @Input() left: string = NOTIFICATION_DEFAULT_LEFT;   
  @Input() show: boolean = NOTIFICATION_DEFAULT_SHOW;     

  notificationClass: string = '';   

  ngOnInit(): void {
    this.setNotificationClass(); 
  }

  setNotificationClass(): void {
    this.notificationClass = `${NOTIFICATION_TYPE_PREFIX}${this.type.toLowerCase()}`;
  }
}