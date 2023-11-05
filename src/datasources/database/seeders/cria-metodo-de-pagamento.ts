import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countMetodosDePagamentoRow: any =
      await queryInterface.sequelize.query(
        "SELECT COUNT(*) AS count FROM MetodosDePagamento"
      );

    if (countMetodosDePagamentoRow[0][0].count === 0) {
      await queryInterface.bulkInsert("MetodosDePagamento", [
        {
          id: uuidv4(),
          nome: "QR Code",
          ativo: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  // async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  //   // Nao implementado
  // },
};
