# Instagram Clone - React Native

A clone of Instagram made in React Native. The  goal was to learn React Native by recreating the most commonly used features of Instagram such as uploading pictures, creating posts, chat and stories.

⚠️ Tested only on Android! ⚠️


![instagramclone_screencapture](instagramclone_screencapture.gif)


## Installation

Download the Expo app and go to 
https://expo.io/@ginold/instagramclone

or

or download the Standalone Android APK

https://expo.io/artifacts/8ef8936d-98de-4122-a81a-c21000918ad0

Use the NPM package manager

```npm
npm install 
npm run android
```
It won't run on desktop because of react-native-maps that is not compatible with Web.

## Stack used
 - Firebase with firebase functions
- Redux
- React native / Expo 
- GiftedChat

## Features
 - Create posts with a description and pictures that appear in the feed
- Add location to posts and view it on map (Google Places)
- Upload photos to posts or stories from your phone's gallery or taken from the camera app
- A story is visible to all users and appears immediately after it has been added
- Pictures older than 20 minutes will be deleted from the story
- Create a user account with an avatar (6 to choose from)
- Comment posts
- Real-time chat 
- Message Notifications
- Dark theme
- Pull to refresh posts
- Like posts (Note: an empty heart is only visible when likes are equal to 0 and is filled if it's more than 0, not based on current user likes)

## Todo
[] Use Firebase Cloud Messaging Notifications
[] Convert to React-Native Firebase 
[] Make standalone
[] Update UI when user receives a message (UI is only updated when the message is sent)
[] More form validation and meaningful error messages

## Screenshots
 <img src="screenshots/screenshot%20(1).png" alt="alt text" width="311" >
 <img src="screenshots/screenshot%20(4).png" alt="alt text" width="311" >
  <img src="screenshots/screenshot%20(2).png" alt="alt text" width="311" >
   <img src="screenshots/screenshot%20(3).png" alt="alt text" width="311" >
 <img src="screenshots/screenshot%20(6).png" alt="alt text" width="311" >
 <img src="screenshots/screenshot%20(5).png" alt="alt text" width="311" >
  <img src="screenshots/screenshot%20(7).png" alt="alt text" width="311" >
   <img src="screenshots/screenshot%20(8).png" alt="alt text" width="311" >
   <img src="screenshots/screenshot%20(9).png" alt="alt text" width="311" >
   <img src="screenshots/screenshot%20(10).png" alt="alt text" width="311" >
