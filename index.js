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
        const albumImage = document.createElement('img');
        albumImage.src = album.image;
        const albumName = document.createElement('h3');
        albumName.textContent = album.name;
        const albumArtist = document.createElement('h4');
        albumArtist.textContent = album.artist;
        const albumYear = document.createElement('h4');
        albumYear.textContent = album.year;
        mainbody.appendChild(albumImage);

        //Add Mouseover Event
        const albumDesc = document.getElementById("popup")
        albumImage.onmouseover = function() {
            albumDesc.style.display = "block";
        }
        albumImage.onmouseout = function() {
            albumDesc.style.display = "none";
        }


    }) 