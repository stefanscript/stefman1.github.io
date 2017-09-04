/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';
let link = 'https://oddsetmobil.danskespil.dk/webapp/sportsbook/';

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    let message = event.data.text() ? event.data.text() : 'Yay it works';
    try{
        let text = JSON.parse(event.data.text());
        if(text) {
            console.log('trying to set from event.data.text()');
            message = text.body;
            link = text.link;
        }
    }catch(ex) {
        console.warn(ex.message);
    }


    const title = 'DS Sportsbook';
    const options = {
        body: message,
        icon: 'images/oddsetLogoBg.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow(link)
    );
});
