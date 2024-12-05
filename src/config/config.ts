import {
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    GOOGLE_GEMINI_API_KEY,
} from '@env';

export default {
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
};
export const geminiApiKey = GOOGLE_GEMINI_API_KEY;
