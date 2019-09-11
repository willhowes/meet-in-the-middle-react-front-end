<h1 align="center">Meet in the Middle  
<br>
<br>
<div><img src="https://i.imgur.com/3gjFQzf.jpg" height="85" width="85"></div></h1>

### A [Makers](makers.tech) final project ft. Rianne, Genny, Richie, Tim, Toby and Will

#### An app which allows the user to select the location of themself and a friend, then calculates a middle point between them to meet up based on their respective commute times and makes recommendations as to bars, restaurants and other attractions to visit.

![Imgur](https://i.imgur.com/QoZvtxz.jpg)

### To use the app:

#### Set up the backend Rails API in a terminal:

 1. `git clone https://github.com/Timdavidcole/meet-in-the-middle-backend-api.git`  
 2. `bundle install`  
 3. `rails db:create`  
 4. `rails db:migrate`  
 5. `rails s -p 3001`  
 
 #### Set up the React front end:
 
 1. `git clone git@github.com:gennyallcroft/meet-in-the-middle-react-front-end.git`
 2. `cd meet-in-the-middle-react-front=end`
 3. `npm install`
 4. `npm install --save google-maps-react`
 5. `npm install --save form-data`
 6. `npm install react-load-script`
 7. `npm start`
 
 ### How to run the tests:
 
 #### Backend
 1. `RSpec`
 
 #### Front end
 1. `npm start`
 2. `npx open cypress`
