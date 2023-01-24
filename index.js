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
const albumBody = document.querySelector('#albumBody')
        // console.log(data);
        // console.log(data.punk);
        // console.log(data.punk[0]);
        // console.log(data.punk[0].name);
        // const image = document.createElement('img');
        // image.src = data.punk[0].image;
        // const name = document.createElement('h3');
        // name.textContent = data.punk[0].name;
        // const artist = document.createElement('h4');
        // artist.textContent = data.punk[0].artist;
        // const year = document.createElement('h4');
        // year.textContent = data.punk[0].year;
        // mainbody.append(image);
    //}) 

    // function to add eventlistener to drop down to populate the albums
function renderAlbums(album) {
    const albumImage = document.createElement('img');
        albumImage.src = album.image;
        const albumName = document.createElement('h3');
        albumName.textContent = album.name;
        const albumArtist = document.createElement('h4');
        albumArtist.textContent = album.artist;
        const albumYear = document.createElement('h4');
        albumYear.textContent = album.year; 

        albumImage.addEventListener('click', (e)=>{
            const singleAlbums = document.querySelector('#singleAlbums');
            singleAlbums.innerHTML = '';
            let bigImage = document.createElement('img');
            bigImage.src = album.image;
            bigImage.setAttribute('id','bigImage');
            
            // Next part will differ: 'album desc' is the tooltip that will appear on hover.
            const albumDesc = document.createElement("div");
            albumDesc.setAttribute("class", "tooltip");
            albumDesc.setAttribute("style", "display: none");
            albumDesc.append(albumName, albumArtist, albumYear);
            singleAlbums.appendChild(albumDesc);
            
            // Add mouseover and mouseleave events.
            bigImage.addEventListener("mouseover", () => {
              //console.log(albumImage);
              albumDesc.style.display = "block";
            });
            albumImage.addEventListener("mouseleave", ()=> {
            //console.log("I'm out!");
            albumDesc.style.display = "none";
            });
            singleAlbums.append(bigImage);
            const div = document.createElement('div');
            const saveButton = document.createElement('button')
            saveButton.setAttribute("type","button")
            saveButton.setAttribute("name","button")
            saveButton.textContent = 'Save Album'
            singleAlbums.appendChild(div);
            div.appendChild(saveButton);
            const nameAndArtist = document.createElement('p');
            nameAndArtist.setAttribute('id',album.name.replaceAll(' ',''));
            nameAndArtist.textContent = `${album.name} by ${album.artist}`
            saveButton.addEventListener('click', ()=>{
                if (saveButton.textContent === "Save Album") {
                    sidebar.appendChild(nameAndArtist)
                    saveButton.textContent = "Remove Album"
                } else if (saveButton.textContent === "Remove Album") {
                    let elementToRemove = document.querySelector(`#${album.name.replaceAll(' ','')}`);
                    // debugger
                    elementToRemove.remove();
                    saveButton.textContent = "Save Album"
                }
            })
        });
        albumBody.append(albumImage);
        
};

genreSelect = document.querySelector('#genre-list');
 
genreSelect.addEventListener('change', (e) => {
   albumBody.innerHTML = ' ';
    const genre = e.target.value.toLowerCase();
    fetch('http://localhost:3000' + `/${genre}`)
    .then(res=>res.json())
    .then(data=> data.forEach(renderAlbums));
});
const sidebar = document.querySelector('#sidebar')

