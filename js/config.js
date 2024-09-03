export const API_URL = 'https://talkwebnow.online/backend/api/';

export function timeSince(date) {
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return "Posted " + interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return "Posted " + interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return "Posted " + interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return "Posted " + interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return "Posted " + interval + " minutes ago";
    }
    return "Posted " + Math.floor(seconds) + " seconds ago";
}