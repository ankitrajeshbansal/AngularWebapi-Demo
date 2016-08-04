namespace EasyERP.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class user_addColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ErpUsers", "LastLoginDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ErpUsers", "LastLoginDate");
        }
    }
}
