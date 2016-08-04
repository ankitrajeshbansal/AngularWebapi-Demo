using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EasyERP.Api.Model
{
    public class ERPContext : DbContext
    {
        public ERPContext() : base("name=EasyErpDBConnectionString")
        {

        }

        public DbSet<ErpUser> ErpUsers { get; set; }        

    }
}