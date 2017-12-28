PUC : - 
Code setup commands
     sudo -s
	1) cd process
        2) npm install
        3) adb devices
        4) adb reverse tcp:8081 tcp:8081
        5) react-native run-android

link :- https://unsplash.com/search/photos/business

Used API from  https://github.com/unsplash/unsplash-js

	list of Used unsplash Api
      	 1)
		unsplash.photos.listPhotos(2, 15, "latest")
		  .then(toJson)
		  .then(json => {
		    // Your code
		  });
	    
  	 2)
		unsplash.search.collections("dogs", 1)
		  .then(toJson)
		  .then(json => {
		    // Your code
		  });
         3)
           	unsplash.search.photos("dogs", 1)
		  .then(toJson)
		  .then(json => {
		    unsplash.photos.downloadPhoto(json["results"][0]);
		  })
