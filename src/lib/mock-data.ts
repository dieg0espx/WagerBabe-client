/**
 * Mock Data for Sports Betting Platform
 * 
 * Centralized mock data with real images from the old project
 * to ensure consistency across all pages and components.
 */

// Team Logos Mapping
export const TEAM_LOGOS = {
  // NBA Teams
  "Lakers": "/los-angeles-lakers-logo.png",
  "Warriors": "/golden-state-warriors-logo.png",
  "Celtics": "/boston-celtics-logo.png",
  "Heat": "/miami-heat-logo.png",
  "Knicks": "/new-york-knicks-logo.png",
  "Thunder": "/oklahoma-city-thunder-logo.png",
  "Pacers": "/indiana-pacers-logo.png",
  "Timberwolves": "/minnesota-timberwolves-logo.png",

  // NFL Teams
  "Chiefs": "/kansas-city-chiefs-logo.png",
  "Bills": "/buffalo-bills-logo.png",

  // MLB Teams
  "Dodgers": "/los-angeles-dodgers-logo.png",
  "Yankees": "/new-york-yankees-logo.png",
  "Red Sox": "/boston-red-sox-logo.png",
  "Astros": "/houston-astros-logo.png",
  "Giants": "/san-francisco-giants-logo.png",
  "Rangers": "/texas-rangers-logo.png",

  // NHL Teams
  "Bruins": "/boston-bruins-logo.png",
  "Canadiens": "/montreal-canadiens-logo.png",
  "Maple Leafs": "/toronto-maple-leafs-logo.png",
  "Oilers": "/edmonton-oilers-logo.png",
  "Canucks": "/vancouver-canucks-logo.png",

  // Soccer Teams
  "Arsenal": "/arsenal-logo.png",
  "Manchester City": "/manchester-city-logo.png",
  "Manchester United": "/manchester-united-logo.png",
  "Liverpool": "/liverpool-logo.png",
}

// Sport Icons
export const SPORT_ICONS = {
  basketball: "/basketball-icon.png",
  football: "/football-icon.png",
  baseball: "/baseball-icon.png",
  hockey: "/hockey-icon.png",
  soccer: "/soccer-icon.png",
  tennis: "/tennis-icon.png",
  golf: "/golf-icon.png",
  boxing: "/boxing-icon.png",
  mma: "/mma-icon.png",
  cricket: "/cricket-icon.png",
  rugby: "/rugby-icon.png",
  formula1: "/formula1-icon.png",
}

// Game Interface
export interface Game {
  id: string
  sport: string
  homeTeam: string
  awayTeam: string
  homeLogo?: string
  awayLogo?: string
  homeScore?: number
  awayScore?: number
  status: "upcoming" | "live" | "final"
  startTime?: string
  league: string
  featured?: boolean
  odds?: {
    homeWin: number
    awayWin: number
    spread?: {
      line: number
      homeOdds: number
      awayOdds: number
    }
    total?: {
      line: number
      overOdds: number
      underOdds: number
    }
  }
}

// Mock Games Data
export const MOCK_GAMES: Game[] = [
  {
    id: "1",
    sport: "basketball",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeLogo: TEAM_LOGOS["Lakers"],
    awayLogo: TEAM_LOGOS["Warriors"],
    status: "upcoming",
    startTime: "2024-01-15T20:00:00Z",
    league: "NBA",
    featured: true,
    odds: {
      homeWin: -110,
      awayWin: +120,
      spread: {
        line: -2.5,
        homeOdds: -110,
        awayOdds: -110
      },
      total: {
        line: 225.5,
        overOdds: -110,
        underOdds: -110
      }
    }
  },
  {
    id: "2",
    sport: "football",
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    homeLogo: TEAM_LOGOS["Chiefs"],
    awayLogo: TEAM_LOGOS["Bills"],
    status: "live",
    homeScore: 14,
    awayScore: 7,
    startTime: "2024-01-15T18:00:00Z",
    league: "NFL",
    featured: true,
    odds: {
      homeWin: -150,
      awayWin: +130,
      spread: {
        line: -3.5,
        homeOdds: -110,
        awayOdds: -110
      },
      total: {
        line: 47.5,
        overOdds: -105,
        underOdds: -115
      }
    }
  },
  {
    id: "3",
    sport: "baseball",
    homeTeam: "Dodgers",
    awayTeam: "Yankees",
    homeLogo: TEAM_LOGOS["Dodgers"],
    awayLogo: TEAM_LOGOS["Yankees"],
    status: "final",
    homeScore: 8,
    awayScore: 3,
    startTime: "2024-01-15T16:00:00Z",
    league: "MLB",
    odds: {
      homeWin: +105,
      awayWin: -125
    }
  },
  {
    id: "4",
    sport: "basketball",
    homeTeam: "Celtics",
    awayTeam: "Heat",
    homeLogo: TEAM_LOGOS["Celtics"],
    awayLogo: TEAM_LOGOS["Heat"],
    status: "upcoming",
    startTime: "2024-01-15T21:30:00Z",
    league: "NBA",
    odds: {
      homeWin: -140,
      awayWin: +115,
      spread: {
        line: -3.0,
        homeOdds: -110,
        awayOdds: -110
      },
      total: {
        line: 218.5,
        overOdds: -105,
        underOdds: -115
      }
    }
  },
  {
    id: "5",
    sport: "hockey",
    homeTeam: "Bruins",
    awayTeam: "Rangers",
    homeLogo: TEAM_LOGOS["Bruins"],
    awayLogo: TEAM_LOGOS["Rangers"],
    status: "live",
    homeScore: 2,
    awayScore: 1,
    startTime: "2024-01-15T19:00:00Z",
    league: "NHL",
    odds: {
      homeWin: -125,
      awayWin: +105,
      total: {
        line: 6.5,
        overOdds: +110,
        underOdds: -130
      }
    }
  },
  {
    id: "6",
    sport: "soccer",
    homeTeam: "Arsenal",
    awayTeam: "Manchester City",
    homeLogo: TEAM_LOGOS["Arsenal"],
    awayLogo: TEAM_LOGOS["Manchester City"],
    status: "upcoming",
    startTime: "2024-01-16T12:30:00Z",
    league: "Premier League",
    featured: true,
    odds: {
      homeWin: +180,
      awayWin: -110,
      total: {
        line: 2.5,
        overOdds: -120,
        underOdds: +100
      }
    }
  }
]

