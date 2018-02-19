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

const dataTypes = {
  header: 'header:',
  text: 'text:',
  image: 'image:',
  link: 'link:'
};

const melt = stone => {
  if (typeof stone !== 'undefined') {
    return Promise.mapSeries(stone.split('\n'), stoneLine => {
      if (stoneLine.startsWith(dataTypes.header)) {
        return `<h1>${stoneLine.substring(
          dataTypes.header.length,
          stoneLine.length
        )}</h1>`;
      } else if (stoneLine.startsWith(dataTypes.text)) {
        return `<p>${stoneLine.substring(
          dataTypes.text.length,
          stoneLine.length
        )}</p>`;
      } else if (stoneLine.startsWith(dataTypes.image)) {
        let src = stoneLine.substring(dataTypes.image.length, stoneLine.length);
        if (src.startsWith('http')) {
          return `<img src="${src}" alt="" />`;
        } else {
          return `<img src="${state.contentFolder}/${src}" alt="" />`;
        }
      } else if (stoneLine.startsWith(dataTypes.link)) {
        const url = stoneLine.substring(
          dataTypes.link.length,
          stoneLine.length
        );
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
