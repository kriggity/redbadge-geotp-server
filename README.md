<h1>GeoTP Server</h1>
<h2>Getting Started</h2>

1. Navigate to project folder

+ In terminal/command prompt/powershell: ```mkdir server && cd server```

+ ```git init && git remote add origin https://github.com/kriggity/redbadge-geotp-server.git```

+ ```git checkout -b [your branch name]```

+ ```git pull origin develop```

+ ```npm install```

+ ```touch .env``` (Mac and Linux)  
    ```echo > .env``` (Windows)

+ Update the .env file with this following:
   (make sure you are using the same password as in PG Admin)  
    PORT = 3001  
    NAME = geotp  
    PASSWORD = your\_password  
    JWT\_SECRET = your\_jwt\_secret   
    DATABASE\_URL = postgres://postgres:your\_password@localhost/geotp

+ Add ```.env``` to ```.gitignore``` if not already present

+ Open up PG Admin 4. It will open in the browser.

+ Click Server, then click Postgres.

+ Log in (if not already prompted)

+ Right click on "Database".

+ Choose "Create Database".

+ Name it "geotp"

+ In terminal ```nodemon``` or ```npm start```
