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
### For Developers

## Roadmap
Future additions include:
- pulling data from a larger API
- a more complete list of genres
- making the 5 albums a random selection from the given genre
- a login so users can return to their own account to update their list and discover more music

## Authors and Acknowledgement
This project was created by [Bianca Aspin](https://github.com/baspin94), [Ari Marz](https://github.com/arimarz), and [Nick Johnson](https://github.com/bricknet1) while attending the Flatiron School's Software Engineering Immersive Bootcamp.