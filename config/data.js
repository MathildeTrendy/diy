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
    filterFunction = () => true;
  }

  return popularItemsData.filter(filterFunction);
};

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

export const onboardingData = [
  {
    id: 1,
    title: "",
    summary: "",
    image: require("./../assets/diy/retrove.png"),
  },
  {
    id: 2,
    title: "Welcome to ReTrove",
    summary:
      "Easily buy and sell unique DIY and upcycled items with ReTrove’s user-friendly marketplace. Discover handcrafted treasures or list your own creations effortlessly.",
    text: "",
    image: require("/Users/Penneo/Documents/diy/assets/diy/upcycled-bag.jpg"),
    
  },
  {
    id: 3,
    title: "Join our community 🩵",
    summary: "Unleash your creativity and join our community dedicated to upcycling and sustainable living. At ReTrove, we believe in the power of the circular economy to transform everyday items into unique, eco-friendly treasures.",
    image: require("/Users/Penneo/Documents/diy/assets/onboarding/community.jpeg"),
  },
];
