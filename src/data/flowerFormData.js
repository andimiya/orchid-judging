const flowerFormData = {
  flowers: [
    {
      flower: 'Cattleya',
      formSections: [
        {
          formTitle: 'Form of Flower',
          totalSectionScore: 30,
          grading: [
            {
              criteria: 'Over-all Form',
              maxPoints: 15
            },
            { criteria: 'Sepals', maxPoints: 5 },
            { criteria: 'Petals', maxPoints: 5 },
            { criteria: 'Labellum (*Pouch)', maxPoints: 5 }
          ]
        },
        {
          formTitle: 'Color of Flower',
          totalSectionScore: 30,
          grading: [
            { criteria: 'Harmony', maxPoints: 10 },
            { criteria: 'Brilliance and Purity', maxPoints: 10 },
            { criteria: 'Sepals and Petals', maxPoints: 5 },
            { criteria: 'Labellum (*Pouch)', maxPoints: 5 }
          ]
        },
        {
          formTitle: 'Flower and Stem Characteristics',
          totalSectionScore: 40,
          grading: [
            { criteria: 'Size of Flower', maxPoints: 10 },
            { criteria: 'Substance', maxPoints: 10 },
            { criteria: 'Texture', maxPoints: 10 },
            { criteria: 'Habit of Stem', maxPoints: 5 },
            { criteria: 'Floriferousness', maxPoints: 5 }
          ]
        }
      ]
    },
    {
      flower: 'Dendrobium',
      formSections: [
        {
          formTitle: 'Form of Flower',
          totalSectionScore: 30,
          grading: [{ criteria: 'Over-all Form', maxPoints: 30 }]
        },
        {
          formTitle: 'Color of Flower',
          totalSectionScore: 30,
          grading: [{ criteria: 'Color of Flower', maxPoints: 30 }]
        },
        {
          formTitle: 'Flower and Stem Characteristics',
          totalSectionScore: 40,
          grading: [
            { criteria: 'Size of Flower', maxPoints: 10 },
            { criteria: 'Substance and Texture', maxPoints: 10 },
            {
              criteria: 'Habit of Stem and Arrangement of Flowers',
              maxPoints: 10
            },
            { criteria: 'Floriferousness', maxPoints: 10 }
          ]
        }
      ]
    }
  ]
};

export default flowerFormData;
