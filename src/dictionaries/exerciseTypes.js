const ET_10 = 10;
const ET_20 = 20;

const exerciseTypes = {
  ET_10,
  ET_20,
  LIST: [
    {
      uid: ET_10,
      name: 'Put the words in the correct order'
    },
    {
      uid: ET_20,
      name: 'Which is correct?'
    }
  ]
};

exerciseTypes.MAP = exerciseTypes.LIST.reduce(
  (ac, p) => ({ ...ac, [p.uid]: p }),
  {}
);

export default exerciseTypes;
