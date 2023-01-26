// Define variables for existing HTML elements.
const mainbody = document.querySelector('#mainbody');
const albumBody = document.querySelector('#albumBody');
const sidebar = document.querySelector('#sidebar');
const genreSelect = document.querySelector('#genre-list');
const singleAlbums = document.querySelector('#singleAlbums');
const singleAlbumsContainer = document.querySelector('#singleAlbumsContainer')
const spotifySampler = document.querySelector('iframe');
const bigImage = document.createElement('img');
    bigImage.setAttribute('id','bigImage');

// Fetch and render 'Saved' albums on page load.
fetch("http://localhost:3000/saved")
    .then(res => res.json())
    .then(data => data.forEach(album => renderSavedAlbum(album)));

// Grab name and artist from album object and then add event listener to it.
function renderSavedAlbum(album) {
    let button = makeButton(album);
    setBtnToRemove(button, album);
    let nameArtist = nameArtistGrab(album);
    nameAndArtistEvent(nameArtist, album, button);
};

// Create a button.
function makeButton(album){
    const saveButton = document.createElement('button')
        saveButtonEvent(album, saveButton);
        saveButton.textContent = 'Save Album';
    return saveButton;
};

// Add event listener to save button.
function saveButtonEvent(album, saveButton){
    saveButton.addEventListener('click', ()=>{
        if (saveButton.textContent === "Save Album") {
            saveAlbum(album, saveButton);
        } else if (saveButton.textContent === "Remove Album") {
            let albumId = saveButton.id.split('_')[1];
            console.log("This album's ID is " + albumId);
            removeAlbum(albumId);
            let elementToRemove = document.querySelector(`p#album_${albumId}`);
            elementToRemove.remove();
            saveButton.textContent = "Save Album";
            saveButton.id = "";
        }
    })
    return saveButton;
}

// Set button text to 'Save Album' and remove ID.
function setBtnToSave(saveButton) {
    saveButton.textContent = "Save Album";
    saveButton.id = "";
}

// Update button text to 'Remove Album' and add ID.
function setBtnToRemove(saveButton, album) {
    saveButton.textContent = "Remove Album";
    saveButton.setAttribute('id', `album_${album.id}`);
};

// Grab name and artist from album object.
function nameArtistGrab(album) {
    const nameAndArtist = document.createElement('p');
        nameAndArtist.setAttribute('id', `album_${album.id}`);
        nameAndArtist.textContent = `"${album.name}" by ${album.artist}`;
        sidebar.appendChild(nameAndArtist);
        return nameAndArtist;
}

// Add event listener for Saved Albums.
function nameAndArtistEvent(nameAndArtist, album, saveButton) {
    nameAndArtist.addEventListener('click', ()=>{
        const div = document.createElement('div');
        singleAlbums.innerHTML = '';
        singleAlbumsContainer.style.display = "block"
        bigImage.src = album.image;
        spotifySampler.src = album.sampleSrc;
        // Grab album name from album object.
        const bigAlbumName = document.createElement('h3');
        bigAlbumName.textContent = album.name;
        // Grab album artist from album object.    
        const bigAlbumArtist = document.createElement('h4');
        bigAlbumArtist.textContent = album.artist;
        // Grab album year from album object.
        const bigAlbumYear = document.createElement('h4');
        bigAlbumYear.textContent = album.year;
        singleAlbums.append(bigImage, bigAlbumName, bigAlbumArtist, bigAlbumYear);
        singleAlbums.appendChild(div);
        div.appendChild(saveButton);
    })
};

// Fetch and render album thumbnails when new genre is selected from the dropdown.
genreSelect.addEventListener('change', (e) => {
    albumBody.innerHTML = ' ';
        const genre = e.target.value.toLowerCase();
        fetch('http://localhost:3000' + `/${genre}`)
        .then(res=>res.json())
        .then(data=> data.forEach(renderAlbums));
    });

