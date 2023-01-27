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

Users can mouseover each album cover to see the album name, artist, and year it was released. 

Upon clicking on the album cover, a larger image will populate in the center of the screen, along with the album name, artist, and year it was released, as well as a Spotify widget to hear a song sample from that album. 

The Save Album button will add the album to the Saved Albums list on the left side. The Save Album button will be a Remove Album button if the album is already saved. 

All saved albums have a dropdown list of their own in which the user can give a rating of 1-5 stars. 

Albums in the Saved Albums list can be clicked to repopulate the album details in the center of the screen.

### For Developers

## Roadmap
Future additions include:
- pulling data from a larger API
- a more complete list of genres
- making the 5 albums a random selection from the given genre
- a login so users can return to their own account to update their list and discover more music

## Authors and Acknowledgement
This project was created by [Bianca Aspin](https://github.com/baspin94), [Ari Marz](https://github.com/arimarz), and [Nick Johnson](https://github.com/bricknet1) while attending the Flatiron School's Software Engineering Immersive Bootcamp.

The album sampler uses [Spotify's iFrame API](https://developer.spotify.com/documentation/embeds/guides/using-the-iframe-api/).