// Casino Game Interface
export interface CasinoGame {
  id: string
  name: string
  category: "slots" | "table" | "live" | "jackpot"
  provider: string
  image: string
  featured?: boolean
  new?: boolean
  jackpot?: string
  rtp?: string
  players?: number
  minBet?: string
  maxBet?: string
}

// Casino Games Data - Using only casino directory images
export const CASINO_GAMES: CasinoGame[] = [
  // Jackpot Slots
  {
    id: "mega-fortune",
    name: "Mega Fortune",
    category: "jackpot",
    provider: "NetEnt",
    image: "/casino/1.png",
    jackpot: "$12,450,892",
    rtp: "96.6%",
    featured: true
  },
  {
    id: "hall-of-gods",
    name: "Hall of Gods",
    category: "jackpot",
    provider: "NetEnt",
    image: "/casino/2.png",
    jackpot: "$8,234,567",
    rtp: "95.7%",
    featured: true
  },
  {
    id: "divine-fortune",
    name: "Divine Fortune",
    category: "jackpot",
    provider: "NetEnt",
    image: "/casino/3.png",
    jackpot: "$3,892,145",
    rtp: "96.59%",
    featured: false
  },

  // Popular Slots
  {
    id: "starburst",
    name: "Starburst",
    category: "slots",
    provider: "NetEnt",
    image: "/casino/4.png",
    rtp: "96.09%",
    featured: true
  },
  {
    id: "buffalo-blitz",
    name: "Buffalo Blitz",
    category: "slots",
    provider: "Playtech",
    image: "/casino/5.png",
    rtp: "95.96%",
    featured: true
  },
  {
    id: "golden-spins",
    name: "Golden Spins",
    category: "slots",
    provider: "Pragmatic Play",
    image: "/casino/6.png",
    rtp: "96.5%",
    featured: true
  },
  {
    id: "diamond-rush",
    name: "Diamond Rush",
    category: "slots",
    provider: "Play'n GO",
    image: "/casino/7.png",
    rtp: "96.2%",
    featured: false
  },
  {
    id: "lucky-sevens",
    name: "Lucky Sevens",
    category: "slots",
    provider: "Microgaming",
    image: "/casino/8.png",
    rtp: "95.8%",
    featured: false
  },

  // Table Games
  {
    id: "blackjack-pro",
    name: "Blackjack Pro",
    category: "table",
    provider: "Evolution",
    image: "/casino/1.png",
    minBet: "$1",
    maxBet: "$5,000",
    featured: true
  },
  {
    id: "european-roulette",
    name: "European Roulette",
    category: "table",
    provider: "NetEnt",
    image: "/casino/2.png",
    rtp: "97.3%",
    featured: true
  },
  {
    id: "texas-holdem",
    name: "Texas Hold'em",
    category: "table",
    provider: "Evolution",
    image: "/casino/3.png",
    minBet: "$5",
    maxBet: "$10,000",
    featured: true
  },
  {
    id: "premium-baccarat",
    name: "Premium Baccarat",
    category: "table",
    provider: "Evolution",
    image: "/casino/4.png",
    minBet: "$10",
    maxBet: "$25,000",
    featured: true
  },
  {
    id: "vip-blackjack",
    name: "VIP Blackjack",
    category: "table",
    provider: "Playtech",
    image: "/casino/5.png",
    minBet: "$25",
    maxBet: "$50,000",
    featured: false
  },

  // Live Dealer Games
  {
    id: "live-roulette",
    name: "Live Roulette",
    category: "live",
    provider: "Evolution",
    image: "/casino/6.png",
    players: 1247,
    featured: true
  },
  {
    id: "live-baccarat",
    name: "Live Baccarat",
    category: "live",
    provider: "Evolution",
    image: "/casino/7.png",
    players: 892,
    featured: true
  },
  {
    id: "live-blackjack",
    name: "Live Blackjack",
    category: "live",
    provider: "Evolution",
    image: "/casino/8.png",
    players: 1456,
    featured: false
  },
  {
    id: "live-poker",
    name: "Live Poker",
    category: "live",
    provider: "Evolution",
    image: "/casino/1.png",
    players: 634,
    featured: false
  },
  {
    id: "live-casino-holdem",
    name: "Live Casino Hold'em",
    category: "live",
    provider: "Evolution",
    image: "/casino/2.png",
    players: 423,
    featured: true
  },
  {
    id: "live-dream-catcher",
    name: "Live Dream Catcher",
    category: "live",
    provider: "Evolution",
    image: "/casino/3.png",
    players: 789,
    featured: false
  },
  {
    id: "live-lightning-roulette",
    name: "Live Lightning Roulette",
    category: "live",
    provider: "Evolution",
    image: "/casino/4.png",
    players: 1156,
    featured: true
  },
  {
    id: "live-monopoly",
    name: "Live Monopoly",
    category: "live",
    provider: "Evolution",
    image: "/casino/5.png",
    players: 567,
    featured: false
  }
]

