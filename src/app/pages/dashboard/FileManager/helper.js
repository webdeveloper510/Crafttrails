function formatBytes(bytes) {
  const units = ['bytes', 'KB', 'MB', 'GB'];
  const base = 1024;
  var log = Math.floor(Math.log(bytes) / Math.log(base));
  var size = bytes / Math.pow(base, log);
  var decimal = 2
  if (!size) {
    size = 0
    log = 0
    decimal = 0
  }
  const unit = units[log];
  return `${size.toFixed(decimal)} ${unit}`;
}

function isValidFileName(fileName) {
  // Regular expression that matches valid file names
  const validFileNameRegex = /^[^\\/:\*\?"<>\|]+$/;

  // Test the file name against the regular expression
  return validFileNameRegex.test(fileName);
}


function isValidUrl(url) {
  // Regular expression that matches valid URLs
  const validUrlRegex = /^(https?:\/\/)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(\/.*)*$/;
  // Test the URL against the regular expression
  return validUrlRegex.test(url);
}


function extractUserId() {
  return JSON.parse(window.localStorage['app-serve-key'])["id"];
}
function extractUserInfo() {
  return JSON.parse(window.localStorage['app-serve-key']);
}


export { formatBytes,isValidUrl,isValidFileName ,extractUserId,extractUserInfo}