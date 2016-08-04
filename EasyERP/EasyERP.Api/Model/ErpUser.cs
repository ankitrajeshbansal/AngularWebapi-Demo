using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyERP.Api.Model
{
    public class ErpUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? Token { get; set; }

        public DateTime? LastLoginDate { get; set; }
        public string Name { get; set; }
        public DateTime? DOB { get; set; }
        public string Address { get; set; }
    }
}