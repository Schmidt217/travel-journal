# README

Document your travels with Sum Trip! Organize adventure details and favorite photos in an easy-access space. With the option to make a trip public, you can share your epic adventures and activities. Explore trips shared by other users and get more ideas for your next outing!

This application was created using a React.js frontend and Ruby on Rails API backend. This app utilizes Active Storage from Ruby on Rails and is connected to an AWS s3 account for managing image file storage while the applicaiton is deployed to Render. During development, Active Storage utilizes a  local environment for storing uploaded images. 

If you choose to fork and clone this project, run the React.js front-end with 'npm start --prefix client', and the Ruby on Rails API backend with: 'rails server'.

While running it on your local machine, the image files are still uploaded and consumed from the AWS s3 bucket. To utilize Active Storage on you local machine and NOT the connected AWS s3 bucket, you can go into both the user.rb model and trip.rb models, comment-out the line "https://sum-trip-travel-journal.onrender.com#{path}" and comment back in "http://localhost:3000#{path}"
