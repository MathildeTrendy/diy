//function to enable to return the Data
export const getWineData = ({ wineId, popular, deal, searchTerm }) => {
  let filterFunction;
  //hvis vi har et id, filterFunctioner

  if (wineId) {
    filterFunction = (wine) => wine.id === wineId;
  } else if (popular && searchTerm) {
    filterFunction = (wine) =>
      (wine.name.includes(searchTerm) ||
        wine.description.includes(searchTerm)) &&
      wine.popular === true;
  } else if (popular) {
    filterFunction = (wine) => wine.popular === true;
  } else if (deal) {
    filterFunction = (wine) => wine.deal === true;
  } else if (searchTerm) {
    filterFunction = (wine) =>
      wine.name.includes(searchTerm) || wine.description.includes(searchTerm);
  } else {
    filterFunction = (wine) => wine;
  }
  return wineData.filter(filterFunction);
};

export const wineData = [
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
      "This wine from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: false,
    deal: false,
    image: require("./../assets/wine/4.png"),
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
      "This wine from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: true,
    deal: false,
    image: require("./../assets/wine/5.png"),
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
      "This wine from Califonia is a mixture of the sweet grape and the bla bla bla",
    quantityAvailable: 35,
    popular: false,
    deal: false,
    image: require("./../assets/wine/6.png"),
  },
];
export const onboardingData = [
  {
    id: 1,
    title: "Enjoy All The Finest And Popular Wines",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/1.jpg"),
  },
  {
    id: 2,
    title: "Good wine is all you need",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/2.jpg"),
  },
  {
    id: 3,
    title: "Welcome to The Wine App NOT!",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/3.jpg"),
  },
];
