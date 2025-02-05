const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type About {
      message: String!
    }

    type Meal {
        description: String!
    }

    type Pet {
        name: String!
        species: String!
    }
    
    type Playlist {
        song_name: String!
        band_name: String!
    }

    type Song {
        description: String!    
    }

    type PlaylistPair {
        first: Playlist!
        last: Playlist!
    }
    
    enum MealTime {
        breakfast
        lunch 
        dinner
    }
        
    enum SongRec {
        pop
        notpop
    }

    type Query {
    getAbout: About
    getmeal(time: MealTime!): Meal
    getPet(id: Int!): Pet 
    allPets: [Pet!]!
    getSong(id: Int!): Playlist
    allSongs: [Playlist!]!
    getSongRec(genre: SongRec!): Song
    firstAndLastFromPlaylist: PlaylistPair!
    
    }
`
)

const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
  ]

const playlist = [
{ song_name: 'Better Version', band_name: 'Sabrina Claudio' },
{ song_name: 'bye, bye', band_name: 'MIZUKI' },
{ song_name: 'bbydoll', band_name: 'Aziya' },
]

const root = {
    getAbout: () => {
      return { message: 'Hello World' }
    },
    getmeal: ({ time }) => {
      const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
      const meal = allMeals[time]
      return { description: meal }
    },
    getPet: ({ id }) => { 
        return petList[id]
      },
      allPets: () => { 
        return petList
      },
      getSong: ({ id }) => { 
        return playlist[id]
      },
      allSongs: () => { 
        return playlist
      },
      getSongRec: ({ genre }) => {
        const allSongRec = { pop: 'coffee shop by flowerovlove', notpop: 'aminals by baths' }
        const songRec = allSongRec[genre]
        return { description: songRec }
      },
      firstAndLastInPlaylist: () => {
        return {
          first: playlist[0],
          last: playlist[playlist.length - 1]
        }
    }
  }

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))

const port = 4000
app.listen(port, () => {
console.log(`Running on port: ${port}`)
})

