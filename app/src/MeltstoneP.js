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
  if (typeof stone !== 'undefined') {
    return Promise.mapSeries(stone.split('\n'), stoneLine => {
      if (stoneLine.startsWith('header:')) {
        return `<h1>${stoneLine.substring(7, stoneLine.length)}</h1>`;
      } else if (stoneLine.startsWith('text:')) {
        return `<p>${stoneLine.substring(5, stoneLine.length)}</p>`;
      } else if (stoneLine.startsWith('image:')) {
        let src = stoneLine.substring(6, stoneLine.length);
        if (src.startsWith('http')) {
          return `<img src="${src}" alt="" />`;
        } else {
          return `<img src="${state.contentFolder}/${src}" alt="" />`;
        }
      } else if (stoneLine.startsWith('link:')) {
        const url = stoneLine.substring(5, stoneLine.length);
        return `<p><a href="${url}" target="_blank" />${url}</a></p>`;
      } else {
        // Default to text
        return `<p>${stoneLine}</p>`;
      }
    }).then(contentLines => contentLines.join(''));
  }

  return '';
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
      return null;
    });
};

const MeltstoneP = (contentFolder, limit) => {
  state.contentFolder = contentFolder;
  const totalSlides = limit || 30;
  const slideNames = [];

  for (let i = 1; i <= totalSlides; i += 1) {
    slideNames.push(`slide${i}.txt`);
  }

  return Promise.mapSeries(slideNames, slideName =>
    getSlideContent(slideName)
      .then(data => melt(data))
      .then(content => {
        if (content) state.slides.push(content);
        return;
      })
  )
    .then(() => state.slides)
    .catch(error => {
      console.log('-- error', error);
      return [];
    });
};

export default MeltstoneP;
