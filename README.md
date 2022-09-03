# Piano App

Piano App is a virtual piano site that you can use to play songs with many different instruments. It's possible to play the piano keys with your mouse/keyboard or let the piano play by itself by loading _'.piano'_ files or example song samples that already come with the site.

(Insert Video Here)

## Table of Contents

- [More About '.piano' files](#more-about-piano-files)
- [How to Run](#how-to-run)
  - [Setting the Song Start Point](#setting-the-song-start-point)
  - [Setting the Song Speed](#setting-the-song-speed)
  - [Playing a Note](#playing-a-note)
  - [Playing Notes Simultaneously](#playing-notes-simultaneously)
  - [Setting the Duration of a Note](#setting-the-duration-of-a-note)
  - [Setting a Default Note Duration](#setting-a-default-note-duration)
  - [Pauses](#pauses)

## More About '.piano' files

_.piano_ files are a type of file which I created in an attempt to represent a song in a human-readable way, using plain text. Inside _.piano_ files, you can specify information such as the notes that make up the song, their durations, how fast they should be played, or even pauses in the song.

### Setting the Song Start Point

The beginning of a song is set through the `START` keyword. This keyword must be present every _.piano_ file.

```
START
Your notes go here...
```

When creating new songs, you can make use of the `START` command to make the song start at an specific point you're testing, so you don't have to hear the song from the start over and over again.

### Setting the Song Speed

The song speed is a measure of tempo, like BPM, the difference is that 200 BPM, for example, is not equal to 200 "speed". In _.piano_ files, a speed of **100** can be considered very slow and a speed of **1000** can be considered very fast.

The song speed can be set using the `(>>)` command. In the example below, we are setting the song speed to 250.

```
START
(>> 250)
```

It's also possible to remove the song speed by setting it to a negative value. In these cases, the delay between notes will have to be controlled using manual pauses, which will be addressed later.

### Playing a Note

To play a note, declare the note name inside parenthesis. The range of notes goes from _C0_ to _C8_, but be aware that some instruments do not have sound for very high or very low notes.

In the example below, we are playing a B5:

```
START
(B5)
```

### Playing Notes Simultaneously

To play more than 1 note at a time, declare the notes in the same line. In the example below, we are playing a _C_ chord:

```
START
(C4) (E4) (G4)
```

It's a good idea to use indentation in your favor when separating the bass notes from the melody ones. I personally like to organize my _.piano_ files by putting the bass notes in the left and the melody notes in the right:

```
START
(C2)          (C5)

(C2)          (E5)
(C2)          (E5)
```

### Setting the Duration of a Note

You can control the duration/sustain of notes through an optional parameter when declaring a note. In the example below, we are playing an _A5_ and holding it for some time.

```
START
(A3 500)
```

### Setting a Default Note Duration

If all or many of your notes have the same duration, you can set a default duration time using the `(#)` command. In the example below, we are setting the default note duration to 200.

```
START
(# 200)
```

### Pauses

Manual pauses in the song can be made using the `(@)` command. In the example below, we are playing an _E3_, then waiting **1000** milliseconds, then playing an _A3_.

```
START
(E3)
(@ 1000)
(A3)
```

## How to Run

TBD...
