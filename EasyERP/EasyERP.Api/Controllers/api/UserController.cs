using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasyERP.Api.Model;
using EasyERP.Api.Repository;
using System.Web.Http.Cors;
using EasyERP.Api.CustomFilters;


namespace EasyERP.Api.Controllers.api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private UnitOfWork uow = null;
        private ErpUserRepo erpUserRepo = null;

        public UserController()
        {
            uow = new UnitOfWork();
            erpUserRepo = new ErpUserRepo(uow);
        }

        // GET: api/User
        [Route("api/user/isvalid")]
        [HttpPost]
        public ErpUser GetByLogin(ErpUser erpUser)
        {
            return erpUserRepo.GetByLogin(erpUser);
        }

        [BasicAuthentication]
        [Route("api/user/isExists")]
        public bool isExists(ErpUser erpUser)
        {
            return erpUserRepo.isExists(erpUser);
        }

        [HttpPost]
        [BasicAuthentication]
        [Route("api/user/submitDetail")]
        public bool SubmitDetail(ErpUser erpUser)
        {
            return erpUserRepo.SubmitDetail(erpUser);
        }

        [BasicAuthentication]
        [HttpGet]
        // GET: api/User
        public IEnumerable<ErpUser> Get()
        {
            return erpUserRepo.GetAll();
        }

        [BasicAuthentication]
        [HttpGet]
        // GET: api/User/5
        public ErpUser Get(int id)
        {
            return erpUserRepo.SingleOrDefault(id);
        }
        // POST: api/User
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }


        // DELETE: api/User/5
        [BasicAuthentication]
        public bool Delete(int id)
        {
            return erpUserRepo.DeleteByKey(id);
        }
    }
}
