export const getUniqueFindItemData = ({ itemId, searchTerm }) => {
  let filterFunction;

  if (itemId) {
    filterFunction = (item) => item.id === itemId;
  } else if (searchTerm) {
    const st = searchTerm.toLowerCase();
    filterFunction = (item) =>
      item.title?.toLowerCase().includes(st) ||
      item.description?.toLowerCase().includes(st);
  } else {
    // Returner alle, hvis hverken itemId eller searchTerm er sat
    filterFunction = () => true;
  }

  return uniqueFindItemsData.filter(filterFunction);
};

export const getPopularItemData = ({ itemId, searchTerm }) => {
  let filterFunction;

  if (itemId) {
    filterFunction = (item) => item.id === itemId;
  } else if (searchTerm) {
    const st = searchTerm.toLowerCase();
    filterFunction = (item) =>
      item.title?.toLowerCase().includes(st) ||
      item.description?.toLowerCase().includes(st);
  } else {
    // Returner alle, hvis hverken itemId eller searchTerm er sat
    filterFunction = () => true;
  }

  return popularItemsData.filter(filterFunction);
};

// Items-data - svarende til dine felter i Profile.js
export const uniqueFindItemsData = [
  {
    id: 1,
    title: "Bag of recycled materials - by Amolia",
    description: "A bag made of recycled leather - By Amolia.",
    price: 120,
    homepageUrl: "https://www.example.com/leather",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/upcycled-bag.jpg"),
  },
  {
    id: 2,
    title: "Yellow upcycled vase",
    description: "Vase bought in a thrift store - spray painted.",
    price: 250,
    homepageUrl: "https://www.example.com/lamp",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/gul-vase.jpg"),
  },
  {
    id: 3,
    title: "Candle holders",
    description:
      "Candle holders - made from homemade clay. Spray painted purple and pink.",
    price: 180,
    homepageUrl: "https://www.example.com/table",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/starinlys-efter.png"),
  },
  {
    id: 4,
    title: "Christmas Glove - Amolia",
    description: "Christmas Glove of upcycled items. Made by Amolia.",
    price: 90,
    homepageUrl: "https://www.example.com/jar",
    ownerId: "owner_DEF456",
    image: require("./../assets/diy/handske-jul.jpg"),
  },
];

export const popularItemsData = [
  {
    id: 5,
    title: "Upcycled vase",
    description: "New life for a Kähler vase - spray painted, using tape and a sponge. ",
    price: 110,
    homepageUrl: "https://www.example.com/vase",
    ownerId: "owner_GHI789",
    image: require("./../assets/diy/lyserød-vase.jpg"),
  },
  {
    id: 6,
    title: "Bead flower bouquet",
    description: "Heather-inspired bead flower bouquet",
    price: 200,
    homepageUrl: "https://www.example.com/flower",
    ownerId: "owner_JKL012",
    image: require("./../assets/diy/lyng-beads.jpg"),
  },
  {
    id: 7,
    title: "Upcycled table lamp",
    description: "Table lamp from a thrift store. Spray painted, for new life.",
    price: 360,
    homepageUrl: "https://www.example.com/spray",
    ownerId: "owner_MNO345",
    image: require("./../assets/diy/lamp-vases.jpg"),
  },
  {
    id: 8,
    title: "Volver Art blouse",
    description: "A blouse made out of recycled textiles - by Volver Art",
    price: 1200,
    homepageUrl: "https://www.instagram.com/volver_art_upcycle/",
    ownerId: "owner_PQR678",
    image: require("./../assets/diy/volver-art-front.jpg"),
  },
  {
    id: 99,
    title: "Home made Christmas Tree",
    description: "A Christmas Tree made of paper and paper rolls",
    price: 10,
    homepageUrl: "https://www.example.com/christmas-tree",
    ownerId: "owner_PQR678",
    image: require("./../assets/diy/juletræ.jpg"),
  },
];

// Onboarding-data forbliver uændret
export const onboardingData = [
  {
    id: 1,
    title: "",
    summary: "",
    image: require("./../assets/diy/retrove.png"),
  },
  {
    id: 2,
    title: "Velkommen til Retrove",
    summary:
      "En app udviklet til inspiration for alle med interesse indenfor upcyckling og bæredygtighed.",
    text: "",
    backgroundColor: "6b7280",
  },
  {
    id: 3,
    title: "Welcome to The Diy App!",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/diy/retrove.png"),
  },
];
