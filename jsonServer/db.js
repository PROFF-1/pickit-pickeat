// db.js
const { faker } = require('@faker-js/faker');

module.exports = () => {
  const data = {
    users: [],
    listings: [],
    pickups: []
  };

  // 1. Generate 100 App Users (Both as Meal Providers and Claimers)
  for (let i = 1; i <= 100; i++) {
    data.users.push({
      id: i,
      fullName: faker.person.fullName(),
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      rating: parseFloat(faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 })),
      joinedAt: faker.date.past().toISOString()
    });
  }

  // 2. Generate 300 Active Food Postings / Listings
  const foodCategories = ['Home Cooked', 'Bakery', 'Groceries', 'Restaurant Overstock', 'Vegan'];
  for (let i = 1; i <= 300; i++) {
    data.listings.push({
      id: i,
      providerId: faker.number.int({ min: 1, max: 100 }), // Ties directly to a user ID
      title: faker.food.dish(), // Generates realistic food names
      description: faker.food.description(),
      category: faker.helpers.arrayElement(foodCategories),
      imageUrl: faker.image.urlLoremFlickr({ category: 'food' }), // Live placeholder imagery for UI cards
      quantity: faker.number.int({ min: 1, max: 5 }),
      expiryTime: faker.date.soon({ days: 1 }).toISOString(), // Critical for pickup count-downs
      location: {
        latitude: faker.location.latitude({ max: 5.65, min: 5.50 }), // Contextual map coordinates
        longitude: faker.location.longitude({ max: -0.15, min: -0.25 }),
        addressSnippet: faker.location.streetAddress()
      },
      status: faker.helpers.arrayElement(['available', 'reserved', 'completed'])
    });
  }

  // 3. Generate 150 Transactions / Active Pickups
  for (let i = 1; i <= 150; i++) {
    data.pickups.push({
      id: i,
      listingId: faker.number.int({ min: 1, max: 300 }),
      claimerId: faker.number.int({ min: 1, max: 100 }),
      reservedAt: faker.date.recent().toISOString(),
      pickupCode: faker.string.alphanumeric({ length: 6, casing: 'upper' }), // Pin for confirmation UI
      status: faker.helpers.arrayElement(['pending_arrival', 'picked_up', 'cancelled'])
    });
  }

  return data;
};
