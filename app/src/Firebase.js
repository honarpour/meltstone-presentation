import firebase from 'firebase';
import Config from './Config';

firebase.initializeApp(Config.firebase);

export const Firebase = firebase.database().ref('/');

export const registerInstance = (instanceId, activeSlide, totalSlides) => {
  Firebase.set({
    [instanceId]: {
      activeSlide,
      totalSlides
    }
  });
};

export const deleteInstance = instanceId => {
  Firebase.child(instanceId).remove();
};

export const setActiveSlide = (instanceId, targetSlide) => {
  Firebase.child(instanceId)
    .child('activeSlide')
    .set(targetSlide);
};

export const getTotalSlides = instanceId =>
  firebase
    .database()
    .ref(instanceId)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      return data.totalSlides;
    })
    .catch(() => null);
