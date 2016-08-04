namespace EasyERP.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Testtable_add : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Test_Table",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Test_Table");
        }
    }
}
