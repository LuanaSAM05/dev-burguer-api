module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name: "Entradas",
        path: "https://qcvwqunbgjfxrtmmrxct.supabase.co/storage/v1/object/public/products/category_1.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hambúrgueres",
        path: "https://qcvwqunbgjfxrtmmrxct.supabase.co/storage/v1/object/public/products/category_2.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bebidas",
        path: "https://qcvwqunbgjfxrtmmrxct.supabase.co/storage/v1/object/public/products/category_3.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sobremesas",
        path: "https://qcvwqunbgjfxrtmmrxct.supabase.co/storage/v1/object/public/products/category_4.png",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};