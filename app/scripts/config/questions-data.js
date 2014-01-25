define([], function () {
  'use strict';

  var QuestionsData = [
    {
      id: 1,
      question: 'Who first built C3P0?',
      answers: [
        'Obi-Wan Kenobi',
        'Luke Skywalker',
        'Qui-Gon Jinn',
        'Anakin Skywalker',
        'Jabba The Hut'
      ],
      correctAnswers: [ 3 ]
    },
    {
      id: 2,
      question: 'What is the race of Chewbacca?',
      answers: [
        'Oki-dokie',
        'Dookie',
        'Wooku',
        'Dooku',
        'Wookie'
      ],
      correctAnswers: [ 4 ]
    },
    {
      id: 3,
      question: 'How many suns and moons are there in Tatooine?',
      answers: [
        '2 suns and no moon',
        '2 suns and 1 moon',
        '2 suns and 2 moon',
        '2 suns and 3 moons',
        '3 suns and 2 moons'
      ],
      correctAnswers: [ 3 ]
    },
    {
      id: 4,
      question: 'Which ones below are Jedi masters?',
      answers: [
        'Anakin Skywalker',
        'Mace Windu',
        'Qui-Gon Jinn',
        'Lando Calrissian',
        'Yoda'
      ],
      correctAnswers: [ 1, 2, 4 ]
    },
    {
      id: 5,
      question: 'Which creatures inhabit the forest moon of Endor?',
      answers: [
        'Woks',
        'Ewoks',
        'Hewoks',
        'Wookies',
        'Dookies'
      ],
      correctAnswers: [ 1 ],
      lastQuestion: true
    }
  ];
  return QuestionsData;
});
