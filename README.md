# Secrets_Sharing_SIte-Auth-Security
Creating a website for sharing secrets randomly and with high level of security in authentication ☠️



💥 ------------------- First Commit --------------------------------- 💥
First commit for authentication using mb5 npm package.
you can increase the level of security with help of salt Round .
The number of encryption is increased with salt round .

👉Packages You Need To installl is :-

npm i brcypt.
npm i body-parser.
npm i dotenv --> dotenv for secure all your palin text pasword file or api-key .
npm i express .
npm i mongoose .
npm i mongoose-encryption.


💥 ------------------- Second Commit --------------------------------- 💥

Second commit is done in app.js file where you can see the new npm packages are required ,
In second commit we are using the session for check the whether the user is authenticate or not .
If user is authenticate then we save the details of user in cookies and stored it for the some times .
When user click on logout we will destory the cookie and session will be destroyed .

👉Packages You Need To installl is :-

npm i express-session .
npm i passport .
npm i passport-local .
npm i passport-local-mongoose .


💥 ------------------- Third Commit ----------------------------------- 💥

Third commit is for google authentication .
we can add regeister our user with google mail ,
we are fetching the data of user with google console api services ,
we need to use google auth npm package for fetching the data of user like name , email , profile .
You have to visit the site passport - https://www.passportjs.org/docs/ ;
We have to use the prebuild function which are define in passport org .

👉Packages You Need To installl is :-

npm i mongoose-findorcreate .
npm i passport-google-oauth20 .
