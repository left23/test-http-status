This runs a test to check the HTTP status of a list of URLs.
If the response is not a 200, the URL will be output to the console.

1. Install packages
```javascript
npm i
```
2. Populate json file in `data/lessons.json` with URLs to test. See [this playwright-hasura repo](https://github.com/left23/playwright-hasura) for a script that gets the URLs for a Hasura endpoint.

3. Run the script. The results output to the console.

```javascript
npm run deploy-check
```
