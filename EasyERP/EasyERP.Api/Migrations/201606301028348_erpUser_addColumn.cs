namespace EasyERP.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class erpUser_addColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ErpUsers", "Name", c => c.String());
            AddColumn("dbo.ErpUsers", "DOB", c => c.DateTime());
            AddColumn("dbo.ErpUsers", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ErpUsers", "Address");
            DropColumn("dbo.ErpUsers", "DOB");
            DropColumn("dbo.ErpUsers", "Name");
        }
    }
}
