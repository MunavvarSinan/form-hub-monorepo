import db, { genId } from '../../src/modules/db';

const run = async () => {
  return await db.submission.createMany({
    data: {
      id: genId(),
      data: {
        name: 'John Doe',
        email: 'john@gmail.com',
      },
      submittedAt: new Date(),
    },
  });
};

if (require.main === module) {
  run()
    .then(() => {
      console.log('Seeded successfully');
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
