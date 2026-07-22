# Identity 2026 — Communication Comprehension Check

Live quiz + facilitator dashboard for the Communication workshop
(Identity 2026 Leadership Conclave · The Westin Goa · 6–7 August).

## Setup — about 10 minutes, once

### 1. Create the response sheet
1. New Google Sheet → **Extensions ▸ Apps Script**
2. Delete the placeholder code, paste all of `apps-script.gs`, save
3. **Deploy ▸ New deployment ▸ Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize when prompted, then copy the **/exec** URL

### 2. Wire it up
Open `index.html`, find the ENDPOINT line near the top of the script block,
and paste the /exec URL between the quotes. Commit.

### 3. Publish
Repo **Settings ▸ Pages ▸ Source: Deploy from a branch ▸ main / (root)**.

## Using it on the day
- Share the Pages URL as a QR on the closing slide
- Facilitator dashboard: footer link → passcode **identity26**
- Dashboard refreshes every 12s: responses, average, per-question correct %,
  leaderboard, and best score per department for the team-prize tally

## Notes
- Answer key and passcode live in the page source — share the link only once the quiz starts
- Every submission also lands as a row in the Google Sheet, so you keep a permanent record