// Promotional Images
export const PROMO_IMAGES = {
  casinoWelcome: "/casino-welcome-promo.png",
  weeklyReload: "/weekly-reload-promo.png",
  welcomeBonus: "/welcome-bonus-promo.png",
  parlayInsurance: "/parlay-insurance-promo.png",
  referFriend: "/refer-friend-promo.png",
  nbaPlayoffs: "/nba-playoffs-promo.png",
  superBowl: "/super-bowl-banner.png",
  championsLeague: "/champions-league-banner.png",
  nbaAllStar: "/nba-all-star-banner.png",
  wimbledon: "/wimbledon-banner.png",
  casinoBanner: "/casino/3.png",
  casinoHeader: "/casino/3.png",
  // New promotion images from refactory branch
  promo1: "/Promotions/1.jpeg",
  promo2: "/Promotions/2.jpeg",
  promo3: "/Promotions/3.jpeg",
  promo4: "/Promotions/4.jpeg",
  promo5: "/Promotions/5.jpeg",
  promo6: "/Promotions/6.jpeg"
}

// User Avatar
export const USER_AVATAR = "/user-avatar.png"

// Helper function to get team logo
export function getTeamLogo(teamName: string): string {
  return TEAM_LOGOS[teamName as keyof typeof TEAM_LOGOS] || "/placeholder-logo.png"
}

// Helper function to get sport icon
export function getSportIcon(sport: string): string {
  return SPORT_ICONS[sport as keyof typeof SPORT_ICONS] || "/placeholder-logo.png"
}

// Comprehensive Sports Betting Interface
export interface SportsBettingGame {
  id: string
  sport: string
  league: string
  date: string
  time: string
  channel?: string
  homeTeam: {
    name: string
    record: string
    logo: string
  }
  awayTeam: {
    name: string
    record: string
    logo: string
  }
  players?: {
    home: { name: string; details?: string }
    away: { name: string; details?: string }
  }
  odds: {
    spread?: {
      home: { line: string; odds: string }
      away: { line: string; odds: string }
    }
    moneyline: {
      home: string
      away: string
    }
    total?: {
      over: { line: string; odds: string }
      under: { line: string; odds: string }
    }
    teamTotal?: {
      home: { over: string; under: string }
      away: { over: string; under: string }
    }
  }
  betButton: string
  featured?: boolean
}

