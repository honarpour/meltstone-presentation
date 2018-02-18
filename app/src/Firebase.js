import firebase from 'firebase';
import Config from './Config';

firebase.initializeApp(Config.firebase);

export const firebaseRef = firebase.database().ref('/');

export const registerInstance = (instanceId, activeSlide, totalSlides) => {
  firebaseRef.set({
    [instanceId]: {
      activeSlide,
      totalSlides
    }
  });
  // // Multiple Instances
  // firebaseRef.child(instanceId).set({
  //   activeSlide,
  //   totalSlides
  // });
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
    .then(snapshot => snapshot.val())
    .catch(() => null);

export const listener = (instanceId, action) => {
  firebaseRef.child(instanceId).on('value', snap => {
    const data = {
      instanceId,
      ...snap.val()
    };

    action(data);
  });
};
