# Instagram Clone - React Native


A clone of Instagram made in React Native. The  goal was to learn React Native by recreating the most commonly used features of Instagram such as uploading pictures, creating posts, chat and stories.



⚠️ Tested only on Android! ⚠️

## Installation

Download the Expo app and go to 
https://expo.io/@ginold/instagramclone

or

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
![](https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png | width=100)
- Pull to refresh posts

## Todo
- Use Firebase Cloud Messaging Notifications
- Convert to React-Native Firebase 
- Make standalone
- Update UI when user receives a message (UI is only updated when the message is sent)
- More form validation and meaningful error messages