// Comprehensive Sports Betting Data
export const SPORTS_BETTING_GAMES: SportsBettingGame[] = [
  // MLB Games
  {
    id: "mlb-1",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "01:05 PM EST",
    channel: "MLBN",
    homeTeam: {
      name: "Baltimore Orioles",
      record: "54-66",
      logo: "/MLB-IMAGES/Baltimore-Orioles.png"
    },
    awayTeam: {
      name: "Seattle Mariners",
      record: "67-54",
      logo: "/MLB-IMAGES/Seattle Mariners.png"
    },
    players: {
      home: { name: "T Sugano", details: "R" },
      away: { name: "L Evans", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "+1½", odds: "-145" },
        away: { line: "-1½", odds: "+125" }
      },
      moneyline: {
        home: "+114",
        away: "-124"
      },
      total: {
        over: { line: "O 9½", odds: "-120" },
        under: { line: "U 9½", odds: "+100" }
      },
      teamTotal: {
        home: { over: "4½ -110", under: "4½ -110" },
        away: { over: "5½ -110", under: "5½ -110" }
      }
    },
    betButton: "850+",
    featured: true
  },
  {
    id: "mlb-2",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "03:07 PM EST",
    homeTeam: {
      name: "Toronto Blue Jays",
      record: "58-62",
      logo: "/MLB-IMAGES/Toronto-Blue-Jays.png"
    },
    awayTeam: {
      name: "Chicago Cubs",
      record: "61-59",
      logo: "/MLB-IMAGES/Chicago-Cubs.png"
    },
    players: {
      home: { name: "J Berrios", details: "R" },
      away: { name: "K Hendricks", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "-1½", odds: "+135" },
        away: { line: "+1½", odds: "-155" }
      },
      moneyline: {
        home: "-135",
        away: "+115"
      },
      total: {
        over: { line: "O 8½", odds: "-110" },
        under: { line: "U 8½", odds: "-110" }
      },
      teamTotal: {
        home: { over: "4½ -115", under: "4½ -105" },
        away: { over: "4½ -105", under: "4½ -115" }
      }
    },
    betButton: "830+"
  },
  {
    id: "mlb-3",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "06:40 PM EST",
    homeTeam: {
      name: "Cleveland Guardians",
      record: "65-56",
      logo: "/MLB-IMAGES/cleveland.png"
    },
    awayTeam: {
      name: "Miami Marlins",
      record: "51-70",
      logo: "/MLB-IMAGES/Miami-Marlins.png"
    },
    players: {
      home: { name: "S Bieber", details: "R" },
      away: { name: "A Cabrera", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "-1½", odds: "+120" },
        away: { line: "+1½", odds: "-140" }
      },
      moneyline: {
        home: "-140",
        away: "+120"
      },
      total: {
        over: { line: "O 9", odds: "-105" },
        under: { line: "U 9", odds: "-115" }
      },
      teamTotal: {
        home: { over: "5 -110", under: "5 -110" },
        away: { over: "4 -110", under: "4 -110" }
      }
    },
    betButton: "901+"
  },
  {
    id: "mlb-4",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "06:45 PM EST",
    homeTeam: {
      name: "Washington Nationals",
      record: "45-80",
      logo: "/MLB-IMAGES/Washington-Nationals.png"
    },
    awayTeam: {
      name: "Philadelphia Phillies",
      record: "70-55",
      logo: "/MLB-IMAGES/Philadelphia-Phillies.png"
    },
    players: {
      home: { name: "P Corbin", details: "L" },
      away: { name: "Z Wheeler", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "+1½", odds: "-110" },
        away: { line: "-1½", odds: "-110" }
      },
      moneyline: {
        home: "+110",
        away: "-130"
      },
      total: {
        over: { line: "O 9½", odds: "-105" },
        under: { line: "U 9½", odds: "-115" }
      },
      teamTotal: {
        home: { over: "4 -110", under: "4 -110" },
        away: { over: "5½ -110", under: "5½ -110" }
      }
    },
    betButton: "745+"
  },
  {
    id: "mlb-5",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "07:10 PM EST",
    homeTeam: {
      name: "New York Mets",
      record: "62-59",
      logo: "/MLB-IMAGES/New-York-Mets.png"
    },
    awayTeam: {
      name: "Atlanta Braves",
      record: "75-46",
      logo: "/MLB-IMAGES/Atlanta Braves.png"
    },
    players: {
      home: { name: "M Scherzer", details: "R" },
      away: { name: "S Strider", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "+1½", odds: "-120" },
        away: { line: "-1½", odds: "+100" }
      },
      moneyline: {
        home: "+110",
        away: "-130"
      },
      total: {
        over: { line: "O 8", odds: "-110" },
        under: { line: "U 8", odds: "-110" }
      },
      teamTotal: {
        home: { over: "3½ -110", under: "3½ -110" },
        away: { over: "4½ -110", under: "4½ -110" }
      }
    },
    betButton: "892+"
  },
  {
    id: "mlb-6",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "07:40 PM EST",
    homeTeam: {
      name: "Minnesota Twins",
      record: "64-57",
      logo: "/MLB-IMAGES/Minnesota-Twins.png"
    },
    awayTeam: {
      name: "Detroit Tigers",
      record: "52-69",
      logo: "/MLB-IMAGES/Detroit-Tigers.png"
    },
    players: {
      home: { name: "J Ryan", details: "R" },
      away: { name: "T Skubal", details: "L" }
    },
    odds: {
      spread: {
        home: { line: "-1½", odds: "+110" },
        away: { line: "+1½", odds: "-130" }
      },
      moneyline: {
        home: "-150",
        away: "+130"
      },
      total: {
        over: { line: "O 8½", odds: "-105" },
        under: { line: "U 8½", odds: "-115" }
      },
      teamTotal: {
        home: { over: "4½ -110", under: "4½ -110" },
        away: { over: "4 -110", under: "4 -110" }
      }
    },
    betButton: "756+"
  },
  {
    id: "mlb-7",
    sport: "baseball",
    league: "MLB",
    date: "THURSDAY, AUG 14",
    time: "08:40 PM EST",
    channel: "FS1",
    homeTeam: {
      name: "Colorado Rockies",
      record: "45-80",
      logo: "/MLB-IMAGES/Colorado-Rockies.png"
    },
    awayTeam: {
      name: "Arizona Diamondbacks",
      record: "58-67",
      logo: "/MLB-IMAGES/Arizona-Diamondbacks.png"
    },
    players: {
      home: { name: "K Freeland", details: "L" },
      away: { name: "M Kelly", details: "R" }
    },
    odds: {
      spread: {
        home: { line: "+1½", odds: "-115" },
        away: { line: "-1½", odds: "-105" }
      },
      moneyline: {
        home: "+120",
        away: "-140"
      },
      total: {
        over: { line: "O 11", odds: "-110" },
        under: { line: "U 11", odds: "-110" }
      },
      teamTotal: {
        home: { over: "5½ -110", under: "5½ -110" },
        away: { over: "5½ -110", under: "5½ -110" }
      }
    },
    betButton: "823+"
  },

  // NBA Games
  {
    id: "nba-1",
    sport: "basketball",
    league: "NBA",
    date: "THURSDAY, AUG 14",
    time: "07:30 PM EST",
    channel: "TNT",
    homeTeam: {
      name: "Los Angeles Lakers",
      record: "42-30",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Golden State Warriors",
      record: "38-34",
      logo: "/placeholder.jpg"
    },
    odds: {
      spread: {
        home: { line: "-2.5", odds: "-110" },
        away: { line: "+2.5", odds: "-110" }
      },
      moneyline: {
        home: "-135",
        away: "+115"
      },
      total: {
        over: { line: "O 225.5", odds: "-110" },
        under: { line: "U 225.5", odds: "-110" }
      },
      teamTotal: {
        home: { over: "114 -110", under: "114 -110" },
        away: { over: "111.5 -110", under: "111.5 -110" }
      }
    },
    betButton: "892+",
    featured: true
  },
  {
    id: "nba-2",
    sport: "basketball",
    league: "NBA",
    date: "THURSDAY, AUG 14",
    time: "08:00 PM EST",
    homeTeam: {
      name: "Boston Celtics",
      record: "45-27",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Miami Heat",
      record: "40-32",
      logo: "/placeholder.jpg"
    },
    odds: {
      spread: {
        home: { line: "-3.0", odds: "-110" },
        away: { line: "+3.0", odds: "-110" }
      },
      moneyline: {
        home: "-140",
        away: "+120"
      },
      total: {
        over: { line: "O 218.5", odds: "-105" },
        under: { line: "U 218.5", odds: "-115" }
      },
      teamTotal: {
        home: { over: "110.5 -110", under: "110.5 -110" },
        away: { over: "108 -110", under: "108 -110" }
      }
    },
    betButton: "756+"
  },

  // NFL Games
  {
    id: "nfl-1",
    sport: "football",
    league: "NFL",
    date: "THURSDAY, AUG 14",
    time: "08:20 PM EST",
    channel: "NBC",
    homeTeam: {
      name: "Kansas City Chiefs",
      record: "11-6",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Buffalo Bills",
      record: "11-6",
      logo: "/placeholder.jpg"
    },
    odds: {
      spread: {
        home: { line: "-3.5", odds: "-110" },
        away: { line: "+3.5", odds: "-110" }
      },
      moneyline: {
        home: "-150",
        away: "+130"
      },
      total: {
        over: { line: "O 47.5", odds: "-105" },
        under: { line: "U 47.5", odds: "-115" }
      },
      teamTotal: {
        home: { over: "25.5 -110", under: "25.5 -110" },
        away: { over: "22 -110", under: "22 -110" }
      }
    },
    betButton: "945+",
    featured: true
  },
  {
    id: "nfl-2",
    sport: "football",
    league: "NFL",
    date: "SUNDAY, AUG 17",
    time: "01:00 PM EST",
    homeTeam: {
      name: "Dallas Cowboys",
      record: "12-5",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Philadelphia Eagles",
      record: "11-6",
      logo: "/placeholder.jpg"
    },
    odds: {
      spread: {
        home: { line: "-2.0", odds: "-110" },
        away: { line: "+2.0", odds: "-110" }
      },
      moneyline: {
        home: "-125",
        away: "+105"
      },
      total: {
        over: { line: "O 48.5", odds: "-110" },
        under: { line: "U 48.5", odds: "-110" }
      },
      teamTotal: {
        home: { over: "25.5 -110", under: "25.5 -110" },
        away: { over: "23 -110", under: "23 -110" }
      }
    },
    betButton: "823+"
  },

  // NHL Games
  {
    id: "nhl-1",
    sport: "hockey",
    league: "NHL",
    date: "THURSDAY, AUG 14",
    time: "07:00 PM EST",
    homeTeam: {
      name: "Boston Bruins",
      record: "45-18-9",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Toronto Maple Leafs",
      record: "42-21-9",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-125",
        away: "+105"
      },
      total: {
        over: { line: "O 6.5", odds: "+110" },
        under: { line: "U 6.5", odds: "-130" }
      },
      teamTotal: {
        home: { over: "3.5 -110", under: "3.5 -110" },
        away: { over: "3 -110", under: "3 -110" }
      }
    },
    betButton: "678+",
    featured: true
  },
  {
    id: "nhl-2",
    sport: "hockey",
    league: "NHL",
    date: "THURSDAY, AUG 14",
    time: "09:00 PM EST",
    homeTeam: {
      name: "Edmonton Oilers",
      record: "38-25-9",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Vancouver Canucks",
      record: "35-28-9",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-110",
        away: "-110"
      },
      total: {
        over: { line: "O 6.0", odds: "-110" },
        under: { line: "U 6.0", odds: "-110" }
      },
      teamTotal: {
        home: { over: "3 -110", under: "3 -110" },
        away: { over: "3 -110", under: "3 -110" }
      }
    },
    betButton: "534+"
  },

  // Soccer Games
  {
    id: "soccer-1",
    sport: "soccer",
    league: "Premier League",
    date: "SATURDAY, AUG 16",
    time: "10:00 AM EST",
    channel: "NBC",
    homeTeam: {
      name: "Arsenal",
      record: "24-5-9",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Manchester City",
      record: "28-5-5",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "+180",
        away: "-110"
      },
      total: {
        over: { line: "O 2.5", odds: "-120" },
        under: { line: "U 2.5", odds: "+100" }
      },
      teamTotal: {
        home: { over: "1.5 +110", under: "1.5 -130" },
        away: { over: "1.5 -110", under: "1.5 -110" }
      }
    },
    betButton: "892+",
    featured: true
  },
  {
    id: "soccer-2",
    sport: "soccer",
    league: "Premier League",
    date: "SATURDAY, AUG 16",
    time: "12:30 PM EST",
    homeTeam: {
      name: "Manchester United",
      record: "23-6-9",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Liverpool",
      record: "24-7-7",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "+150",
        away: "+140"
      },
      total: {
        over: { line: "O 2.5", odds: "-110" },
        under: { line: "U 2.5", odds: "-110" }
      },
      teamTotal: {
        home: { over: "1.5 +120", under: "1.5 -140" },
        away: { over: "1.5 +120", under: "1.5 -140" }
      }
    },
    betButton: "756+"
  },

  // Tennis Games
  {
    id: "tennis-1",
    sport: "tennis",
    league: "US Open",
    date: "THURSDAY, AUG 14",
    time: "02:00 PM EST",
    homeTeam: {
      name: "Novak Djokovic",
      record: "W-L: 45-8",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Carlos Alcaraz",
      record: "W-L: 52-6",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "+120",
        away: "-140"
      },
      total: {
        over: { line: "O 22.5", odds: "-110" },
        under: { line: "U 22.5", odds: "-110" }
      }
    },
    betButton: "634+",
    featured: true
  },
  {
    id: "tennis-2",
    sport: "tennis",
    league: "US Open",
    date: "THURSDAY, AUG 14",
    time: "07:00 PM EST",
    homeTeam: {
      name: "Iga Swiatek",
      record: "W-L: 48-7",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Aryna Sabalenka",
      record: "W-L: 44-9",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-160",
        away: "+140"
      },
      total: {
        over: { line: "O 20.5", odds: "-110" },
        under: { line: "U 20.5", odds: "-110" }
      }
    },
    betButton: "523+"
  },

  // Golf Games
  {
    id: "golf-1",
    sport: "golf",
    league: "PGA Tour",
    date: "THURSDAY, AUG 14",
    time: "08:00 AM EST",
    homeTeam: {
      name: "Rory McIlroy",
      record: "Wins: 3",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Jon Rahm",
      record: "Wins: 4",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "+150",
        away: "-170"
      }
    },
    betButton: "445+",
    featured: true
  },
  {
    id: "golf-2",
    sport: "golf",
    league: "PGA Tour",
    date: "THURSDAY, AUG 14",
    time: "08:30 AM EST",
    homeTeam: {
      name: "Scottie Scheffler",
      record: "Wins: 2",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Viktor Hovland",
      record: "Wins: 1",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-120",
        away: "+100"
      }
    },
    betButton: "334+"
  },

  // UFC/MMA Games
  {
    id: "mma-1",
    sport: "mma",
    league: "UFC",
    date: "SATURDAY, AUG 16",
    time: "10:00 PM EST",
    channel: "ESPN+",
    homeTeam: {
      name: "Israel Adesanya",
      record: "24-3",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Sean Strickland",
      record: "28-5",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-250",
        away: "+210"
      },
      total: {
        over: { line: "O 2.5", odds: "-150" },
        under: { line: "U 2.5", odds: "+130" }
      }
    },
    betButton: "789+",
    featured: true
  },
  {
    id: "mma-2",
    sport: "mma",
    league: "UFC",
    date: "SATURDAY, AUG 16",
    time: "09:30 PM EST",
    homeTeam: {
      name: "Alex Pereira",
      record: "9-2",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Jan Blachowicz",
      record: "29-9-1",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-180",
        away: "+160"
      },
      total: {
        over: { line: "O 1.5", odds: "-120" },
        under: { line: "U 1.5", odds: "+100" }
      }
    },
    betButton: "567+"
  },

  // Formula 1 Games
  {
    id: "f1-1",
    sport: "formula1",
    league: "Formula 1",
    date: "SUNDAY, AUG 17",
    time: "09:00 AM EST",
    channel: "ESPN",
    homeTeam: {
      name: "Max Verstappen",
      record: "Wins: 12",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Lewis Hamilton",
      record: "Wins: 2",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "-300",
        away: "+250"
      }
    },
    betButton: "678+",
    featured: true
  },
  {
    id: "f1-2",
    sport: "formula1",
    league: "Formula 1",
    date: "SUNDAY, AUG 17",
    time: "09:00 AM EST",
    homeTeam: {
      name: "Lando Norris",
      record: "Wins: 0",
      logo: "/placeholder.jpg"
    },
    awayTeam: {
      name: "Charles Leclerc",
      record: "Wins: 1",
      logo: "/placeholder.jpg"
    },
    odds: {
      moneyline: {
        home: "+120",
        away: "-140"
      }
    },
    betButton: "445+"
  }
]

