import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("username", 255).nullable();
      table.string("login_id", 255).nullable();
      table.string("email", 255).nullable();
      table.string("role_id", 255).nullable();
      table.string("organisation", 255).nullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token", 255).nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
