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

// fetch('https://musicbrainz.org/ws/2/genre/?query="funk"', {
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

fetch('./db.json')
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        console.log(data.punk);
        console.log(data.punk[0]);
        console.log(data.punk[0].name);
    }) 