// Legacy MLB data for backward compatibility
export const MLB_BETTING_GAMES = SPORTS_BETTING_GAMES.filter(game => game.sport === "baseball" && game.league === "MLB")

// Helper functions for sports betting data
export function getGamesBySport(sport: string): SportsBettingGame[] {
  return SPORTS_BETTING_GAMES.filter(game => game.sport === sport)
}

export function getGamesByLeague(league: string): SportsBettingGame[] {
  return SPORTS_BETTING_GAMES.filter(game => game.league === league)
}

export function getFeaturedGames(): SportsBettingGame[] {
  return SPORTS_BETTING_GAMES.filter(game => game.featured)
}

export function getGamesByDate(date: string): SportsBettingGame[] {
  return SPORTS_BETTING_GAMES.filter(game => game.date === date)
}

export function getLiveGames(): SportsBettingGame[] {
  // This would typically check against current time
  // For now, return games that are likely to be live based on time
  return SPORTS_BETTING_GAMES.filter(game => {
    const gameTime = new Date(game.date + ' ' + game.time)
    const now = new Date()
    const timeDiff = Math.abs(now.getTime() - gameTime.getTime()) / (1000 * 60 * 60) // hours
    return timeDiff < 3 // Within 3 hours of start time
  })
}

// Sports and Leagues mapping
export const SPORTS_AND_LEAGUES = {
  baseball: ["MLB", "NPB", "KBO"],
  basketball: ["NBA", "WNBA", "NCAA", "EuroLeague"],
  football: ["NFL", "NCAA", "CFL", "XFL"],
  hockey: ["NHL", "AHL", "NCAA"],
  soccer: ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "MLS", "Champions League"],
  tennis: ["ATP", "WTA", "Grand Slams", "US Open", "Wimbledon", "French Open", "Australian Open"],
  golf: ["PGA Tour", "LPGA", "European Tour", "Masters", "US Open", "British Open", "PGA Championship"],
  mma: ["UFC", "Bellator", "ONE Championship"],
  formula1: ["Formula 1", "Formula 2", "Formula 3"],
  boxing: ["WBC", "WBA", "IBF", "WBO"],
  cricket: ["IPL", "Test Cricket", "ODI", "T20"],
  rugby: ["Six Nations", "Rugby Championship", "Super Rugby"],
  olympics: ["Summer Olympics", "Winter Olympics"]
}

