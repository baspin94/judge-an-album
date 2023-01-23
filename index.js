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

fetch('http://localhost:3000/punk')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const album = data[0]
        console.log(album.name);
        const image = document.createElement('img');
        image.src = album.image;
        const name = document.createElement('h3');
        name.textContent = album.name;
        const artist = document.createElement('h4');
        artist.textContent = album.artist;
        const year = document.createElement('h4');
        year.textContent = album.year;
        mainbody.appendChild(image);

        //Add Mouseover Event
        const albumDesc = document.getElementById("popup")
        image.onmouseover = function() {
            albumDesc.style.display = "block";
        }
        image.onmouseout = function() {
            albumDesc.style.display = "none";
        }


    }) 