import firebase from 'firebase';
import Config from './Config';

firebase.initializeApp(Config.firebase);

export const firebaseRef = firebase.database().ref('/');

export const registerInstance = (instanceId, activeSlide, totalSlides) => {
  firebaseRef.child(instanceId).set({
    activeSlide,
    totalSlides
  });
};

export const deleteInstance = instanceId => {
  firebaseRef.child(instanceId).remove();
};

export const setActiveSlide = (instanceId, targetSlide) => {
  firebaseRef
    .child(instanceId)
    .child('activeSlide')
    .set(targetSlide);
};

export const getInstanceData = instanceId =>
  firebaseRef
    .child(instanceId)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      return data;
    })
    .catch(() => null);

export const getTotalSlides = instanceId =>
  getInstanceData(instanceId).then(data => data.totalSlides);

export const listener = (instanceId, action) => {
  firebaseRef.child(instanceId).on('value', snap => {
    const data = {
      instanceId,
      ...snap.val()
    };

    action(data);
  });
};
