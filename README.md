# 📓 Shadow Notes

A secure, cloud-native note-taking web app built using the MERN stack with modern DevOps and deployment practices. Designed with a futuristic glassmorphic UI and real-world scalability using Docker, Kubernetes, and Helm. ✨🧠

---

## 🌐 Live Demo 🚀

* [https://shadownotes.vercel.app](https://shadownotes.vercel.app)

---

## 🛠️ Tech Stack ⚙️

* **Frontend:** React ⚛️, Tailwind CSS 💨
* **Backend:** Node.js 🟩, Express.js 🚂
* **Database:** MongoDB Atlas 🍃
* **Authentication:** JWT 🔐
* **UI Design:** Glassmorphism 🎨, Framer Motion 🎞️
* **DevOps:** Docker 🐳, Helm ⎈, Kubernetes ☸️, GKE (Google Kubernetes Engine) 🌐

---

## 🚀 Local Development Setup 🖥️

### 🔧 Prerequisites

* Node.js and npm installed 📦
* Docker installed and running 🐋
* MongoDB Atlas account or local MongoDB setup 🗃️
* Git 🧬

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dalvi-pushkar/shadow-notes.git
cd shadow-notes
```

### 2️⃣ Setup Backend 🛠️

```bash
cd backend
npm install
```

Create an `.env` file:

```bash
cp .env.example .env
```

Edit the `.env` file with the following (replace with your actual credentials):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shadownotes
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the backend server:

```bash
npm run dev
```

Your backend API will run at: `http://localhost:5000`

### 3️⃣ Setup Frontend 🎨

```bash
cd ../frontend
npm install
```

Create an `.env` file:

```bash
cp .env.example .env
```

Update `.env` with the backend URL:

```
REACT_APP_API_URL=http://localhost:5000
```

Run the frontend server:

```bash
npm start
```

Your app will now be live at `http://localhost:3000` 🚪

> 🔍 Note: Ensure that the backend is running and accessible at the port provided in the frontend's `.env` file.

---

## 🐳 Docker Setup

### Prerequisites 🛠️

* Ensure Docker is installed and the Docker daemon is running 🐋
* `.env` files must be properly configured in both `backend/` and `frontend/`

### 📆 Build Backend Image 📦

```bash
cd backend
docker build -t shadow-notes-backend .
```

### 🚀 Run Backend Container 🧱

```bash
docker run -d \
  --name shadow-notes-backend \
  -p 5000:5000 \
  --env-file .env \
  shadow-notes-backend
```

* `-d`: Run container in detached mode 🛸
* `--env-file`: Inject environment variables from `.env` 📄
* `-p`: Maps container's port 5000 to host port 5000 🔁

### 📆 Build Frontend Image 🖼️

```bash
cd ../frontend
docker build -t shadow-notes-frontend .
```

### 🚀 Run Frontend Container 💻

```bash
docker run -d \
  --name shadow-notes-frontend \
  -p 3000:3000 \
  --env-file .env \
  shadow-notes-frontend
```

### ✅ Verify Containers Are Running 📋

```bash
docker ps
```

You should see both containers running and mapped to ports 3000 (frontend) and 5000 (backend).

### 💪 Test the App 🧪

Visit `http://localhost:3000` in your browser. The frontend should communicate with the backend at `http://localhost:5000`.

### 🩹 Stop and Clean Up 🧼

```bash
docker stop shadow-notes-frontend shadow-notes-backend
docker rm shadow-notes-frontend shadow-notes-backend
docker rmi shadow-notes-frontend shadow-notes-backend
```

---

## ☘️ Kubernetes + Helm Deployment (GKE)

### 🌱 Create GKE Cluster

```bash
gcloud container clusters create shadow-notes-cluster --num-nodes=2
```

### 🔑 Authenticate kubectl

```bash
gcloud container clusters get-credentials shadow-notes-cluster
```

### 📦 Install Backend with Helm

```bash
cd helm/backend
helm install shadow-notes-backend .
```

### 🖼️ Install Frontend with Helm

```bash
cd ../frontend
helm install shadow-notes-frontend .
```

### 🔍 Get Services

```bash
kubectl get svc
```

### ⛳️ Accessing the Application

Once you run:

```bash
kubectl get svc
```

You’ll see an output like:

```bash
NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)          AGE
shadow-notes-backend   LoadBalancer   10.0.0.123     34.72.123.45    5000:30001/TCP   2m
shadow-notes-frontend  LoadBalancer   10.0.0.124     35.68.122.31    80:30002/TCP     2m
```

Copy the `EXTERNAL-IP` of the `shadow-notes-frontend` service and paste it in your browser:

```bash
http://<EXTERNAL-IP>
```

This will load the Shadow Notes web app. 🎉

---

## **🙌 Author**

Made with ☕ by Dalvi Pushkar
