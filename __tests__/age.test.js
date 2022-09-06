import Age from './../src/age.js';

describe('Age', () => {

    test('should correctly create an age object with age and lifestyle', () => {
      let input = new Age(30, "average")
      expect(input.age).toEqual(30);
      expect(input.lifestyle).toEqual("average")
    })


});