// Available sports for filtering
export const AVAILABLE_SPORTS = Object.keys(SPORTS_AND_LEAGUES)

// Available leagues for filtering
export const AVAILABLE_LEAGUES = Object.values(SPORTS_AND_LEAGUES).flat()

// Sport-specific betting types
export const SPORT_BETTING_TYPES = {
  baseball: ["Moneyline", "Run Line", "Total Runs", "First 5 Innings", "Player Props"],
  basketball: ["Moneyline", "Point Spread", "Total Points", "Quarter Lines", "Player Props"],
  football: ["Moneyline", "Point Spread", "Total Points", "Quarter Lines", "Player Props"],
  hockey: ["Moneyline", "Puck Line", "Total Goals", "Period Lines", "Player Props"],
  soccer: ["Moneyline", "Handicap", "Total Goals", "Both Teams to Score", "Player Props"],
  tennis: ["Moneyline", "Set Betting", "Total Games", "Player Props"],
  golf: ["Tournament Winner", "Top 5", "Top 10", "Head-to-Head", "Round Leader"],
  mma: ["Moneyline", "Method of Victory", "Round Betting", "Total Rounds"],
  formula1: ["Race Winner", "Podium Finish", "Points Finish", "Qualifying Winner"],
  boxing: ["Moneyline", "Method of Victory", "Round Betting", "Total Rounds"],
  cricket: ["Match Winner", "Top Batsman", "Top Bowler", "Total Runs"],
  rugby: ["Moneyline", "Handicap", "Total Points", "First Try Scorer"],
  olympics: ["Medal Winner", "Top 3", "Head-to-Head", "Total Medals"]
}

