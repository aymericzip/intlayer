import { enu, type ContentModule } from 'intlayer';

const multipleLocalsContent: ContentModule = {
  id: 'enumeration',
  numberOfCar: enu({
    '<-1': 'Less than minus one car',
    '-1': 'Minus one car',
    '0': 'No cars',
    '1': 'One car',
    '>5': 'Some cars',
    '>19': 'Many cars',
  }),
};

export default multipleLocalsContent;
