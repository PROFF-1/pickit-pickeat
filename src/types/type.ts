interface RootObject {
  kitchens: Kitchen[];
  foods: Food[];
  pickups: Pickup[];
  foodCategories: FoodCategory[];
}

interface FoodCategory {
  id: number;
  name: string;
}

interface Pickup {
  id: number;
  foodId: number;
  claimerId: number;
  reservedAt: string;
  pickupCode: string;
  status: string;
}

interface Food {
  id: number;
  providerId: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  quantity: number;
  expiryTime: string;
  location: Location;
  price: number;
  discount: number;
  discountedPrice: number;
  isDiscountAvailable: string;
  status: string;
}

interface Location {
  latitude: number;
  longitude: number;
  addressSnippet: string;
}

interface Kitchen {
  id: number;
  businessName: string;
  fullName: string;
  username: string;
  yearsOfExperience: number;
  businessMail: string;
  businessAddress: string;
  profession: string;
  VendorType: string;
  workingAloneStatus: string;
  avatar: string;
  storeImage: string;
  AdditionalInfo: string;
  Availability: Availability;
  phone: string;
  rating: number;
  joinedAt: string;
}

interface Availability {
  from: string;
  to: string;
  availabityOnHolidays: string;
  timeStart: string;
  timeEnd: string;
  numberOfWorkers: null | number;
}