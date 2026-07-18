// db.js
const { faker, fa } = require('@faker-js/faker');

module.exports = () => {
  const data = {
    kitchens: [],
    foods: [],
    pickups: [],
    coupons: [],
    foodCategories: [
      { id: 1, name: 'Home Cooked' },
      { id: 2, name: 'Bakery' },
      { id: 3, name: 'Groceries' },
      { id: 4, name: 'Restaurant Overstock' },
      { id: 5, name: 'Vegan' },
    ],
  };

  
  const minStart = faker.number.int({ min: 0, max: 30 });
  // 1. Generate 100 App Users (Both as Meal Providers and Claimers)
  for (let i = 1; i <= 10; i++) {
    data.kitchens.push({
      id: i,
      businessName: faker.company.name(),
      fullName: faker.person.fullName(),
      username: faker.internet.username(),
      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
      businessMail: faker.internet.email(),
      businessAddress: faker.location.streetAddress(),
      profession: faker.person.jobTitle(),
      VendorType: faker.helpers.arrayElement(['Restaurant', 'Home Cooked', 'Bakery', 'Groceries', 'Vegan']),
      workingAloneStatus: faker.helpers.arrayElement(['Yes', 'No']),
      avatar: faker.image.avatar(),
      storeImage: faker.image.url({ category: "building" }),
      AdditionalInfo: faker.lorem.paragraph(),
      Availability: {
        from: faker.date.weekday({ abbreviated: true }),
        to: faker.date.weekday({ abbreviated: true }),
        availabityOnHolidays: faker.helpers.arrayElement(['Yes', 'No']),
        timeStart: faker.date.recent().toISOString(),
        timeEnd: faker.date.recent().toISOString(),
        numberOfWorkers: faker.helpers.arrayElement(['Yes', 'No']) === 'No' ? faker.number.int({ min: 1, max: 10 }) : null
      },
      phone: faker.phone.number(),
      rating: parseFloat(faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 })),
      joinedAt: faker.date.past().toISOString(),
      deliveryFee: faker.number.float({ min: 1.0, max: 5.0, precision: 0.01 }),
      arrivalTime: {
        from: minStart,
        to: minStart + faker.number.int({ min: 5, max: 60 })
      }
    });
  }

  // 2. Generate 300 Active Food Postings / Listings
  const foodCategories = ['Home Cooked', 'Bakery', 'Groceries', 'Restaurant Overstock', 'Vegan'];
  for (let i = 1; i <= 300; i++) {
    const price = faker.number.int({ min: 5, max: 50 });
    const discount = faker.number.int({ min: 0, max: 30 });
    const discountedPrice = parseFloat((price - (price * discount) / 100).toFixed(2));
    data.foods.push({
      id: i,
      providerId: faker.number.int({ min: 1, max: 10 }), // Ties directly to a user ID
      title: faker.food.dish(), // Generates realistic food names
      description: faker.food.description(),
      category: faker.helpers.arrayElement(foodCategories),
      imageUrl: faker.image.url(), // Live placeholder imagery for UI cards
      quantity: faker.number.int({ min: 1, max: 5 }),
      expiryTime: faker.date.soon({ days: 1 }).toISOString(), // Critical for pickup count-downs
      location: {
        latitude: faker.location.latitude({ max: 5.65, min: 5.50 }), // Contextual map coordinates
        longitude: faker.location.longitude({ max: -0.15, min: -0.25 }),
        addressSnippet: faker.location.streetAddress()
      },
      price,
      discount, // Discount percentage
      discountedPrice,
      isDiscountAvailable: faker.helpers.arrayElement(["Yes", "No"]),
      status: faker.helpers.arrayElement(['available', 'reserved', 'completed'])
    });
  }



  //4. Generate Discount coupons 
  for (let i = 1; i <= 5; i++) {
    data.coupons.push({
      id: i,
      spendAmount: faker.number.int({ min: 20, max: 100 }),
      saveAmount: faker.number.int({ min: 5, max: 20 }),
      imageUrl: faker.image.url({ category: "business" }),
      kitchenId: faker.number.int({ min: 1, max: 10 }),
      deliveryFee: faker.number.float({ min: 1.0, max: 5.0, precision: 0.01 }),
      discountPercentage: faker.number.int({ min: 5, max: 30 }),
      delieveryTime: {
        from: minStart,
        to: faker.number.int({ min: minStart + 5, max: 60 })
      },
    });
  }

  // 3. Generate 150 Transactions / Active Pickups
  for (let i = 1; i <= 150; i++) {
    data.pickups.push({
      id: i,
      foodId: faker.number.int({ min: 1, max: 300 }),
      claimerId: faker.number.int({ min: 1, max: 100 }),
      reservedAt: faker.date.recent().toISOString(),
      pickupCode: faker.string.alphanumeric({ length: 6, casing: 'upper' }), // Pin for confirmation UI
      status: faker.helpers.arrayElement(['pending_arrival', 'picked_up', 'cancelled'])
    });
  }

  return data;
};
