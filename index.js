// fetch('https://musicbrainz.org/ws/2/genre/all', {
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// })
// .then(res=>res.json())
// .then(data=> {
//     console.log(data.genres);
//     data.genres.forEach(genre => {console.log(genre.name)});
// })

fetch('https://musicbrainz.org/ws/2/tag/', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(res=>res.json())
.then(data=> {
    console.log(data.genres);
    data.genres.forEach(genre => {console.log(genre.name)});
})