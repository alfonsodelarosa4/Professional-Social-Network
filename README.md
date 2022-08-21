# Professional Social Network

## Overview
- This is a social media website (similar to LinkedIn). This project allows users to create an account and create posts. This posts can be text posts, images, and video links to YouTube. (Features are explained in more detail below)
- This is a fullstack (React/Node.js) project that utilizes the online Firebase database
- This project also utilizes Redux to manage the data in the store.

## Requirements
[] Firebase database needs to be active prior to deployment.

## Setup and Run
```
// clone repository to your computer
git clone
// run project
yarn start
```

## Features

### Google Authentication (Sign in with Google Account)
- Users of the application are able to sign in with a Google Account
![](https://github.com/alfonsodelarosa4/Professional-Social-Network/blob/main/demo_gifs/Google%20Auth.gif)

### Share Image
- Users are able to share an image with a description
![](https://github.com/alfonsodelarosa4/Professional-Social-Network/blob/main/demo_gifs/Share%20Image.gif)

### Share Video Link
- Users are able to share a video link with a description
![](https://github.com/alfonsodelarosa4/Professional-Social-Network/blob/main/demo_gifs/Share%20Video%20Link.gif)

## How Redux works for the project
- The web application maintains a store via Redux. For each modification of the Firebase database, the store is also modified.
![](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

