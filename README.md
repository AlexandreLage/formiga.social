#About formiga.social
Rails api-only backend (including active storage and active cable features) with React front-end.


###Back-end

- Back-office uses  *Ruby on Rails* MVC framework;
- Featured with *[Active Storage](https://devcenter.heroku.com/articles/active-storage-on-heroku "Active Storage")* + *[Google Cloud Storage](https://guides.rubyonrails.org/active_storage_overview.html#attaching-files-to-records "Google Cloud Storage")* for managing **data storage**;
- Featured with *[Action Cable](https://guides.rubyonrails.org/action_cable_overview.html "Action Cable")* + *Redis* for **websocket channels**. We created a channel on `./cable` so the frontend can connect to and wait for updates. It updates the post feed for all connected users, so users do not need to refresh the page;
- Deployed on *[Heroku](https://blog.heroku.com/a-rock-solid-modern-web-stack "Heroku")*;

###Front-end

- The folder `/client` contains a *React JS* Framework project, which handles our front-end interface for web;
- Featured with *Dropzone* + *[React Dropzone Component](https://www.npmjs.com/package/react-dropzone-component "React Dropzone Component")* upload input for forms. It improves the user experience when uploading pictures for a new post. It offers **image preview** and **realtime upload** facilities;
- We use [React Images](https://jossmac.github.io/react-images/ "React Images")'s *Gallery* component `./client/src/components/Gallery.js` for presenting images, when users click on the posts' pictures;
- We also use [React Toastify](https://github.com/fkhadra/react-toastify "React Toastify") for improving the user experience with nice notifications;
- The interface uses *[Semantic UI](https://react.semantic-ui.com/ "Semantic UI")* for default themming.

###To be done
- Use Google Maps api for relating posts and pictures to locations;
- Adjust the interface for mobile-devices;
- Split App.js file into reusable components;
- Create users authentication;
