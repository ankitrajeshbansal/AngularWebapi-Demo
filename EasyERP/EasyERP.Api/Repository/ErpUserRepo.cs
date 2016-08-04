using EasyERP.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyERP.Api.Repository
{
    public class ErpUserRepo : BaseRepository<ErpUser>
    {
        public ErpUserRepo(UnitOfWork unit)
            : base(unit)
        {

        }
        internal ErpUser GetByLogin(ErpUser erpUser)
        {
            using (var _dbContext = new ERPContext())
            {
                var userModel=  _dbContext.ErpUsers.FirstOrDefault(p => p.Username == erpUser.Username && p.Password == erpUser.Password);
                if (userModel != null)
                {
                    userModel.Token = Guid.NewGuid();
                    userModel.LastLoginDate = DateTime.Now;
                    _dbContext.SaveChanges();                   
                }
                return userModel;
            }
        }

        internal static bool IsValidToken(ErpUser erpUser)
        {
            using (var _dbContext = new ERPContext())
            {
                var userModel = _dbContext.ErpUsers.FirstOrDefault(p => p.Username == erpUser.Username && p.Token == erpUser.Token);
                if (userModel != null)
                {
                    return true;
                }
                return false;
            }
        }

        internal bool SubmitDetail(ErpUser erpUser)
        {

            if (erpUser.Id > 0)
                Update(erpUser);
            else
                Insert(erpUser);
            return false;
        }

        internal bool isExists(ErpUser erpUser)
        {
            using (var _dbContext = new ERPContext())
            {
                var dbUser= _dbContext.ErpUsers.FirstOrDefault(p => p.Username == erpUser.Username && p.Id != erpUser.Id);
                if (dbUser != null)
                    return true;
                else
                    return false;
            }
        }
        

    }
}