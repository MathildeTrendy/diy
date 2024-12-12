// Product data

//function to enable to return the Data
export const getDiyData = ({ diyId, popular, deal, searchTerm }) => {
  let filterFunction;

  searchTerm = searchTerm?.toLowerCase();

  //hvis vi har et id, filterFunctioner

  if (diyId) {
    filterFunction = (diy) => diy.id === diyId;
  } else if (popular && searchTerm) {
    filterFunction = (diy) =>
      (diy.name?.toLowerCase().includes(searchTerm) ||
        diy.description?.toLowerCase().includes(searchTerm)) &&
      diy.popular === true;
  } else if (popular) {
    filterFunction = (diy) => diy.popular === true;
  } else if (deal) {
    filterFunction = (diy) => diy.deal === true;
  } else if (searchTerm) {
    filterFunction = (diy) =>
      diy.name?.toLowerCase().includes(searchTerm) ||
      diy.description?.toLowerCase().includes(searchTerm);
  } else {
    filterFunction = (diy) => diy;
  }
  return diyData.filter(filterFunction);
};

export const diyData = [
  {
    id: 4,
    name: "Ridge East Bench Zinfandel",
    origin: "California",
    price: 120,
    currency: "DKK",
    alcohol: "14.8",
    volume: "750ml",
    year: "2020",
    description:
      "This diy from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: false,
    deal: true,
    image: require("./../assets/diy/diy.png"),
  },
  {
    id: 5,
    name: "Sweet taste of",
    origin: "California",
    price: 78,
    currency: "DKK",
    alcohol: "13.9",
    volume: "750ml",
    year: "2021",
    description:
      "This diy from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: true,
    deal: true,
    image: require("./../assets/diy/julpyssel-renar.jpg"),
  },
  {
    id: 6,
    name: "Round and spicy",
    origin: "California",
    price: 57,
    currency: "DKK",
    alcohol: "14.5",
    volume: "750ml",
    year: "2022",
    description:
      "This diy from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: false,
    deal: true,
    image: require("./../assets/diy/juleh.jpg"),
  },
  {
    id: 2,
    name: "Riesling",
    origin: "Germany",
    price: 340,
    currency: "DKK",
    alcohol: "14.5",
    volume: "750ml",
    year: "2022",
    description:
      "This diy from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: false,
    deal: true,
    image: require("./../assets/diy/6.png"),
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
    title: "Good diy is all you need",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/diy/retrove.png"),
  },
  {
    id: 3,
    title: "Welcome to The Diy App!",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/diy/retrove.png"),
  },
];
