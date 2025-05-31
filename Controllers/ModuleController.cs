using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using WebApplication2.Models;
using System.Configuration;

namespace userproblem.Controllers
{
    public class ModuleController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);

        // GET api/module
        public IEnumerable<Module> Get()
        {
            var modules = new List<Module>();


            using (var cmd = new SqlCommand("sp_GetModules", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        modules.Add(new Module
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            ModuleName = reader.GetString(reader.GetOrdinal("module_name"))
                        });
                    }
                }
            }
            return modules;
        }

        // GET api/module/5
        public Module Get(int id)
        {
            Module module = null;

            using (var cmd = new SqlCommand("SELECT id, module_name FROM module WHERE id = @id", conn))
            {
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        module = new Module
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            ModuleName = reader.GetString(reader.GetOrdinal("module_name"))
                        };
                    }
                }
            }

            return module;
        }

        // POST api/module
        public IHttpActionResult Post([FromBody] Module module)
        {
            if (module == null || string.IsNullOrWhiteSpace(module.ModuleName))
                return BadRequest("Module name is required.");

            using (var cmd = new SqlCommand("sp_InsertModule", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@module_name", module.ModuleName);

                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Module inserted successfully.");
        }

        // PUT api/module/5
        public IHttpActionResult Put(int id, [FromBody] Module module)
        {
            if (module == null || string.IsNullOrWhiteSpace(module.ModuleName))
                return BadRequest("Module name is required.");

            using (var cmd = new SqlCommand("sp_UpdateModule", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@module_name", module.ModuleName);

                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Module updated successfully.");
        }

        // DELETE api/module/5
        public IHttpActionResult Delete(int id)
        {
            using (var cmd = new SqlCommand("sp_DeleteModule", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);

                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Module deleted successfully.");
        }
    }
}
