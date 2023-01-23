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

const mainbody = document.querySelector('#mainbody')

fetch('./db.json')
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        console.log(data.punk);
        console.log(data.punk[0]);
        console.log(data.punk[0].name);
        const image = document.createElement('img');
        image.src = data.punk[0].image;
        const name = document.createElement('h3');
        name.textContent = data.punk[0].name;
        const artist = document.createElement('h4');
        artist.textContent = data.punk[0].artist;
        const year = document.createElement('h4');
        year.textContent = data.punk[0].year;
        mainbody.appendChild(image);
    }) 