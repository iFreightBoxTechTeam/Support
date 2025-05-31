using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using WebApplication2.Models;
using System.Configuration;
namespace userproblem.Controllers
{
    public class TenantController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);

        // GET api/tenant
        public IEnumerable<Tenant> Get()
        {
            var tenants = new List<Tenant>();

            using (var cmd = new SqlCommand("sp_GetTenants", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        tenants.Add(new Tenant
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            TenantCode = reader.GetString(reader.GetOrdinal("tenantcode")),
                            Customer = reader.GetString(reader.GetOrdinal("customer"))
                        });
                    }
                }
            }

            return tenants;
        }

        // GET api/tenant/5
        public Tenant Get(int id)
        {
            Tenant tenant = null;

            using (var cmd = new SqlCommand("sp_GetTenantById", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        tenant = new Tenant
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            TenantCode = reader.GetString(reader.GetOrdinal("tenantcode")),
                            Customer = reader.GetString(reader.GetOrdinal("customer"))
                        };
                    }
                }
            }

            return tenant;
        }

        // POST api/tenant
        public IHttpActionResult Post([FromBody] Tenant tenant)
        {
            if (tenant == null || string.IsNullOrWhiteSpace(tenant.TenantCode) || string.IsNullOrWhiteSpace(tenant.Customer))
                return BadRequest("Both TenantCode and Customer are required.");

            using (var cmd = new SqlCommand("sp_InsertTenant", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@tenantcode", tenant.TenantCode);
                cmd.Parameters.AddWithValue("@customer", tenant.Customer);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Tenant inserted successfully.");
        }

        // PUT api/tenant/5
        public IHttpActionResult Put(int id, [FromBody] Tenant tenant)
        {
            if (tenant == null || string.IsNullOrWhiteSpace(tenant.TenantCode) || string.IsNullOrWhiteSpace(tenant.Customer))
                return BadRequest("Both TenantCode and Customer are required.");

            using (var cmd = new SqlCommand("sp_UpdateTenant", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@tenantcode", tenant.TenantCode);
                cmd.Parameters.AddWithValue("@customer", tenant.Customer);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Tenant updated successfully.");
        }

        // DELETE api/tenant/5
        public IHttpActionResult Delete(int id)
        {
            using (var cmd = new SqlCommand("sp_DeleteTenant", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Tenant deleted successfully.");
        }
    }
}
