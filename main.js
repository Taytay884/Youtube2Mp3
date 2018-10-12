const googleApiKey = 'AIzaSyCYYrspUqmdmwpVzjCxVw_uQAgRiyCDOrQ';
const songsString = `Chainsmokers in feeling
ליאור נרקיס- רק שלך
ישי ריבו- הבוקר יעלה
דודו אהרון הכל בגלל הגעגוע
Like I love you
Lukas Graham love someone
Zero Imagine Dragons
Crazy Chainsmokers
עידן עמדי- דברים יפים לראות
Electricity dua lipa`;

let queryArr = turnStringToArray(songsString);
let youtubeVideoIds = [];
let elLinks = [];
let elLinksContainer = document.querySelector('.downloads-links-container');

// init
loadYoutubeLinks(queryArr);

function turnStringToArray(string) {
    let res = string.split('\n');
    console.log(res);
    return res;
}

function loadYoutubeLinks(songs) {
    songs.forEach(song => {
        let requestXX = createARequest(song);
        fetchIdFromYoutube(requestXX, function(videoId, title) {
            youtubeVideoIds.push(videoId);
            let element = createLinkElement(videoId, title);
            elLinks.push(element);
            elLinksContainer.appendChild(element);
            if (youtubeVideoIds.length === songs.length) {
                console.log(youtubeVideoIds);
                // downloadLinks();
            }
        });
    });
}

function createARequest(songName) {
    const request = new Request(`https://www.googleapis.com/youtube/v3/search?&q=
    ${songName}&part=snippet&maxResults=10&regionCode=IL&type=video&key=${googleApiKey}`);
    return request;
}

function fetchIdFromYoutube(request, callback) {
fetch(request)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error('Something went wrong on API Server');
        }
    })
    .then(res => {
        callback(res.items[0].id.videoId, res.items[0].snippet.title);
    })
    .catch(error => {
        console.log(error);
    });
}

function createLinkElement(videoId, title) {
    let linkElement = document.createElement('a');
    linkElement.innerHTML = '<span>' + title + '</span>';
    linkElement.href = 'https://recordmp3.co/#/watch?v=' + videoId;
    linkElement.target = '_blank';
    return linkElement;
}

function downloadLinks() {
    elLinks.forEach(elLink => {
        elLink.click();
    });
}