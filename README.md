# Addendix
MOSIP - Decode project

# Backend Directory

## Running the Backend

To run the backend of the MOSIP - Decode project, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Make sure you have a MongoDB (or your chosen database) instance running.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mosip-decode-backend.git
cd mosip-decode-backend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the necessary environment variables:

```bash
PORT=3000
DB_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
```

4. Running the Application
To start the server, run the following command:

```bash
npm start
```

The application will be running on http://localhost:3000.

For any questions or issues, please refer to the project documentation or contact the project maintainers.

