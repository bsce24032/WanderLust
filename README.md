# 🌍 WanderLust

**WanderLust** is a full-stack travel listing web application where users can explore destinations, create and manage listings, leave reviews, and interact with maps and media. Built with a modern backend stack using **Node.js**, **Express**, **MongoDB**, **Cloudinary**, and **Mapbox**, WanderLust delivers a smooth, responsive, and scalable travel experience for users.

![WanderLust Banner](https://wanderlust-fgn0.onrender.com/listings)

---

## 🚀 Features

- 🧭 Explore and browse travel listings
- 📝 Create, edit, and delete listings (for authenticated users)
- 💬 Leave reviews with star ratings and comments
- 📍 View location on Mapbox-powered maps
- ☁️ Upload and manage images with Cloudinary
- 🔐 Secure user authentication with Passport.js
- 💡 Flash messages for real-time feedback
- 🎯 Search listings by country

---

## 🛠️ Tech Stack

| Technology         | Purpose                          |
|--------------------|----------------------------------|
| Node.js            | Runtime for backend              |
| Express.js         | Web framework                    |
| MongoDB + Mongoose | NoSQL Database & ORM             |
| EJS                | Templating engine                |
| Cloudinary         | Image storage and delivery       |
| Mapbox             | Geocoding and map rendering      |
| Passport.js        | Authentication                   |
| connect-mongo      | Store sessions in MongoDB        |
| Bootstrap 5        | Frontend styling & responsiveness|

---


## 📂 Project Structure


WanderLust/
├── controllers/       # Logic for routes
├── models/            # Mongoose schemas (User, Listing, Review)
├── public/            # Static files (CSS, client-side JS)
├── routes/            # Route handlers
├── utils/             # Reusable utilities (error handler, wrapper)
├── views/             # EJS templates
├── middleware.js      # Custom middlewares
├── app.js             # Main Express app
├── .env               # Environment variables (not committed)
└── package.json       # NPM project manifest




---

## 🔐 Environment Variables

You must create a `.env` file in the root directory with the following:

```env
ATLASDB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
SECRET=your_session_secret


 💻 Run Locally

Clone the project:


git clone https://github.com/bsce24032/WanderLust.git
cd WanderLust

npm install

npm start


Open http://localhost:8080 in your browser.




🚀 Deployment (Render)

To deploy on Render:
	1.	Create a Web Service.
	2.	Connect your GitHub repo.
	3.	Set the Root Directory (if needed).
	4.	Add all required Environment Variables in the settings.
	5.	Set the build command: npm install --legacy-peer-deps
    6.	Set the start command: node app.js

Render will handle deployment automatically after every push.



🙋 FAQ

Q: Deployment fails due to MongoStore error?
A: Make sure ATLASDB_URL is set in Render’s environment variables section.

Q: Image uploads not working?
A: Check that all Cloudinary keys are set correctly in .env and Cloudinary is properly configured in cloudConfig.js.

Q: No listings show on Map?
A: Ensure Mapbox token is valid and location input is a real, mappable location.





🙏 Acknowledgements
	•	Cloudinary
	•	Mapbox
	•	Render


👨‍💻 Author

Shahmeer Faisal
🎓 ITU Punjab | Web Developer | AI/ML Enthusiast
📫 GitHub



📄 License

This project is licensed under the MIT License.

Let me know if you'd like me to add:
- Deployment badge
- Tech icons
- Demo GIF
- Live demo link  
or any other enhancement.


