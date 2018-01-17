# Using WebView in native hybrid application 

Here is the code samples and the notes about my presentation in the FMI (Faculty of Mathematics and Informatics in Sofia University) course about [Swift].

# The big picture 
![App Types](./assets/info/why.png)

# App types and specifics 
What is imporatnt to conside when we start building mobile apps.

Type of Apps:
> Native
> Web
> Hybrid 

Why build a mobile app vs a web app?
> You are in the Store. This allows users to find us.
> Push notifications
> Sales strategy \ Marketing (Users spend more time on apps than they do on the web)
> Otions for Revenue (Ad)

Advantages of native apps
> Faster\More Responsive
> Easy access to camera, microphone, compass, accelerometer
> Alerts\notifications
> UX match the vendor standards

Disadvantages of native apps
> iSO + Android = 2 source codes
> Time for development 

# Code sample  
How to run the sample:

	npm i
	webpack
	webpack-dev-server

The last command will run local server and you will be able to load the index.html page at http://localhost:8080.

Development build:
- [ ] webpack
- [ ] webpack-dev-server

Production build:
- [ ] webpack -p
- [ ] webpack --progress -p
- [ ] remove source map settings in the

Running demo of the code is hosted here: <https://app.tobe-millionaire.com/index.html>

[Swift]: https://github.com/SwiftFMI/iOS_2017_2018