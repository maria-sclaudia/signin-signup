import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSendMail1616762950297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "send_mail",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "integer"
                    },
                    {
                        name: "notify_id",
                        type: "integer"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"]
                    },
                    {
                        name: "FKNotify",
                        referencedTableName: "notify",
                        referencedColumnNames: ["id"],
                        columnNames: ["notify_id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("send_mail");
    }

}
