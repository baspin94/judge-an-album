// Define variables for existing HTML elements.
const mainbody = document.querySelector('#mainbody');
const albumBody = document.querySelector('#albumBody');
const sidebar = document.querySelector('#sidebar');
const genreSelect = document.querySelector('#genre-list');
const singleAlbums = document.querySelector('#singleAlbums');
// NEW - NICK - define variable for song sample functionality
const spotifySampler = document.querySelector('iframe');

const bigImage = document.createElement('img');
    bigImage.setAttribute('id','bigImage');

// NEW - Bianca - Fetch and render 'Saved' albums on page load.
fetch("http://localhost:3000/saved")
    .then(res => res.json())
    .then(data => data.forEach(album => renderSavedAlbum(album)));

// NEW - Bianca - Function to grab name and artist from album object and then add event listener to it.
function renderSavedAlbum(album) {
    let button = makeButton(album);
    savedAlbumButton(button, album);
    let nameArtist = nameArtistGrab(album);
    nameAndArtistEvent(nameArtist, album, button);
};

// NEW - Bianca - Function to create a button.
function makeButton(album){
    const saveButton = document.createElement('button')
        saveButtonEvent(album, saveButton);
    return saveButton;
};

// NEW - Bianca - Function to add event listener to save button.
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

function savedAlbumButton(saveButton, album) {
    saveButton.textContent = "Remove Album";
    saveButton.setAttribute('id', `album_${album.id}`);
};

function nameAndArtistEvent(nameAndArtist, album, saveButton) {
    nameAndArtist.addEventListener('click', ()=>{
        const div = document.createElement('div');
        singleAlbums.innerHTML = '';
        bigImage.src = album.image;
        //singleAlbums.append(bigImage);
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

// NEW - Bianca - Function to grab name and artist from album object.
function nameArtistGrab(album) {
    const nameAndArtist = document.createElement('p');
        nameAndArtist.setAttribute('id', `album_${album.id}`);
        nameAndArtist.textContent = `"${album.name}" by ${album.artist}`;
        sidebar.appendChild(nameAndArtist);
        return nameAndArtist;
}

// Fetch and render album thumbnails when new genre is selected from the dropdown.
genreSelect.addEventListener('change', (e) => {
    albumBody.innerHTML = ' ';
        const genre = e.target.value.toLowerCase();
        fetch('http://localhost:3000' + `/${genre}`)
        .then(res=>res.json())
        .then(data=> data.forEach(renderAlbums));
    });

// function to add eventlistener to drop down to populate the albums
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

    // NEW - Bianca - Removed this.
    // Grab album id from album object.
    //const albumId = album.id 

    // NEW - NICK - Grab song sample src from album object.
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
    
    // Set the big image 'src' to be the corresponding album's cover art and append to DOM.

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
        bigImage.src = album.image;
        mainAppend();

        // NEW - Bianca - Removed and replaced with 'Save Button'
        /* // Defining button to be appended later.
        const saveButton = document.createElement('button');
            saveButton.setAttribute("type","button");
            saveButton.setAttribute("name","button");
            if (album.post === true) {
                saveButton.textContent = "Remove Album"
            } else {
                saveButton.textContent = 'Save Album';
            }; */
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
        
        // NEW - NICK - add src to the song sample functionality
        spotifySampler.src = albumSample;

        //let nameArtist = nameArtistGrab(album);
        //nameAndArtistEvent(nameArtist, album, saveButton);
        /* // Create paragraph for name and artist to appear in 'Saved Albums'
        
        // Create paragraph for name and artist to appear in 'Saved Albums'
        const nameAndArtist = document.createElement('p');
        nameAndArtist.setAttribute('id',album.name.replaceAll(' ',''));
        nameAndArtist.textContent = `"${album.name}" by ${album.artist}` */

        // NEW - Bianca - Moved this into the nameArtistGrab function.
        /* // NEW - NICK - create event listener on the saved album which will repopulate the big image
        nameAndArtist.addEventListener('click', ()=>{
            singleAlbums.innerHTML = '';
            bigImage.src = album.image;
            mainAppend();
            singleAlbums.appendChild(div);
            div.appendChild(saveButton);
            spotifySampler.src = albumSample;
            saveButton.textContent = 'Remove Album';
        }) */

        // NEW - Bianca - Removed and Added to makeButton function.
        // Create event listener for 'save' button click.
        /* saveButton.addEventListener('click', ()=>{
            if (saveButton.textContent === "Save Album") {
                saveAlbum(album);
                saveButton.textContent = "Remove Album";
            } else if (saveButton.textContent === "Remove Album") {
                let albumId = saveButton.id.split('_')[1];
                console.log(banana);
                removeAlbum(albumId);
            } */
            
            /* // Convert genre name to lowercase to be inserted into URL during fetch.
            genreCurrent = genreSelect.value.toLowerCase();

            
            // Append the name and artist to 'Saved Albums', update button text, set album 'post' status to true, calls the saveAlbum function.
            if (saveButton.textContent === "Save Album") {
                sidebar.appendChild(nameAndArtist)
                saveButton.textContent = "Remove Album"
                album.post = true;

            // Remove the name and artist from 'Saved Albums, update button text, set album 'post' status to false, calls the saveAlbum function.
            } else if (saveButton.textContent === "Remove Album") {
                let elementToRemove = document.querySelector(`#${album.name.replaceAll(' ','')}`);
                elementToRemove.remove();
                saveButton.textContent = "Save Album";
                album.post = false
            } */
            //saveAlbum(album);

        //})
    });
};

// NEW - Bianca - Initate 'fetch' request to POST album to 'Saved'.
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
            //.then(albumData => renderSavedAlbum(albumData));
            .then(albumData => {
                renderSavedAlbum(albumData);
                saveButton.textContent = "Remove Album";
                saveButton.id = `album_${albumData.id}`;
            });
};

// NEW - Bianca - Initiate 'fetch' request to DELETE album from 'Saved'.
function removeAlbum(albumId) {
    //console.log("http://localhost:3000/saved/" + albumId);
    fetch("http://localhost:3000/saved/" + albumId, {
        method: 'DELETE'
    })
};
