import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Customers = new Mongo.Collection('customers');