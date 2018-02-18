/*
  Title: MeltstoneJS Presentation
  Web: meltstone.com/presentation
  License: MIT

  Author: Amir Honarpour
  Web: honarpour.com/code
*/

import Promise from 'bluebird';

const state = {
  slides: [],
  contentFolder: ''
};

const melt = stone => {
  let output = '';
  if (typeof stone !== 'undefined') {
    if (stone.startsWith('text:')) {
      output = `<p>${stone.substring(5, stone.length)}</p>`;
    } else if (stone.startsWith('image:')) {
      let src = stone.substring(6, stone.length);
      if (src.startsWith('http')) {
        output = `<img src="${src}" alt="" />`;
      } else {
        output = `<img src="${state.contentFolder}/${src}" alt="" />`;
      }
    } else if (stone.startsWith('link:')) {
      const url = stone.substring(5, stone.length);
      output = `<p><a href="${url}" target="_blank" />${url}</a></p>`;
    } else if (stone.indexOf('&copy;') !== -1 || stone.indexOf('©') !== -1) {
      output = `<p small>${stone}</p>`;
    } else {
      // Default to text
      output = `<p>${stone}</p>`;
    }
  }
  return output;
};

const getSlideContent = slideName => {
  return fetch(`${state.contentFolder}/${slideName}`, {
    method: 'get',
    headers: {
      'Content-Type': 'plain/text'
    }
  })
    .then(response => response.text())
    .catch(error => {
      console.log(error);
      return { error };
    });
};

const MeltstoneP = (contentFolder, limit) => {
  state.contentFolder = contentFolder;
  const totalSlides = limit || 10;
  const slideNames = [];

  for (let i = 1; i <= totalSlides; i += 1) {
    slideNames.push(`slide${i}.txt`);
  }

  return Promise.mapSeries(slideNames, slideName =>
    getSlideContent(slideName).then(data => {
      state.slides.push(melt(data));
    })
  )
    .then(() => state.slides)
    .catch(error => {
      console.log('-- error', error);
      return [];
    });
};

export default MeltstoneP;
