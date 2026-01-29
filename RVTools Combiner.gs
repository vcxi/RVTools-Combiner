function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('RVTools Consolidator')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function initializeJob(folderUrl) {
  try {
    incrementUsage();
    var folderId = extractFolderId(folderUrl);
    if (!folderId) throw new Error("Invalid Folder URL. Please ensure you copied the full Drive folder link.");

    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var fileList = [];

    while (files.hasNext()) {
      var f = files.next();
      if (f.getMimeType() === MimeType.CSV || f.getName().toLowerCase().endsWith(".csv")) {
        fileList.push({ id: f.getId(), name: f.getName() });
      }
    }

    if (fileList.length === 0) throw new Error("No CSV files found in this folder.");

    var outputName = 'RVTools_Consolidated_' + new Date().toISOString().slice(0, 10);
    var ss = SpreadsheetApp.create(outputName);

    return {
      success: true,
      spreadsheetId: ss.getId(),
      spreadsheetUrl: ss.getUrl(),
      files: fileList
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

function processSingleFile(spreadsheetId, fileId, fileName) {
  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var file = DriveApp.getFileById(fileId);
    var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());

    if (csvData.length > 0) {
      var sheetName = fileName.replace(/^RVTools_tab/i, "").replace(/\.csv$/i, "").substring(0, 50);
      var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
      sheet.clear();
      sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

function finalizeJob(spreadsheetId, fileCount) {
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
    ss.deleteSheet(defaultSheet);
  }
  incrementFileCount(fileCount);
}

/** USAGE TRACKING **/
function getUsageStats() {
  var props = PropertiesService.getScriptProperties();
  return {
    totalRuns: props.getProperty('totalRuns') || "0",
    uniqueUsers: props.getProperty('uniqueUsersCount') || "0",
    totalFiles: props.getProperty('totalFilesProcessed') || "0"
  };
}

function incrementUsage() {
  var props = PropertiesService.getScriptProperties();
  var total = parseInt(props.getProperty('totalRuns') || "0");
  props.setProperty('totalRuns', (total + 1).toString());

  var userEmail = Session.getActiveUser().getEmail();
  if (userEmail) {
    var userKey = 'u_' + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, userEmail)).substring(0, 15);
    if (!props.getProperty(userKey)) {
      props.setProperty(userKey, 'true');
      var uniqueCount = parseInt(props.getProperty('uniqueUsersCount') || "0");
      props.setProperty('uniqueUsersCount', (uniqueCount + 1).toString());
    }
  }
}

function incrementFileCount(count) {
  var props = PropertiesService.getScriptProperties();
  var totalFiles = parseInt(props.getProperty('totalFilesProcessed') || "0");
  props.setProperty('totalFilesProcessed', (totalFiles + count).toString());
}

function extractFolderId(url) {
  var match = url.match(/folders\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}
