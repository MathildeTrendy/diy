//function to enable to return the Data
export const getDiyData = ({ diyId, popular, deal, searchTerm }) => {
  console.log("Inputs:", { diyId, popular, deal, searchTerm });

  let filterFunction;
  //hvis vi har et id, filterFunctioner

  if (diyId) {
    filterFunction = (diy) => diy.id === diyId;
  } else if (popular && searchTerm) {
    filterFunction = (diy) =>
      (diy.name.includes(searchTerm) || diy.description.includes(searchTerm)) &&
      diy.popular === true;
  } else if (popular) {
    filterFunction = (diy) => diy.popular === true;
  } else if (deal) {
    filterFunction = (diy) => diy.deal === true;
  } else if (searchTerm) {
    filterFunction = (diy) =>
      diy.name.includes(searchTerm) || diy.description.includes(searchTerm);
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
    deal: false,
    image: require("./../assets/diy/4.png"),
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
    deal: false,
    image: require("./../assets/diy/5.png"),
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
    deal: false,
    image: require("./../assets/diy/6.png"),
  },
];
export const onboardingData = [
  {
    id: 1,
    title: "Enjoy All The Finest And Popular Diys",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/1.jpg"),
  },
  {
    id: 2,
    title: "Good diy is all you need",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/2.jpg"),
  },
  {
    id: 3,
    title: "Welcome to The Diy App NOT!",
    summary: "Dette er ikke en vin-app",
    image: require("./../assets/onboarding/3.jpg"),
  },
];
