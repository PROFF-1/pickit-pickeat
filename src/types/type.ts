export interface RootObject {
  kitchens: Kitchen[];
  foods: Food[];
  pickups: Pickup[];
  coupons: Coupon[];
  foodCategories: FoodCategory[];
}

export interface FoodCategory {
  id: number;
  name: string;
}

export interface Coupon {
  id: number;
  spendAmount: number;
  saveAmount: number;
  imageUrl: string;
  kitchenId: number;
  deliveryFee: number;
  discountPercentage: number;
  deliveryTime: DeliveryTime;
}

export interface DeliveryTime {
  from: number;
  to: number;
}

export interface Pickup {
  id: number;
  foodId: number;
  claimerId: number;
  reservedAt: string;
  pickupCode: string;
  status: string;
}

export interface Food {
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

export interface Location {
  latitude: number;
  longitude: number;
  addressSnippet: string;
}

export interface Kitchen {
  id: number;
  businessName: string;
  fullName: string;
  username: string;
  yearsOfExperience: number;
  businessMail: string;
  businessAddress: string;
  profession: string;
  vendorType: string;
  workingAloneStatus: string;
  avatar: string;
  storeImage: string;
  additionalInfo: string;
  availability: Availability;
  phone: string;
  rating: number;
  joinedAt: string;
}

export interface Availability {
  from: string;
  to: string;
  availabilityOnHolidays: string;
  timeStart: string;
  timeEnd: string;
  numberOfWorkers: null | number;
}