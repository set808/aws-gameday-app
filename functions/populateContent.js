import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

const content = [
  {
    id: "MOVIE001",
    genre: "Fantasy",
    contentType: "MOVIE",
    backdropPath: "M001-backdrop.png",
    title: "The Unicorn King",
    overview:
      "A young unicorn prince must overcome tragedy and self-doubt to reclaim his rightful place as ruler of the magical Shimmer Plains.",
    releaseDate: "2024-07-15",
    popularity: 84.5,
    posterPath: "M001.png",
    voteAverage: 7.9,
    voteCount: 15263,
  },
  {
    id: "MOVIE002",
    genre: "Action",
    contentType: "MOVIE",
    backdropPath: "M002-backdrop.png",
    title: "Unicorn Park",
    overview:
      "Scientists create a theme park filled with magically cloned unicorns, but chaos ensues when the mythical creatures break free.",
    releaseDate: "2023-06-22",
    popularity: 75.2,
    posterPath: "M002.png",
    voteAverage: 7.2,
    voteCount: 12879,
  },
  {
    id: "MOVIE003",
    genre: "Comedy",
    contentType: "MOVIE",
    backdropPath: "M003-backdrop.png",
    title: "Unicorn Wars: The Last Gallop",
    overview:
      "In a galaxy far, far away, a young unicorn discovers her magical powers and joins a rebellion against the evil Pegasus Empire.",
    releaseDate: "2024-12-18",
    popularity: 92.7,
    posterPath: "M003.png",
    voteAverage: 8.5,
    voteCount: 20145,
  },
  {
    id: "MOVIE004",
    genre: "Romance",
    contentType: "MOVIE",
    backdropPath: "M004-backdrop.png",
    title: "Unicornman",
    overview:
      "By day, he's a mild-mannered office worker. By night, he transforms into Unicornman, using his magical horn to fight crime in Sparkle City.",
    releaseDate: "2023-11-03",
    popularity: 68.9,
    posterPath: "M004.png",
    voteAverage: 6.8,
    voteCount: 9876,
  },
  {
    id: "MOVIE005",
    genre: "Sci-Fi",
    contentType: "MOVIE",
    backdropPath: "M005-backdrop.png",
    title: "Unicorn Titanic",
    overview:
      "A tale of forbidden love between two unicorns from different magical realms aboard an enchanted ship on its maiden voyage.",
    releaseDate: "2024-02-14",
    popularity: 79.3,
    posterPath: "M005.png",
    voteAverage: 7.6,
    voteCount: 14532,
  },
  {
    id: "MOVIE006",
    genre: "Adventure",
    contentType: "MOVIE",
    backdropPath: "M006-backdrop.png",
    title: "The Unicorn Princess Diaries",
    overview:
      "A clumsy teenage girl discovers she's the heir to a magical unicorn kingdom and must learn to balance high school with royal duties.",
    releaseDate: "2023-08-11",
    popularity: 71.8,
    posterPath: "M006.png",
    voteAverage: 6.9,
    voteCount: 11234,
  },
  {
    id: "MOVIE007",
    genre: "Drama",
    contentType: "MOVIE",
    backdropPath: "M007-backdrop.png",
    title: "Unicorns of the Caribbean",
    overview:
      "A bumbling pirate teams up with a legendary sea unicorn to find a magical treasure and save the mystical waters of the Caribbean.",
    releaseDate: "2024-05-30",
    popularity: 83.1,
    posterPath: "M007.png",
    voteAverage: 7.7,
    voteCount: 16789,
  },
  {
    id: "MOVIE008",
    genre: "Thriller",
    contentType: "MOVIE",
    backdropPath: "M008-backdrop.png",
    title: "Harry Hoof and the Philosopher's Horn",
    overview:
      "A young unicorn discovers he's a wizard and attends Hogtrots School of Witchcraft and Wizardry, uncovering magical secrets and facing dark forces.",
    releaseDate: "2023-09-01",
    popularity: 88.6,
    posterPath: "M008.png",
    voteAverage: 8.2,
    voteCount: 18901,
  },
  {
    id: "MOVIE009",
    genre: "Family",
    contentType: "MOVIE",
    backdropPath: "M009-backdrop.png",
    title: "The Sparkle Games",
    overview:
      "In a dystopian future, young unicorns are chosen to compete in a magical tournament where only one can emerge as the champion of Glitter District.",
    releaseDate: "2024-03-22",
    popularity: 80.4,
    posterPath: "M009.png",
    voteAverage: 7.4,
    voteCount: 13567,
  },
  {
    id: "MOVIE010",
    genre: "Musical",
    contentType: "MOVIE",
    backdropPath: "M010-backdrop.png",
    title: "Unicornception",
    overview:
      "A skilled dream-entering unicorn must plant an idea in someone's subconscious by navigating through multiple layers of dreams within dreams.",
    releaseDate: "2023-10-08",
    popularity: 86.2,
    posterPath: "M010.png",
    voteAverage: 8.1,
    voteCount: 17654,
  },
  {
    id: "MOVIE011",
    genre: "Horror",
    contentType: "MOVIE",
    backdropPath: "M011-backdrop.png",
    title: "Unicornificient",
    overview:
      "A kind-hearted unicorn uses her magical powers to help the creatures of the Enchanted Forest, but faces a challenge when an evil sorcerer threatens their home.",
    releaseDate: "2024-08-09",
    popularity: 72.3,
    posterPath: "M011.png",
    voteAverage: 7.1,
    voteCount: 10567,
  },
  {
    id: "MOVIE012",
    genre: "Mystery",
    contentType: "MOVIE",
    backdropPath: "M012-backdrop.png",
    title: "The Unicorn Network",
    overview:
      "A college dropout creates a magical social network for unicorns, revolutionizing communication in the mythical world but facing unexpected consequences.",
    releaseDate: "2023-11-24",
    popularity: 81.7,
    posterPath: "M012.png",
    voteAverage: 7.8,
    voteCount: 14321,
  },
  {
    id: "MOVIE013",
    genre: "Animation",
    contentType: "MOVIE",
    backdropPath: "M013-backdrop.png",
    title: "Unicorn Driver",
    overview:
      "A mysterious unicorn stallion drives through the neon-lit streets of New York, getting involved in the magical underworld while seeking redemption.",
    releaseDate: "2024-10-04",
    popularity: 76.9,
    posterPath: "M013.png",
    voteAverage: 7.5,
    voteCount: 12098,
  },
  {
    id: "MOVIE014",
    genre: "Crime",
    contentType: "MOVIE",
    backdropPath: "M014-backdrop.png",
    title: "The Shawshank Rainbow",
    overview:
      "Two imprisoned unicorns form a deep friendship while finding solace and eventual redemption through acts of common decency in a magical correctional facility.",
    releaseDate: "2023-09-22",
    popularity: 89.2,
    posterPath: "M014.png",
    voteAverage: 8.7,
    voteCount: 19876,
  },
  {
    id: "MOVIE015",
    genre: "Superhero",
    contentType: "MOVIE",
    backdropPath: "M015-backdrop.png",
    title: "The Unicorn Bride",
    overview:
      "A tale of true love and high adventure in a magical kingdom, as a beautiful unicorn and her true love face trials and evil forces that threaten to tear them apart.",
    releaseDate: "2024-02-14",
    popularity: 78.5,
    posterPath: "M015.png",
    voteAverage: 7.6,
    voteCount: 13542,
  },
  {
    id: "MOVIE016",
    genre: "Fantasy",
    contentType: "MOVIE",
    backdropPath: "M016-backdrop.png",
    title: "Iron Unicorn",
    overview:
      "A brilliant but arrogant unicorn inventor creates a powerful magical suit to save the world, learning about responsibility and heroism along the way.",
    releaseDate: "2024-05-03",
    popularity: 91.8,
    posterPath: "M016.png",
    voteAverage: 8.3,
    voteCount: 21345,
  },
  {
    id: "MOVIE017",
    genre: "Action",
    contentType: "MOVIE",
    backdropPath: "M017-backdrop.png",
    title: "Eternal Sunshine of the Sparkly Mind",
    overview:
      "A unicorn couple undergoes a magical procedure to erase each other from their memories, only to find their bond may be stronger than any spell.",
    releaseDate: "2023-12-15",
    popularity: 82.4,
    posterPath: "M017.png",
    voteAverage: 8.1,
    voteCount: 15678,
  },
  {
    id: "MOVIE018",
    genre: "Comedy",
    contentType: "MOVIE",
    backdropPath: "M018-backdrop.png",
    title: "The Unicorn Knight",
    overview:
      "In a world where darkness threatens to overtake the land, a young unicorn rises to become the legendary Unicorn Knight, protector of the realm.",
    releaseDate: "2024-07-19",
    popularity: 85.7,
    posterPath: "M018.png",
    voteAverage: 7.9,
    voteCount: 16234,
  },
  {
    id: "MOVIE019",
    genre: "Romance",
    contentType: "MOVIE",
    backdropPath: "M019-backdrop.png",
    title: "Unicorns, Inc.",
    overview:
      "In a world where unicorns collect children's laughter to power their magical realm, two mismatched friends uncover a sinister plot threatening both worlds.",
    releaseDate: "2023-11-02",
    popularity: 87.3,
    posterPath: "M019.png",
    voteAverage: 8.2,
    voteCount: 18765,
  },
  {
    id: "MOVIE020",
    genre: "Sci-Fi",
    contentType: "MOVIE",
    backdropPath: "M020-backdrop.png",
    title: "The Glitter Father",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son, a powerful unicorn torn between family loyalty and his own path.",
    releaseDate: "2024-03-15",
    popularity: 88.9,
    posterPath: "M020.png",
    voteAverage: 8.8,
    voteCount: 20987,
  },
  {
    id: "MOVIE021",
    genre: "Adventure",
    contentType: "MOVIE",
    backdropPath: "M021-backdrop.png",
    title: "Pulp Unicorn",
    overview:
      "The lives of two unicorn mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption in the magical underworld.",
    releaseDate: "2024-09-23",
    popularity: 86.5,
    posterPath: "M021.png",
    voteAverage: 8.4,
    voteCount: 19543,
  },
  {
    id: "MOVIE022",
    genre: "Drama",
    contentType: "MOVIE",
    backdropPath: "M022-backdrop.png",
    title: "The Horn Legacy",
    overview:
      "A former government agent unicorn is thrust back into the world of espionage and magical intrigue when a conspiracy threatens to destroy everything he holds dear.",
    releaseDate: "2023-08-11",
    popularity: 79.8,
    posterPath: "M022.png",
    voteAverage: 7.3,
    voteCount: 14256,
  },
  {
    id: "MOVIE023",
    genre: "Thriller",
    contentType: "MOVIE",
    backdropPath: "M023-backdrop.png",
    title: "Catch Me If Unicorn",
    overview:
      "A young unicorn forger leads the Magical FBI on a merry chase as he magically creates millions in counterfeit rainbows, assuming different identities along the way.",
    releaseDate: "2024-11-27",
    popularity: 82.1,
    posterPath: "M023.png",
    voteAverage: 7.8,
    voteCount: 16789,
  },
  {
    id: "MOVIE024",
    genre: "Family",
    contentType: "MOVIE",
    backdropPath: "M024-backdrop.png",
    title: "The Unicorn Speech",
    overview:
      "When a unicorn with a debilitating stutter suddenly becomes king, he turns to an unconventional speech therapist to help him lead his magical kingdom.",
    releaseDate: "2023-12-25",
    popularity: 75.6,
    posterPath: "M024.png",
    voteAverage: 7.9,
    voteCount: 13987,
  },
  {
    id: "MOVIE025",
    genre: "Musical",
    contentType: "MOVIE",
    backdropPath: "M025-backdrop.png",
    title: "A Clockwork Unicorn",
    overview:
      "In a dystopian magical future, a charismatic delinquent unicorn volunteers for an experimental rehabilitation program that may not be what it seems.",
    releaseDate: "2024-04-02",
    popularity: 78.3,
    posterPath: "M025.png",
    voteAverage: 8.1,
    voteCount: 15432,
  },
  {
    id: "TVSHOW001",
    genre: "Comedy",
    contentType: "TVSHOW",
    backdropPath: "T001-backdrop.png",
    title: "New Unicorn",
    overview:
      "A magical unicorn moves into a loft with three other mystical creatures, navigating life, friendship, and enchanted adventures in the big city.",
    releaseDate: "2011-09-20",
    popularity: 47.235,
    posterPath: "T001.png",
    voteAverage: 7.9,
    voteCount: 2345,
  },
  {
    id: "TVSHOW002",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T002-backdrop.png",
    title: "Unicorn Thrones",
    overview:
      "In a realm of magic and intrigue, noble unicorn houses compete for control of the Enchanted Kingdom, facing mythical threats and political machinations.",
    releaseDate: "2011-04-17",
    popularity: 369.594,
    posterPath: "T002.png",
    voteAverage: 8.4,
    voteCount: 18934,
  },
  {
    id: "TVSHOW003",
    genre: "Sci-Fi",
    contentType: "TVSHOW",
    backdropPath: "T003-backdrop.png",
    title: "Unicorn Things",
    overview:
      "When a young unicorn disappears, her friends uncover a secret government experiment involving parallel dimensions and mythical creatures.",
    releaseDate: "2016-07-15",
    popularity: 158.073,
    posterPath: "T003.png",
    voteAverage: 8.6,
    voteCount: 14567,
  },
  {
    id: "TVSHOW004",
    genre: "Crime",
    contentType: "TVSHOW",
    backdropPath: "T004-backdrop.png",
    title: "Breaking Horn",
    overview:
      "A unicorn chemistry teacher turns to a life of crime, using his magic to create the purest enchanted dust in the realm.",
    releaseDate: "2008-01-20",
    popularity: 261.298,
    posterPath: "T004.png",
    voteAverage: 8.7,
    voteCount: 23456,
  },
  {
    id: "TVSHOW005",
    genre: "Fantasy",
    contentType: "TVSHOW",
    backdropPath: "T005-backdrop.png",
    title: "Unicorn Mirror",
    overview:
      "An anthology series exploring the dark side of magic and technology in various unicorn societies across different timelines.",
    releaseDate: "2011-12-04",
    popularity: 72.541,
    posterPath: "T005.png",
    voteAverage: 8.3,
    voteCount: 5678,
  },
  {
    id: "TVSHOW006",
    genre: "Comedy",
    contentType: "TVSHOW",
    backdropPath: "T006-backdrop.png",
    title: "Unicorn Park",
    overview:
      "Four young unicorns navigate the trials of elementary school in a small mountain town, encountering absurd magical adventures along the way.",
    releaseDate: "1997-08-13",
    popularity: 83.179,
    posterPath: "T006.png",
    voteAverage: 8.7,
    voteCount: 8901,
  },
  {
    id: "TVSHOW007",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T007-backdrop.png",
    title: "Better Call Mare",
    overview:
      "A prequel to 'Breaking Horn,' following the transformation of a struggling unicorn lawyer into a crafty defender of the magical underworld.",
    releaseDate: "2015-02-08",
    popularity: 112.456,
    posterPath: "T007.png",
    voteAverage: 8.5,
    voteCount: 7890,
  },
  {
    id: "TVSHOW008",
    genre: "Action",
    contentType: "TVSHOW",
    backdropPath: "T008-backdrop.png",
    title: "The Walking Unicorns",
    overview:
      "In a post-apocalyptic world, a group of unicorns struggles to survive against hordes of magical zombies and other mystical threats.",
    releaseDate: "2010-10-31",
    popularity: 98.765,
    posterPath: "T008.png",
    voteAverage: 8.1,
    voteCount: 12345,
  },
  {
    id: "TVSHOW009",
    genre: "Mystery",
    contentType: "TVSHOW",
    backdropPath: "T009-backdrop.png",
    title: "Unicorn Detective",
    overview:
      "A brilliant but eccentric unicorn detective solves magical crimes in modern-day London with the help of his loyal companion.",
    releaseDate: "2010-07-25",
    popularity: 56.789,
    posterPath: "T009.png",
    voteAverage: 8.9,
    voteCount: 9012,
  },
  {
    id: "TVSHOW010",
    genre: "Romance",
    contentType: "TVSHOW",
    backdropPath: "T010-backdrop.png",
    title: "Bridgerton Unicorns",
    overview:
      "In Regency-era England, unicorn families navigate love, marriage, and social expectations in a world of glittering ballrooms and magical intrigue.",
    releaseDate: "2020-12-25",
    popularity: 87.654,
    posterPath: "T010.png",
    voteAverage: 7.8,
    voteCount: 6789,
  },
  {
    id: "TVSHOW011",
    genre: "Sitcom",
    contentType: "TVSHOW",
    backdropPath: "T011-backdrop.png",
    title: "The Unicorn Theory",
    overview:
      "Four brilliant but socially awkward unicorn scientists navigate life, love, and magical physics with the help of their beautiful neighbor.",
    releaseDate: "2007-09-24",
    popularity: 84.321,
    posterPath: "T011.png",
    voteAverage: 8.1,
    voteCount: 11234,
  },
  {
    id: "TVSHOW012",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T012-backdrop.png",
    title: "Grey's Unicorn",
    overview:
      "Follow the personal and professional lives of unicorn interns as they become skilled healers in the competitive world of magical medicine.",
    releaseDate: "2005-03-27",
    popularity: 95.678,
    posterPath: "T012.png",
    voteAverage: 7.6,
    voteCount: 10987,
  },
  {
    id: "TVSHOW013",
    genre: "Crime",
    contentType: "TVSHOW",
    backdropPath: "T013-backdrop.png",
    title: "Unicorn Ink",
    overview:
      "A talented unicorn tattoo artist moonlights as a vigilante, using her magical ink to fight crime and corruption in a neon-lit city.",
    releaseDate: "2017-11-20",
    popularity: 62.345,
    posterPath: "T013.png",
    voteAverage: 7.9,
    voteCount: 5432,
  },
  {
    id: "TVSHOW014",
    genre: "Fantasy",
    contentType: "TVSHOW",
    backdropPath: "T014-backdrop.png",
    title: "WandaUnicorn",
    overview:
      "A powerful unicorn witch creates an idyllic suburban reality to cope with her grief, but her magical world threatens to unravel.",
    releaseDate: "2021-01-15",
    popularity: 128.765,
    posterPath: "T014.png",
    voteAverage: 8,
    voteCount: 8765,
  },
  {
    id: "TVSHOW015",
    genre: "Horror",
    contentType: "TVSHOW",
    backdropPath: "T015-backdrop.png",
    title: "American Unicorn Story",
    overview:
      "An anthology series exploring different magical horrors each season, from haunted stables to witch covens and supernatural circuses.",
    releaseDate: "2011-10-05",
    popularity: 89.012,
    posterPath: "T015.png",
    voteAverage: 8,
    voteCount: 9876,
  },
  {
    id: "TVSHOW016",
    genre: "Sci-Fi",
    contentType: "TVSHOW",
    backdropPath: "T016-backdrop.png",
    title: "Unicorn Mirrored",
    overview:
      "In a dystopian future, unicorns grapple with the unintended consequences of their advanced magic technology on society.",
    releaseDate: "2011-12-04",
    popularity: 75.432,
    posterPath: "T016.png",
    voteAverage: 8.4,
    voteCount: 7654,
  },
  {
    id: "TVSHOW017",
    genre: "Adventure",
    contentType: "TVSHOW",
    backdropPath: "T017-backdrop.png",
    title: "Unicorn Time",
    overview:
      "A young unicorn and his magical dog travel through time and space, having whimsical adventures and learning important life lessons.",
    releaseDate: "2010-04-05",
    popularity: 67.89,
    posterPath: "T017.png",
    voteAverage: 8.6,
    voteCount: 6543,
  },
  {
    id: "TVSHOW018",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T018-backdrop.png",
    title: "The Crown Unicorn",
    overview:
      "A lavish historical drama chronicling the life of Queen Elizabeth II as a unicorn monarch, facing both personal and political challenges.",
    releaseDate: "2016-11-04",
    popularity: 87.654,
    posterPath: "T018.png",
    voteAverage: 8.7,
    voteCount: 8765,
  },
  {
    id: "TVSHOW019",
    genre: "Comedy",
    contentType: "TVSHOW",
    backdropPath: "T019-backdrop.png",
    title: "Brooklyn Unicorn-Nine",
    overview:
      "Follow the magical misadventures of a talented but immature unicorn detective and his diverse colleagues in a fictional New York City precinct.",
    releaseDate: "2013-09-17",
    popularity: 54.321,
    posterPath: "T019.png",
    voteAverage: 8.4,
    voteCount: 7654,
  },
  {
    id: "TVSHOW020",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T020-backdrop.png",
    title: "Unicorn Tales",
    overview:
      "Based on Margaret Atwood's novel, this dystopian series follows a unicorn forced into servitude in a totalitarian society obsessed with magic and fertility.",
    releaseDate: "2017-04-26",
    popularity: 76.543,
    posterPath: "T020.png",
    voteAverage: 8.5,
    voteCount: 8901,
  },
  {
    id: "TVSHOW021",
    genre: "Mystery",
    contentType: "TVSHOW",
    backdropPath: "T021-backdrop.png",
    title: "Unicorn Hunter",
    overview:
      "A brilliant criminal profiler with a dark past helps the Magical Bureau of Investigation hunt down the most elusive and dangerous mythical creatures.",
    releaseDate: "2005-09-22",
    popularity: 73.21,
    posterPath: "T021.png",
    voteAverage: 8.2,
    voteCount: 9876,
  },
  {
    id: "TVSHOW022",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T022-backdrop.png",
    title: "Mad Unicorns",
    overview:
      "Set in a 1960s advertising agency, this drama follows the professional and personal lives of magical unicorns in the high-pressure world of Madison Avenue.",
    releaseDate: "2007-07-19",
    popularity: 68.543,
    posterPath: "T022.png",
    voteAverage: 8.6,
    voteCount: 8765,
  },
  {
    id: "TVSHOW023",
    genre: "Sci-Fi",
    contentType: "TVSHOW",
    backdropPath: "T023-backdrop.png",
    title: "Unicorn World",
    overview:
      "In a futuristic theme park, guests live out their wildest unicorn-related fantasies, but the magical creatures start to develop self-awareness and rebel.",
    releaseDate: "2016-10-02",
    popularity: 91.876,
    posterPath: "T023.png",
    voteAverage: 8.7,
    voteCount: 10987,
  },
  {
    id: "TVSHOW024",
    genre: "Comedy",
    contentType: "TVSHOW",
    backdropPath: "T024-backdrop.png",
    title: "Unicornics",
    overview:
      "Three unicorn roommates navigate their way through the absurd world of magical tech startups in Silicon Valley.",
    releaseDate: "2014-04-06",
    popularity: 62.345,
    posterPath: "T024.png",
    voteAverage: 8.5,
    voteCount: 7654,
  },
  {
    id: "TVSHOW025",
    genre: "Drama",
    contentType: "TVSHOW",
    backdropPath: "T025-backdrop.png",
    title: "The Unicorn Gambit",
    overview:
      "A young unicorn prodigy navigates the intense world of competitive magical chess while struggling with addiction and personal demons.",
    releaseDate: "2020-10-23",
    popularity: 85.432,
    posterPath: "T025.png",
    voteAverage: 8.8,
    voteCount: 9012,
  },
];

