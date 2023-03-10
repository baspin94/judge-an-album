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
fetch('http://localhost:3000/saved')
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
        setBtnToSave(saveButton);
    return saveButton;
};

// Add event listener to save button.
function saveButtonEvent(album, saveButton){
    saveButton.addEventListener('click', ()=>{
        if (saveButton.textContent === 'Save Album') {
            saveAlbum(album, saveButton);
        } else if (saveButton.textContent === 'Remove Album') {
            let albumId = saveButton.id.split('_')[1];
            removeAlbum(albumId);
            let elementToRemove = document.querySelector(`p#album_${albumId}`);
            elementToRemove.remove();
            setBtnToSave(saveButton);
        }
    })
    return saveButton;
}

// Set button text to 'Save Album' and remove ID.
function setBtnToSave(saveButton) {
    saveButton.textContent = 'Save Album';
    saveButton.id = '';
}

// Update button text to 'Remove Album' and add ID.
function setBtnToRemove(saveButton, album) {
    saveButton.textContent = 'Remove Album';
    saveButton.setAttribute('id', `album_${album.id}`);
};

// Grab name and artist from album object.
function nameArtistGrab(album) {
    const nameAndArtist = document.createElement('p');
        nameAndArtist.setAttribute('id', `album_${album.id}`);
        nameAndArtist.textContent = `"${album.name}" by ${album.artist} `;
        sidebar.appendChild(nameAndArtist);

    // Star rating system
    const starRating = document.createElement('select');
    function populateStarOptions (){
        for (let i=1; i<6; i++){
            let starRatingOption = document.createElement('option');
            starRatingOption.textContent = i+' Stars';
            starRating.appendChild(starRatingOption)
        }
    }
    populateStarOptions();
    nameAndArtist.appendChild(starRating)
    starRating.addEventListener('change', (e)=>{
        fetch('http://localhost:3000/saved/'+`${album.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rating: e.target.value})
        })
    })
    starRating.value = album.rating
    return nameAndArtist;
}

// Add event listener for Saved Albums.
function nameAndArtistEvent(nameAndArtist, album, saveButton) {
    nameAndArtist.addEventListener('click', ()=>{
        buildBigAlbum(album, saveButton);
    })
};

// Grab album name from an album object.
function getAlbumName(album){
    const albumName = document.createElement('h3');
    albumName.textContent = album.name;
    return albumName;
};

// Renders albums in the album viewing section of the page.
function buildBigAlbum(album, saveButton) {

    // Clear out previous album information from album viewing section.
    singleAlbums.innerHTML = '';
    singleAlbumsContainer.style.display = 'block';

    // Set big album image to the current album's image URL.
    bigImage.src = album.image;

    // Set the Spotify Sampler iframe to the current album's sample URL.
    spotifySampler.src = album.sampleSrc;

    let albumName = getAlbumName(album);

    // Grab album artist from album object.    
    const bigAlbumArtist = document.createElement('h4');
        bigAlbumArtist.textContent = album.artist;

    // Grab album year from album object.
    const bigAlbumYear = document.createElement('h4');
        bigAlbumYear.textContent = album.year;

    // Append album imformation to the album viewing area.
    singleAlbums.append(bigImage, albumName, bigAlbumArtist, bigAlbumYear);
    
    // Append save/remove button below the album information in the viewing area.
    const buttonDiv = document.createElement('div');
    singleAlbums.appendChild(buttonDiv);
    buttonDiv.appendChild(saveButton);

};

// Fetch and render album thumbnails when new genre is selected from the dropdown.
genreSelect.addEventListener('change', (e) => {
    albumBody.innerHTML = ' ';
        const genre = e.target.value.toLowerCase();
        fetch('http://localhost:3000' + `/${genre}`)
        .then(res=>res.json())
        .then(data=> data.forEach(renderAlbumThumbnails));
    });

// Add eventlistener to drop down to populate the albums
function renderAlbumThumbnails(album) {

    // Grab album image from album object.
    const albumImage = document.createElement('img');
        albumImage.src = album.image;

    // Grab album name from album object.
    let albumName = getAlbumName(album);

    // Put all info into one paragraph
    const albumMouse = document.createElement('p');
        albumMouse.textContent = `${album.artist} (${album.year})`

    // Create div for each album thumbnail
    const thumbDiv = document.createElement('div');
        thumbDiv.setAttribute('class', 'thumbnail');

    // Create tooltip for each album thumbnail.
    const albumDesc = document.createElement('div');
        albumDesc.setAttribute('class', 'tooltip');
        albumDesc.append(albumName, albumMouse);

    // Create event listener to show tooltip when mouse hovers over thumbnail.
    albumImage.addEventListener('mouseover', () => {
        albumDesc.style.display = 'block'

        // animation
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
        [albumName, albumMouse].forEach(textAnimate);
    });

    // Create event listener to hide tooltip when mouse leaves thumbnail.
    albumImage.addEventListener('mouseleave', () => {
        // animation
        albumDesc.animate({
            width: ['200px', '0px']
                }, 100
            ).finished.then(()=>{albumDesc.style.display = 'none'}
        );
        function textAnimate(textElement){
            textElement.animate({
                opacity: ['1', '0', '0'],
                offset: ['0', '0.1', '1']
            }, 100)
        }
        [albumName, albumMouse].forEach(textAnimate);
    });

    // Add image and tooltip to div and append it to album body.
    albumBody.append(thumbDiv);
    thumbDiv.appendChild(albumImage);
    thumbDiv.appendChild(albumDesc);
    
    // Create event listener for each album thumbnail.
    albumImage.addEventListener('click', ()=> {
        let saveButton = makeButton(album);
        buildBigAlbum(album, saveButton);

        // make save button be a functional remove button if the album was already saved
        fetch('http://localhost:3000/saved/')
        .then(res => res.json())
        .then(savedAlbumData => savedAlbumData.some(savedAlbum => checkIfSaved(savedAlbum, album, saveButton)));
    });
};

// Initate 'fetch' request to POST album to 'Saved'.
function saveAlbum(album, saveButton) {                    
        fetch('http://localhost:3000/saved', {
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
                setBtnToRemove(saveButton, album);
            });
};

// Initiate 'fetch' request to DELETE album from 'Saved'.
function removeAlbum(albumId) {
    fetch('http://localhost:3000/saved/' + albumId, {
        method: 'DELETE'
    })
};

// Check if an album is already in 'Saved Albums' before rendering.
function checkIfSaved(savedAlbum, album, saveButton){
    if ((savedAlbum.name === album.name) && (savedAlbum.artist === album.artist)) {
        setBtnToRemove(saveButton, album);
        return true;
    } else {
        setBtnToSave(saveButton);
    }
};