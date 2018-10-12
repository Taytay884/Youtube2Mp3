const googleApiKey = 'AIzaSyCYYrspUqmdmwpVzjCxVw_uQAgRiyCDOrQ';

const youtube = {
    getYoutubeSongsInfo: (songs, callback) => {
        let songInfos = [];
        songs.forEach(song => {
            let youtubeRequest = createYoutubeRequest(song);
            fetchSongInfoFromYoutube(youtubeRequest, function (youtubeId, title) {
                songInfos.push({youtubeId, title});
                if (songs.length === songInfos.length) {
                    callback(songInfos);
                }
            });
        });
    },
};

const fetchSongInfoFromYoutube = (request, callback) => {
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
};

const createYoutubeRequest = (songName) => {
    const request = new Request(`https://www.googleapis.com/youtube/v3/search?&q=
    ${songName}&part=snippet&maxResults=10&regionCode=IL&type=video&key=${googleApiKey}`);
    return request;
};

export default youtube;