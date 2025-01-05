// Eksempel på brug et andet sted i din kode:
// import { getItemData } from "../config/data";
// const item = getItemData({ itemId: 1 });
// console.log("Her er item nr. 1:", item);

//
// data.js
//

// Funktion til at filtrere items baseret på itemId eller searchTerm
export const getItemData = ({ itemId, searchTerm }) => {
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

  return itemsData.filter(filterFunction);
};

// Items-data - svarende til dine felter i Profile.js
export const itemsData = [
  {
    id: 1,
    title: "Bag of recycled materials",
    description: "A bag made of recycled leather.",
    price: 120,
    homepageUrl: "https://www.example.com/chair",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/upcycled-bag.jpg"),
  },
  {
    id: 2,
    title: "Refurbished Lamp",
    description: "A lamp restored with new paint and wiring for a fresh look.",
    price: 250,
    homepageUrl: "https://www.example.com/lamp",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/julpyssel-renar.jpg"),
  },
  {
    id: 3,
    title: "Vintage Painted Table",
    description:
      "An old table given new life with chalk paint and custom hardware.",
    price: 180,
    homepageUrl: "https://www.example.com/table",
    ownerId: "owner_ABC123",
    image: require("./../assets/diy/juleh.jpg"),
  },
  {
    id: 4,
    title: "Handmade Decorative Jar",
    description: "A decorative jar made from upcycled glass bottles.",
    price: 90,
    homepageUrl: "https://www.example.com/jar",
    ownerId: "owner_DEF456",
    image: require("./../assets/diy/6.png"),
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
