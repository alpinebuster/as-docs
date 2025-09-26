---
title: Interface
---

# Interface

## Messages

### AS.showMessageBox( options, cb )

Shows a simple message box with a title, message, an icon and buttons 

* `options` Object
	* `buttons` Array or strings used to generate the buttons
	* `confirm` Index of the button used to confirm the dialog
	* `cancel` Index of the button used to cancel the dialog
	* `translateKey` Translation key used to auto-fill the title and message from translations
	* `title` Dialog Title
	* `message` Dialog content
	* `icon` Icon string, see [#Icons](#icons)
	* `width` Dialog width in pixels
* `callback` Called when the user exits the dialog using the buttons.
	* `result` Argument, the index of the clicked button within the buttons array.


### AS.textPrompt( title, value, callback )

Prompts the user to enter or edit a text.

* `title` Dialog title
* `value` Before value of the text
* `callback` Runs when the user confirms the prompt
	* `text` Only parameter, the text entered by the user


### AS.showToastNotification( options: Object )

Displays a notification at the top of the 3D viewport.

* `options` 
	* `text: String` Text message
	* `icon: Icon String` Toast Icon
	* `color: CSS Color String` Background color of the toast
	* `expire: Integer` Time in miliseconds before the notification disappears
	* `click: Function` Method to run on click

### AS.showQuickMessage( message[, time] )

Displays a quick message in the middle of the AS interface

* `message` Message to display. Can be a translation string
* `time` How long to display the message in miliseconds. Defaults to 1000 miliseconds.

### AS.showStatusMessage( message[, time] )

Displays a message in the status bar of AS.

* `message` Message to display. Can be a translation string
* `time` How long to display the message in miliseconds. Defaults to 1000 miliseconds.

### AS.setStatusBarText( text )

Sets a text to the status bar

* `text` Text to display. If undefined, it will return to the old value.

### AS.notification( title, text[, icon])

Displays a push notification. In browsers, the user has to accept notifications first.

* `title` Notification title
* `text` Notification content
* `icon` Notification icon, defaults to the AS icon

## Miscellaneous

### AS.setProgress( progress )

Sets the progress bar below the status bar and in the taskbar/dock.

* `progress` Progress (0 is empty, 1 is full)

### AS.openLink( link )

Opens a link in an external browser window or new tab.
 


