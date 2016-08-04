namespace EasyERP.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testtable_delete : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Test_Table");
        }
        
        public override void Down()
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
    }
}