const testFunction = (first) => {
  second;
};

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  const tableName = process.env.DYNAMODB_TABLE_NAME;

  if (!tableName) {
    console.error("DYNAMODB_TABLE_NAME environment variable is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server configuration error",
      }),
    };
  }

  try {
    const batchSize = 25;
    let totalItemsWritten = 0;

    for (let i = 0; i < content.length; i += batchSize) {
      const batch = content.slice(i, i + batchSize);
      const params = {
        RequestItems: {
          [tableName]: batch.map((item) => ({
            PutRequest: { Item: item },
          })),
        },
      };

      const command = new BatchWriteCommand(params);
      const result = await docClient.send(command);

      if (result.UnprocessedItems && result.UnprocessedItems[tableName]) {
        const unprocessedCount = result.UnprocessedItems[tableName].length;
        console.warn(
          `${unprocessedCount} items were not processed in this batch`
        );
        totalItemsWritten += batch.length - unprocessedCount;
      } else {
        totalItemsWritten += batch.length;
      }

      console.log(
        `Processed batch ${
          i / batchSize + 1
        }, Total items written: ${totalItemsWritten}`
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully populated table with ${totalItemsWritten} items`,
        totalItemsWritten: totalItemsWritten,
      }),
    };
  } catch (error) {
    console.error(`Error populating table: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error populating table",
        error: error.toString(),
      }),
    };
  }
};
