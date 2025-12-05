const MOCK_SCHEDULE = [
  {
    id: "basketball",
    game: "Men's Basketball",
    schedule: [
      { game: "Fontaine vs Inazuma", teamA: "Fontaine", teamB: "Inazuma", date: "2025-01-10", time: "09:00 AM", location: "Court A" },
      { game: "Liyue vs Mondstadt", teamA: "Liyue", teamB: "Mondstadt", date: "2025-01-10", time: "10:30 AM", location: "Court A" },
      { game: "Natlan vs Sumeru", teamA: "Natlan", teamB: "Sumeru", date: "2025-01-10", time: "01:00 PM", location: "Court A" },
      { game: "Fontaine vs Inazuma", teamA: "Fontaine", teamB: "Inazuma", date: "2025-01-10", time: "09:00 AM", location: "Court A" },
      { game: "Liyue vs Mondstadt", teamA: "Liyue", teamB: "Mondstadt", date: "2025-01-10", time: "10:30 AM", location: "Court A" },
      { game: "Natlan vs Sumeru", teamA: "Natlan", teamB: "Sumeru", date: "2025-01-10", time: "01:00 PM", location: "Court A" },
    ]
  },
  {
    id: "volleyball",
    game: "Men's Volleyball",
    schedule: [
      { game: "Mondstadt vs Natlan", teamA: "Mondstadt", teamB: "Natlan", date: "2025-01-10", time: "09:00 AM", location: "Gym Court" },
      { game: "Fontaine vs Sumeru", teamA: "Fontaine", teamB: "Sumeru", date: "2025-01-10", time: "11:00 AM", location: "Gym Court" },
      { game: "Inazuma vs Snezhnaya", teamA: "Inazuma", teamB: "Snezhnaya", date: "2025-01-10", time: "01:00 PM", location: "Gym Court" },
    ]
  },
  {
    id: "badminton-singles",
    game: "Men's Badminton Singles",
    schedule: [
      { game: "Snezhnaya vs Fontaine", teamA: "Snezhnaya", teamB: "Fontaine", date: "2025-01-10", time: "08:00 AM", location: "Badminton Court" },
      { game: "Natlan vs Mondstadt", teamA: "Natlan", teamB: "Mondstadt", date: "2025-01-10", time: "09:00 AM", location: "Badminton Court" },
      { game: "Inazuma vs Liyue", teamA: "Inazuma", teamB: "Liyue", date: "2025-01-10", time: "10:00 AM", location: "Badminton Court" },
    ]
  },
  {
    id: "badminton-doubles",
    game: "Badminton Open Doubles",
    schedule: [
      { game: "Liyue vs Sumeru", teamA: "Liyue", teamB: "Sumeru", date: "2025-01-10", time: "01:30 PM", location: "Badminton Court" },
      { game: "Inazuma vs Snezhnaya", teamA: "Inazuma", teamB: "Snezhnaya", date: "2025-01-10", time: "02:30 PM", location: "Badminton Court" },
    ]
  },
  {
    id: "chess",
    game: "Chess",
    schedule: [
      { game: "Sumeru vs Mondstadt", teamA: "Sumeru", teamB: "Mondstadt", date: "2025-01-11", time: "09:00 AM", location: "Library" },
      { game: "Liyue vs Fontaine", teamA: "Liyue", teamB: "Fontaine", date: "2025-01-11", time: "10:30 AM", location: "Library" },
    ]
  },
  {
    id: "rubiks",
    game: "Rubik's Cube",
    schedule: [
      { game: "Snezhnaya vs Natlan", teamA: "Snezhnaya", teamB: "Natlan", date: "2025-01-11", time: "01:00 PM", location: "Library" },
      { game: "Fontaine vs Inazuma", teamA: "Fontaine", teamB: "Inazuma", date: "2025-01-11", time: "01:30 PM", location: "Library" },
    ]
  },
  {
    id: "ml",
    game: "Mobile Legends",
    schedule: [
      { game: "Mondstadt vs Liyue", teamA: "Mondstadt", teamB: "Liyue", date: "2025-01-10", time: "04:00 PM", location: "Esports Room" },
      { game: "Sumeru vs Natlan", teamA: "Sumeru", teamB: "Natlan", date: "2025-01-10", time: "05:00 PM", location: "Esports Room" },
      { game: "Fontaine vs Inazuma", teamA: "Fontaine", teamB: "Inazuma", date: "2025-01-10", time: "06:00 PM", location: "Esports Room" },
    ]
  },
  {
    id: "lol",
    game: "League of Legends",
    schedule: [
      { game: "Fontaine vs Mondstadt", teamA: "Fontaine", teamB: "Mondstadt", date: "2025-01-11", time: "04:00 PM", location: "Esports Room" },
      { game: "Snezhnaya vs Sumeru", teamA: "Snezhnaya", teamB: "Sumeru", date: "2025-01-11", time: "05:00 PM", location: "Esports Room" },
    ]
  },
  {
    id: "valorant",
    game: "Valorant",
    schedule: [
      { game: "Inazuma vs Natlan", teamA: "Inazuma", teamB: "Natlan", date: "2025-01-11", time: "02:00 PM", location: "Esports Room" },
      { game: "Liyue vs Snezhnaya", teamA: "Liyue", teamB: "Snezhnaya", date: "2025-01-11", time: "03:00 PM", location: "Esports Room" },
    ]
  },
  {
    id: "digital-art",
    game: "Digital Art",
    schedule: [
      { game: "Judging", teamA: "Judging", teamB: null, date: "2025-01-12", time: "09:00 AM", location: "Stage Hall" }
    ]
  },
  {
    id: "mini-games",
    game: "Mini Games",
    schedule: [
      { game: "Chinese Garter", teamA: "Chinese Garter", teamB: null, date: "2025-01-10", time: "09:00 AM", location: "Open Field" },
      { game: "Heart Attack", teamA: "Heart Attack", teamB: null, date: "2025-01-10", time: "10:00 AM", location: "Open Field" },
      { game: "Charades Meme Edition", teamA: "Charades Meme Edition", teamB: null, date: "2025-01-10", time: "01:00 PM", location: "Auditorium" },
      { game: "Bring Me", teamA: "Bring Me", teamB: null, date: "2025-01-10", time: "02:00 PM", location: "Auditorium" },
      { game: "Wordle", teamA: "Wordle", teamB: null, date: "2025-01-11", time: "09:00 AM", location: "Auditorium" },
      { game: "Relay Games", teamA: "Relay Games", teamB: null, date: "2025-01-11", time: "10:00 AM", location: "Open Field" },
      { game: "Scavenger Hunt", teamA: "Scavenger Hunt", teamB: null, date: "2025-01-12", time: "08:00 AM", location: "Campus Grounds" }
    ]
  }
];

export default MOCK_SCHEDULE;