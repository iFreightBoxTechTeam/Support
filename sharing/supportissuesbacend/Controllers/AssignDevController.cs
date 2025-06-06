using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

using System.Configuration;
using WebApplication2.Models;
using System.Web.Http.Cors;

namespace userproblem.Controllers
{
    public class AssignDevController : ApiController
    {
   
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);
        [HttpGet]
        [Route("api/assigndev")]
        // GET api/assigndev
        public IEnumerable<AssignDev> Get()
        {
            var devs = new List<AssignDev>();


            using (var cmd = new SqlCommand("sp_GetAssignto", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        devs.Add(new AssignDev
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            DevName = reader.GetString(reader.GetOrdinal("devname"))
                        });
                    }
                }
            }

            return devs;
        }

        // GET api/assigndev/5
        public AssignDev Get(int id)
        {
            AssignDev dev = null;

            using (var cmd = new SqlCommand("sp_GetAssignDevById", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        dev = new AssignDev
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            DevName = reader.GetString(reader.GetOrdinal("devname"))
                        };
                    }
                }
            }

            return dev;
        }
        [HttpPost]
        [Route("api/assigndev")]
        // POST api/assigndev
        public IHttpActionResult Post([FromBody] AssignDev dev)
        {
            if (dev == null || string.IsNullOrWhiteSpace(dev.DevName))
                return BadRequest("Developer name is required.");

            using (var cmd = new SqlCommand("sp_InsertAssignto", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@devname", dev.DevName);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Developer assigned successfully.");
        }

        [HttpPut]
        [Route("api/assigndev/{id}")]
        // PUT api/assigndev/5
        public IHttpActionResult Put(int id, [FromBody] AssignDev dev)
        {
            if (dev == null || string.IsNullOrWhiteSpace(dev.DevName))
                return BadRequest("Developer name is required.");

            using (var cmd = new SqlCommand("sp_UpdateAssignto", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@devname", dev.DevName);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Developer updated successfully.");
        }
        [HttpDelete]
        [Route("api/assigndev/{id}")]
        // DELETE api/assigndev/5
        public IHttpActionResult Delete(int id)
        {
            using (var cmd = new SqlCommand("sp_DeleteAssignto", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Developer deleted successfully.");
        }
    }
}
