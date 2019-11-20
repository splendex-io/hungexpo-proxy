# Hungexpo domain-app

This application is to serve domains of Hungexpo events. E.g.: hungexpo.hu/events/fehova can work under fehova.hu

The following functionalities are included:
* Gets html from given baseUrl
* Changes the links to local for baseUrl
* Any nice url is passed to baseUrl for cURL usage

## Installation

Download app from the [repo](https://gitlab.com/splendex/hungexpo/domainapp).

Copy .env.example variables to .env

```bash
BASE_URL="http://preview.hungexpo.up.hu/events/fehova/"
PORT="3000"
```

BASE_URL => the basis of the cURL scrape

PORT => can be used to test multiple domain locally

## Usage

```bash
`npm start` <= normal start
`npm dev` <= development, the server restarts on file change
```