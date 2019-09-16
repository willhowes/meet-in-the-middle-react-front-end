<h1 align="center">Meet in the Middle  
<br>
<br>
<div><img src="https://i.imgur.com/3gjFQzf.jpg" height="85" width="85"></div></h1>

### A [Makers](makers.tech) final project ft. Rianne, Genny, Richie, Tim, Toby and Will

[![Build Status](https://travis-ci.org/riannemcc/meet-in-the-middle.svg?branch=master)](https://travis-ci.org/riannemcc/meet-in-the-middle)

#### An app which allows the user to select the location of themself and a friend, then calculates a middle point between them to meet up based on their respective commute times and makes recommendations as to bars, restaurants and other attractions to visit.

![Imgur](https://i.imgur.com/QoZvtxz.jpg)

### To use the app:

Locally:
#### Set up the backend Rails API in a terminal:

 1. `git clone https://github.com/Timdavidcole/meet-in-the-middle-backend-api.git`  
 2. `bundle install`  
 3. `rails db:create`  
 4. `rails db:migrate`  
 5. `rails s -p 3001`  
 
 #### Set up the React front end:
 
 1. `git clone git@github.com:gennyallcroft/meet-in-the-middle-react-front-end.git`
 2. `cd meet-in-the-middle-react-front=end`
 3. `npm install`
 4. `npm start`
 
#### Deployed:

 http://meet-in-the-middle-frontend.herokuapp.com/
 
 ### How to run the tests:
 
 #### Backend
 1. `RSpec`
 
 #### Front end
 1. `npm start`
 2. `npx open cypress`
 
 ### Approach to the project:
 
 

 ### Tech stack:
 
 Rails API  
 React  
 PostgreSQL  
 
 Cypress  
 RSpec  
 Jest  
 Travis CI  

 
### Troubleshooting  

Should you have any trouble running the app in your browser, run the following in your terminal which will open a new Chrome browser:  
```open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security```  

 
### Contribution  
 If you would like to contribute to this project, please submit a pull request at our [github page](https://github.com/gennyallcroft). 
 
