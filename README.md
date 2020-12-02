## Ten Thousand Small Steps
Purpose, the origin of passion & an important factor in your success, even if you can't accurately describe your purpose at the moment - Put simply, look to the things that have captured your imagination or curiosity, big or small. 

This app allows you to log those moments when you are most passionate in what you're doing, discovering connections to your underlying purpose overtime.

#### Process
https://www.clearweb.agency/work/ten-thousand-small-steps

### Getting Started

A photo sharing app created with Mongo, Express, Angular & Node using jwt for authentication. The app features photo upload, tagging, viewing & sorting.

### Prerequisites

* npm

  ```sh
  npm install npm@latest -g
  ```
* Angular CLI

  ```sh
  npm install -g @angular/cli
  ```
  
### Installation
1. Server

   ```sh
   cd server && npm install
   ```
2. Run Server

   ```sh
   npm run dev
   ```

 #### Open Separate Terminal
   
3. Client

   ```sh
   cd client && npm install
   ```
4. Run Client

   ```sh
   npm run start
   ```
   
### Features


1. Register
2. Login
3. Save credentials for 24 hours
4. Photo upload saved to backend
5. Photo data: skills tags, used_id, image URL etc. stored in mongoose Image model
6. Filter all current user images on frontend.

### Limitations & Next Steps

1. Not deployed to proper server
2. Images uploaded to localhost backend and not cloud backend or s3 bucket
3. Many images - lazy loading needs to be implemented
4. No image name hashing during testing
5. Using proper secrets for jwt and env variables
6. Last user feature: exporting filtered list to .mp4 for progression sequence
7. Form Validation, proper UI cues


### Preview

![Home Screen](/preview.png)
