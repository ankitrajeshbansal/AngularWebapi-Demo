using EasyERP.Api.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EasyERP.Api.Repository
{
    public class UnitOfWork
    {
        
        private readonly ERPContext _db;


        public UnitOfWork()
        {
            _db = new ERPContext();

        }

        public void Dispose()
        {

        }

        public void Commit()
        {
            _db.SaveChanges();
        }

        public DbContext Db
        {
            get { return _db; }
        }
    }
}