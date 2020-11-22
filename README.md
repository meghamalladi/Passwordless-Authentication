
# Structure:
passwordless-authentication/
  |--frontend
    |--public/ Mail file to run
    |--src/ source code
    |--package.json
    |--babel.rc
  |--lambdamodules/ Lambda modules for this project
  |--README.md

# Dependencies:
1.Download the contents of the repository.
2. 'npm' is required for this project. If not required, install by using the command:
  `$sudo apt update
   $sudo apt install nodejs npm`
3. Install your favourite web application bundler. Parcel bundler has been used for this project. It can be installed by:
  `npm install -g parcel-bundler`
  
4.Go to 'frontend' folder and run the command `npm install`. All the required modules will be installed in the folder.

# To build and run:
1. Go to the 'public'. Run the command: `
  `parcel index.html`
