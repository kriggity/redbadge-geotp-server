<h1>GeoTP Server</h1>
<h2>Getting Started</h2>

<ol> 
<li>Navigate to project folder</li>

<li>In terminal/command prompt/powershell: <code>mkdir server && cd server</code></li>

<li><code>git init && git remote add origin https://github.com/kriggity/redbadge-geotp-server.git</code></li>

<li><code>git checkout -b [your branch name]</code></li>

<li><code>git pull origin develop</code></li>

<li><code>npm install</code></li>

<li><code>touch .env</code> (Mac and Linux)<br/>
    <code>echo > .env</code> (Windows)
</li>
<li>Update the .env file with this following:<br/>
   (make sure you are using the same password as in PG Admin)<br/>
   <pre>
   <code>
    PORT = 3001<br/>
    NAME = geotp<br/>
    PASSWORD = your_password<br/>
    JWT_SECRET = your_jwt_secret<br/><br/>
    DATABASE_URL = postgres://postgres:your_password@localhost/geotp
    </code>
    </pre>
</li>
<li>Add <code>.env</code> to <code>.gitignore</code> if not already present</li>

<li>Open up PG Admin 4. It will open in the browser.</li>

<li>Click Server, then click Postgres.</li>

<li>Log in (if not already prompted)</li>

<li>Right click on "Database".</li>

<li>Choose "Create Database".</li>

<li>Name it "geotp"</li>

<li>In terminal <code>nodemon</code> or <code>npm start</code></li>
</ol>
