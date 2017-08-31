import { Mongo } from 'meteor/mongo';
 
export const Parkings = new Mongo.Collection('parkings');
export const ParkingTrx = new Mongo.Collection('parkingTrx');