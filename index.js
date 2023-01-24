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

const mainbody = document.querySelector('#mainbody');

fetch('http://localhost:3000/punk')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        // Added the creation of an album div to this workflow. The album div will contain the image and the corresponding tooltip.
        const albumDiv = document.createElement("div");
        albumDiv.className = "album";
        mainbody.append(albumDiv);

        // Should be similar to the original code, except I create an album variable to assign to the object. We'll need to rework this when we iterate over the actual arrays.
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

        // Next part will differ: 'album desc' is the tooltip that will appear on hover.
        const albumDesc = document.createElement("div");
        albumDesc.setAttribute("class", "tooltip");
        albumDesc.setAttribute("style", "display: none");
        albumDesc.append(albumName, albumArtist, albumYear);

        // Instead of appending directly to the mainbody, both the album image and album desc are appended to the album div.
        albumDiv.appendChild(albumImage);
        albumDiv.appendChild(albumDesc);

        // Add mouseover and mouseleave events.
        albumImage.addEventListener("mouseover", () => {
            //console.log(albumImage);
            albumDesc.style.display = "block";
        });
        albumImage.addEventListener("mouseleave", ()=> {
            //console.log("I'm out!");
            albumDesc.style.display = "none";
        });
    }) 