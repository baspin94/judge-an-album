# Judge an Album By Its Cover
## Description
'Judge an Album by Its Cover' is a single-page application for music discovery. The goal of the application is to introduce users to genres of music they're not familiar with by providing them with a curated list of albums that they can check out. The user can:
- view a full-sized image of the album cover
- listen to a sample track from the album
- save albums they find interesting (and remove them later if they find out an album is not to their taste)
- give each album a star-rating once they've listened to it

## Installation

Prior to launching the application, you will need to install JSON Server. Instructions for how to install JSON Server on your machine can be found in the [JSON Server Documentation](https://www.npmjs.com/package/json-server).

Once JSON Server is installed, you will need to run the following code from the terminal while in the project directory:

```
$ json-server --watch db.json
```
Then, open the application by running the following code from the terminal:
```
$ open index.html
```

## Usage
### User Experience

Users start by selecting a genre from the dropdown list. Five albums will appear on the right side of the screen.

![User selecting genre from dropdown menu](https://github.com/baspin94/judge-an-album/blob/main/assets/01_Select%20Genre.gif)

Users can mouseover each album cover to see the album name, artist, and year it was released.

![User hovering over album thumbnails to reveal additional details](https://github.com/baspin94/judge-an-album/blob/main/assets/02_Album%20Thumbnails.gif)

Upon clicking on the album cover, a larger image will populate in the center of the screen, along with the album name, artist, and year it was released, as well as a Spotify widget to hear a song sample from that album.

![User clicking on album thumbnails to display larger images of each album and a Spotify widget to play an audio sample](https://github.com/baspin94/judge-an-album/blob/main/assets/03_Display%20Album.gif)

The Save Album button will add the album to the Saved Albums list on the left side. All saved albums have a dropdown list of their own in which the user can give a rating of 1-5 stars. 

![User clicking 'Save Album' button to add album to 'Saved Albums' panel and then clicking the dropdown menu next to the new saved album to add a rating](https://github.com/baspin94/judge-an-album/blob/main/assets/04_Save%20and%20Rate%20Album.gif)

Albums in the Saved Albums list can be clicked to repopulate the album details in the center of the screen.

![User clicking on album in 'Saved Albums' Panel to display it in the center of the screen](https://github.com/baspin94/judge-an-album/blob/main/assets/05_Repopulate%20Album.gif)

The Save Album button will be a Remove Album button if the album is already saved.

![User clicking the 'Remove Album' button to remove album from 'Saved Albums' panel](https://github.com/baspin94/judge-an-album/blob/main/assets/06_Remove%20Saved%20Album.gif)

### For Developers
For more information on how the various features work "under the hood", there are comments attached to each function in the index.js file explaining the functionality its responsible for.

## Roadmap
Future additions include:
- pulling data from a larger API
- a more complete list of genres
- having star icons in the star-rating dropdown menu
- making the 5 albums a random selection from the given genre
- a login so users can return to their own account to update their list and discover more music

## Authors and Acknowledgement
This project was created by [Bianca Aspin](https://github.com/baspin94), [Ari Marz](https://github.com/arimarz), and [Nick Johnson](https://github.com/bricknet1) while attending the Flatiron School's Software Engineering Immersive Bootcamp.

The album sampler uses [Spotify's iFrame API](https://developer.spotify.com/documentation/embeds/guides/using-the-iframe-api/).
