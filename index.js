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

    // Grab album id from album object.
    const albumId = album.id 

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
    bigImage.src = album.image;
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

        // Defining button to be appended later.
        const saveButton = document.createElement('button');
            saveButton.setAttribute("type","button");
            saveButton.setAttribute("name","button");
            if (album.post === true) {
                saveButton.textContent = "Remove Album"
            } else {
                saveButton.textContent = 'Save Album';
            };


        // Insert div beneath big image and within the div adds the 'save' button.
        const div = document.createElement('div');
        singleAlbums.appendChild(div);
        div.appendChild(saveButton);

        // NEW - NICK - add src to the song sample functionality
        spotifySampler.src = albumSample;

        // Create paragraph for name and artist to appear in 'Saved Albums'
        const nameAndArtist = document.createElement('p');
        nameAndArtist.setAttribute('id',album.name.replaceAll(' ',''));
        nameAndArtist.textContent = `"${album.name}" by ${album.artist}`

        // NEW - NICK - create event listener on the saved album which will repopulate the big image
        nameAndArtist.addEventListener('click', (e)=>{
            singleAlbums.innerHTML = '';
            bigImage.src = album.image;
            mainAppend();
            singleAlbums.appendChild(div);
            div.appendChild(saveButton);
            spotifySampler.src = albumSample;
            saveButton.textContent = 'Remove Album';
        })

        // Create event listener for 'save' button click.
        saveButton.addEventListener('click', ()=>{
            
            // Convert genre name to lowercase to be inserted into URL during fetch.
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
            }
            saveAlbum(genreCurrent, albumId, album);
        })
    });
};

// Initate 'fetch' request to PATCH updated album 'post' status.
function saveAlbum(genreCurrent, albumId, album) {                    
        fetch('http://localhost:3000' + `/${genreCurrent}/${albumId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'post': album.post})
        })
        
};

