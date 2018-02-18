import firebase from 'firebase';
import Config from './Config';

firebase.initializeApp(Config.firebase);

export const Firebase = firebase.database().ref('/');

export const registerInstance = (instanceId, activeSlide) => {
  Firebase.set({
    [instanceId]: activeSlide
  });
};

export const deleteInstance = instanceId => {
  Firebase.child(instanceId).remove();
};

export const setActiveSlide = (instanceId, targetSlide) => {
  Firebase.set({
    [instanceId]: targetSlide
  });
};
