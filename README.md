# Clipz - You think you know music?

I made this simple game out of curiosity for the Angular framework. If you enjoy it, that's just the cherry on top! 😃

## The Code

Interested in the codebase I see.
Well, there's nothing fancy to see here but there are a few interesting things to highlight and some things to point out.

### Things to point out

First, lets get this out of the way.
No, I did not leak my Firebase api keys. I mean, yes you can see them in the codebase but their [documentation](https://firebase.google.com/docs/projects/api-keys#faq-required-apis-for-restricted-firebase-api-key) states that it's only for _identification_ and not _authorization_.
Having said that, please don't spam it. I haven't implemented a rate limiter and the security rules.

I realized there's a lot of room for improvement for this project like:

- Fetching the songs individually for each level. Right now is a very small number of songs so fetching them all at once is not a slow operation.
- If you know your dev tools, you can see the details of the current level's song. This check would ideally be done on the backend. But I trust you won't cheat!
- The songs could be separated according to difficulty instead of having them all for all difficulties and maybe I could add hints for them. Maybe I will 🤔.

### Interesting things (at least I think they are)

#### Strings comparison

When I was coding the guessing method for the game I realized I should let the player make some small typos and still get the answer correct.
So doing a little research I came across the [Damerau-Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) to calculate the distance between to sequences.
This was far better than the initial implementation I had which checked each character against the character in the same position for the second string and then calculated a percentage depending on the lengths of the strings and how many characters were different. Not such a bad approach, but not as good as the DLD algorithm. Do not re-invent the wheel right?

#### Shuffling an array

In the same spirit, I used the [Fisher-Yates shuffle algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) to shuffle the array of songs.
Sorting algorithms can take you into an endless rabbit hole. An interesting hole, but a hole nonetheless.
