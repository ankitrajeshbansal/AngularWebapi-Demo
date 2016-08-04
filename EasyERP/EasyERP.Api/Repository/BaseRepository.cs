using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EasyERP.Api.Repository
{
    public class BaseRepository<T>
        where T : class
    {
        private readonly UnitOfWork _unitOfWork;
        internal DbSet<T> dbSet;
        public BaseRepository(UnitOfWork unitOfWork)
        {
            if (unitOfWork == null) throw new ArgumentNullException("unitOfWork");
            _unitOfWork = unitOfWork;
            this.dbSet = _unitOfWork.Db.Set<T>();
        }

        /// <summary>
        /// Returns the object with the primary key specifies or throws
        /// </summary>
        /// <typeparam name="TU">The type to map the result to</typeparam>
        /// <param name="primaryKey">The primary key</param>
        /// <returns>The result mapped to the specified type</returns>
        public T Single(object primaryKey)
        {
            var dbResult = dbSet.Find(primaryKey);
            return dbResult;
        }

        public T SingleOrDefault(object primaryKey)
        {
            var dbResult = dbSet.Find(primaryKey);
            return dbResult;
        }

        public bool Exists(object primaryKey)
        {
            return dbSet.Find(primaryKey) == null ? false : true;
        }

        public virtual int Insert(T entity)
        {
            dynamic obj = dbSet.Add(entity);
            this._unitOfWork.Db.SaveChanges();
            return obj.Id;
        }

        public virtual void Update(T entity)
        {
            dbSet.Attach(entity);
            _unitOfWork.Db.Entry(entity).State = EntityState.Modified;
            var dbEntityEntry = _unitOfWork.Db.Entry(entity);
            foreach (var property in dbEntityEntry.OriginalValues.PropertyNames)
            {
                if (property == "CreatedDate") { 
                    dbEntityEntry.Property(property).IsModified = false;
                }   
            }
            this._unitOfWork.Db.SaveChanges();
        }

        public int Delete(T entity)
        {
            if (_unitOfWork.Db.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dynamic obj = dbSet.Remove(entity);
            this._unitOfWork.Db.SaveChanges();
            return obj.Id;
        }

        public bool DeleteByKey(object primaryKey)
        {
            var entity = SingleOrDefault(primaryKey);
            if (entity != null)
            {
                dynamic obj = dbSet.Remove(entity);
                if (this._unitOfWork.Db.SaveChanges() > 0)
                    return true;
            }
            return false;
        }

        public UnitOfWork UnitOfWork { get { return _unitOfWork; } }
        internal DbContext Database { get { return _unitOfWork.Db; } }
        
        public IEnumerable<T> GetAll()
        {
            return dbSet.AsEnumerable().ToList();
        }
    
    }
}