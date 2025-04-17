const fetch = require("node-fetch");
const fs = require('fs').promises;
const path = require('path');

async function handleDeployFailure() {
  try {
    // Read the local lessons.json file
    const lessonsPath = path.join(__dirname, './data/lessons.json');
    const fileContent = await fs.readFile(lessonsPath, 'utf8');
    const data = JSON.parse(fileContent);

    if (data) {
      // console.log('Lessons data:', data);
      console.log('Checking ' + data.length + ' lessons.');

      // Loop through each URL and fetch its HTTP status
      const statusPromises = data.map(async (lesson) => {
        const response = await fetch(lesson.url);
        return { url: lesson.url, status: response.status };
      });

      const listOfUrls = await Promise.all(statusPromises);

      // Filter to get only the URLs with status not equal to 200
      const statusNot200 = listOfUrls.filter(status => status.status !== 200);
      // console.log('URLs with non-200 status count:', statusNot200.length);
      // console.log('Problematic URLs:', statusNot200);

      // Count 200 statuses
      const status200 = listOfUrls.filter(status => status.status === 200).length;
      // console.log('URLs with 200 status count:', status200);

      return {
        success: true,
        data: {
          ...statusNot200,
          status200
         }
      };
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

handleDeployFailure().then(result => {
  console.log(result);
  process.exit(0);
});

