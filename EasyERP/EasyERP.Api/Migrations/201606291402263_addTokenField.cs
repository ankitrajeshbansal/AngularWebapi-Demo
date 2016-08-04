namespace EasyERP.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTokenField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ErpUsers", "Token", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ErpUsers", "Token");
        }
    }
}
