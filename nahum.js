import utils from './utils.js';
import youtube from './youtube.js';

// globals
var elTextarea = null;
let youtubeVideoIds = [];
let elLinks = [];
let elLinksContainer = document.querySelector('.downloads-links-container');

init();

function init() {
    initTextarea();
}

function initTextarea () {
    elTextarea = document.querySelector('.songs-string');
    elTextarea.placeholder = 'Example:\n\nChainsmokers in feeling\nליאור נרקיס- רק שלך\nישי ריבו- הבוקר יעלה\n...';
}

function onSubmitSongsString (event) {
    event.preventDefault();
    let songsString = elTextarea.value;
    let songs = utils.turnStringToArray(songsString);
    youtube.getYoutubeSongsInfo(songs, (songInfos) => {
        songInfos.forEach(songInfo => {
            addSongToDom(songInfo.youtubeId, songInfo.title);
            if (youtubeVideoIds.length === songs.length) { // Last song loaded...
                enableDownloadButton();
            }
        });
    });
}

function addSongToDom(youtubeId, title) {
    youtubeVideoIds.push(youtubeId);
    let element = createLinkElement(youtubeId, title);
    pushLinkElementToLinksContainer(element);
}

function enableDownloadButton() {
    let elButton = document.querySelector('.download-button');
    elButton.disabled = false;
}

function pushLinkElementToLinksContainer(linkElement) {
    elLinks.push(linkElement);
    elLinksContainer.appendChild(linkElement);
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

window.nahum = {
    onSubmitSongsString,
    downloadLinks
};