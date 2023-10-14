async function main() {
  console.log(`Seeding database with mock data...`);
}

main()
  .then(() => {
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.trace(err);
    process.exit(1);
  });
