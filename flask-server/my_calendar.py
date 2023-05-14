"""
from google.oauth2.credentials import Credentials
from googleapiclient.errors import HttpError
from googleapiclient.discovery import build
import datetime
import os

app = Flask(__name__)

# Use the following variables to specify the name of the calendar and the
# maximum number of events to retrieve.
CALENDAR_NAME = 'primary'
MAX_EVENTS = 10

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

@app.route('/api/events', methods=['GET'])
def get_events():
    # Load the credentials from the token file or redirect to the authorization flow if not available.
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            return jsonify({'error': 'User not authorized.'}), 401
    
    # Build the Calendar API client.
    service = build('calendar', 'v3', credentials=creds)

    # Set the time range for the events query.
    now = datetime.datetime.utcnow().isoformat() + 'Z'
    end_of_week = (datetime.datetime.utcnow() + datetime.timedelta(days=7)).isoformat() + 'Z'

    # Call the Calendar API to retrieve the events.
    try:
        events_result = service.events().list(calendarId=CALENDAR_NAME, timeMin=now, timeMax=end_of_week,
                                              maxResults=MAX_EVENTS, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])
        return jsonify({'events': events}), 200
    except HttpError as error:
        return jsonify({'error': str(error)}), 500
"""