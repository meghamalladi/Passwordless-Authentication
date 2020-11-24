
## Structure:

  
    passwordless-authentication/    
        |--frontend
          |--public/ Mail file to run
          |--src/ source code
          |--package.json
          |--babel.rc
        |--lambdamodules/ Lambda modules for this project
        |--README.md

## Dependencies:
1.Download the contents of the repository.

2.'npm' is required for this project. If not required, install by using the command:
  
    $sudo apt update
   
    $sudo apt install nodejs npm


3.Install your favourite web application bundler. Parcel bundler has been used for this project. It can be installed by:
   
    $npm install -g parcel-bundler
  
4.Go to 'frontend' folder and run the command `$npm install`. All the required modules will be installed in the folder.

## AWS Cognito

To set up AWS cognito, check out my medium article - /// to be posted ///

1.Go to src folder and edit the file config.json with the appropriate details.

    a.REGION is available in the top right corner of your aws service console.

    b.USER_POOL_ID is available in the general settings of your user pool in your aws account as Pool Id.

    c.APP_CLIENT_ID is available in the app clients tab of your user pool in your aws account App client id.


## To build and run:

1.Go to the 'public'. Run the command: 
  
    $parcel index.html
