/**
 * Identity 2026 - Communication Quiz backend
 * Paste this into Extensions > Apps Script on a new Google Sheet, then
 * Deploy > New deployment > Web app > Execute as: Me > Access: Anyone.
 * Copy the /exec URL it gives you into ENDPOINT in index.html.
 */

var SHEET_NAME = 'Responses';

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    var head = ['Timestamp', 'Name', 'Department', 'Score'];
    for (var i = 1; i <= 15; i++) head.push('Q' + i);
    sh.appendRow(head);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var row = [new Date(d.t || Date.now()), d.n || '', d.d || '', d.s];
    for (var i = 0; i < 15; i++) row.push(['A', 'B', 'C', 'D'][d.a[i]] || '');
    sheet_().appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var sh = sheet_();
  var last = sh.getLastRow();
  var out = [];
  if (last > 1) {
    var vals = sh.getRange(2, 1, last - 1, 20).getValues();
    for (var r = 0; r < vals.length; r++) {
      var v = vals[r];
      var ans = [];
      for (var c = 4; c < 19; c++) ans.push(['A', 'B', 'C', 'D'].indexOf(v[c]));
      out.push({ t: new Date(v[0]).getTime(), n: v[1], d: v[2], s: Number(v[3]), a: ans });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
