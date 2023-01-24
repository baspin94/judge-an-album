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

const sidebar = document.querySelector('#sidebar')

const saveButton = document.createElement('button')
saveButton.setAttribute("type","button")
saveButton.setAttribute("name","button")
saveButton.textContent = 'Save Album'

fetch('http://localhost:3000/punk')
    .then(res=>res.json())
    .then(data=> {
        let album = data[0];
        console.log(album);
        const albumImage = document.createElement('img');
        albumImage.src = data[0].image;
        const albumName = document.createElement('h3');
        albumName.textContent = data[0].name;
        const albumArtist = document.createElement('h4');
        albumArtist.textContent = data[0].artist;
        const albumYear = document.createElement('h4');
        albumYear.textContent = data[0].year;
        mainbody.appendChild(albumImage);
        
        /////////////
        const div = document.createElement('div');
        mainbody.appendChild(div);
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

    }) 

