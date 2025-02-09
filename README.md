# CreditSea - Full Stack Assignment

## 📌 Project Overview
CreditSea is a full-stack application that processes **XML files** containing soft credit pull data from Experian. The system extracts relevant details from the XML file, stores them in **MongoDB**, and provides APIs for retrieving structured credit reports.

---

## 📂 Deployment
- **Frontend Deployed URL:** [CreditSea Frontend](https://creditsea-assignment-beta.vercel.app/)
- **Backend Deployed URL:** [CreditSea Backend](https://creditsea-assignment-yljz.onrender.com/)

---

## 🛠️ Tech Stack
### **Backend:**
- **Node.js** & **Express.js** – API handling
- **MongoDB** & **Mongoose** – Database & ORM
- **Multer** – File Upload Handling
- **xml2js** – XML Parsing
- **Dotenv** – Environment variable management

### **Frontend:**
- **React.js** – UI Framework
- **Axios** – API Requests
- **Tailwind CSS** – Styling
- **Context API** – State management (Used to store document ID for selecting multiple files)

---

## 🚀 Features
✅ **Upload XML Files** – Process Experian soft credit pull data
✅ **Parse XML to JSON** – Extract credit details efficiently
✅ **Store Data in MongoDB** – Persist structured credit reports
✅ **Retrieve & Display Reports** – APIs for fetching data
✅ **User-friendly Dashboard** – View processed reports
✅ **Multiple File Selection** – Document ID stored in Context API for future selection

---

## 🏗️ Project Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/creditsea.git
cd creditsea
```

### 2️⃣ Install Dependencies
#### **Backend**
```sh
cd backend
npm install
```

#### **Frontend**
```sh
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the **backend** directory and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://singhabhay0315:<password>@cluster0.t7xig4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 4️⃣ Run the Project
#### **Start Backend**
```sh
cd backend
npm start
```
#### **Start Frontend**
```sh
cd frontend
npm start
```

---

## 📂 API Endpoints
### **1️⃣ Upload XML File**
```http
POST /api/files/upload
```
- **Request:** `multipart/form-data` with a file
- **Response:**
```json
{
    "message": "File uploaded successfully",
    "documentId": "65f3a7b0a19c5e002d8e2c4a"
}
```

### **2️⃣ Get Processed Credit Data**
```http
GET /api/files/:documentId
```
- **Response:**
```json
{
    "message": "File processed successfully",
    "parsedData": { "Report": { "Name": "John Doe", "CreditScore": "750" } }
}
```

## 📝 Project Structure
```
creditsea/
│── backend/
│   ├── config/           # Database connection
│   ├── controllers/      # Business logic
│   ├── middleware/       # Multer file upload config
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded XML files
│   ├── index.js         # Main backend entry file
│── frontend/             # React frontend
│── README.md             # Documentation
```

---

## 🛠️ Future Improvements
- ✅ Add Authentication (JWT-based login)
- ✅ Implement Pagination for Reports
- ✅ Build Analytics Dashboard

---

## 🎯 Author
**Abhay Prata Singh**  
LinkedIn: [Your Profile](https://www.linkedin.com/in/abhaysingh1112/)  
GitHub: [Your GitHub](https://github.com/Abhaysingh77)

---

## 📜 License


