## AUTOMATING DEPLOY TO AWS

In order to deploy to aws automatically from script, you need to create a file named deploy-keys.json in root folder at the same level as package.json.
Then copy the following lines into it with the right credentials. 

*NOTE*
Make sure this file is not committed to git and not copied to aws. 

```
{
  "AWSAccessKeyId": "",
  "AWSSecretKey": "",
  "AWSRegion":  ""
}
```

## ADDING NEW IMAGES TO LAUNCHER

* To add images for games, copy the images to files/images/games
* For games background, copy the images to files/images/games/bg
* For games logo, copy the images to files/images/games/logo
* To add images for news, copy the images to files/images/news
* For any other images, copy the images to files/images

## TO CHANGE OR ADD NEW STYLING

All the less files used in generating css files are in files/styles


## TO CHANGE OR ADD NEW SCRIPT

The script file is in files/scripts


To start auto build: from cmd line navigate to project root folder and type either: grunt or grunt watch then press enter button
To run specific task i.e deploy-dev: grunt deploy-dev