// Sports Navigation Data
export interface SportCategory {
  id: string
  name: string
  icon: string
  selected?: boolean
  children?: SportCategory[]
}

export const SPORTS_NAVIGATION: SportCategory[] = [
  { id: "up-next", name: "UP NEXT", icon: "/placeholder.jpg" },
  { id: "featured", name: "FEATURED", icon: "/placeholder.jpg", selected: true },
  { id: "live", name: "LIVE", icon: "/placeholder.jpg" },
  { id: "crash", name: "CRASH", icon: "/placeholder.jpg" },
  
  // Major Sports
  { id: "baseball", name: "BASEBALL", icon: "/placeholder.jpg" },
  { 
    id: "mlb", 
    name: "MLB", 
    icon: "/placeholder.jpg",
    children: [
      { id: "mlb-props-plus", name: "MLB Props Plus +", icon: "/placeholder.jpg" },
      { id: "asian-baseball", name: "Asian Baseball", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "football", name: "FOOTBALL", icon: "/placeholder.jpg" },
  { 
    id: "nfl", 
    name: "NFL", 
    icon: "/placeholder.jpg",
    children: [
      { id: "nfl-props-plus", name: "NFL Props Plus +", icon: "/placeholder.jpg" },
      { id: "college-football", name: "College Football", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "basketball", name: "BASKETBALL", icon: "/placeholder.jpg" },
  { 
    id: "nba", 
    name: "NBA", 
    icon: "/placeholder.jpg",
    children: [
      { id: "nba-props-plus", name: "NBA Props Plus +", icon: "/placeholder.jpg" },
      { id: "college-basketball", name: "College Basketball", icon: "/placeholder.jpg" },
      { id: "wnba", name: "WNBA", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "hockey", name: "HOCKEY", icon: "/placeholder.jpg" },
  { 
    id: "nhl", 
    name: "NHL", 
    icon: "/placeholder.jpg",
    children: [
      { id: "nhl-props-plus", name: "NHL Props Plus +", icon: "/placeholder.jpg" },
      { id: "college-hockey", name: "College Hockey", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "soccer", name: "SOCCER", icon: "/placeholder.jpg" },
  { 
    id: "premier-league", 
    name: "Premier League", 
    icon: "/placeholder.jpg",
    children: [
      { id: "la-liga", name: "La Liga", icon: "/placeholder.jpg" },
      { id: "bundesliga", name: "Bundesliga", icon: "/placeholder.jpg" },
      { id: "serie-a", name: "Serie A", icon: "/placeholder.jpg" },
      { id: "champions-league", name: "Champions League", icon: "/placeholder.jpg" },
      { id: "mls", name: "MLS", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "tennis", name: "TENNIS", icon: "/placeholder.jpg" },
  { 
    id: "atp", 
    name: "ATP", 
    icon: "/placeholder.jpg",
    children: [
      { id: "wta", name: "WTA", icon: "/placeholder.jpg" },
      { id: "grand-slams", name: "Grand Slams", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "golf", name: "GOLF", icon: "/placeholder.jpg" },
  { 
    id: "pga-tour", 
    name: "PGA Tour", 
    icon: "/placeholder.jpg",
    children: [
      { id: "lpga", name: "LPGA", icon: "/placeholder.jpg" },
      { id: "majors", name: "Majors", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "mma", name: "MMA", icon: "/placeholder.jpg" },
  { 
    id: "ufc", 
    name: "UFC", 
    icon: "/placeholder.jpg",
    children: [
      { id: "bellator", name: "Bellator", icon: "/placeholder.jpg" },
      { id: "one-championship", name: "ONE Championship", icon: "/placeholder.jpg" }
    ]
  },
  
  { id: "boxing", name: "BOXING", icon: "/placeholder.jpg" },
  { id: "formula1", name: "FORMULA 1", icon: "/placeholder.jpg" },
  { id: "cricket", name: "CRICKET", icon: "/placeholder.jpg" },
  { id: "rugby", name: "RUGBY", icon: "/placeholder.jpg" },
  { id: "olympics", name: "OLYMPICS", icon: "/placeholder.jpg" },
  { id: "esports", name: "ESPORTS", icon: "/placeholder.jpg" }
]

// Betting Types
export const BETTING_TYPES = [
  { id: "straight", label: "S STRAIGHT", selected: true },
  { id: "parlay", label: "P PARLAY", selected: false },
  { id: "teaser", label: "T TEASER", selected: false },
  { id: "if-bet", label: "I IF BET", selected: false },
  { id: "reverse", label: "R REVERSE", selected: false }
]

// Bet Slip Data
export interface BetSlipItem {
  id: string
  gameId: string
  betType: string
  team?: string
  odds: number
  stake: number
  potentialWin: number
  description: string
  gameInfo: {
    homeTeam: string
    awayTeam: string
    league: string
    startTime: string
  }
}