// Add eventlistener to drop down to populate the albums
function renderAlbums(album) {

    // Grab album image from album object.
    const albumImage = document.createElement('img');
        albumImage.src = album.image;

    // Grab album name from album object.
        const albumName = document.createElement('h3');
            albumName.textContent = album.name;
        
    // Grab album artist from album object.    
    const albumArtist = document.createElement('h4');
        albumArtist.textContent = album.artist;
    
    // Grab album year from album object.
    const albumYear = document.createElement('h4');
        albumYear.textContent = album.year;

    // Grab song sample src from album object.
    const albumSample = album.sampleSrc;

    // Create div for each album thumbnail
    const thumbDiv = document.createElement("div");
        thumbDiv.setAttribute("class", "thumbnail");

    // Create tooltip for each album thumbnail.
    const albumDesc = document.createElement("div");
        albumDesc.setAttribute("class", "tooltip");
        albumDesc.append(albumName, albumArtist, albumYear);

    // Create event listener to show tooltip when mouse hovers over thumbnail.
    albumImage.addEventListener("mouseover", () => {
        albumDesc.style.display = "block"

        // NEW - NICK - animation
        albumDesc.animate({
        width: ['0px', '200px']
            }, 200
        );
        function textAnimate(textElement){
            textElement.animate({
                opacity: ['0', '0', '1'],
                offset: ['0', '0.5', '1']
            }, 350)
        }
        [albumName, albumArtist, albumYear].forEach(textAnimate);
    });

    // Create event listener to hide tooltip when mouse leaves thumbnail.
    albumImage.addEventListener("mouseleave", () => {
        // NEW - NICK - animation
        albumDesc.animate({
            width: ['200px', '0px']
                }, 100
            ).finished.then(()=>{albumDesc.style.display = "none"}
        );
        function textAnimate(textElement){
            textElement.animate({
                opacity: ['1', '0', '0'],
                offset: ['0', '0.1', '1']
            }, 100)
        }
        [albumName, albumArtist, albumYear].forEach(textAnimate);
    });

    // Add image and tooltip to div and append it to album body.
    albumBody.append(thumbDiv);
    thumbDiv.appendChild(albumImage);
    thumbDiv.appendChild(albumDesc);
    
    // Grab album name from album object.
    const bigAlbumName = document.createElement('h3');
        bigAlbumName.textContent = album.name;
    
    // Grab album artist from album object.    
    const bigAlbumArtist = document.createElement('h4');
    bigAlbumArtist.textContent = album.artist;

    // Grab album year from album object.
    const bigAlbumYear = document.createElement('h4');
    bigAlbumYear.textContent = album.year;

    function mainAppend() {
        singleAlbums.append(bigImage, bigAlbumName, bigAlbumArtist, bigAlbumYear);
    }
    
    // Create event listener for each album thumbnail.
    albumImage.addEventListener('click', ()=> {

        // Clear out whatever is currently in the album viewing area.
        singleAlbums.innerHTML = '';
        singleAlbumsContainer.style.display = "block"
        bigImage.src = album.image;
        mainAppend();

        let saveButton = makeButton(album);

        // NEW - NICK - make save button be a functional remove button if the album was already saved
        fetch('http://localhost:3000/saved/')
        .then(res=>res.json())
        .then(data=> data.some(checkIfSaved));

        function checkIfSaved(savedAlbum){
            if ((savedAlbum.name === albumName.textContent) && (savedAlbum.artist === albumArtist.textContent)) {
                saveButton.textContent = "Remove Album";
                saveButton.id = `album_${savedAlbum.id}`;
                return true;
            } else {
                saveButton.textContent = "Save Album";
                saveButton.id = "";
            }
        }

        // Insert div beneath big image and within the div adds the 'save' button.
        const div = document.createElement('div');
        singleAlbums.appendChild(div);
        div.appendChild(saveButton);
        
        // Add src to the song sample functionality
        spotifySampler.src = albumSample;

    });
};

// Initate 'fetch' request to POST album to 'Saved'.
function saveAlbum(album, saveButton) {                    
        fetch("http://localhost:3000/saved", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: album.name,
                artist: album.artist,
                image: album.image,
                year: album.year,
                sampleSrc: album.sampleSrc
            })
        })
            .then(response => response.json())
            .then(albumData => {
                renderSavedAlbum(albumData);
                saveButton.textContent = "Remove Album";
                saveButton.id = `album_${albumData.id}`;
            });
};

// Initiate 'fetch' request to DELETE album from 'Saved'.
function removeAlbum(albumId) {
    fetch("http://localhost:3000/saved/" + albumId, {
        method: 'DELETE'
    })
};
